import psycopg2
import os

# Get the database URL from the environment variable or use the default value
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:sharksnow@127.0.0.1:5432/akin_learning')

def test_db_connection():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        
        # Execute a simple query to test the connection
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        
        # Print the result
        print("Database connection successful:", result)
        
        # Close the cursor and connection
        cursor.close()
        conn.close()
    except Exception as e:
        print("Error connecting to the database:", e)

if __name__ == "__main__":
    test_db_connection()