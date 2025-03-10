// 'use client'; // This is necessary for using client-side features like useEffect and useState

// import { useEffect, useState } from 'react';

// // Extend the Window interface to include the google property
// declare global {
//   interface Window {
//     google: any;
//   }
// }

// // Define types for the user info and token payload
// type UserInfo = {
//   username?: string;
//   address?: string;
//   phone?: string;
//   name?: string;
//   email?: string;
// };

// type TokenPayload = {
//   name?: string;
//   email?: string;
// };

// export default function SignIn() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//   useEffect(() => {
//     // Check if the Google Identity Services script is loaded
//     const intervalId = setInterval(() => {
//       if (window.google) {
//         console.log('Google Identity Services script loaded.');
//         clearInterval(intervalId);
//         window.google.accounts.id.initialize({
//           client_id: "206020990733-8uem3ibl5mjq7rdh44m0o95vmv8niolt.apps.googleusercontent.com",
//           callback: handleCredentialResponse,
//         });

//         // Render the Google Sign-In button
//         window.google.accounts.id.renderButton(
//           document.getElementById('google-signin-button'),
//           { theme: "outline", size: "large" }
//         );
//       } else {
//         console.log('Waiting for Google Identity Services script to load...');
//       }
//     }, 100);

//     return () => clearInterval(intervalId);
//   }, []);

//   // Callback function triggered after a successful Google sign-in
//   const handleCredentialResponse = (response: { credential: string }) => {
//     const token = response.credential;
//     setAuthToken(token);
//     setIsAuthenticated(true);

//     // Decode token payload to extract user info
//     const payload: TokenPayload = JSON.parse(atob(token.split('.')[1]));
//     const userName = payload.name || payload.email;

//     // Update UI state
//     setUserInfo({ name: userName });
//   };

//   // Logout button functionality
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setAuthToken(null);
//     setUserInfo(null);
//   };

//   // Dashboard button: calls the Python API and displays returned JSON
//   const handleDashboard = async () => {
//     if (!isAuthenticated) {
//       alert('You must be logged in to access the dashboard.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/dashboard', {
//         method: 'GET',
//         headers: { 'Authorization': authToken as string },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error("User not authenticated. Please log in again.");
//         } else if (response.status === 403) {
//           throw new Error("User authenticated but not registered.");
//         } else {
//           throw new Error(`Error fetching dashboard information. (Status: ${response.status})`);
//         }
//       }

//       const data: UserInfo = await response.json();
//       setUserInfo(data);
//     } catch (error) {
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Welcome to Scenario1 App</h1>

//       {/* Sign-In container (visible when not signed in) */}
//       <div id="google-signin-button" className={isAuthenticated ? 'hidden' : 'block'}></div>

//       {/* These buttons are shown after a successful sign in */}
//       {isAuthenticated && (
//         <div className="mt-4">
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//           >
//             Logout {userInfo?.name}
//           </button>
//           <button
//             onClick={handleDashboard}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Dashboard
//           </button>
//         </div>
//       )}

//       {/* Display the JSON payload in a formatted <pre> block */}
//       {userInfo && (
//         <div className="mt-6 p-4 bg-white rounded shadow">
//           <pre>{JSON.stringify(userInfo, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export default function SignIn() {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session) {
      // Fetch user information from the backend API
      fetchUserInfo();
    }
  }, [session]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/dashboard', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${session?.accessToken ?? ''}` },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user information: ${response.statusText}`);
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Scenario1 App</h1>

      {isClient ? (
        !session ? (
          // Show Google Sign-In button if the user is not authenticated
          <button
            onClick={() => signIn('google')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
        ) : (
          // Show user info and logout button if authenticated
          <div className="mt-4">
            <p className="text-gray-700">Welcome, {session.user?.name}!</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Logout
            </button>
            {userInfo && (
              <div className="mt-6 p-4 bg-white rounded shadow">
                <pre>{JSON.stringify(userInfo, null, 2)}</pre>
              </div>
            )}
          </div>
        )
      ) : (
        // Show loading state while checking session
        <p>Loading...</p>
      )}
    </div>
  );
}