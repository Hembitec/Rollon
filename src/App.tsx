import { Suspense, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
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
            <Route path="create" element={<CreateQuizPage />} />
            <Route path="saved" element={<SavedQuizzesPage />} />
            <Route path="test" element={<TestPage />} />
            <Route
              path="profile"
              element={
                <div className="container mx-auto py-8 px-4">
                  <h1 className="text-2xl font-bold">Profile Page</h1>
                  <p className="mt-4">User profile content will go here.</p>
                </div>
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
