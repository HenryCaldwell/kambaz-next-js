"use client";

export default function TrueFalseEditor({
  draft,
  setDraft,
}: {
  draft: any;
  setDraft: (d: any) => void;
}) {
  return (
    <div>
      <label className="form-label">
        <strong>Answers:</strong>
      </label>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="trueFalse"
            checked={draft.correctAnswer === true}
            onChange={() => setDraft({ ...draft, correctAnswer: true })}
            style={{ accentColor: "#dc3545" }}
          />
          <span
            className={
              draft.correctAnswer === true ? "text-danger fw-bold" : ""
            }
          >
            True
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="trueFalse"
            checked={draft.correctAnswer === false}
            onChange={() => setDraft({ ...draft, correctAnswer: false })}
            style={{ accentColor: "#dc3545" }}
          />
          <span
            className={
              draft.correctAnswer === false ? "text-danger fw-bold" : ""
            }
          >
            False
          </span>
        </div>
      </div>
    </div>
  );
}
