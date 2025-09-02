import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const searchText = search.toLowerCase().trim();

    const conversation = allUsers.find(
      (user) =>
        user.fullname?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText)
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] flex items-center px-4 bg-slate-800 rounded-3xl">
      <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
        {/* Input */}
        <div className="flex items-center flex-1 bg-slate-900 border border-gray-700 rounded-full px-4 py-2">
          <input
            type="text"
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200"
        >
          <FaSearch className="text-white text-lg" />
        </button>
      </form>
    </div>
  );
}

export default Search;
