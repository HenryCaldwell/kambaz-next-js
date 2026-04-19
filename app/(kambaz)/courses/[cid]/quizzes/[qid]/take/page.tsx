"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import * as quizClient from "../../../../quizClient";
import QuizTaker from "../QuizTaker";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState("");

  const fetchQuiz = async () => {
    const data = await quizClient.findQuizById(qid as string);
    setQuiz(data);
    // No access code
    if (!data.accessCode || data.accessCode.trim() === "") {
      setAccessGranted(true);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const handleAccessCode = () => {
    if (accessCodeInput.trim() === quiz.accessCode.trim()) {
      setAccessGranted(true);
      setError("");
    } else {
      setError("Incorrect access code. Please try again.");
    }
  };

  // Show access code prompt
  if (!accessGranted) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="border rounded p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h4 className="mb-3">Access Code Required</h4>
          <p className="text-muted">
            This quiz requires an access code to begin.
          </p>
          <FormControl
            type="password"
            value={accessCodeInput}
            onChange={(e) => setAccessCodeInput(e.target.value)}
            placeholder="Enter access code..."
            className="mb-3"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAccessCode();
            }}
          />
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleAccessCode}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Access granted
  return (
    <QuizTaker cid={cid as string} qid={qid as string} isPreview={false} />
  );
}
