import fs from "fs";

const data = fs.readFileSync("urls_live.csv", "utf8");
const lines = data.split("\n");
const baseLines = lines.filter((line) => line.includes(",en") || line.startsWith("url,"));
const newLines = [];
baseLines.forEach((line) => {
  if (line.startsWith("url,")) {
    newLines.push(line);
    return;
  }
  const [url, lang] = line.split(",");
  if (!url) return;
  const path = url.replace("https://www.aiseoturbo.com", "");
  ["en", "de", "fr", "it", "es", "id"].forEach((l) => {
    let newPath;
    if (l === "en") {
      newPath = path === "/" ? "/en/" : `/en${path}`;
    } else {
      newPath = path === "/" ? `/${l}/` : `/${l}${path}`;
    }
    newLines.push(`http://localhost:3000${newPath},${l}`);
  });
});
fs.writeFileSync("urls.csv", newLines.join("\n"));
console.log("Updated urls.csv with correct locale prefixes");
