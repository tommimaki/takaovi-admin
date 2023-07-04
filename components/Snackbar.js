import React from "react";

const Snackbar = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-0 right-0 m-6 p-4 text-white rounded ${bgColor}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Snackbar;
