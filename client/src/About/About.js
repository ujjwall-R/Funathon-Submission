import React from "react";
import Me from "./m2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
// import "./About.css";

const About = () => {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>card</title>
      <link rel="stylesheet" href="./Profile-card.css" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n    font-family: 'Times New Roman', Times, serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: linear-gradient(#03a9f4, #03a9f4 45%, #fff 45%, #fff 100%);\n}\n\n.card {\n  position: relative;\n  width: 300px;\n  height: 400px;\n  background: #fff;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.1);\n  border-top: 1px solid rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(15px);\n  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);\n}\n\n.img-bx {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 10px;\n  overflow: hidden;\n  transform: translateY(30px) scale(0.5);\n  transform-origin: top;\n}\n\n.img-bx img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.content {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n  padding-bottom: 30px;\n}\n\n.content .detail {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  text-align: center;\n}\n\n.content .detail h2 {\n  color: #444;\n  font-size: 1.6em;\n  font-weight: bolder;\n}\n\n.content .detail h2 span {\n  font-size: 0.7em;\n  color: #03a9f4;\n  font-weight: bold;\n}\n\n.sci {\n  position: relative;\n  display: flex;\n  margin-top: 5px;\n}\n\n.sci li {\n  list-style: none;\n  margin: 4px;\n}\n\n.sci li a {\n  width: 45px;\n  height: 45px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  background: transparent;\n  font-size: 1.5em;\n  color: #444;\n  text-decoration: none;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  transition: 0.5s;\n}\n\n.sci li a:hover {\n  background: #03a9f4;\n  color: #fff;\n}\n",
        }}
      />
      <div className="card">
        <div className="img-bx">
          {/* <img src="https://i.postimg.cc/dQ7zWbS5/img-4.jpg" alt="img" /> */}
          <img src={Me} alt="img" />
        </div>
        <div className="content">
          <div className="detail">
            <h2>
              Ujjwal Raj
              <br />
              <span>OpenSource Developer</span>
            </h2>
            <ul className="sci">
              <li>
                <a href="https://github.com/ujjwall-R">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ujjwal-raj-0442461bb/">
                  <FontAwesomeIcon icon={faLinkedin} />{" "}
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ujjwal_iitkgp">
                  <FontAwesomeIcon icon={faTwitter} />{" "}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/_ujjwal___raj/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
