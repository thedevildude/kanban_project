import React from "react";

const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen justify-center text-gray-700 w-full">
      {props.children}
    </div>
  );
};

export default AppContainer;
