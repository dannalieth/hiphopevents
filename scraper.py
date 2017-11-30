from datetime import datetime, timedelta
from urllib.parse import urlparse

from bs4 import BeautifulSoup as Soup
import requests
import json


class Scraper:
    def __init__(self):
        self.lastScrapeTime = None

    def run(self):
        while True:
            if self.lastScrapeTime is None or datetime.now() > self.lastScrapeTime + timedelta(days=1):
                Scraper.scrape()
                self.lastScrapeTime = datetime.now()

    @staticmethod
    def scrape():
        html = Scraper._rawHtml()
        eventsJson = Scraper._daysJsonFromHtml(html)
        Scraper._writeJsonToFile(eventsJson)

    @staticmethod
    def _rawHtml():
        response = requests.get('http://www.nuyorican.org/calendar/')
        return Soup(response.content, "lxml")

    @staticmethod
    def _daysJsonFromHtml(soup: Soup):
        return [Scraper._dayJsonFromDayDom(day) for day in soup.select('td.has-event') if len(day.select('.one-event')) > 0]

    @staticmethod
    def _dayJsonFromDayDom(day: Soup):
        return {
            "date": day.select_one('.date .value-title').get('title'),
            "events": [Scraper._eventJsonFromEventDom(event) for event in day.select('.one-event')],
        }

    @staticmethod
    def _eventJsonFromEventDom(event: Soup):
        imageUrl = urlparse(event.select_one('a > img').get('src'))
        return {
            "eventLink": "http://www.nuyorican.org{0}".format(event.select_one('a').get('href')),
            "image": imageUrl.geturl().replace(imageUrl.query, ''),
            "title": event.select_one('.headliners a').get_text(),
            "startTime": event.select_one('.start-time').get_text(),
            "ticketLink": event.select_one('.ticket-link a').get('href') if event.select_one('.ticket-link a') is not None else '',
        }

    @staticmethod
    def _writeJsonToFile(eventsJson):
        with open('nuyorican.json', 'w') as f:
            f.write(json.dumps(eventsJson, indent=2))


if __name__ == '__main__':
    Scraper().run()
