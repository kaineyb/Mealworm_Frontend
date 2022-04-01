import React from "react";

const UserContext = React.createContext({ data: {} });
UserContext.displayName = "DataContext";

export default UserContext;
