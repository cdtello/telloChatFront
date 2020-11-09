import React, { createContext } from "react";

export const UserContext = createContext(undefined);

export const withUser = (WrapperConponent) => {
  return (props) => {
    return (
      <UserContext.Consumer>
        {({ user, setUser }) => (
          <WrapperConponent user={user} setUser={setUser} {...props} />
        )}
      </UserContext.Consumer>
    );
  };
};
