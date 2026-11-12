
import {
    ArrowUpRight,
    BriefcaseBusiness,
    FileSearch,
    TrendingUp,
    Sparkles
} from "lucide-react";

function DashboardHero() {
    return (
        <section
            className="relative isolate min-h-[340px] overflow-hidden
            rounded-2xl border border-[#C5A46D]/20
            bg-[#171612] shadow-xl"
        >
            {/* Background image */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/careerpilot-office.png')"
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r
                from-[#100F0D]/95 via-[#17130F]/75
                to-[#17130F]/20"
            />

            {/* Additional bottom overlay */}
            <div className="absolute inset-0 -z-10
                bg-gradient-to-t from-black/40
                via-transparent to-transparent"
            />

            {/* Content */}
            <div className="relative flex min-h-[340px]
                items-center px-6 py-10 sm:px-10 lg:px-14">

                <div className="max-w-2xl">

                    {/* Label */}
                    <div className="mb-5 inline-flex items-center
                        gap-2 rounded-full border border-[#C5A46D]/40
                        bg-black/30 px-4 py-2 backdrop-blur-md">

                        <Sparkles
                            size={15}
                            className="text-[#D5B477]"
                        />

                        <span className="text-xs font-semibold
                            uppercase tracking-[0.2em]
                            text-[#E0C38D]">
                            AI-Powered Career Intelligence
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-semibold
                        leading-tight tracking-tight
                        text-white sm:text-5xl lg:text-6xl">

                        Plan. Improve.

                        <span className="block text-[#D5B477]">
                            Grow.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-xl text-sm
                        leading-7 text-white/80 sm:text-base">

                        Welcome to CareerPilot. Analyze your resume,
                        discover better job opportunities, identify
                        skill gaps, and build your career with confidence.
                    </p>

                    {/* Feature highlights */}
                    <div className="mt-8 flex flex-wrap gap-5">

                        <div className="flex items-center gap-2">
                            <FileSearch
                                size={19}
                                className="text-[#D5B477]"
                            />
                            <span className="text-sm text-white/90">
                                Resume Analysis
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <BriefcaseBusiness
                                size={19}
                                className="text-[#D5B477]"
                            />
                            <span className="text-sm text-white/90">
                                Smart Job Matching
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <TrendingUp
                                size={19}
                                className="text-[#D5B477]"
                            />
                            <span className="text-sm text-white/90">
                                Career Growth
                            </span>
                        </div>

                    </div>

                    {/* Bottom label */}
                    <div className="mt-9">
                        <div className="h-px w-20 bg-[#D5B477]" />

                        <p className="mt-3 text-xs uppercase
                            tracking-[0.25em] text-white/60">
                            Your future starts here
                        </p>
                    </div>

                </div>

                {/* Decorative gold icon */}
                <div className="absolute bottom-8 right-8
                    hidden rounded-full border border-[#D5B477]/30
                    bg-black/20 p-4 backdrop-blur-md
                    lg:block">

                    <ArrowUpRight
                        size={30}
                        className="text-[#D5B477]"
                    />
                </div>

            </div>
        </section>
    );
}

export default DashboardHero;
