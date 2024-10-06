from flask import Flask, request, render_template
import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
# Function to find albums by name
import concurrent.futures

# Set environment variables for Spotipy
ID : str = os.getenv('SPOTIPY_CLIENT_ID')
SECRET : str = os.getenv('SPOTIPY_CLIENT_SECRET')

# Spotipy authorization
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=ID,
    client_secret=SECRET
))

class AlbumInformation:
    def __init__ (self, title, artist, released, track_list, track_count, album_id, image, url):
        self.title = title
        self.artist = artist
        self.released = released
        self.track_list = track_list
        self.album_id = album_id
        self.track_count = track_count
        self.image = image
        self.url = url

# Function to fetch tracks for a specific album
def fetch_tracks(album_id):
    track_list = []
    tracks = sp.album_tracks(album_id)
    for track in tracks['items']:
        track_list.append(track['name'])
    return track_list

# Function to find albums by name
def findAlbums(user_input):
    albumName = str(user_input)
    results = sp.search(q="album:" + albumName, type="album", limit=25)
    albums = results['albums']['items']

    if len(albums) == 0:
        return None
    
    resultList = []

    album_data = []
    album_ids = []

    for album in albums:
        title = album['name']
        artist = album['artists'][0]['name']
        released = album['release_date']
        image = album['images'][0]['url']
        url = album['external_urls']['spotify']
        album_id = album['uri']

        album_data.append((title, artist, released, image, url))
        album_ids.append(album_id)

    # Fetch tracks concurrently using ThreadPoolExecutor
    with concurrent.futures.ThreadPoolExecutor() as executor:
        track_lists = list(executor.map(fetch_tracks, album_ids))

    # Combine album metadata with tracks
    for i, (title, artist, released, image, url) in enumerate(album_data):
        track_list = track_lists[i]
        track_count = len(track_list)
        album_id = album_ids[i]

        info = AlbumInformation(title, artist, released, track_list, track_count, album_id, image, url)
        resultList.append(info)

    return resultList

# Flask app definition
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    user_input = None
    album_results = None
    if request.method == 'POST':
        user_input = str(request.form['user_input'])
        album_results = findAlbums(user_input)

    return render_template('index.html', user_input=user_input, album_results=album_results)

@app.route('/generate', methods=['POST'])
def generate_poster():
    if request.method == 'POST':
        image = str(request.form['album_image'])
        title = str(request.form['album_title']).upper()
        year = str(request.form['album_released'])[:4]
        artist = str(request.form['album_artist'])
        tracks = request.form.getlist('track_list')

        orientation = str(request.form['orientation'])
        theme =  str(request.form['bg-color'])

    return render_template('poster.html', orientation=orientation, theme=theme, image=image, title=title, year=year, artist=artist, tracks=tracks)

if __name__ == '__main__':
    app.run(debug=True)