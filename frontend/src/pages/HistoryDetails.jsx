
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    FileText,
    CheckCircle2,
    XCircle,
    Target,
    AlertCircle,
    LoaderCircle,
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function HistoryDetails() {
    const { analysisId } = useParams();
    const navigate = useNavigate();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalysisDetails();
    }, [analysisId]);

    const fetchAnalysisDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get(`/history/${analysisId}`);

            // Support either { analysis: {...} } or direct analysis data
            const data = response.data.analysis || response.data;

            setAnalysis(data);
        } catch (err) {
            console.error("History details error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load analysis details."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getScoreColor = (score) => {
        if (score >= 75) return "text-green-600";
        if (score >= 50) return "text-yellow-600";
        return "text-red-500";
    };

    const getScoreBackground = (score) => {
        if (score >= 75) return "bg-green-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    const resumeSkills = analysis?.resume_skills || [];
    const requiredSkills = analysis?.required_skills || [];
    const missingSkills = analysis?.missing_skills || [];

    const score = Number(analysis?.matching_score || 0);

    if (loading) {
        return (
            <div className="app-theme min-h-screen bg-gray-50 text-[#eee5d5]">
                <Navbar />

                <div className="flex items-center justify-center py-32">
                    <LoaderCircle className="animate-spin text-blue-600" size={35} />
                    <span className="ml-3 text-gray-600">
                        Loading analysis details...
                    </span>
                </div>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className="app-theme min-h-screen bg-gray-50 text-[#eee5d5]">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                    <AlertCircle
                        size={45}
                        className="mx-auto text-red-500 mb-4"
                    />

                    <h2 className="text-2xl font-bold text-gray-800">
                        Analysis Not Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {error || "The requested analysis could not be found."}
                    </p>

                    <button
                        onClick={() => navigate("/history")}
                        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="app-theme min-h-screen bg-gray-50 text-[#eee5d5]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 p-4 md:p-8">

                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <button
                            onClick={() => navigate("/history")}
                            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Analysis Details
                            </h1>

                            <p className="text-gray-500 mt-1">
                                View your previous resume matching results.
                            </p>
                        </div>
                    </div>

                    {/* Job Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-5">
                            Job Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <BriefcaseBusiness
                                        className="text-blue-600"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Job Title
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {analysis.job_title || "Not available"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <Building2
                                        className="text-purple-600"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {analysis.company_name || "Not available"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <FileText
                                        className="text-green-600"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Resume
                                    </p>

                                    <p className="font-semibold text-gray-800 break-all">
                                        {analysis.file_name || "Not available"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <CalendarDays
                                        className="text-orange-600"
                                        size={22}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Analysis Date
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {formatDate(analysis.created_at)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Matching Score */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Target className="text-blue-600" size={22} />

                            <h2 className="text-lg font-semibold text-gray-800">
                                Resume Matching Score
                            </h2>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">

                            <div className="w-36 h-36 rounded-full border-[12px] border-gray-100 flex items-center justify-center relative">
                                <div className="text-center">
                                    <p className={`text-3xl font-bold ${getScoreColor(score)}`}>
                                        {score.toFixed(1)}%
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Similarity
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">
                                        Matching Score
                                    </span>

                                    <span className="font-semibold text-gray-800">
                                        {score.toFixed(1)}%
                                    </span>
                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full ${getScoreBackground(score)}`}
                                        style={{
                                            width: `${Math.min(Math.max(score, 0), 100)}%`,
                                        }}
                                    />
                                </div>

                                <p className="text-sm text-gray-500 mt-4">
                                    This score represents textual similarity
                                    between your resume and the job description.
                                    It is not a prediction of your chances of
                                    getting hired.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Skills Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Skills Found
                            </p>

                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {resumeSkills.length}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Required Skills
                            </p>

                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {requiredSkills.length}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Missing Skills
                            </p>

                            <p className="text-3xl font-bold text-red-500 mt-2">
                                {missingSkills.length}
                            </p>
                        </div>

                    </div>

                    {/* Skills Found */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="text-green-600" size={22} />

                            <h2 className="text-lg font-semibold text-gray-800">
                                Skills Found in Resume
                            </h2>
                        </div>

                        {resumeSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {resumeSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No skills were identified.
                            </p>
                        )}
                    </div>

                    {/* Required Skills */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="text-blue-600" size={22} />

                            <h2 className="text-lg font-semibold text-gray-800">
                                Required Job Skills
                            </h2>
                        </div>

                        {requiredSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {requiredSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No required skills were identified.
                            </p>
                        )}
                    </div>

                    {/* Missing Skills */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <XCircle className="text-red-500" size={22} />

                            <h2 className="text-lg font-semibold text-gray-800">
                                Missing Skills
                            </h2>
                        </div>

                        {missingSkills.length > 0 ? (
                            <>
                                <p className="text-sm text-gray-500 mb-4">
                                    These skills were identified as missing
                                    from your resume compared with the job
                                    requirements.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {missingSkills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-green-600 text-sm">
                                No missing skills were identified.
                            </p>
                        )}
                    </div>

                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/history")}
                        className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Analysis History
                    </button>

                </main>
            </div>
        </div>
    );
}

export default HistoryDetails;
