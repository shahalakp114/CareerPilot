
import { useEffect, useState } from "react";

import {
    Upload,
    FileText,
    Trash2,
    ScanSearch,
    CheckCircle,
    FileUp
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ResumeUpload() {
    const [resumes, setResumes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [extractingId, setExtractingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await API.get("/resume/");

            setResumes(response.data.resumes || []);
        } catch (error) {
            console.error(error);
            setError("Unable to load resumes.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        setMessage("");
        setError("");

        if (!file) return;

        if (file.type !== "application/pdf") {
            setSelectedFile(null);
            setError("Only PDF files are allowed.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setSelectedFile(null);
            setError("File size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a PDF resume.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", selectedFile);

        try {
            setUploading(true);
            setMessage("");
            setError("");

            await API.post("/resume/upload", formData);

            setMessage("Resume uploaded successfully!");
            setSelectedFile(null);

            await fetchResumes();
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Resume upload failed."
            );
        } finally {
            setUploading(false);
        }
    };

    const handleExtract = async (id) => {
        try {
            setExtractingId(id);
            setMessage("");
            setError("");

            const response = await API.post(`/resume/${id}/extract`);

            setMessage(
                response.data.message ||
                "Resume information extracted successfully!"
            );

            await fetchResumes();
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to extract resume information."
            );
        } finally {
            setExtractingId(null);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) return;

        try {
            setMessage("");
            setError("");

            await API.delete(`/resume/${id}`);

            setMessage("Resume deleted successfully!");

            await fetchResumes();
        } catch (error) {
            console.error(error);
            setError("Unable to delete resume.");
        }
    };

    return (
        <div className="app-theme min-h-screen bg-gray-50 text-[#eee5d5]">

            <Navbar />

            <div className="flex flex-col md:flex-row">

                <Sidebar />

                <main className="min-w-0 flex-1 p-4 md:p-8">

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            My Resumes
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Upload and manage your resumes to discover career opportunities.
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                                <FileUp size={25} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Upload Your Resume
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Select your resume in PDF format.
                                </p>
                            </div>
                        </div>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-10 text-center transition hover:bg-blue-100">

                            <Upload size={40} className="mb-4 text-blue-600" />

                            <p className="font-semibold text-gray-700">
                                Click to select your PDF resume
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Maximum file size: 5 MB
                            </p>

                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                        </label>

                        {selectedFile && (
                            <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-4">

                                <FileText className="text-blue-600" />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium text-gray-700">
                                        {selectedFile.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>

                                <CheckCircle className="text-green-600" />

                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                            <Upload size={19} />

                            {uploading ? "Uploading..." : "Upload Resume"}
                        </button>

                    </div>

                    {/* Messages */}
                    {message && (
                        <p className="mb-5 rounded-lg bg-green-50 p-4 text-green-700">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Resume List */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">
                                Uploaded Resumes
                            </h2>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                {resumes.length} Resumes
                            </span>
                        </div>

                        {loading ? (
                            <p className="py-8 text-center text-gray-500">
                                Loading resumes...
                            </p>
                        ) : resumes.length === 0 ? (
                            <div className="py-12 text-center">
                                <FileText
                                    size={45}
                                    className="mx-auto mb-4 text-gray-300"
                                />

                                <p className="font-medium text-gray-600">
                                    No resumes uploaded yet.
                                </p>

                                <p className="mt-2 text-sm text-gray-400">
                                    Upload your first resume to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-5 md:grid-cols-2">

                                {resumes.map((resume) => (
                                    <div
                                        key={resume.id}
                                        className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md"
                                    >

                                        <div className="mb-5 flex items-start justify-between">

                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                                                    <FileText size={25} />
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="truncate font-semibold text-gray-800">
                                                        {resume.file_name}
                                                    </h3>

                                                    <p className="text-xs text-gray-500">
                                                        Uploaded Resume
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(resume.id)}
                                                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                                title="Delete resume"
                                            >
                                                <Trash2 size={19} />
                                            </button>

                                        </div>

                                        <button
                                            onClick={() => handleExtract(resume.id)}
                                            disabled={extractingId === resume.id}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-3 font-medium text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
                                        >
                                            <ScanSearch size={18} />

                                            {extractingId === resume.id
                                                ? "Extracting..."
                                                : "Extract Resume Skills"}
                                        </button>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default ResumeUpload;
