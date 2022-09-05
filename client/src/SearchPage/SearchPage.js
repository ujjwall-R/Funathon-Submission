import React, { useState } from "react";
import { searchText } from "../actions/searchAction";
import "./SearchPage.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [text, settext] = useState("");
  const [searchResult, setsearchResult] = useState({
    questionsFound: [],
    urls: [],
    titles: [],
    contents: [],
  });
  const [loading, setloading] = useState(<div className="load"></div>);

  const textChangeHandler = (event) => {
    settext(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setloading(
      <>
        <br />
        searching...
      </>
    );
    const results = await searchText(text);
    if (results) {
      if (!(results.titles.length == 0)) {
        setsearchResult(results);
        setloading("");
      } else {
        setloading(
          <>
            <br />
            Oops! No result found!
          </>
        );
        setsearchResult({
          questionsFound: [],
          urls: [],
          titles: [],
          contents: [],
        });
      }
    }
    // console.log(results);
  };

  const listItems = searchResult.questionsFound.map((question, i) => (
    <li className="searches" key={i * 12}>
      <h2 className="result-link">
        <a href={searchResult.urls[i]}>{searchResult.titles[i]}</a>
      </h2>
      <p className="green-link">{searchResult.urls[i]}</p>
      <span className="down-arrow" />
      <p className="searchText">{searchResult.contents[i]}</p>
    </li>
  ));

  return (
    <div>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,300italic,400italic,700,700italic,100italic"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,300italic,400italic,600italic|Open+Sans+Condensed:300"
        rel="stylesheet"
        type="text/css"
      />
      {/* Website Title & Description */}
      <title>Acronym Lookup Tool</title>
      <meta name="description" content="The replacement to WorkFaster 3" />
      <link rel="icon" href="#0" type="image/gif" sizes="32x32" />
      {/* Mobile viewport optimized */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      {/* Internet Explorer Compatibility string */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      {/* CSS */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"
      />
      <link rel="stylesheet" type="text/css" href="styles.css" />
      {/* JS */}
      {/*?php include ("counter.php"); ?*/}
      <header>
        <h1>ALGOsearch</h1>
        <h3>Search Engine for DSAlgo Questions</h3>
      </header>
      <div id="searcharea">
        <div className="center-form">
          <div id="checkboxes"></div>
          <form onSubmit={submitHandler}>
            <label htmlFor="search">
              <i className="fa fa-search" aria-hidden="true" />
            </label>
            <input
              id="search"
              name="search"
              type="search"
              list="searchHelper"
              placeholder="Type text or problem to search..."
              onChange={textChangeHandler}
            />
            <datalist id="searchHelper" />
            <button type="submit" className="button" id="searchButton">
              Search
            </button>
            <button type="reset" className="button clear" id="clearButton">
              Clear
            </button>
          </form>
          {loading}
          {listItems}
        </div>
      </div>
      {/* 
<div class="info-alert">
  <p class="info-alert-text">Thank you for the feedback, we have updated the list with over 280 new terms!</p>
</div>
*/}
      <div id="searchUpdate">{/*?php include('loader01.html'); ?*/}</div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="row-item one">
              <p>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  About the Developer
                </Link>
              </p>
            </div>
            <div className="row-item two">
              <div>
                <p>Copyright Ⓒ 2022 Ujjwal R.</p>
              </div>
            </div>
            <div className="row-item three">
              <p>To suggest changes in corpus, please contact.</p>
            </div>
          </div>
        </div>
        {/* <p
          className="footer-heart"
          style={{ textAlign: "center", fontFamily: "open sans, sans-serif" }}
        >
          Made with{" "}
          <g-emoji
            className="g-emoji"
            alias="heart"
            fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
          >
            <img
              className="emoji"
              alt="heart"
              height={20}
              width={20}
              src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
              style={{ verticalAlign: "middle" }}
            />
          </g-emoji>{" "}
          by{" "}
          <a
            href="https://armin.id"
            style={{
              borderBottom: "1px solid #453886",
              color: "#453886",
              paddingBottom: ".25em",
              textDecoration: "none",
            }}
          >
            Arminisme
          </a>
        </p> */}
      </footer>
    </div>
  );
};

export default SearchPage;
