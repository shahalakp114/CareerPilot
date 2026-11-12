
import {
    BrainCircuit,
    Target,
    TrendingUp,
    BriefcaseBusiness,
    Sparkles,
    ArrowUpRight,
    FileSearch,
    GraduationCap,
    ChartNoAxesCombined,
    CheckCircle2
} from "lucide-react";

const features = [
    {
        icon: BrainCircuit,
        title: "AI Resume Analysis",
        description:
            "Analyze resume structure, ATS readability, technical skills and keyword alignment.",
        tag: "Resume Intelligence"
    },
    {
        icon: Target,
        title: "Smart Job Matching",
        description:
            "Compare your skills with job requirements and discover matching and missing competencies.",
        tag: "Job Compatibility"
    },
    {
        icon: TrendingUp,
        title: "Personalized Career Roadmap",
        description:
            "Follow a structured learning path to improve your skills and prepare for target roles.",
        tag: "Career Development"
    },
    {
        icon: ChartNoAxesCombined,
        title: "Career Growth Tracker",
        description:
            "Monitor resume scores, matching performance and your previous analysis results.",
        tag: "Progress Analytics"
    }
];

const benefits = [
    "Understand your resume strengths",
    "Discover missing technical skills",
    "Identify suitable career opportunities",
    "Track your career development"
];

function CareerOverview() {
    return (
        <div className="space-y-10">

            {/* HERO SECTION */}
            <section className="relative isolate min-h-[420px]
                overflow-hidden rounded-3xl bg-[#171612] shadow-xl">

                <div
                    className="absolute inset-0 -z-20 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/careerpilot-office.png')"
                    }}
                />

                <div className="absolute inset-0 -z-10
                    bg-gradient-to-r from-[#11100E]/95
                    via-[#17130F]/80 to-[#17130F]/35" />

                <div className="relative flex min-h-[420px]
                    items-center px-7 py-12 sm:px-12 lg:px-16">

                    <div className="max-w-2xl">

                        <div className="mb-6 inline-flex items-center
                            gap-2 rounded-full border
                            border-[#C5A46D]/40 bg-black/30
                            px-4 py-2 backdrop-blur-md">

                            <Sparkles size={16}
                                className="text-[#D5B477]" />

                            <span className="text-xs font-semibold
                                uppercase tracking-[0.2em]
                                text-[#E0C38D]">
                                AI-Powered Career Intelligence
                            </span>
                        </div>

                        <h1 className="text-4xl font-semibold
                            leading-tight tracking-tight
                            text-white sm:text-5xl lg:text-6xl">
                            Plan. Improve.
                            <span className="block text-[#D5B477]">
                                Grow.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-sm
                            leading-7 text-white/75 sm:text-base">
                            A smarter way to navigate your career.
                            Analyze your resume, discover job
                            opportunities, identify skill gaps and
                            build a roadmap for professional growth.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="/resume"
                                className="inline-flex items-center gap-2
                                rounded-lg bg-[#C5A46D] px-6 py-3
                                text-sm font-semibold text-[#171612]
                                transition hover:bg-[#D9BC88]"
                            >
                                Analyze My Resume
                                <ArrowUpRight size={17} />
                            </a>

                            <a
                                href="/jobs"
                                className="inline-flex items-center gap-2
                                rounded-lg border border-white/30
                                bg-white/10 px-6 py-3 text-sm
                                font-medium text-white backdrop-blur
                                transition hover:bg-white/20"
                            >
                                Explore Jobs
                            </a>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                            {[
                                "Resume Intelligence",
                                "Smart Job Matching",
                                "Career Growth"
                            ].map((item) => (
                                <div key={item}
                                    className="flex items-center gap-2">
                                    <CheckCircle2 size={15}
                                        className="text-[#D5B477]" />
                                    <span className="text-xs text-white/75">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRODUCTION */}
            <section className="grid gap-8 lg:grid-cols-2
                lg:items-center">

                <div>
                    <p className="mb-3 text-xs font-bold
                        uppercase tracking-[0.25em]
                        text-[#AE8B52]">
                        Your Career. Your Intelligence.
                    </p>

                    <h2 className="text-3xl font-semibold
                        leading-tight text-[#29251F] sm:text-4xl">
                        Transform your skills into
                        <span className="text-[#B18B4D]">
                            {" "}opportunities.
                        </span>
                    </h2>

                    <p className="mt-5 text-sm leading-7
                        text-[#777064]">
                        CareerPilot combines resume intelligence,
                        job compatibility analysis and personalized
                        career guidance into one professional
                        workspace.
                    </p>
                </div>

                <div className="rounded-2xl border
                    border-[#E9E1D3] bg-white p-6 shadow-sm">

                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-xl bg-[#F4EBDD] p-3">
                            <GraduationCap
                                className="text-[#A98449]"
                                size={24}
                            />
                        </div>

                        <div>
                            <h3 className="font-semibold
                                text-[#29251F]">
                                Your Career Growth
                            </h3>
                            <p className="text-xs text-gray-500">
                                A smarter professional journey
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <div key={index}
                                className="flex items-center gap-3">
                                <CheckCircle2 size={18}
                                    className="shrink-0 text-[#B18B4D]" />
                                <span className="text-sm
                                    text-[#625D53]">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURE SECTION */}
            <section>
                <div className="mb-7">
                    <p className="mb-2 text-xs font-bold
                        uppercase tracking-[0.25em]
                        text-[#AE8B52]">
                        Platform Capabilities
                    </p>

                    <h2 className="text-3xl font-semibold
                        text-[#29251F]">
                        Everything you need to grow.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm
                        leading-6 text-[#777064]">
                        Intelligent tools designed to help you
                        understand your professional potential
                        and take the next step.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div key={feature.title}
                                className="group rounded-2xl border
                                border-[#E9E1D3] bg-white p-6
                                shadow-sm transition duration-300
                                hover:-translate-y-1 hover:border-[#C5A46D]
                                hover:shadow-lg">

                                <div className="mb-5 flex
                                    items-center justify-between">

                                    <div className="rounded-xl
                                        bg-[#F5EFE4] p-3">
                                        <Icon size={24}
                                            className="text-[#A98449]" />
                                    </div>

                                    <span className="text-xs
                                        text-[#A98449]">
                                        0{index + 1}
                                    </span>
                                </div>

                                <p className="mb-2 text-[10px]
                                    font-bold uppercase
                                    tracking-[0.18em]
                                    text-[#B18B4D]">
                                    {feature.tag}
                                </p>

                                <h3 className="text-lg font-semibold
                                    text-[#29251F]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm
                                    leading-7 text-[#777064]">
                                    {feature.description}
                                </p>

                                <div className="mt-5 flex
                                    items-center gap-2 text-sm
                                    font-medium text-[#A98449]
                                    transition group-hover:gap-3">
                                    Explore feature
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>

            {/* CAREER GROWTH BANNER */}
            <section className="relative overflow-hidden
                rounded-2xl bg-[#201D17] px-7 py-10
                sm:px-12">

                <div className="absolute -right-10 -top-20
                    h-64 w-64 rounded-full
                    border border-[#C5A46D]/20" />

                <div className="relative flex flex-col
                    justify-between gap-6 sm:flex-row
                    sm:items-center">

                    <div>
                        <p className="mb-3 text-xs font-semibold
                            uppercase tracking-[0.2em]
                            text-[#C5A46D]">
                            Your Next Chapter
                        </p>

                        <h2 className="text-2xl font-semibold
                            text-white sm:text-3xl">
                            Your career deserves a better plan.
                        </h2>

                        <p className="mt-3 max-w-xl text-sm
                            leading-6 text-white/60">
                            Take control of your professional
                            development with intelligent career insights.
                        </p>
                    </div>

                    <a href="/resume"
                        className="inline-flex shrink-0
                        items-center justify-center gap-2
                        rounded-lg bg-[#C5A46D] px-6 py-3
                        text-sm font-semibold text-[#171612]
                        transition hover:bg-[#D9BC88]">
                        Get Started
                        <ArrowUpRight size={17} />
                    </a>
                </div>
            </section>

        </div>
    );
}

export default CareerOverview;
