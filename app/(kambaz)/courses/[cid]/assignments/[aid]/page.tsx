"use client";

import { useParams } from "next/navigation";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import * as db from "../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const assignment = db.assignments.find((a: any) => a._id === aid);

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          defaultValue={assignment?.title ?? "New Assignment"}
        />
      </div>

      <div className="mb-3">
        <FormControl
          as="textarea"
          rows={6}
          id="wd-description"
          defaultValue={`Assignment for course ${cid}.`}
        />
      </div>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </Col>
        <Col sm={9}>
          <FormControl id="wd-points" defaultValue={100} />
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
                defaultValue="2026-03-01"
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
                    defaultValue="2026-02-15"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                  <FormControl
                    id="wd-available-until"
                    type="date"
                    defaultValue="2026-03-10"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="float-end">
        <Button id="wd-cancel-assignment" variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button id="wd-save-assignment" variant="danger">
          Save
        </Button>
      </div>
    </div>
  );
}
