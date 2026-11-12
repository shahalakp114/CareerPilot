
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    BriefcaseBusiness,
    Target,
    CheckCircle,
    AlertCircle,
    Sparkles,
    ArrowLeft,
    TrendingUp,
    Search
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Recommendations() {
    const { resumeId } = useParams();
    const navigate = useNavigate();

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Fetch job recommendations
    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            setError("");

            if (!resumeId) {
                throw new Error("Resume ID is missing.");
            }

            const response = await API.get(
                `/recommendations/${resumeId}`
            );

            const data = response.data.recommendations;

            setRecommendations(
                Array.isArray(data) ? data : []
            );

        } catch (err) {
            console.error("Recommendation error:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load job recommendations."
            );

            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, [resumeId]);

    // Filter recommendations
    const filteredRecommendations = recommendations.filter((item) =>
        (item.job_role || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Calculate best match
    const bestMatch = recommendations.length > 0
        ? Math.max(
            ...recommendations.map(
                (item) => Number(item.match_percentage) || 0
            )
        )
        : 0;

    // Score color
    const getScoreColor = (score) => {
        if (score >= 75) return "text-green-600";
        if (score >= 50) return "text-amber-600";
        return "text-blue-600";
    };

    // Score background
    const getScoreBackground = (score) => {
        if (score >= 75) return "bg-green-500";
        if (score >= 50) return "bg-amber-500";
        return "bg-blue-500";
    };

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
                                Job Recommendations
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Discover job roles that match your current skills.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/compare")}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <ArrowLeft size={18} />
                            Back to Comparison
                        </button>

                    </div>

                    {/* Introduction */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white mb-8">

                        <div className="flex items-center gap-3 mb-3">
                            <Sparkles size={28} />

                            <h2 className="text-xl font-bold">
                                Explore Your Career Opportunities
                            </h2>
                        </div>

                        <p className="text-blue-100 leading-7">
                            CareerPilot analyzes your resume skills and compares
                            them with predefined job-role skill requirements
                            to suggest potential career paths.
                        </p>

                    </div>

                    {/* Loading */}
                    {loading ? (

                        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto"></div>

                            <p className="text-slate-500 mt-4">
                                Finding suitable job roles...
                            </p>

                        </div>

                    ) : error ? (

                        /* Error */
                        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">

                            <AlertCircle
                                size={40}
                                className="text-red-500 mx-auto mb-4"
                            />

                            <p className="text-red-600">
                                {error}
                            </p>

                            <button
                                onClick={fetchRecommendations}
                                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                            >
                                Try Again
                            </button>

                        </div>

                    ) : (

                        <>

                            {/* Search */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">

                                <div className="relative">

                                    <Search
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search job roles..."
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>

                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                                {/* Total Roles */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                                    <div className="flex items-center justify-between">

                                        <p className="text-sm text-slate-500">
                                            Recommended Roles
                                        </p>

                                        <BriefcaseBusiness
                                            className="text-blue-600"
                                            size={22}
                                        />

                                    </div>

                                    <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                        {recommendations.length}
                                    </h2>

                                </div>

                                {/* Best Match */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-5">

                                    <div className="flex items-center justify-between">

                                        <p className="text-sm text-slate-500">
                                            Best Skill Match
                                        </p>

                                        <Target
                                            className="text-green-600"
                                            size={22}
                                        />

                                    </div>

                                    <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                        {bestMatch.toFixed(1)}%
                                    </h2>

                                </div>

                            </div>

                            {/* Suggested Career Paths */}
                            <div className="mb-5">

                                <h2 className="text-xl font-bold text-slate-800">
                                    Suggested Career Paths
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Ranked according to skill overlap.
                                </p>

                            </div>

                            {/* No Recommendations */}
                            {filteredRecommendations.length === 0 ? (

                                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">

                                    <BriefcaseBusiness
                                        size={42}
                                        className="mx-auto text-slate-300 mb-4"
                                    />

                                    <h3 className="text-lg font-semibold text-slate-700">
                                        No recommendations found
                                    </h3>

                                    <p className="text-slate-500 mt-2">
                                        Try another search or check your resume.
                                    </p>

                                </div>

                            ) : (

                                /* Recommendation Cards */
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                                    {filteredRecommendations.map((item, index) => {

                                        const score =
                                            Number(item.match_percentage) || 0;

                                        const matchingSkills =
                                            Array.isArray(item.matching_skills)
                                                ? item.matching_skills
                                                : [];

                                        const missingSkills =
                                            Array.isArray(item.missing_skills)
                                                ? item.missing_skills
                                                : [];

                                        return (

                                            <div
                                                key={item.job_role || index}
                                                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition"
                                            >

                                                {/* Role Header */}
                                                <div className="flex items-start justify-between gap-3">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">

                                                            <BriefcaseBusiness
                                                                className="text-blue-600"
                                                                size={23}
                                                            />

                                                        </div>

                                                        <div>

                                                            <h3 className="font-bold text-lg text-slate-800">
                                                                {item.job_role || "Unknown Role"}
                                                            </h3>

                                                            <p className="text-xs text-slate-400 mt-1">
                                                                Recommendation #{index + 1}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    <span className={`font-bold text-lg ${getScoreColor(score)}`}>
                                                        {score.toFixed(1)}%
                                                    </span>

                                                </div>

                                                {/* Match Progress */}
                                                <div className="mt-6">

                                                    <div className="flex justify-between text-sm mb-2">

                                                        <span className="text-slate-500">
                                                            Skill overlap
                                                        </span>

                                                        <span className="font-medium text-slate-700">
                                                            {score.toFixed(1)}%
                                                        </span>

                                                    </div>

                                                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">

                                                        <div
                                                            className={`h-full rounded-full ${getScoreBackground(score)}`}
                                                            style={{
                                                                width: `${Math.min(100, Math.max(0, score))}%`
                                                            }}
                                                        />

                                                    </div>

                                                </div>

                                                {/* Matching Skills */}
                                                <div className="mt-6">

                                                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">

                                                        <CheckCircle
                                                            size={17}
                                                            className="text-green-600"
                                                        />

                                                        Matching Skills

                                                    </h4>

                                                    <div className="flex flex-wrap gap-2">

                                                        {matchingSkills.length > 0 ? (

                                                            matchingSkills.map((skill, i) => (

                                                                <span
                                                                    key={i}
                                                                    className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs"
                                                                >
                                                                    {skill}
                                                                </span>

                                                            ))

                                                        ) : (

                                                            <p className="text-xs text-slate-400">
                                                                No matching skills identified.
                                                            </p>

                                                        )}

                                                    </div>

                                                </div>

                                                {/* Missing Skills */}
                                                <div className="mt-5">

                                                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">

                                                        <AlertCircle
                                                            size={17}
                                                            className="text-red-500"
                                                        />

                                                        Skills to Improve

                                                    </h4>

                                                    <div className="flex flex-wrap gap-2">

                                                        {missingSkills.length > 0 ? (

                                                            missingSkills.map((skill, i) => (

                                                                <span
                                                                    key={i}
                                                                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs"
                                                                >
                                                                    {skill}
                                                                </span>

                                                            ))

                                                        ) : (

                                                            <p className="text-xs text-green-600">
                                                                No additional skills identified.
                                                            </p>

                                                        )}

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    })}

                                </div>

                            )}

                            {/* Disclaimer */}
                            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">

                                <div className="flex items-center gap-2">

                                    <TrendingUp
                                        className="text-blue-600"
                                        size={20}
                                    />

                                    <h3 className="font-semibold text-slate-800">
                                        About These Recommendations
                                    </h3>

                                </div>

                                <p className="text-sm text-slate-600 mt-2 leading-6">
                                    Matching percentages represent skill overlap
                                    with predefined role requirements. They are
                                    not hiring probabilities or guarantees of
                                    employment.
                                </p>

                            </div>

                        </>

                    )}

                </main>

            </div>

        </div>
    );
}

export default Recommendations;
