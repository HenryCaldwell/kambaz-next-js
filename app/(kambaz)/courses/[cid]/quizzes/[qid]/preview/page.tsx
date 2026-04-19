"use client";

import { useParams } from "next/navigation";
import QuizTaker from "../QuizTaker";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  return <QuizTaker cid={cid as string} qid={qid as string} isPreview={true} />;
}
