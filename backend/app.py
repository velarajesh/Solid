from flask import Flask, render_template, request, jsonify
from tinydb import TinyDB, Query
import uuid

app = Flask(__name__)

db = TinyDB('./db.json');

tables = {"req": db.table('requests'), "serv": db.table('services'), "users": db.table('users')}
CardQ = Query()
UsersQ = Query()


@app.route('/index.html')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/layout-static.html')
def layout_static():
    return render_template('layout-static.html')

@app.route('/charts.html')
def charts():
    return render_template('charts.html')

@app.route('/submit_card', methods=['POST'])
def update_cards():
    data = request.get_json()
    store_key = ""
    data['uid'] = str(uuid.uuid1())
    data['taken'] = [False]
    store_key = "active"

    tables[data['card_type']].insert(data)
    cur_user = tables['users'].search(UsersQ.name == data['name'])
    if not cur_user:
        return "user not found."
    cur_user[0][store_key].append(data['uid'])
    if data['card_type'] == 'serv':
        cur_user[0]['solid_score'] *= 1.03

    tables['users'].update({store_key: cur_user[0][store_key], 'solid_score': cur_user[0]['solid_score']}, UsersQ.name == data['name'])
    return data['uid']

    # return jsonify(active_cards)
    # return '''<h1>User: {}</h1>
    #                   <img src="{}">'''.format(data['user_name'], data['user_img'])


# type - active/accepted


@app.route('/get_cards', methods=["GET"])
def get_cards():
    category = request.args.get('cat') # food, edu, etc
    type = request.args.get('type') # serv or req

    avail = tables[type].search((CardQ.taken.any([False])) & (CardQ.data.cat == category))
    return jsonify(avail)



@app.route('/get_my_cards', methods=["POST"])
def get_my_cards():
    data = request.get_json()
    active_cards = []

    cur_user = tables['users'].search(UsersQ.name == data['name'])
    if not cur_user:
        return "user not found"

    for uid in cur_user[0][data['type']]:
        active_cards += tables['serv'].search((CardQ.uid == uid)
                                              & (CardQ.taken.any([data['taken']])))
        active_cards += tables['req'].search((CardQ.uid == uid)
                                             & (CardQ.taken.any([data['taken']])))
    return jsonify(active_cards)

@app.route('/take_card', methods=["POST"])
def take_card():
    data = request.get_json()
    cur_user = tables['users'].search(UsersQ.name == data['name'])
    if not cur_user:
        return "user not found"
    tables['serv'].update({"taken": [True, data['name']]}, CardQ.uid == data['uid'])
    tables['req'].update({"taken": [True, data['name']]}, CardQ.uid == data['uid'])


    if not data['uid'] in cur_user[0]["accepted"]:
        cur_user[0]["accepted"].append(data['uid'])
        cur_user[0]["solid_score"] *= 1.017



    tables['users'].update({"accepted": cur_user[0]["accepted"], "solid_score": cur_user[0]["solid_score"]},
                           UsersQ.name == data['name'])

    out = tables['serv'].search((CardQ.uid == data['uid'])) + tables['req'].search((CardQ.uid == data['uid']))
    return jsonify(out)

@app.route('/get_user', methods=["POST"])
def get_user():
    data = request.get_json()
    cur_user = tables['users'].search(UsersQ.name == data['name'])
    if not cur_user:
        return "user not found"
    return jsonify({"name": cur_user[0]["name"], "solid_score": cur_user[0]['solid_score']});

if __name__ == '__main__':
    app.run()
