from flask import Flask, request, render_template

import os
from dotenv import load_dotenv

ID : str = os.getenv('SPOTIPY_CLIENT_ID')
SECRET : str = os.getenv('SPOTIPY_CLIENT_SECRET')
URI : str = os.getenv('SPOTIPY_REDIRECT_URI')

import spotipy
from spotipy.oauth2 import SpotifyOAuth

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=ID,
                                               client_secret=SECRET,
                                               redirect_uri=URI,
                                               scope="user-library-read"))

taylor_uri = 'spotify:artist:06HL4z0CvFAxyc27GXpf02'

results = sp.artist_albums(taylor_uri, album_type='album')
albums = results['items']
while results['next']:
    results = sp.next(results)
    albums.extend(results['items'])

for album in albums:
    print(album['name'])

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    user_input = None
    if request.method == 'POST':
        user_input = str(request.form['user_input'])
        print(f'User Input: {user_input}')  # This logs to the console
    return render_template('index.html', user_input=user_input)

if __name__ == '__main__':
    app.run(debug=True)
