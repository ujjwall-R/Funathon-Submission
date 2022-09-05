# ALGOsearch

ALGOsearch is a Search Engine designed specifically for Data Structure and Algorithm questions in platforms like codechef and codeforces.

## Web Application

It uses [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) Algorithm to implement search. The server is live on [https://algosearchujjwal.herokuapp.com/](https://algosearchujjwal.herokuapp.com/).

## Installation [development]
 
### Dependencies

* [Node](https://nodejs.org/en/)
* [Python](https://www.python.org/downloads/)

### Local Building
Clone or unzip the [repository](https://github.com/ujjwall-R/Hosted-Algosearch.git).
```bash
git clone https://github.com/ujjwall-R/Hosted-Algosearch.git
cd Hosted-Algosearch
``` 
Install the dependency modules for both server and client side of the application. The client side is a [ReactJS](https://reactjs.org/) app built using  [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).
```bash
npm install
cd client
npm install
cd ..
```
### Rebuilding the DataSet [optional]
The DataSet is already built in ```./DataSet```. Anyways you can rebuild the DataSet if you wish. Give the problem tags to build the dataset.
#### Mac/Linux:
```bash
cd DataSet
rm -rf IDF.txt TFIDF.txt keywords.txt magnitude.txt problem_titles.txt problem_urls.txt Problems
mkdir Problems
python -u scrapper.py
```
#### Windows:
```bash
cd DataSet
rmdir Problems
del IDF.txt TFIDF.txt keywords.txt magnitude.txt problem_titles.txt problem_urls.txt 
mkdir Problems
python -u scrapper.py
```
After building the DataSet for problem tags of your choice, buid the TF IDF data. Note that you have opted to build your own corpus. This may take some time.
```bash
node calc.js
cd ..
```
### Usage
Now you are ready to go and start the web application. In the root directory, start the server.
```bash
nodemon index.js
```
Start the react app in another terminal.
```bash
cd client
npm start
```
Visit your localHost address where the client side app is running and enjoy searching.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please contact to suggest any change in the corpus of the [live](https://algosearchujjwal.herokuapp.com/) application.
