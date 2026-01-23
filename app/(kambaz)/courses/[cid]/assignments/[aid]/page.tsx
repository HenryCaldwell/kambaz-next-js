export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
            </select>
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type" defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
              <option value="EXTERNAL_TOOL">External Tool</option>
              <option value="NO_SUBMISSION">No Submission</option>
            </select>

            <br />
            <br />

            <label>Online Entry Options</label>
            <br />

            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />

            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />

            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />

            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />

            <input type="checkbox" id="wd-file-uploads" />
            <label htmlFor="wd-file-uploads">File Uploads</label>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>

          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input id="wd-assign-to" defaultValue="Everyone" />
            <br />
            <br />

            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            <br />
            <br />

            <table>
              <tbody>
                <tr>
                  <td valign="top">
                    <label htmlFor="wd-available-from">Available from</label>
                    <br />
                    <input
                      id="wd-available-from"
                      type="date"
                      defaultValue="2024-05-06"
                    />
                  </td>

                  <td valign="top">
                    <label htmlFor="wd-available-until">Until</label>
                    <br />
                    <input
                      id="wd-available-until"
                      type="date"
                      defaultValue="2024-05-20"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
      <hr />
      <button id="wd-cancel-assignment">Cancel</button>
      <button id="wd-save-assignment">Save</button>
    </div>
  );
}
