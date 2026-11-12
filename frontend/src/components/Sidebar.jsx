
import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    UserCircle,
    FileText,
    Briefcase,
    GitCompareArrows,
    History,
    Sparkles,
    TrendingUp
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", path: "/profile", icon: UserCircle },
    { name: "My Resumes", path: "/resume", icon: FileText },
    { name: "Job Descriptions", path: "/jobs", icon: Briefcase },
    { name: "Resume Matching", path: "/compare", icon: GitCompareArrows },
    { name: "Analysis History", path: "/history", icon: History }
];

function Sidebar() {
    return (
        <aside className="w-full shrink-0 border-b border-[#30291d] bg-[#11100e] px-4 py-4 text-[#e8e1d5] md:min-h-screen md:w-[260px] md:border-b-0 md:border-r md:px-5 md:py-7">

            <div className="mb-6 hidden items-center gap-3 md:flex">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f3d99b] to-[#b58a3c] text-[#17130c]">
                    <Briefcase size={23} />
                </div>

                <div>
                    <h2 className="text-xl font-bold tracking-wide text-[#f1d9a5]">
                        CareerPilot
                    </h2>
                    <p className="text-[10px] uppercase tracking-[3px] text-[#95866c]">
                        Career Intelligence
                    </p>
                </div>
            </div>

            <div className="mb-4 hidden items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#8e8068] md:flex">
                <Sparkles size={13} />
                Workspace
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 md:px-4 ${
                                    isActive
                                        ? "border border-[#806438]/50 bg-gradient-to-r from-[#6f542b]/30 to-[#211b12] text-[#f0d49a] shadow-[0_5px_20px_rgba(0,0,0,0.2)]"
                                        : "border border-transparent text-[#a9a092] hover:border-[#51432c] hover:bg-[#201c16] hover:text-[#f0d49a]"
                                }`
                            }
                        >
                            <Icon size={18} />
                            <span className="whitespace-nowrap">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="mt-10 hidden rounded-2xl border border-[#5a472b] bg-gradient-to-br from-[#282116] to-[#15130f] p-4 md:block">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#d4b16d]/15 text-[#e5c681]">
                    <TrendingUp size={19} />
                </div>

                <p className="text-sm font-semibold text-[#e9d7b1]">
                    Build your future
                </p>
                <p className="mt-2 text-xs leading-5 text-[#a99c85]">
                    Keep improving your skills and move closer to your career goals.
                </p>
            </div>

            <p className="mt-8 hidden text-center text-[10px] tracking-wider text-[#655d50] md:block">
                © 2026 CAREERPILOT
            </p>
        </aside>
    );
}

export default Sidebar;
