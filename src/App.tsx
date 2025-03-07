import { Suspense, useState, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { supabase } from "@/lib/supabase";
import routes from "tempo-routes";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import HomePage from "./pages/HomePage";
import CreateQuizPage from "./pages/CreateQuizPage";
import SavedQuizzesPage from "./pages/SavedQuizzesPage";
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./components/ProfilePage";
import AITutorPage from "./pages/AITutorPage";
import ChatPDFPage from "./pages/ChatPDFPage";
import AboutPage from "./pages/AboutPage";

// Components
import Layout from "./components/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        const userData = data.session.user.user_metadata;
        setUserName(userData?.full_name || data.session.user.email || "User");

        // Redirect to dashboard if on landing page
        if (location.pathname === "/") {
          navigate("/create");
        }
      }
    };
    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setIsLoggedIn(true);
          const userData = session.user.user_metadata;
          setUserName(userData?.full_name || session.user.email || "User");

          // Redirect to dashboard on sign in
          navigate("/create");
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          setUserName("Guest User");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserName("Guest User");
    navigate("/");
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ThemeProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Main app routes with layout */}
          <Route
            path="/"
            element={<Layout isLoggedIn={isLoggedIn} userName={userName} />}
          >
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
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
                  <ProfilePage />
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
            <Route
              path="ai-tutor"
              element={
                isLoggedIn ? (
                  <AITutorPage />
                ) : (
                  <div className="container mx-auto py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <p className="mb-4">
                      You need to be logged in to access the AI Tutor.
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
              path="chat-pdf"
              element={
                isLoggedIn ? (
                  <ChatPDFPage />
                ) : (
                  <div className="container mx-auto py-8 px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Login</h1>
                    <p className="mb-4">
                      You need to be logged in to access the Chat with PDF
                      feature.
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
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
