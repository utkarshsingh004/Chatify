import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="flex flex-col h-screen w-[280px] bg-black text-gray-300">
      {/* App Name */}
      <h1
        className="text-4xl font-extrabold text-center py-4 bg-gradient-to-r from-blue-400 via-blue-950 to-white bg-clip-text text-transparent tracking-wide drop-shadow-md">
        Chatify
      </h1>

      {/* Search */}
      <Search />

      {/* Users list with scroll */}
      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>

      {/* Logout button */}
      <Logout />
    </div>
  );
}

export default Left;
