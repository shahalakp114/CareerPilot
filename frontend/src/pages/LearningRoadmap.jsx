
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    BookOpen,
    Clock,
    CheckCircle,
    Circle,
    GraduationCap,
    ArrowLeft,
    Target,
    Sparkles
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function LearningRoadmap() {
    const { resumeId, jobId } = useParams();
    const navigate = useNavigate();

    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [completedSkills, setCompletedSkills] = useState([]);

    // Fetch learning roadmap
    const fetchRoadmap = async () => {
        try {
            const response = await API.get(
                `/roadmap/${resumeId}/${jobId}`
            );

            setRoadmap(response.data.roadmap || []);

        } catch (error) {
            console.error("Roadmap error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load your learning roadmap."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoadmap();
    }, [resumeId, jobId]);

    // Mark skill as completed
    const toggleCompleted = (skill) => {
        setCompletedSkills((previous) =>
            previous.includes(skill)
                ? previous.filter((item) => item !== skill)
                : [...previous, skill]
        );
    };

    const completedCount = completedSkills.length;

    const progress = roadmap.length > 0
        ? Math.round((completedCount / roadmap.length) * 100)
        : 0;

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
                                Learning Roadmap
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Build the skills needed for your target job.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate(`/matching/${resumeId}/${jobId}`)
                            }
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            <ArrowLeft size={18} />
                            Back to Results
                        </button>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto"></div>

                            <p className="text-slate-500 mt-4">
                                Preparing your learning roadmap...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
                            <p className="text-red-600">{error}</p>

                            <button
                                onClick={() => navigate("/compare")}
                                className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl"
                            >
                                Back to Comparison
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Introduction */}
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <GraduationCap size={30} />

                                    <h2 className="text-xl font-bold">
                                        Your Personalized Learning Plan
                                    </h2>
                                </div>

                                <p className="text-blue-100 leading-7">
                                    Follow this roadmap to improve the skills
                                    identified in your resume analysis.
                                    Complete each skill as you learn.
                                </p>
                            </div>

                            {/* Progress */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">
                                            Learning Progress
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Track the skills you have completed.
                                        </p>
                                    </div>

                                    <span className="text-2xl font-bold text-blue-600">
                                        {progress}%
                                    </span>
                                </div>

                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <p className="text-sm text-slate-500 mt-3">
                                    {completedCount} of {roadmap.length} skills completed
                                </p>
                            </div>

                            {/* Roadmap */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Your Learning Path
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Complete these skills one by one.
                                </p>
                            </div>

                            {roadmap.length === 0 ? (
                                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                                    <CheckCircle
                                        size={45}
                                        className="mx-auto text-green-500 mb-4"
                                    />

                                    <h3 className="text-lg font-bold text-slate-800">
                                        No Missing Skills Found
                                    </h3>

                                    <p className="text-slate-500 mt-2">
                                        Your identified skills already cover the
                                        requirements in this analysis.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {roadmap.map((item, index) => {
                                        const isCompleted =
                                            completedSkills.includes(item.skill);

                                        return (
                                            <div
                                                key={`${item.skill}-${index}`}
                                                className={`bg-white border rounded-2xl p-5 sm:p-6 transition ${
                                                    isCompleted
                                                        ? "border-green-200"
                                                        : "border-slate-200"
                                                }`}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                                                    <div className="flex gap-4">
                                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                                                            <span className="font-bold text-blue-600">
                                                                {index + 1}
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <h3 className="text-lg font-bold text-slate-800">
                                                                {item.skill}
                                                            </h3>

                                                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                                                                <Clock size={16} />

                                                                <span>
                                                                    {item.duration || "Duration not specified"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            toggleCompleted(item.skill)
                                                        }
                                                        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                                                            isCompleted
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                                        }`}
                                                    >
                                                        {isCompleted ? (
                                                            <CheckCircle size={17} />
                                                        ) : (
                                                            <Circle size={17} />
                                                        )}

                                                        {isCompleted
                                                            ? "Completed"
                                                            : "Mark Completed"}
                                                    </button>
                                                </div>

                                                {/* Topics */}
                                                <div className="mt-6 pl-0 sm:pl-15">
                                                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                                        <BookOpen size={17} />
                                                        Learning Topics
                                                    </h4>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {(item.topics || []).map(
                                                            (topic, topicIndex) => (
                                                                <div
                                                                    key={topicIndex}
                                                                    className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl text-sm text-slate-600"
                                                                >
                                                                    <CheckCircle
                                                                        size={16}
                                                                        className="text-blue-500 mt-0.5 shrink-0"
                                                                    />

                                                                    {topic}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Bottom Card */}
                            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="text-blue-600" size={24} />

                                    <h3 className="font-bold text-slate-800">
                                        Keep Learning!
                                    </h3>
                                </div>

                                <p className="text-sm text-slate-600 mt-2 leading-6">
                                    Consistent learning and practical projects
                                    can help strengthen your technical skills.
                                    Try building small projects while studying.
                                </p>
                            </div>

                        </>
                    )}

                </main>
            </div>
        </div>
    );
}

export default LearningRoadmap;
