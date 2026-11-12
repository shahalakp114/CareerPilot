
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

// Authentication pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Main pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResumeUpload from "./pages/ResumeUpload";
import JobDescriptions from "./pages/JobDescriptions";
import CompareResume from "./pages/CompareResume";
import MatchingResults from "./pages/MatchingResults";
import LearningRoadmap from "./pages/LearningRoadmap";
import Recommendations from "./pages/Recommendations";
import History from "./pages/History";
import HistoryDetails from "./pages/HistoryDetails";

// Protected route
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated
        ? children
        : <Navigate to="/login" replace />;
};

// Public route
const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated
        ? <Navigate to="/dashboard" replace />
        : children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing page */}
                <Route
                    path="/"
                    element={<Landing />}
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Resume */}
                <Route
                    path="/resume"
                    element={
                        <ProtectedRoute>
                            <ResumeUpload />
                        </ProtectedRoute>
                    }
                />

                {/* Job descriptions */}
                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute>
                            <JobDescriptions />
                        </ProtectedRoute>
                    }
                />

                {/* Resume comparison */}
                <Route
                    path="/compare"
                    element={
                        <ProtectedRoute>
                            <CompareResume />
                        </ProtectedRoute>
                    }
                />

                {/* Matching results */}
                <Route
                    path="/matching/:resumeId/:jobId"
                    element={
                        <ProtectedRoute>
                            <MatchingResults />
                        </ProtectedRoute>
                    }
                />

                {/* Learning roadmap */}
                <Route
                    path="/roadmap/:resumeId/:jobId"
                    element={
                        <ProtectedRoute>
                            <LearningRoadmap />
                        </ProtectedRoute>
                    }
                />

                {/* Job recommendations */}
                <Route
                    path="/recommendations/:resumeId"
                    element={
                        <ProtectedRoute>
                            <Recommendations />
                        </ProtectedRoute>
                    }
                />

                {/* Analysis history */}
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                {/* Analysis details */}
                <Route
                    path="/history/:analysisId"
                    element={
                        <ProtectedRoute>
                            <HistoryDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Invalid routes */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
