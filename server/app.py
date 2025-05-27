from flask import Flask, request, jsonify
from flask_cors import CORS
from product_filter import filter_products, get_all_products  # import both

app = Flask(__name__)
CORS(app)

@app.route('/api/products')
def search():
    query = request.args.get('query', '')
    sort_by = request.args.get('sort_by', '')      # e.g. 'price' or 'rating'
    sort_order = request.args.get('sort_order', 'asc')  # 'asc' or 'desc'

    if query == '':
        results = get_all_products(sort_by, sort_order)
    else:
        results = filter_products(query, sort_by, sort_order)
        
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
