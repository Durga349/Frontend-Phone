import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loaderclass ">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 9999,
        }}
      >
        {" "}
        <BeatLoader color="#b86eb5" />
      </div>
    </div>
  );
};

export default Loader;
