from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/callback', methods=['POST'])
def callback():
    try:
        # Obtener el JSON del body
        data = request.get_json()

        # Imprimir en consola (para debugging)
        print("=======================================================================")
        print("Datos recibidos en /callback:")
        print(data)

        # Responder con éxito
        return jsonify({
            "success": True,
            "message": "Datos recibidos correctamente"
        }), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({
            "success": False,
            "message": "Error al procesar la solicitud"
        }), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)