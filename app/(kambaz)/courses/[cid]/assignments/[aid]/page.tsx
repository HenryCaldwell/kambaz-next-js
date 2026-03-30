"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";
import { setAssignments } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  const isNew = aid === "new";
  const existing = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>(
    existing || {
      title: "New Assignment",
      description: "New Assignment Description",
      points: 100,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      course: cid,
    },
  );

  const handleSave = async () => {
    if (isNew) {
      const cidString = Array.isArray(cid) ? cid[0] : (cid as string);
      const newAssignment = await client.createAssignment(
        cidString,
        assignment,
      );
      dispatch(setAssignments([...assignments, newAssignment]));
    } else {
      await client.updateAssignment(assignment);
      dispatch(
        setAssignments(
          assignments.map((a: any) =>
            a._id === assignment._id ? assignment : a,
          ),
        ),
      );
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <FormControl
          as="textarea"
          rows={6}
          id="wd-description"
          value={assignment.description || ""}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col sm={9}>
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value),
              })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-assignment-group">Assignment Group</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </Col>
        <Col sm={9}>
          <FormSelect id="wd-submission-type" defaultValue="ONLINE">
            <option value="ONLINE">Online</option>
            <option value="EXTERNAL_TOOL">External Tool</option>
            <option value="NO_SUBMISSION">No Submission</option>
          </FormSelect>

          <div className="border rounded p-3 mt-3">
            <div className="fw-bold mb-2">Online Entry Options</div>
            <FormCheck id="wd-text-entry" label="Text Entry" className="mb-2" />
            <FormCheck
              id="wd-website-url"
              label="Website URL"
              className="mb-2"
            />
            <FormCheck
              id="wd-media-recordings"
              label="Media Recordings"
              className="mb-2"
            />
            <FormCheck
              id="wd-student-annotation"
              label="Student Annotation"
              className="mb-2"
            />
            <FormCheck id="wd-file-uploads" label="File Uploads" />
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col sm={9}>
          <div className="border rounded p-3">
            <div className="mb-3">
              <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
              <FormControl id="wd-assign-to" defaultValue="Everyone" />
            </div>

            <div className="mb-3">
              <FormLabel htmlFor="wd-due-date">Due</FormLabel>
              <FormControl
                id="wd-due-date"
                type="date"
                value={assignment.dueDate || ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
            </div>

            <Row>
              <Col>
                <div>
                  <FormLabel htmlFor="wd-available-from">
                    Available from
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="date"
                    value={assignment.availableFrom || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFrom: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                  <FormControl
                    id="wd-available-until"
                    type="date"
                    value={assignment.availableUntil || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="float-end">
        <Button
          id="wd-cancel-assignment"
          variant="secondary"
          className="me-2"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button id="wd-save-assignment" variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
