"use client";

import { Button, FormControl } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function FillInBlankEditor({
  draft,
  setDraft,
}: {
  draft: any;
  setDraft: (d: any) => void;
}) {
  const answers = draft.blankAnswers || [];

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = answers.map((a: string, i: number) =>
      i === index ? value : a,
    );
    setDraft({ ...draft, blankAnswers: newAnswers });
  };

  const addAnswer = () => {
    setDraft({ ...draft, blankAnswers: [...answers, ""] });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = answers.filter((_: string, i: number) => i !== index);
    setDraft({ ...draft, blankAnswers: newAnswers });
  };

  return (
    <div>
      <label className="form-label">
        <strong>Possible Answers:</strong>
      </label>
      {answers.map((answer: string, index: number) => (
        <div key={index} className="d-flex align-items-center gap-2 mb-2">
          <span className="text-muted">Possible Answer:</span>
          <FormControl
            value={answer}
            onChange={(e) => updateAnswer(index, e.target.value)}
            className="grow"
          />
          <FaTrash
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => removeAnswer(index)}
          />
        </div>
      ))}
      <div className="text-end">
        <Button variant="link" className="text-danger" onClick={addAnswer}>
          + Add Another Answer
        </Button>
      </div>
    </div>
  );
}
