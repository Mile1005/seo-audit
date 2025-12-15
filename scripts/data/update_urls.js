import fs from "fs";

const data = fs.readFileSync("urls_live.csv", "utf8");
const lines = data.split("\n");
const newLines = lines.map((line) => {
  if (line.startsWith("url,")) return line;
  const [url, lang] = line.split(",");
  if (!url) return line;
  let path = url.replace("https://www.aiseoturbo.com", "");
  if (lang === "en" && path === "/") {
    path = "/en/";
  } else if (lang !== "en") {
    path = `/${lang}${path}`;
  } else {
    path = `/en${path}`;
  }
  const newUrl = `http://localhost:3001${path}`;
  return `${newUrl},${lang}`;
});
fs.writeFileSync("urls.csv", newLines.join("\n"));
console.log("Updated urls.csv to localhost:3001 with locale prefixes");
