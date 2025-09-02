import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // prevent empty send
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg">
        {/* Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="ml-3 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
