
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Target,
    CheckCircle,
    AlertCircle,
    BookOpen,
    BriefcaseBusiness,
    ArrowLeft,
    Sparkles,
    FileText,
    TrendingUp
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MatchingResults() {
    const { resumeId, jobId } = useParams();
    const navigate = useNavigate();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const requestedPairRef = useRef(null);

    // Fetch matching results
    const fetchResults = async () => {
        try {
            const response = await API.post(
                `/matching/compare/${resumeId}/${jobId}`
            );

            setResult(response.data);

        } catch (error) {
            console.error("Matching error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to generate matching results."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const requestKey = `${resumeId}:${jobId}`;

        // React.StrictMode replays effects in development. This endpoint saves
        // a history record, so only request once for each selected pair.
        if (requestedPairRef.current === requestKey) {
            return;
        }

        requestedPairRef.current = requestKey;
        fetchResults();
    }, [resumeId, jobId]);

    // Score color
    const getScoreColor = (score) => {
        if (score >= 75) return "text-green-600";
        if (score >= 50) return "text-amber-600";
        return "text-red-600";
    };

    const getScoreMessage = (score) => {
        if (score >= 75) return "Strong text similarity";
        if (score >= 50) return "Moderate text similarity";
        return "Low text similarity";
    };

    if (loading) {
        return (
            <div className="app-theme min-h-screen bg-slate-50 text-[#eee5d5]">
                <Navbar />

                <div className="flex">
                    <Sidebar />

                    <main className="flex-1 p-8 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>

                        <p className="text-slate-500 mt-4">
                            Analyzing your resume...
                        </p>
                    </main>
                </div>
            </div>
        );
    }

    if (error || !result) {
        return (
            <div className="app-theme min-h-screen bg-slate-50 text-[#eee5d5]">
                <Navbar />

                <div className="flex flex-col md:flex-row">
                    <Sidebar />

                    <main className="flex-1 p-6 flex items-center justify-center">
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg w-full">
                            <AlertCircle
                                size={45}
                                className="mx-auto text-red-500 mb-4"
                            />

                            <h2 className="text-xl font-bold text-slate-800">
                                Analysis Failed
                            </h2>

                            <p className="text-slate-500 mt-3">
                                {error || "No matching results found."}
                            </p>

                            <button
                                onClick={() => navigate("/compare")}
                                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                            >
                                Back to Comparison
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const score = Number(result.matching_score || 0);
    const resumeSkills = result.resume_skills || [];
    const requiredSkills = result.required_skills || [];
    const missingSkills = result.missing_skills || [];

    return (
        <div className="app-theme min-h-screen bg-slate-50 text-[#eee5d5]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                Matching Results
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Your resume analysis is ready.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/compare")}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <ArrowLeft size={18} />
                            New Comparison
                        </button>
                    </div>

                    {/* Matching Score */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-50 p-3 rounded-xl">
                                        <Target className="text-blue-600" size={27} />
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-800">
                                        Resume Match Score
                                    </h2>
                                </div>

                                <p className="text-slate-500 leading-7">
                                    This score represents the textual similarity
                                    between your resume and the selected job description.
                                </p>

                                <p className={`text-sm font-semibold mt-4 ${getScoreColor(score)}`}>
                                    {getScoreMessage(score)}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div
                                    className="w-44 h-44 rounded-full flex items-center justify-center"
                                    style={{
                                        background: `conic-gradient(#2563eb ${Math.min(100, Math.max(0, score))}%, #e2e8f0 0)`
                                    }}
                                >
                                    <div className="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center">
                                        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
                                            {score.toFixed(1)}%
                                        </span>

                                        <span className="text-xs text-slate-500 mt-1">
                                            Similarity
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skill Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

                        <div className="bg-white border border-slate-200 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-slate-500 text-sm">
                                    Resume Skills
                                </p>

                                <FileText className="text-blue-600" size={22} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                {resumeSkills.length}
                            </h2>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-slate-500 text-sm">
                                    Required Skills
                                </p>

                                <BriefcaseBusiness className="text-purple-600" size={22} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                {requiredSkills.length}
                            </h2>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-slate-500 text-sm">
                                    Missing Skills
                                </p>

                                <AlertCircle className="text-red-500" size={22} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                {missingSkills.length}
                            </h2>
                        </div>
                    </div>

                    {/* Skill Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                        {/* Resume Skills */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <CheckCircle className="text-green-600" size={23} />

                                <h2 className="text-lg font-bold text-slate-800">
                                    Skills Found in Resume
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {resumeSkills.length > 0 ? (
                                    resumeSkills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-green-50 text-green-700 border border-green-100 px-3 py-2 rounded-lg text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm">
                                        No skills detected.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Required Skills */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <BriefcaseBusiness className="text-blue-600" size={23} />

                                <h2 className="text-lg font-bold text-slate-800">
                                    Required Job Skills
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {requiredSkills.length > 0 ? (
                                    requiredSkills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-2 rounded-lg text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm">
                                        No required skills detected.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-5">
                            <AlertCircle className="text-red-500" size={23} />

                            <h2 className="text-lg font-bold text-slate-800">
                                Skills You Need to Improve
                            </h2>
                        </div>

                        {missingSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {missingSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle size={20} />
                                <p>
                                    No missing skills detected from the identified skill list.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Next Actions */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white">
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUp size={25} />

                            <h2 className="text-xl font-bold">
                                Improve Your Career Readiness
                            </h2>
                        </div>

                        <p className="text-blue-100 mb-6">
                            Explore your missing skills and discover job roles
                            that match your current skill set.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() =>
                                    navigate(`/roadmap/${resumeId}/${jobId}`)
                                }
                                className="flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-xl font-semibold"
                            >
                                <BookOpen size={19} />
                                Learning Roadmap
                            </button>

                            <button
                                onClick={() =>
                                    navigate(`/recommendations/${resumeId}`)
                                }
                                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-xl font-semibold"
                            >
                                <Sparkles size={19} />
                                Job Recommendations
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-5 text-center">
                        CareerPilot provides informational skill analysis.
                        The similarity score does not predict hiring outcomes.
                    </p>

                </main>
            </div>
        </div>
    );
}

export default MatchingResults;
