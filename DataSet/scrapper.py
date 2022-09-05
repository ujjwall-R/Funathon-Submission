import time
import os
from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(ChromeDriverManager().install())

problemTag = input("Enter problem tag: ")
driver.get(f'https://www.codechef.com/tags/problems/{problemTag}')

time.sleep(5)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
all_ques_div = soup.findAll("div", {"class": "problem-tagbox-inner"})

all_ques = []

for ques in all_ques_div:
    all_ques.append(ques.findAll("div")[0].find("a"))

urls = []
titles = []

if len(all_ques) > 0:
    # os.mkdir(f'{problemTag}')
    for ques in all_ques:
        urls.append("https://www.codechef.com"+ques['href'])
        titles.append(ques.text)
    print("Storing problems urls....")
    with open(f'problem_urls.txt', "a") as f:
        f.write('\n'.join(urls))
        f.write('\n')
        print("Problems urls successfully saved!")
    time.sleep(0.4)
    print("Storing problems titles....")
    with open(f'problem_titles.txt', "a") as f:
        f.write('\n'.join(titles))
        f.write('\n')
        print("Problems titles successfully saved!")
    time.sleep(0.4)
    print(f'Done! Check the Problems folder to see the data sheet')
    time.sleep(0.5)
    print("Initialising to store each problem in /Problem directory...")
    # os.mkdir(f'Problems')
    print("Started storing problems....")
    for title in titles:
        currQCode = title.split(' ')[-1].strip()
        print(f'Current problem: {currQCode}')
        url_ = f'https://www.codechef.com/problems/{currQCode}'
        driver.get(url_)
        time.sleep(5)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        try:
            problem_statement = soup.find(
                'div', {'class': 'problem-statement'}).text
        except:
            continue
        print("")
        with open(f'Problems/{currQCode}.txt', "w+") as f:
            f.write(problem_statement)
            print(f'{currQCode} saved successfully!')
        # print(str(problem_statement))
    print("All problems saved successfully!")
else:
    print("No such tags found!")
