export default function FindIndex() {
  let numberArray1 = [1, 2, 4, 5, 6];
  let stringArray1 = ["string1", "string3"];
  const four = numberArray1.findIndex((a) => a === 4);
  const string3 = stringArray1.findIndex((a) => a === "string3");

  return (
    <div id="wd-find-index-function">
      <h4>Find Function</h4>
      fourIndex = {four} <br />
      string3Index = {string3} <hr />
    </div>
  );
}
