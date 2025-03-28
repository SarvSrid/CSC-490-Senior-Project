import openai
import logging
# from config import Config
from flask_cors import CORS
from flask import Flask, request, jsonify
from datetime import datetime
import os

# Initialize Flask app
app = Flask(__name__)

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize extensions
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """
    Handle chatbot requests.
    """
    data = request.get_json()
    user_input = data.get('message')
    conversation_history = data.get('conversation_history', [])

    # Add the user's input to the conversation history with a timestamp
    user_timestamp = datetime.now().strftime('%I:%M %p')
    conversation_history.append({"role": "user", "content": user_input, "timestamp": user_timestamp})

    try:
        # Generate chatbot response
        assistant_reply, updated_history = generate_chatbot_response(conversation_history)

        # Filter out system messages before sending the conversation history to the frontend
        filtered_history = [msg for msg in updated_history if msg['role'] != 'system']

        return jsonify({
            'reply': assistant_reply,
            'conversation_history': filtered_history
        }), 200
    except Exception as e:
        logging.error(f"Error in chatbot endpoint: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

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
            "Always respond in a friendly and encouraging tone. The reply must not cross more than a 75 words."
        )
    }

    # Check if the system prompt is already in the conversation history
    if not any(msg['role'] == 'system' for msg in conversation_history):
        conversation_history.insert(0, system_prompt)

    try:
        # Generate a response using OpenAI
        response = openai.ChatCompletion.create(
            model="o3-mini",  # Use o3-mini for reasoning model
            messages=conversation_history
        )

        # Extract the assistant's reply
        assistant_reply = response.choices[0].message['content']

        # Add the assistant's reply to the conversation history with a timestamp
        assistant_timestamp = datetime.now().strftime('%I:%M %p')
        conversation_history.append({"role": "assistant", "content": assistant_reply, "timestamp": assistant_timestamp})

        return assistant_reply, conversation_history
    except Exception as e:
        logging.error(f"Error generating chatbot response: {e}")
        raise

if __name__ == '__main__':
    # Run the Flask app on port 5004
    app.run(debug=True, port=5004)