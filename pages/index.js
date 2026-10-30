import fs from "fs";
import path from "path";

export default function Home() {
  return null;
}

export function getServerSideProps({ res }) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public", "craft-lab.html"),
    "utf8"
  );

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(html);
  res.end();

  return { props: {} };
}
