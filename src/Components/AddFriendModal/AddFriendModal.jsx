import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FiUser, FiMail, FiTarget, FiImage, FiTag, FiFileText } from "react-icons/fi";
import { useApp } from "../../Context/AppContext";
import { toast } from "react-toastify";

const AddFriendModal = ({ isOpen, onClose }) => {
    const { addFriend } = useApp();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [goal, setGoal] = useState(14);
    const [bio, setBio] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [picture, setPicture] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!email.trim()) {
            toast.error("Please enter an email");
            return;
        }

        // Clean and parse tags
        const tags = tagsInput
            .split(",")
            .map(t => t.trim().toLowerCase())
            .filter(t => t !== "");

        const newFriend = addFriend({
            name,
            email,
            goal: parseInt(goal) || 14,
            bio,
            tags,
            picture: picture.trim() || undefined
        });

        toast.success(`Added ${newFriend.name} successfully!`);
        
        // Reset and close
        setName("");
        setEmail("");
        setGoal(14);
        setBio("");
        setTagsInput("");
        setPicture("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform scale-100 transition-all duration-300 z-10 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-emerald-500 text-white text-sm">
                            <FiUser />
                        </span>
                        Add New Friend
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <IoCloseOutline className="text-2xl" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
                    
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Friend's Name *
                        </label>
                        <div className="relative flex items-center">
                            <FiUser className="absolute left-3.5 text-slate-400 text-base" />
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. John Doe"
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Email Address *
                        </label>
                        <div className="relative flex items-center">
                            <FiMail className="absolute left-3.5 text-slate-400 text-base" />
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. john@example.com"
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Contact Goal in Days */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Contact Goal (Every {goal} days)
                            </label>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Every {goal} Days
                            </span>
                        </div>
                        <div className="relative flex items-center gap-3">
                            <FiTarget className="text-slate-400 text-base shrink-0" />
                            <input 
                                type="range" 
                                min="1" 
                                max="90" 
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Short Biography / Description
                        </label>
                        <div className="relative flex items-start">
                            <FiFileText className="absolute left-3.5 top-3 text-slate-400 text-base" />
                            <textarea 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write something memorable about them..."
                                rows="3"
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Tags (Comma separated)
                        </label>
                        <div className="relative flex items-center">
                            <FiTag className="absolute left-3.5 text-slate-400 text-base" />
                            <input 
                                type="text"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                placeholder="e.g. work, college, gaming"
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Photo URL (Optional)
                        </label>
                        <div className="relative flex items-center">
                            <FiImage className="absolute left-3.5 text-slate-400 text-base" />
                            <input 
                                type="url"
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-slate-100 justify-end">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="btn btn-ghost hover:bg-slate-100 rounded-full px-5 text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="btn bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-none rounded-full px-6 text-sm shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20"
                        >
                            Save Friend
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddFriendModal;
