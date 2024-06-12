import React, { useState } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <Header
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { searchValue });
        }
        return child;
      })}
    </>
  );
}
