export default function ProjectPage() {
  return (
    <div className="p-4">
      <h1>Kambaz Quizzes Project</h1>
      <hr />

      <h3>Team Members</h3>
      <ul>
        <li>Henry Caldwell - CS4550 33211</li>
      </ul>

      <h3>GitHub Repositories</h3>
      <ul>
        <li>
          <a
            href="https://github.com/HenryCaldwell/kambaz-next-js/tree/project"
            target="_blank"
          >
            Frontend Repository (Next.js)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/HenryCaldwell/kambaz-node-server-app/tree/project"
            target="_blank"
          >
            Server Repository (Node.js)
          </a>
        </li>
      </ul>
    </div>
  );
}
