from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    user_input = None
    if request.method == 'POST':
        user_input = request.form['user_input']
        print(f'User Input: {user_input}')  # This logs to the console
    return render_template('index.html', user_input=user_input)

if __name__ == '__main__':
    app.run(debug=True)
