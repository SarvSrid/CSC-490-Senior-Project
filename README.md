# CSC490 Website Template

## Backend

### Progress API
I created a progress API which will later be changed to `topicAPI` to include both progress and subject information. This will help in displaying topics effectively.

### Google Authentication
I encountered issues configuring Google authentication to display as a login option. Although I am close to resolving it, I need assistance integrating the script into `page.tsx` or `_documents.js` in the pages directory to work properly.

### Frontend Updates
I updated the frontend pages to reference users from the database and should call to show the progress of the user in the user/dashboard now. You will need to configure the `test_db_connection.py` and `config.py` to connect to the database properly. I put some comments in there to help you with that. The localhost will have to br replaced by your localhost IP if it does not work initially with the wording "localhost". Example fo this would be: I needed to use "127.0.0.1:5432" instead of "localhost:5432" in order to connect to the database. 

### Files Created
- **API routes**: `aichat.py`, `auth.py`, `progress.py`, `questions.py`, `topics.py`
- **Models**: `models.py` (pulling information from the database)
- **Configuration**: `config.py` (to set up the connection to the database)
- **Database Testing**: `test_db_connection.py` (testing connection with the database for issues)
- **API Testing**: `app_test.py` (to test API route before making the official route)
- **User Table**: Added another table called "user" in order to get users using Google authentication
- **CSS**: Added more CSS to the `global.css`
- **Pages**: Changed the pages a bit to contain a few buttons and made a pages directory to hopefully get the Google authentication working, but failed in the end
- **Frontend Example**: The `frontend_ex` folder is a reference of how the Google authentication is supposed to work. It works using regular HTML, but when I convert it to `page.tsx` it fails to work.
- **Requirements**: Made a `requirements.txt` page to see the recent pip installations I made for the backend.