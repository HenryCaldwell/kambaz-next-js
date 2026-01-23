import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input
        defaultValue="johndoe"
        placeholder="username"
        className="wd-username"
      ></input>
      <br />
      <input
        defaultValue="password123"
        placeholder="password"
        type="password"
        className="wd-password"
      ></input>
      <br />
      <input
        defaultValue="password123"
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
      ></input>
      <br />
      <Link href="profile">Sign up</Link>
      <br />
      <Link href="signin">Sign in</Link>
    </div>
  );
}
