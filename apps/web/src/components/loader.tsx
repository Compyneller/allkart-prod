import React from "react";
import { Spinner } from "./ui/spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Spinner />
    </div>
  );
};

export default Loader;
