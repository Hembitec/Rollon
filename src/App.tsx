import { Suspense, useState, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import routes from "tempo-routes";

// Pages
import HomePage from "./pages/HomePage";
import CreateQuizPage from "./pages/CreateQuizPage";
import SavedQuizzesPage from "./pages/SavedQuizzesPage";
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Components
import Layout from "./components/Layout";

function App() {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const navigate = useNavigate();
  const location = useLocation();

  // For demo purposes, let's add a login/logout function
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("John Doe");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest User");
    navigate("/");
  };

  // Simulate login from login page
  useEffect(() => {
    if (location.pathname === "/login") {
      const loginButton = document.querySelector('button[type="submit"]');
      if (loginButton) {
        const originalOnClick = loginButton.onclick;
        loginButton.onclick = (e) => {
          if (originalOnClick) originalOnClick.call(loginButton, e);
          setTimeout(() => {
            handleLogin();
            navigate("/create");
          }, 1000);
        };
      }
    }
  }, [location.pathname, navigate]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Main app routes with layout */}
          <Route
            path="/"
            element={<Layout isLoggedIn={isLoggedIn} userName={userName} />}
          >
            <Route index element={<HomePage />} />
            <Route
              path="create"
              element={
                isLoggedIn ? (
                  <CreateQuizPage />
                ) : (
                  <div className="container mx-auto py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <p className="mb-4">
                      You need to be logged in to create quizzes.
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Go to Login
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="saved"
              element={
                isLoggedIn ? (
                  <SavedQuizzesPage />
                ) : (
                  <div className="container mx-auto py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <p className="mb-4">
                      You need to be logged in to view saved quizzes.
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Go to Login
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="test"
              element={
                isLoggedIn ? (
                  <TestPage />
                ) : (
                  <div className="container mx-auto py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <p className="mb-4">
                      You need to be logged in to take tests.
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Go to Login
                    </button>
                  </div>
                )
              }
            />
            <Route
              path="profile"
              element={
                isLoggedIn ? (
                  <div className="container mx-auto py-8 px-4">
                    <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                    <p className="mb-4">User profile content will go here.</p>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="container mx-auto py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <p className="mb-4">
                      You need to be logged in to view your profile.
                    </p>
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Go to Login
                    </button>
                  </div>
                )
              }
            />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
