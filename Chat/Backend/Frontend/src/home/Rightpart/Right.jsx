import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-screen bg-slate-900 text-gray-300 flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Top user bar */}
          <div className="shrink-0">
            <Chatuser />
          </div>

          {/* Messages scrollable area */}
          <div className="flex-1 overflow-y-auto px-2 py-1">
            <Messages />
          </div>

          {/* Input area */}
          <div className="shrink-0">
            <Typesend />
          </div>
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Mobile menu button */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute top-4 left-4"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      {/* Centered message */}
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <h1 className="text-lg md:text-xl">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser?.user?.fullname}
          </span>
          <br />
          <span className="text-gray-400">
            No chat selected — please start a conversation by selecting someone
            from your contacts.
          </span>
        </h1>
      </div>
    </div>
  );
};
