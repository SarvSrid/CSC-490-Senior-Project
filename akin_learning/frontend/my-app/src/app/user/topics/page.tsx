import {authenticateUser} from "@/utils/serverAuth";
import QuestionClient from "@/app/user/questions/QuestionClient";
import TopicClient from "@/app/user/topics/TopicClient";

export default async function Topic({searchParams}: { searchParams: Record<string, string | undefined> }) {
  const subject_id = searchParams?.subject_id;

  if (!subject_id) {
    console.error("subject_id is missing");
    return <div>Error: Subject ID is missing</div>;
  }

  // Authenticate user on server
  const authResult = await authenticateUser();
  console.log("Auth Result:", authResult);
  // Fetch progress data on server

  const topicData = await fetchTopicsData(subject_id, authResult.userData.id);

  return <TopicClient userData={authResult.userData} topics={topicData} />;
}

async function fetchTopicsData(subject_id: string, user_id: string) {
try {
    const response = await fetch(`http://localhost:5000/topics/fetch?subject_id=${subject_id}&user_id=${user_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
    }
    return data;

  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
}