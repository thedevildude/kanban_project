import React from "react";

const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      {props.children}
    </div>
  );
};

export default AppContainer;
