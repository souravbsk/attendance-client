import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bg-[#00548E]">
      <div className="container min-h-screen flex items-center justify-center">
        <div className="w-full md:w-6/12 px-3 lg:px-12 py-16 rounded-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
