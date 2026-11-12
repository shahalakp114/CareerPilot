
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FileText,
    Briefcase,
    ChartNoAxesCombined,
    Target,
    TrendingUp,
    ArrowUpRight,
    Sparkles,
    Upload,
    Search,
    GitCompareArrows,
    GraduationCap,
    CalendarDays,
    Activity
} from "lucide-react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        total_resumes: 0,
        total_jobs: 0,
        total_analyses: 0,
        average_score: 0,
        recent_analyses: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await API.get("/dashboard/");
            setDashboard(response.data);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Unable to load dashboard information.");
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            title: "Total Resumes",
            value: dashboard.total_resumes,
            subtitle: "Uploaded documents",
            icon: FileText
        },
        {
            title: "Job Descriptions",
            value: dashboard.total_jobs,
            subtitle: "Saved opportunities",
            icon: Briefcase
        },
        {
            title: "Total Analyses",
            value: dashboard.total_analyses,
            subtitle: "Resume comparisons",
            icon: ChartNoAxesCombined
        },
        {
            title: "Average Score",
            value: `${Number(dashboard.average_score || 0).toFixed(2)}%`,
            subtitle: "Matching performance",
            icon: Target
        }
    ];

    const recentAnalyses = dashboard.recent_analyses || [];

    const chartData = {
        labels: recentAnalyses.map(
            (item) => item.job_title || "Untitled Job"
        ),
        datasets: [
            {
                label: "Matching Score",
                data: recentAnalyses.map(
                    (item) => Number(item.matching_score || 0)
                ),
                backgroundColor: "rgba(211, 174, 104, 0.8)",
                borderColor: "#d3ae68",
                borderWidth: 1,
                borderRadius: 8,
                barThickness: 32
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            tooltip: {
                backgroundColor: "#201c16",
                titleColor: "#f0d49a",
                bodyColor: "#eee5d5",
                borderColor: "#806438",
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: (context) => `Score: ${context.parsed.y}%`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: "#a99c85"
                },
                border: {
                    color: "#403626"
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: "rgba(255,255,255,0.06)"
                },
                ticks: {
                    color: "#a99c85",
                    callback: (value) => `${value}%`
                },
                border: {
                    display: false
                }
            }
        }
    };

    const quickActions = [
        {
            title: "Upload Resume",
            description: "Add your latest resume",
            icon: Upload,
            path: "/resume"
        },
        {
            title: "Explore Jobs",
            description: "Manage job descriptions",
            icon: Search,
            path: "/jobs"
        },
        {
            title: "Compare Resume",
            description: "Check your job compatibility",
            icon: GitCompareArrows,
            path: "/compare"
        },
        {
          title: "Analysis History",
          description: "Review your previous results",
          icon: GraduationCap,
         path: "/history"
}    
];

    return (
        <div className="min-h-screen bg-[#0c0b09] text-[#eee5d5]">

            <Navbar />

            <div className="flex flex-col md:flex-row">

                <Sidebar />

                <main className="min-w-0 flex-1 p-4 md:p-7 lg:p-9">

                    {/* Hero Section */}
                    <section
                        className="relative mb-8 min-h-[300px] overflow-hidden rounded-3xl border border-[#66502e] bg-cover bg-center"
style={{
    backgroundImage: "url('/careerpilot-background.png')"
}}                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#100e0a]/95 via-[#100e0a]/80 to-[#100e0a]/35" />

                        <div className="relative z-10 flex min-h-[300px] flex-col justify-center p-7 md:p-10 lg:p-12">
                            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#c9a65d]/40 bg-[#241d12]/70 px-4 py-2 text-xs font-medium tracking-wide text-[#e8cb8b]">
                                <Sparkles size={14} />
                                YOUR AI CAREER INTELLIGENCE
                            </div>

                            <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-[#fff5df] md:text-5xl">
                                Plan your future.
                                <span className="block text-[#e4c27e]">
                                    Build your career.
                                </span>
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-[#d0c5b0] md:text-base">
                                Analyze your resume, discover suitable opportunities
                                and build the skills needed for your next career move.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <button
                                    onClick={() => navigate("/resume")}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e5c47e] to-[#b78b43] px-5 py-3 text-sm font-bold text-[#17130c] transition hover:brightness-110"
                                >
                                    Upload Resume
                                    <ArrowUpRight size={17} />
                                </button>

                                <button
                                    onClick={() => navigate("/compare")}
                                    className="rounded-xl border border-[#d1b477]/60 bg-[#201b13]/70 px-5 py-3 text-sm font-semibold text-[#f0d49a] transition hover:bg-[#493820]/70"
                                >
                                    Start Matching
                                </button>
                            </div>
                        </div>
                    </section>

                    {loading ? (
                        <div className="rounded-2xl border border-[#403626] bg-[#15130f] p-10 text-center text-[#c6b99f]">
                            Loading dashboard...
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-red-900 bg-[#241614] p-5 text-red-300">
                            {error}
                            <button
                                onClick={fetchDashboard}
                                className="ml-3 underline"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Statistics */}
                            <section className="mb-9">
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#b69a65]">
                                            Overview
                                        </p>
                                        <h2 className="mt-1 text-xl font-semibold text-[#f2e8d5]">
                                            Your Career Dashboard
                                        </h2>
                                    </div>
                                    <Activity className="text-[#c5a263]" size={23} />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    {stats.map((stat) => {
                                        const Icon = stat.icon;

                                        return (
                                            <div
                                                key={stat.title}
                                                className="group rounded-2xl border border-[#403626] bg-gradient-to-br from-[#1d1a14] to-[#12110e] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b28d4f]/70 hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)]"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#806438]/40 bg-[#c49a50]/10 text-[#e4c27e]">
                                                        <Icon size={21} />
                                                    </div>
                                                    <ArrowUpRight
                                                        size={18}
                                                        className="text-[#786747] transition group-hover:text-[#e4c27e]"
                                                    />
                                                </div>

                                                <p className="mt-5 text-sm text-[#a99c85]">
                                                    {stat.title}
                                                </p>

                                                <h3 className="mt-2 text-2xl font-bold text-[#f2dfb7]">
                                                    {stat.value}
                                                </h3>

                                                <p className="mt-2 text-xs text-[#777064]">
                                                    {stat.subtitle}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Quick Actions */}
                            <section className="mb-9">
                                <div className="mb-5">
                                    <p className="text-xs font-semibold uppercase tracking-[2px] text-[#b69a65]">
                                        Get Started
                                    </p>
                                    <h2 className="mt-1 text-xl font-semibold text-[#f2e8d5]">
                                        Quick Actions
                                    </h2>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    {quickActions.map((action) => {
                                        const Icon = action.icon;

                                        return (
                                            <button
                                                key={action.title}
                                                onClick={() => navigate(action.path)}
                                                className="group flex items-center gap-4 rounded-2xl border border-[#403626] bg-[#171510] p-4 text-left transition hover:border-[#b28d4f]/70 hover:bg-[#211c14]"
                                            >
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c49a50]/10 text-[#e4c27e] transition group-hover:bg-[#c49a50]/20">
                                                    <Icon size={22} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-sm font-semibold text-[#e9ddc5]">
                                                        {action.title}
                                                    </h3>
                                                    <p className="mt-1 text-xs leading-5 text-[#918674]">
                                                        {action.description}
                                                    </p>
                                                </div>

                                                <ArrowUpRight
                                                    size={17}
                                                    className="shrink-0 text-[#806438] transition group-hover:text-[#e4c27e]"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Matching Performance Chart */}
                            <section className="mb-9 rounded-2xl border border-[#403626] bg-[#15130f] p-5 md:p-7">
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#b69a65]">
                                            Performance Analytics
                                        </p>
                                        <h2 className="mt-1 text-xl font-semibold text-[#f2e8d5]">
                                            Matching Performance
                                        </h2>
                                        <p className="mt-1 text-xs text-[#918674]">
                                            Your recent resume matching scores
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-full border border-[#806438]/40 bg-[#241e14] px-3 py-2 text-xs text-[#dfc487]">
                                        <TrendingUp size={15} />
                                        Resume Analytics
                                    </div>
                                </div>

                                {recentAnalyses.length > 0 ? (
                                    <div className="h-72">
                                        <Bar
                                            data={chartData}
                                            options={chartOptions}
                                        />
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <ChartNoAxesCombined
                                            size={38}
                                            className="mx-auto text-[#806438]"
                                        />
                                        <p className="mt-4 text-sm text-[#c8baa0]">
                                            No analysis data available yet.
                                        </p>
                                        <p className="mt-2 text-xs text-[#807766]">
                                            Compare a resume with a job description to see your scores.
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* Recent Analyses */}
                            <section className="overflow-hidden rounded-2xl border border-[#403626] bg-[#15130f]">
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#403626] p-5 md:p-7">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#b69a65]">
                                            Your Activity
                                        </p>
                                        <h2 className="mt-1 text-xl font-semibold text-[#f2e8d5]">
                                            Recent Analyses
                                        </h2>
                                    </div>

                                    <button
                                        onClick={() => navigate("/history")}
                                        className="flex items-center gap-2 text-xs font-semibold text-[#d9bc7e] transition hover:text-[#f3dda9]"
                                    >
                                        View All
                                        <ArrowUpRight size={15} />
                                    </button>
                                </div>

                                {recentAnalyses.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[650px] text-left text-sm">
                                            <thead className="bg-[#201c16] text-xs uppercase tracking-wider text-[#a99c85]">
                                                <tr>
                                                    <th className="px-6 py-4">Job Title</th>
                                                    <th className="px-6 py-4">Company</th>
                                                    <th className="px-6 py-4">Matching Score</th>
                                                    <th className="px-6 py-4">Date</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {recentAnalyses.map((item) => (
                                                    <tr
                                                        key={item.id}
                                                        className="border-b border-[#30291d] transition last:border-0 hover:bg-[#211c14]"
                                                    >
                                                        <td className="px-6 py-5 font-medium text-[#e9ddc5]">
                                                            {item.job_title || "N/A"}
                                                        </td>

                                                        <td className="px-6 py-5 text-[#a99c85]">
                                                            {item.company_name || "N/A"}
                                                        </td>

                                                        <td className="px-6 py-5">
                                                            <span className="inline-flex items-center gap-2 rounded-full border border-[#806438]/40 bg-[#c49a50]/10 px-3 py-1.5 text-xs font-semibold text-[#e4c27e]">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-[#d5b36e]" />
                                                                {Number(item.matching_score || 0).toFixed(2)}%
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-5 text-[#918674]">
                                                            <span className="flex items-center gap-2">
                                                                <CalendarDays size={14} />
                                                                {item.created_at
                                                                    ? new Date(item.created_at).toLocaleDateString()
                                                                    : "N/A"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <FileText
                                            size={35}
                                            className="mx-auto text-[#806438]"
                                        />
                                        <p className="mt-3 text-sm text-[#c8baa0]">
                                            No recent analyses found.
                                        </p>
                                        <button
                                            onClick={() => navigate("/compare")}
                                            className="mt-4 rounded-lg bg-gradient-to-r from-[#e5c47e] to-[#b78b43] px-4 py-2 text-xs font-bold text-[#17130c] transition hover:brightness-110"
                                        >
                                            Start Your First Analysis
                                        </button>
                                    </div>
                                )}
                            </section>
                        </>
                    )}

                    <footer className="mt-8 pb-4 text-center text-[10px] tracking-widest text-[#655d50]">
                        CAREERPILOT · PLAN. IMPROVE. GROW.
                    </footer>

                </main>
            </div>
        </div>
    );
}

export default Dashboard;
