
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    LogOut,
    UserCircle,
    BriefcaseBusiness,
    Bell,
    Sparkles
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 flex min-h-[76px] items-center justify-between border-b border-[#30291d] bg-[#11100e]/95 px-4 py-3 text-[#eee5d5] shadow-lg backdrop-blur-xl md:px-8">

            <div
                className="flex cursor-pointer items-center gap-3"
                onClick={() => navigate("/dashboard")}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f3d99b] to-[#b58a3c] text-[#17130c] shadow-lg shadow-[#c49a50]/10">
                    <BriefcaseBusiness size={21} />
                </div>

                <div>
                    <h1 className="text-lg font-bold tracking-wide text-[#f0d49a] md:text-xl">
                        CareerPilot
                    </h1>
                    <p className="hidden text-[9px] uppercase tracking-[2.5px] text-[#95866c] sm:block">
                        Plan. Improve. Grow.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="hidden items-center gap-2 rounded-full border border-[#55452b] bg-[#201c16] px-3 py-2 text-xs text-[#cdb47e] transition hover:border-[#b28d4f] hover:bg-[#2a2419] sm:flex"
                    title="Open Dashboard"
                >
                    <Sparkles size={14} />
                    AI Career Workspace
                </button>

                <div className="relative">
                <button
                    type="button"
                    aria-label="Notifications"
                    aria-expanded={showNotifications}
                    onClick={() => setShowNotifications((visible) => !visible)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#55452b] bg-[#211c14] text-[#d9bd80] transition hover:border-[#b28d4f] hover:bg-[#2a2419]"
                >
                    <Bell size={17} />
                </button>
                {showNotifications && (
                    <div className="absolute right-0 top-12 z-[60] w-72 rounded-xl border border-[#55452b] bg-[#15130f] p-4 text-[#eee5d5] shadow-2xl">
                        <p className="font-semibold text-[#f0d49a]">Notifications</p>
                        <p className="mt-2 text-sm text-[#a99c85]">You’re all caught up.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setShowNotifications(false);
                                navigate("/history");
                            }}
                            className="mt-3 text-sm font-medium text-[#e4c27e] hover:text-[#f3d99b]"
                        >
                            View analysis history
                        </button>
                    </div>
                )}
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 rounded-lg border-l border-[#403626] pl-3 text-left transition hover:bg-[#201c16] md:pl-5"
                    title="Open My Profile"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#332819] text-[#e7cb8c]">
                        <UserCircle size={21} />
                    </span>

                    <span className="hidden sm:block">
                        <p className="max-w-[130px] truncate text-sm font-semibold text-[#eee5d5]">
                            {user?.username || "User"}
                        </p>
                        <p className="text-[10px] text-[#938773]">
                            My Profile
                        </p>
                    </span>
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl border border-[#654036] bg-[#2b1c19] px-3 py-2 text-xs font-semibold text-[#e5a99b] transition hover:border-[#a85d4e] hover:bg-[#45231e] md:px-4 md:text-sm"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                </button>

            </div>
        </nav>
    );
}

export default Navbar;
