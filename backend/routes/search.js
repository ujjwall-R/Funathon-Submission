const express = require("express");
var path = require("path");
const router = new express.Router();
const fs = require("fs");
var stripchar = require("stripchar").StripChar;
const keyword_extractor = require("keyword-extractor");

function count(str, find) {
  let count = (str.match(find) || []).length;
  return count;
}

const ProblemDirectory = "./DataSet/Problems/";
let fileNames = fs.readdirSync(ProblemDirectory);
fileNames.map((file, i) => {
  fileNames[i] = `./${ProblemDirectory}${file}`;
});
const totalNumberOfDocument = fileNames.length;

const IDFArray = fs.readFileSync("./DataSet/IDF.txt").toString().split("\n");

const TFIDFArrayAsString = fs
  .readFileSync("./DataSet/TFIDF.txt")
  .toString()
  .split("\n");

const TFIDFArray = TFIDFArrayAsString.map((elem) => {
  return elem.split(" ");
});
// console.log(TFIDFArray); //[[nth doc,mth keyword,tfIdf vale],[...],[..],[...]]

const AllKeyWords = fs
  .readFileSync("./DataSet/keywords.txt")
  .toString()
  .split("\n");
// console.log(AllKeyWords);

const magnitudeDocWise = fs
  .readFileSync("./DataSet/magnitude.txt")
  .toString()
  .split("\n");
// console.log(magnitudeDocWise);

//@description:testing
router.get("/hi", async (req, res) => {
  try {
    res.send("Route working.");
  } catch (error) {
    res.status(400).send();
  }
});

//GET:/search/:text
//@description:search a text
//public
router.get("/search/:text", async (req, res) => {
  try {
    let text = req.params.text.toString();
    text = stripchar.RSspecChar(text);
    text = text.toLowerCase();
    // console.log(text);
    const NoOfKeyWordsInDoc = keyword_extractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    }).length;
    // console.log(text);
    let TfOfText = [];
    let TFIDFOfText = [];
    let magOfText;
    let sqSum = 0;
    AllKeyWords.forEach((keyword, i) => {
      // console.log(count(text, keyword));
      TfOfText[i] = count(text, keyword) / NoOfKeyWordsInDoc;
      TFIDFOfText[i] = TfOfText[i] * (1 * IDFArray[i]);
      if (!TFIDFOfText[i]) TFIDFOfText[i] = 0;
    });
    // console.log(TFIDFOfText);
    TFIDFOfText.forEach((tfidf_, i) => {
      if (tfidf_ != Infinity) sqSum += tfidf_ * tfidf_;
      // console.log(tfidf_, sqSum, i);
    });

    magOfText = Math.sqrt(sqSum);
    // console.log(magOfText);

    let cosineDocWise = [];
    let DotProDocumentWise = [];
    fileNames.forEach((f, i) => {
      DotProDocumentWise[i] = [0, i];
      cosineDocWise[i] = [0, i];
    });
    TFIDFArray.forEach(([i, j, val]) => {
      i = i * 1;
      j = j * 1;
      val = val * 1;
      if (val * TFIDFOfText[j])
        DotProDocumentWise[i][0] += val * TFIDFOfText[j];
    });
    // DotProDocumentWise = DotProDocumentWise.sort().reverse();
    // console.log(DotProDocumentWise);
    DotProDocumentWise.forEach((dp, i) => {
      cosineDocWise[i] = [dp[0] / (magOfText * magnitudeDocWise[i]), i];
    });
    cosineDocWise = cosineDocWise.sort().reverse();
    // console.log(cosineDocWise);

    if (cosineDocWise[15][0] > 0) search_result = cosineDocWise.slice(5, 15);
    else if (cosineDocWise[10][0] > 0)
      search_result = cosineDocWise.slice(5, 10);
    else search_result = [];

    // console.log(search_result);

    let questionsFound = [];
    let urls = [];
    let titles = [];
    let contents = [];
    search_result.forEach((element, i) => {
      questionsFound[i] = fileNames[element[1]];
    });
    questionsFound.forEach((element, i) => {
      titles[i] = element.substring(element.lastIndexOf("/") + 1);
      titles[i] = titles[i].slice(0, -4);
      contents[i] =
        fs
          .readFileSync(`./DataSet/Problems/${titles[i]}.txt`)
          .toString()
          .slice(0, 350) + "...";
    });
    titles.forEach((element, i) => {
      urls[i] = `https://www.codechef.com/problems/${element}`;
    });

    res.send({ questionsFound, urls, titles, contents });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
