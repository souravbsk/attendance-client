import Footer from "@/components/Shared/Footer/Footer";
import Header from "@/components/Shared/Header/Header";
import PrivateRoute from "@/routes/PrivateRoute";
import React from "react";

const WithLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className="bg-[#00548E] min-h-screen flex flex-col justify-between">
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </PrivateRoute>
  );
};

export default WithLayout;
