
import { useEffect, useState } from "react";
import { BriefcaseBusiness, Plus, Search, Pencil, Trash2, X } from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function JobDescriptions() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialForm = {
        job_title: "",
        company_name: "",
        location: "",
        job_type: "Full-time",
        description: ""
    };

    const [form, setForm] = useState(initialForm);

    // Fetch saved jobs
    const fetchJobs = async () => {
        try {
            const response = await API.get("/jobs/");
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Open add form
    const handleAdd = () => {
        setForm(initialForm);
        setEditId(null);
        setShowForm(true);
    };

    // Open edit form
    const handleEdit = (job) => {
        setForm({
            job_title: job.job_title || "",
            company_name: job.company_name || "",
            location: job.location || "",
            job_type: job.job_type || "Full-time",
            description: job.description || ""
        });

        setEditId(job.id);
        setShowForm(true);
    };

    // Add or update job
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await API.put(`/jobs/${editId}`, form);
                alert("Job updated successfully!");
            } else {
                await API.post("/jobs/", form);
                alert("Job added successfully!");
            }

            setForm(initialForm);
            setEditId(null);
            setShowForm(false);
            fetchJobs();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to save job details."
            );
        }
    };

    // Delete job
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) {
            return;
        }

        try {
            await API.delete(`/jobs/${id}`);
            alert("Job deleted successfully!");
            fetchJobs();
        } catch (error) {
            alert("Unable to delete job.");
        }
    };

    // Search jobs
    const filteredJobs = jobs.filter((job) =>
        `${job.job_title} ${job.company_name} ${job.location}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="app-theme min-h-screen bg-slate-50 text-[#eee5d5]">
            <Navbar />

            <div className="flex flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                Job Descriptions
                            </h1>
                            <p className="text-slate-500 mt-2">
                                Manage job opportunities and their requirements.
                            </p>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
                        >
                            <Plus size={20} />
                            Add New Job
                        </button>
                    </div>

                    {/* Search */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />

                            <input
                                type="text"
                                placeholder="Search by job title, company or location..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Add / Edit Form */}
                    {showForm && (
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 mb-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-800">
                                    {editId ? "Edit Job" : "Add New Job"}
                                </h2>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-slate-500 hover:text-red-500"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            name="job_title"
                                            value={form.job_title}
                                            onChange={handleChange}
                                            placeholder="Python Developer"
                                            required
                                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={form.company_name}
                                            onChange={handleChange}
                                            placeholder="ABC Technologies"
                                            required
                                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            placeholder="Kozhikode"
                                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Job Type
                                        </label>
                                        <select
                                            name="job_type"
                                            value={form.job_type}
                                            onChange={handleChange}
                                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Internship</option>
                                            <option>Remote</option>
                                            <option>Contract</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Job Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Enter job responsibilities, required skills and qualifications..."
                                            rows="5"
                                            required
                                            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
                                    >
                                        {editId ? "Update Job" : "Save Job"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Job List */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-bold text-slate-800">
                            Saved Jobs
                        </h2>

                        <span className="text-sm text-slate-500">
                            {filteredJobs.length} jobs
                        </span>
                    </div>

                    {loading ? (
                        <p className="text-center py-12 text-slate-500">
                            Loading jobs...
                        </p>
                    ) : filteredJobs.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                            <BriefcaseBusiness
                                size={42}
                                className="mx-auto text-slate-300 mb-4"
                            />

                            <h3 className="text-lg font-semibold text-slate-700">
                                No jobs found
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Add a job description to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between gap-3">
                                        <div className="flex gap-3 min-w-0">
                                            <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center">
                                                <BriefcaseBusiness
                                                    className="text-blue-600"
                                                    size={23}
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-bold text-lg text-slate-800 break-words">
                                                    {job.job_title}
                                                </h3>

                                                <p className="text-slate-500 text-sm mt-1">
                                                    {job.company_name}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="h-fit text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                                            {job.job_type || "Not specified"}
                                        </span>
                                    </div>

                                    <div className="mt-4 text-sm text-slate-500">
                                        <span>{job.location || "Location not specified"}</span>
                                    </div>

                                    <p className="text-slate-600 text-sm mt-4 leading-6 whitespace-pre-line line-clamp-4">
                                        {job.description}
                                    </p>

                                    <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={() => handleEdit(job)}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

export default JobDescriptions;
