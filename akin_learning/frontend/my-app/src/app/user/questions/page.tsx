import {authenticateUser} from "@/utils/serverAuth";
import QuestionClient from "@/app/user/questions/QuestionClient";


export default async function Question({searchParams}: { searchParams: Record<string, string | undefined> }) {
  const topic_id = searchParams?.topic_id;

  if (!topic_id) {
    console.error("topic_id is missing");
    return <div>Error: Topic ID is missing</div>;
  }

  // Authenticate user on server
  const authResult = await authenticateUser();
  console.log("Auth Result:", authResult);
  // Fetch progress data on server

  const questionData = await fetchQuestionsData(topic_id);

  return <QuestionClient userData={authResult.userData} questions={questionData} />;
}

async function fetchQuestionsData(topic_id: string) {
try {
    const response = await fetch(`http://localhost:5000/api/questions?topic_id=${topic_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();

    //Return filtered questions
    return data.filter((q: { topic_id: number }) => q.topic_id === Number(topic_id));

  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}
