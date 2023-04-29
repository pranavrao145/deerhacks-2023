from application import app


@app.route('/')
def home() -> str:
    return 'Hello World'
