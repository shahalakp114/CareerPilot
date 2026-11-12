
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    History as HistoryIcon,
    Search,
    FileText,
    BriefcaseBusiness,
    Eye,
    CalendarDays,
    TrendingUp,
    RefreshCw
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function History() {
    const navigate = useNavigate();

    const [analyses, setAnalyses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch analysis history
    const fetchHistory = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await API.get("/history/");

            setAnalyses(response.data.analyses || []);

        } catch (error) {
            console.error("History error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load analysis history."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // Search analysis history
    const filteredAnalyses = analyses.filter((item) => {
        const searchText = search.toLowerCase();

        return (
            (item.job_title || "").toLowerCase().includes(searchText) ||
            (item.company_name || "").toLowerCase().includes(searchText) ||
            (item.file_name || "").toLowerCase().includes(searchText)
        );
    });

    // Format date
    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    // Score color
    const getScoreColor = (score) => {
        if (score >= 75) return "text-green-600 bg-green-50";
        if (score >= 50) return "text-amber-600 bg-amber-50";

        return "text-red-600 bg-red-50";
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
                                Analysis History
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Review your previous resume matching analyses.
                            </p>
                        </div>

                        <button
                            onClick={fetchHistory}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-medium"
                        >
                            <RefreshCw
                                size={18}
                                className={loading ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>
                    </div>

                    {/* Summary Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                        <div className="bg-white border border-slate-200 rounded-2xl p-5">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-500">
                                    Total Analyses
                                </p>

                                <HistoryIcon className="text-blue-600" size={23} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                {analyses.length}
                            </h2>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-500">
                                    Average Match Score
                                </p>

                                <TrendingUp className="text-green-600" size={23} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800 mt-3">
                                {analyses.length > 0
                                    ? (
                                        analyses.reduce(
                                            (total, item) =>
                                                total + Number(item.matching_score || 0),
                                            0
                                        ) / analyses.length
                                    ).toFixed(1) + "%"
                                    : "0%"}
                            </h2>
                        </div>
                    </div>

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
                                placeholder="Search by job title, company or resume..."
                                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
                            {error}
                        </div>
                    )}

                    {/* History Table */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                        <div className="p-5 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800">
                                Previous Analyses
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                {filteredAnalyses.length} result(s) found
                            </p>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center">
                                <RefreshCw
                                    size={30}
                                    className="animate-spin mx-auto text-blue-600"
                                />

                                <p className="text-slate-500 mt-4">
                                    Loading history...
                                </p>
                            </div>
                        ) : filteredAnalyses.length === 0 ? (
                            <div className="p-12 text-center">
                                <HistoryIcon
                                    size={45}
                                    className="mx-auto text-slate-300 mb-4"
                                />

                                <h3 className="text-lg font-semibold text-slate-700">
                                    No Analysis Found
                                </h3>

                                <p className="text-slate-500 mt-2">
                                    Your previous resume analyses will appear here.
                                </p>

                                <button
                                    onClick={() => navigate("/compare")}
                                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
                                >
                                    Start New Analysis
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-sm">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">
                                                    Job Details
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Resume
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Match Score
                                                </th>

                                                <th className="px-6 py-4 font-medium">
                                                    Date
                                                </th>

                                                <th className="px-6 py-4 font-medium text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredAnalyses.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-t border-slate-100 hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-blue-50 p-2.5 rounded-lg">
                                                                <BriefcaseBusiness
                                                                    size={20}
                                                                    className="text-blue-600"
                                                                />
                                                            </div>

                                                            <div>
                                                                <p className="font-semibold text-slate-800">
                                                                    {item.job_title || "Job"}
                                                                </p>

                                                                <p className="text-sm text-slate-500">
                                                                    {item.company_name || "Company unavailable"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <FileText
                                                                size={17}
                                                                className="text-slate-400"
                                                            />

                                                            {item.file_name || "Resume"}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getScoreColor(Number(item.matching_score || 0))}`}>
                                                            {Number(item.matching_score || 0).toFixed(1)}%
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                                            <CalendarDays size={16} />

                                                            {formatDate(item.created_at)}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-5 text-center">
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/history/${item.id}`)
                                                            }
                                                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                        >
                                                            <Eye size={17} />
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile and Tablet Cards */}
                                <div className="lg:hidden p-4 space-y-4">
                                    {filteredAnalyses.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-slate-200 rounded-xl p-4"
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-slate-800">
                                                        {item.job_title || "Job"}
                                                    </h3>

                                                    <p className="text-sm text-slate-500 mt-1">
                                                        {item.company_name || "Company unavailable"}
                                                    </p>
                                                </div>

                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getScoreColor(Number(item.matching_score || 0))}`}>
                                                    {Number(item.matching_score || 0).toFixed(1)}%
                                                </span>
                                            </div>

                                            <div className="mt-4 space-y-2 text-sm text-slate-500">
                                                <p className="flex items-center gap-2">
                                                    <FileText size={16} />
                                                    {item.file_name || "Resume"}
                                                </p>

                                                <p className="flex items-center gap-2">
                                                    <CalendarDays size={16} />
                                                    {formatDate(item.created_at)}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    navigate(`/history/${item.id}`)
                                                }
                                                className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg font-medium text-sm"
                                            >
                                                <Eye size={17} />
                                                View Details
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <p className="text-xs text-slate-400 text-center mt-5">
                        Matching scores represent text similarity, not hiring probability.
                    </p>

                </main>
            </div>
        </div>
    );
}

export default History;
