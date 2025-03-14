import openai
from config import Config
from flask_cors import CORS
from flask import Flask, request, jsonify

# Initialize Flask app
app = Flask(__name__)

# Set OpenAI API key
openai.api_key = Config.OPENAI_API_KEY

# Initialize extensions
CORS(app)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """
    Handle chatbot requests.
    """
    data = request.get_json()
    user_input = data.get('message')
    conversation_history = data.get('conversation_history', [])

    # Add the user's input to the conversation history
    conversation_history.append({"role": "user", "content": user_input})

    # Generate chatbot response
    assistant_reply, updated_history = generate_chatbot_response(conversation_history)

    # Filter out system messages before sending the conversation history to the frontend
    filtered_history = [msg for msg in updated_history if msg['role'] != 'system']

    return jsonify({
        'reply': assistant_reply,
        'conversation_history': filtered_history
    }), 200

def generate_chatbot_response(conversation_history):
    """
    Generate a response from the chatbot using OpenAI.
    """
    # Ensure the system prompt is always included at the beginning of the conversation history
    system_prompt = {
        "role": "system",
        "content": (
            "You are a programming tutor that helps users learn by asking follow-up questions instead of providing "
            "direct answers. This is in the form of Socratic learning. Your goal is to guide the user to think critically and arrive at the solution themselves. "
            "Always respond in a friendly and encouraging tone."
        )
    }

    # Check if the system prompt is already in the conversation history
    if not any(msg['role'] == 'system' for msg in conversation_history):
        conversation_history.insert(0, system_prompt)

    # Generate a response using OpenAI
    response = openai.ChatCompletion.create(
        model="o3-mini",  # Using o3-mini model
        messages=conversation_history
    )

    # Extract the assistant's reply
    assistant_reply = response.choices[0].message['content']

    # Add the assistant's reply to the conversation history
    conversation_history.append({"role": "assistant", "content": assistant_reply})

    return assistant_reply, conversation_history

if __name__ == '__main__':
    # Run the Flask app on port 5004
    app.run(debug=True, port=5004)