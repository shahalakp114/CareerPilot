
import { useEffect, useState } from "react";

import {
    UserCircle,
    Save,
    GraduationCap,
    Phone,
    Briefcase,
    Code
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        education: "",
        experience: "",
        skills: "",
        target_role: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profileExists, setProfileExists] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    // Fetch existing profile
    const fetchProfile = async () => {
        try {
            const response = await API.get("/profile/");

            const profile = response.data.profile || response.data;

            setFormData({
                full_name: profile.full_name || "",
                phone: profile.phone || "",
                education: profile.education || "",
                experience: profile.experience || "",
                skills: profile.skills || "",
                target_role: profile.target_role || ""
            });

            setProfileExists(true);

        } catch (error) {
            if (error.response?.status === 404) {
                // Profile does not exist.
                // The user can create a new profile.
                setProfileExists(false);
            } else {
                setError(
                    error.response?.data?.message ||
                    "Unable to load profile information."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setHasUnsavedChanges(true);
        setMessage("");
        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    // Create or update profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.full_name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (
            formData.phone &&
            !/^\d{10}$/.test(formData.phone)
        ) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        try {
            setSaving(true);

            // The endpoint creates the profile once, then updates it on later saves.
            const response = await API.post("/profile/", formData);

            setProfileExists(true);
            setHasUnsavedChanges(false);

            setMessage(
                response.data.message ||
                "Profile saved successfully!"
            );

        } catch (error) {
            console.error("Profile save error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to save profile."
            );

        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    return (
        <div className="app-theme min-h-screen bg-gray-50 text-[#eee5d5]">

            <Navbar />

            <div className="flex flex-col md:flex-row">

                <Sidebar />

                <main className="min-w-0 flex-1 p-4 md:p-8">

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            My Profile
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Manage your personal and professional information.
                        </p>
                    </div>

                    {loading ? (
                        <p className="text-gray-500">
                            Loading profile...
                        </p>
                    ) : (
                        <div className="mx-auto max-w-4xl rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:p-8">

                            <div className="mb-8 flex items-center gap-4 border-b pb-6">

                                <div className="rounded-full bg-blue-100 p-4 text-blue-600">
                                    <UserCircle size={40} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Personal Information
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {profileExists
                                            ? "Your profile is saved. Edit these details and save changes whenever you need."
                                            : "Create your profile once, then change and save your details whenever you need."
                                        }
                                    </p>
                                </div>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="grid gap-6 md:grid-cols-2">

                                    {/* Full Name */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Full Name *
                                        </label>

                                        <input
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className={inputClass}
                                            required
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                                            <Phone size={17} />
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter 10-digit phone number"
                                            maxLength={10}
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                                            <GraduationCap size={17} />
                                            Education
                                        </label>

                                        <input
                                            type="text"
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            placeholder="Example: BCA"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Experience */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                                            <Briefcase size={17} />
                                            Experience
                                        </label>

                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            placeholder="Example: Fresher"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Skills */}
                                    <div className="md:col-span-2">
                                        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
                                            <Code size={17} />
                                            Technical Skills
                                        </label>

                                        <textarea
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="Example: Python, Django, React, HTML, CSS, MySQL"
                                            rows={4}
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Target Role */}
                                    <div className="md:col-span-2">
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Target Job Role
                                        </label>

                                        <input
                                            type="text"
                                            name="target_role"
                                            value={formData.target_role}
                                            onChange={handleChange}
                                            placeholder="Example: Python Full Stack Developer"
                                            className={inputClass}
                                        />
                                    </div>

                                </div>

                                {/* Success Message */}
                                {message && (
                                    <p className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                                        {message}
                                    </p>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                        {error}
                                    </p>
                                )}

                                {/* Save Button */}
                                <div className="mt-8 flex justify-end">

                                    {hasUnsavedChanges && (
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            <Save size={19} />

                                            {saving
                                                ? "Saving..."
                                                : profileExists
                                                    ? "Update Profile"
                                                    : "Create Profile"
                                            }
                                        </button>
                                    )}

                                </div>

                            </form>

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}

export default Profile;
