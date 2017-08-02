import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

eventsFile = None

class EventsHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/api/events':
            return self._getEvents()
        elif self.path == '/robot.txt':
            return self._getRobot()
        else:
            return self._getRobot()

    def _getEvents(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        f = open(eventsFile, 'r')
        parcel = f.read()
        f.close()

        self.wfile.write(bytes(parcel, "utf8"))
        return

    def _getRobot(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()

        f = open('robot.txt', 'r')
        parcel = f.read()
        f.close()

        self.wfile.write(bytes(parcel, "utf8"))
        return

def run():
    server_address = ('', 9081)
    httpd = HTTPServer(server_address, EventsHandler)
    print('Started server at...', server_address)
    httpd.serve_forever()

if __name__ == '__main__':
    eventsFile = sys.argv[1]
    run()
