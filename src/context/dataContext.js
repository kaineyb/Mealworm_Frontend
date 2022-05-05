import React from "react";

const dataContext = React.createContext({ data: {} });
dataContext.displayName = "DataContext";

export default dataContext;
