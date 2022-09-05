const fs = require("fs");
const keyword_extractor = require("keyword-extractor");
const replaceSpecialCharacters = require("replace-special-characters");
var stripchar = require("stripchar").StripChar;

const ProblemDirectory = "./Problems/";

function count(str, find) {
  let count = (str.match(find) || []).length;
  return count;
}

let fileNames = fs.readdirSync(ProblemDirectory);
fileNames.map((file, i) => {
  fileNames[i] = `${ProblemDirectory}${file}`;
});

const totalNumberOfDocument = fileNames.length;

let allDocContent = "";
fileNames.forEach((file) => {
  let str = fs.readFileSync(file).toString();
  str = stripchar.RSspecChar(str);
  allDocContent += str.toLowerCase();
});
const allDocKeywords = keyword_extractor
  .extract(allDocContent, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  })
  .sort();
console.log("Hey", allDocKeywords);

allDocKeywords.forEach((keyword) => {
  fs.writeFileSync("keywords.txt", keyword + "\n", { flag: "a+" });
});

let IDFArray = [];

allDocKeywords.forEach((keyword, i) => {
  let t = 0;
  fileNames.forEach((file) => {
    let str = fs.readFileSync(file).toString();
    str = stripchar.RSspecChar(str);
    str = str.toLowerCase();
    if (str.includes(keyword.toLowerCase())) {
      t++;
    }
  });
  const idf = 1 + Math.log10(totalNumberOfDocument / t);
  IDFArray[i] = idf;
  fs.writeFileSync("IDF.txt", idf + "\n", { flag: "a+" });
});

let magnitudeOfDoc = [];

fileNames.forEach((file, i) => {
  let str = fs.readFileSync(file).toString();
  str = stripchar.RSspecChar(str);
  str = str.toLowerCase();
  const noOfKeyWordInDoc = keyword_extractor.extract(str, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  }).length;
  let val = 0;
  allDocKeywords.forEach((keyword, j) => {
    const idf = IDFArray[j];
    const tf = count(str, keyword) / noOfKeyWordInDoc;
    let ans = idf * tf * 1;
    ans = ans + "";
    if (ans != NaN && ans > 0) {
      fs.writeFileSync("TFIDF.txt", i + " " + j + " " + ans + "\n", {
        flag: "a+",
      });
      val += ans * 1 * (ans * 1);
    }
  });
  magnitudeOfDoc[i] = Math.sqrt(val);
  fs.writeFileSync("magnitude.txt", magnitudeOfDoc[i] + "\n", {
    flag: "a+",
  });
});
