import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

import profile from "../../../public/user.jpg"; // fallback photo

function Chatuser() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = selectedConversation?._id
    ? onlineUsers.includes(selectedConversation._id)
    : false;

  const handleDeleteChat = async () => {
    if (!selectedConversation?._id) return;

    try {
      await axios.delete(`/api/messages/${selectedConversation._id}`);
      toast.success("Chat history deleted");
      setSelectedConversation(null);
    } catch (err) {
      toast.error("kya krna hai chat delete krke chodo na 😜!!");
    }
  };

  return (
    <div className="relative flex items-center justify-between h-[8vh] bg-slate-800 px-3 sm:px-4 shadow-md">
      {/* Mobile drawer menu button */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      {/* User Info */}
      <div className="flex items-center gap-3 overflow-hidden">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-10 rounded-full ring-2 bg-white relative">
            <img
              src={selectedConversation?.profilePic || profile}
              alt="User"
              className="object-cover"
            />
            {/* Online/Offline Dot (always visible on mobile) */}
            {selectedConversation?._id && (
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                  isOnline ? "bg-green-400" : "bg-gray-400"
                } sm:hidden`}
              ></span>
            )}
          </div>
        </div>
        <div className="truncate max-w-[130px] sm:max-w-[220px]">
          <h1 className="text-base sm:text-lg font-semibold text-white truncate">
            {selectedConversation?.fullname ||
              selectedConversation?.email ||
              "Select a user"}
          </h1>
          {/* Full Online/Offline text only for sm+ screens */}
          {selectedConversation?._id && (
            <span
              className={`hidden sm:block text-sm ${
                isOnline ? "text-green-400" : "text-gray-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          )}
        </div>
      </div>

      {/* Delete button */}
      {selectedConversation?._id && (
        <button
          onClick={handleDeleteChat}
          className="text-red-500 hover:text-red-700 rounded-full ml-2"
        >
          <MdDelete className="text-xl sm:text-2xl" />
        </button>
      )}
    </div>
  );
}

export default Chatuser;
