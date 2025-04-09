
import {redirect} from "next/navigation";
import {authenticateUser} from "@/utils/serverAuth";
import DashboardClient from "@/app/user/dashboard/DashboardClient";
import {cookies} from "next/headers";

// Interface for subject-level progress data returned by your first API.
interface ProgressData {
  subject_id: number;
  subject: string;
  average_progress: number;
  questionLeft: number; // The question number the user left off at.
  last_visited_question_id?: number | null; // Optional
  recentTopics?: TopicData[]; // Will hold the top 3 recent topics for the subject.
}

// Interface for topic-level progress data returned by your second API.
interface TopicData {
  topic_id: number;
  name: string;
  subject_id: number;
  last_visited_question_id?: number | null;
  updated_at: string;
  difficulty_level: string;
  progress_percentage: number;
  active_questions: number;
  completed_questions: number;
}

export default async function Dashboard() {
  // Authenticate user on server
  const authResult = await authenticateUser();
  console.log("Auth Result:", authResult);
  // Fetch progress data on server
  const progressData = await fetchProgressData(authResult.userData.id);

  return <DashboardClient userData={authResult.userData} initialProgress={progressData} />;
}

async function fetchProgressData(userId: string) {
  try {
    // Validate numeric format
    if (!/^\d+$/.test(userId)) {
      console.log("User ID:", userId);
      throw new Error("Invalid user ID format");
    }

    const [progressRes, userProgressRes] = await Promise.all([
      fetch(`http://localhost:5000/progress/fetch?user_id=${userId}`),
      fetch(`http://localhost:5000/questions/user-progress?user_id=${userId}`)
    ]);

    if (!progressRes || !userProgressRes) {
      throw new Error("Failed to fetch data");
    }

    // // Add response validation not needed
    // const validateResponse = async (res: Response) => {
    //   const text = await res.text();
    //   try {
    //     return JSON.parse(text);
    //   } catch (e) {
    //     throw new Error(`Invalid JSON: ${text.slice(0, 100)}`);
    //   }
    // };

    const progressData = await progressRes.json() as ProgressData[];
    const userProgress = await userProgressRes.json() as TopicData[];

    return progressData.map(subject => ({
      ...subject,
      recentTopics: userProgress.filter(topic =>
        BigInt(topic.subject_id) === BigInt(subject.subject_id)
      )
    }));

  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}