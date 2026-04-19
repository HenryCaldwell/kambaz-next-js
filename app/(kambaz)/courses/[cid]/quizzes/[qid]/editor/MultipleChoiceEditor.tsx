"use client";

import { Button, FormControl } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function MultipleChoiceEditor({
  draft,
  setDraft,
}: {
  draft: any;
  setDraft: (d: any) => void;
}) {
  const choices = draft.choices || [];

  const updateChoice = (index: number, updates: any) => {
    const newChoices = choices.map((c: any, i: number) =>
      i === index ? { ...c, ...updates } : c,
    );
    setDraft({ ...draft, choices: newChoices });
  };

  const setCorrectChoice = (index: number) => {
    const newChoices = choices.map((c: any, i: number) => ({
      ...c,
      isCorrect: i === index,
    }));
    setDraft({ ...draft, choices: newChoices });
  };

  const addChoice = () => {
    setDraft({
      ...draft,
      choices: [...choices, { text: "", isCorrect: false }],
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_: any, i: number) => i !== index);
    setDraft({ ...draft, choices: newChoices });
  };

  return (
    <div>
      <label className="form-label">
        <strong>Answers:</strong>
      </label>
      {choices.map((choice: any, index: number) => (
        <div key={index} className="d-flex align-items-center gap-2 mb-2">
          <input
            type="radio"
            name="correctChoice"
            checked={choice.isCorrect}
            onChange={() => setCorrectChoice(index)}
            style={{ accentColor: "#dc3545" }}
          />
          <span
            className={choice.isCorrect ? "text-danger fw-bold" : "text-muted"}
          >
            {choice.isCorrect ? "Correct Answer" : "Possible Answer"}
          </span>
          <FormControl
            value={choice.text || ""}
            onChange={(e) => updateChoice(index, { text: e.target.value })}
            className="grow"
          />
          <FaTrash
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => removeChoice(index)}
          />
        </div>
      ))}
      <div className="text-end">
        <Button variant="link" className="text-danger" onClick={addChoice}>
          + Add Another Answer
        </Button>
      </div>
    </div>
  );
}
