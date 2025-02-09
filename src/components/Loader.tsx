import React from "react";

const Loader = () => {
  const loaderStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    border: "5px solid #FFF",
    borderBottomColor: "transparent",
    borderRadius: "50%",
    display: "inline-block",
    boxSizing: "border-box",
    animation: "rotation 1s linear infinite",
  };

  return (
    <span style={loaderStyle}>
      <style>
        {`
          @keyframes rotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </span>
  );
};

export default Loader;