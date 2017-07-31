from bs4 import BeautifulSoup as Soup
import requests

response = requests.get('http://www.nuyorican.org/calendar/')
soup = Soup(response.content, "lxml")
selections = soup.select('td.has-event')

event = selections[0]

date = event.select_one('.date .value-title').get('title')
print('selections:', selections)
