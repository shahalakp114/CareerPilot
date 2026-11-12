
import { Link } from "react-router-dom";

import {
    FileText,
    BrainCircuit,
    Target,
    BookOpen,
    ArrowRight,
    ChartNoAxesCombined,
    BriefcaseBusiness,
    CheckCircle
} from "lucide-react";

function Landing() {
    const features = [
        {
            icon: FileText,
            title: "Resume Analysis",
            description:
                "Upload your resume and automatically identify your skills, education and experience."
        },
        {
            icon: Target,
            title: "Resume Matching",
            description:
                "Compare your resume with job descriptions and understand your skill gaps."
        },
        {
            icon: BrainCircuit,
            title: "AI Career Insights",
            description:
                "Get intelligent career insights based on your existing skills and interests."
        },
        {
            icon: BookOpen,
            title: "Learning Roadmap",
            description:
                "Discover missing skills and follow a personalized learning roadmap."
        },
        {
            icon: BriefcaseBusiness,
            title: "Job Recommendations",
            description:
                "Explore job roles that match your current technical skills."
        },
        {
            icon: ChartNoAxesCombined,
            title: "Progress Tracking",
            description:
                "View previous analyses and monitor your career preparation progress."
        }
    ];

    const steps = [
        "Create your CareerPilot account",
        "Upload your resume",
        "Add your preferred job description",
        "Analyze your resume and explore recommendations"
    ];

    return (
        <div className="app-theme min-h-screen bg-white text-[#eee5d5]">

            {/* Navbar */}
            <nav className="flex items-center justify-between border-b border-[#30291d] bg-[#11100e] px-6 py-5 md:px-16">

                <h1 className="text-2xl font-bold text-blue-600">
                    CareerPilot
                </h1>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:text-blue-600"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                    >
                        Get Started
                    </Link>
                </div>

            </nav>

            {/* Hero Section */}
            <section className="landing-hero relative overflow-hidden bg-gradient-to-r from-[#17140f] to-[#0c0b09] px-6 py-20 md:px-16">

                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

                    <div className="landing-hero-copy rounded-3xl border border-[#66502e]/70 p-6 md:p-9">
                        <span className="mb-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                            AI-Powered Career Intelligence
                        </span>

                        <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                            Build Your Career With{" "}
                            <span className="text-blue-600">
                                Confidence
                            </span>
                        </h2>

                        <p className="mb-8 max-w-xl text-lg leading-8 text-gray-600">
                            Analyze your resume, discover skill gaps,
                            explore suitable job roles and create a
                            personalized learning roadmap with CareerPilot.
                        </p>

                        <div className="flex flex-wrap gap-4">

                            <Link
                                to="/register"
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Get Started
                                <ArrowRight size={20} />
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-white"
                            >
                                Login
                            </Link>

                        </div>
                    </div>

                    {/* Hero Illustration */}
                    <div className="flex justify-center">

                        <div className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">

                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800">
                                    Career Overview
                                </h3>

                                <ChartNoAxesCombined className="text-blue-600" size={28} />
                            </div>

                            <div className="mb-6 rounded-xl bg-blue-50 p-5">
                                <p className="text-sm text-gray-500">
                                    Resume Matching Score
                                </p>

                                <h2 className="mt-2 text-4xl font-bold text-blue-600">
                                    85%
                                </h2>

                                <div className="mt-4 h-3 rounded-full bg-gray-200">
                                    <div className="h-3 w-[85%] rounded-full bg-blue-600"></div>
                                </div>
                            </div>

                            <div className="space-y-4">

                                {["Python", "Django", "React"].map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <span className="font-medium text-gray-700">
                                            {skill}
                                        </span>

                                        <CheckCircle className="text-green-500" size={20} />
                                    </div>
                                ))}

                            </div>

                            <p className="mt-5 text-center text-xs text-gray-400">
                                Illustrative dashboard preview
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Features */}
            <section className="px-6 py-20 md:px-16">

                <div className="mx-auto max-w-7xl">

                    <div className="mb-12 text-center">

                        <h2 className="text-3xl font-bold text-gray-900">
                            Everything You Need to Grow
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Smart tools to help you prepare for your dream career.
                        </p>

                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-xl border border-gray-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                        <Icon size={25} />
                                    </div>

                                    <h3 className="mb-3 text-lg font-bold text-gray-800">
                                        {feature.title}
                                    </h3>

                                    <p className="leading-7 text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            {/* How It Works */}
            <section className="bg-gray-50 px-6 py-20 md:px-16">

                <div className="mx-auto max-w-5xl">

                    <div className="mb-12 text-center">

                        <h2 className="text-3xl font-bold text-gray-900">
                            How CareerPilot Works
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Four simple steps to understand your career opportunities.
                        </p>

                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">

                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                                    {index + 1}
                                </div>

                                <p className="font-medium text-gray-700">
                                    {step}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="border-y border-[#66502e] bg-gradient-to-r from-[#6f542b] to-[#211b12] px-6 py-16 text-center">

                <h2 className="text-3xl font-bold text-white">
                    Ready to Take the Next Step?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-blue-100">
                    Start understanding your skills and preparing for
                    better career opportunities.
                </p>

                <Link
                    to="/register"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#e5c47e] to-[#b78b43] px-7 py-3 font-semibold text-[#17130c] hover:brightness-110"
                >
                    Create Free Account
                    <ArrowRight size={20} />
                </Link>

            </section>

            {/* Footer */}
            <footer className="bg-gray-900 px-6 py-8 text-center text-gray-400">

                <h2 className="mb-2 text-xl font-bold text-white">
                    CareerPilot
                </h2>

                <p className="text-sm">
                    AI-Powered Career Intelligence Platform
                </p>

                <p className="mt-4 text-xs">
                    © 2026 CareerPilot. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Landing;
