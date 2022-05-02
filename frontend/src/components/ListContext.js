import React, { useState, useContext } from "react";

const ListContext = React.createContext();
const UpdateListContext = React.createContext();

export const useList = () => {
  return useContext(ListContext);
};

export const useUpdateList = () => {
  return useContext(UpdateListContext);
};

export const ListProvider = ({ value, children }) => {
  const [List, setList] = useState(value);
  return (
    <ListContext.Provider value={List}>
      <UpdateListContext.Provider value={setList}>
        {children}
      </UpdateListContext.Provider>
    </ListContext.Provider>
  );
};

export default ListProvider;