from flask import Flask

app = Flask(__name__)

@app.route('/api/mcqs', methods=['POST'])
def generate_mcqs():
    # ... Handling MCQ generation
    pass

@app.route('/api/true_false', methods=['POST'])
def generate_true_false():
    # ... Handling true/false question generation
    pass
@app.route('/api/match_the_following', methods=['POST'])
def generate_match_the_following():
    # ... Handling match the following question generation
    pass
