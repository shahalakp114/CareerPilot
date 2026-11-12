
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    BriefcaseBusiness,
    ArrowRight,
    Sparkles,
    RefreshCw
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CompareResume() {
    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [resumeId, setResumeId] = useState("");
    const [jobId, setJobId] = useState("");

    const [loading, setLoading] = useState(true);
    const [comparing, setComparing] = useState(false);
    const [error, setError] = useState("");

    // Fetch resumes and jobs
    const fetchData = async () => {
        setLoading(true);
        setError("");

        try {
            const [resumeResponse, jobResponse] = await Promise.all([
                API.get("/resume/"),
                API.get("/jobs/")
            ]);

            setResumes(resumeResponse.data.resumes || []);
            setJobs(jobResponse.data.jobs || []);

        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Unable to load resumes or job descriptions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Compare selected resume and job
    const handleCompare = async () => {
        if (!resumeId || !jobId) {
            setError("Please select both a resume and a job description.");
            return;
        }

        setComparing(true);
        setError("");

        try {
            // Navigate to the matching results page
            navigate(`/matching/${resumeId}/${jobId}`);

        } catch (error) {
            setError("Unable to start resume comparison.");
        } finally {
            setComparing(false);
        }
    };

    return (
        <div className="app-theme min-h-screen bg-slate-50 text-[#eee5d5]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                            Resume Matching
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Compare your resume with a job description and discover your skill gaps.
                        </p>
                    </div>

                    {/* Introduction Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white mb-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <Sparkles size={28} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">
                                    Discover Your Resume Match
                                </h2>

                                <p className="text-blue-100 mt-2 leading-6">
                                    Select a resume and a job description.
                                    CareerPilot will analyze their text similarity
                                    and identify skills that may be missing.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                            <RefreshCw className="animate-spin mx-auto text-blue-600" size={30} />
                            <p className="text-slate-500 mt-4">
                                Loading your data...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Selection Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Resume Selection */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-blue-50 p-3 rounded-xl">
                                            <FileText className="text-blue-600" size={25} />
                                        </div>

                                        <div>
                                            <h2 className="font-bold text-lg text-slate-800">
                                                Select Resume
                                            </h2>
                                            <p className="text-sm text-slate-500">
                                                Choose your uploaded resume
                                            </p>
                                        </div>
                                    </div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Your Resume
                                    </label>

                                    <select
                                        value={resumeId}
                                        onChange={(e) => setResumeId(e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Choose a resume</option>

                                        {resumes.map((resume) => (
                                            <option key={resume.id} value={resume.id}>
                                                {resume.file_name}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="text-xs text-slate-400 mt-3">
                                        {resumes.length} resume(s) available
                                    </p>
                                </div>

                                {/* Job Selection */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-purple-50 p-3 rounded-xl">
                                            <BriefcaseBusiness className="text-purple-600" size={25} />
                                        </div>

                                        <div>
                                            <h2 className="font-bold text-lg text-slate-800">
                                                Select Job
                                            </h2>
                                            <p className="text-sm text-slate-500">
                                                Choose a job description
                                            </p>
                                        </div>
                                    </div>

                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Job Description
                                    </label>

                                    <select
                                        value={jobId}
                                        onChange={(e) => setJobId(e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Choose a job</option>

                                        {jobs.map((job) => (
                                            <option key={job.id} value={job.id}>
                                                {job.job_title} - {job.company_name}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="text-xs text-slate-400 mt-3">
                                        {jobs.length} job(s) available
                                    </p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Compare Button */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={handleCompare}
                                    disabled={comparing || !resumeId || !jobId}
                                    className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition shadow-md"
                                >
                                    <Sparkles size={20} />
                                    {comparing ? "Preparing..." : "Compare Resume"}
                                    <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Empty State */}
                            {(resumes.length === 0 || jobs.length === 0) && (
                                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
                                    <h3 className="font-semibold text-amber-800">
                                        Missing information
                                    </h3>

                                    <p className="text-sm text-amber-700 mt-2">
                                        {resumes.length === 0 &&
                                            "Please upload a resume before comparing."}

                                        {resumes.length === 0 && jobs.length === 0 && " "}

                                        {jobs.length === 0 &&
                                            "Please add a job description before comparing."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                </main>
            </div>
        </div>
    );
}

export default CompareResume;
