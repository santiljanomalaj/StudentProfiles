import React, { useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context";

const StyledInput = styled.input`
  width: -webkit-fill-available;
`;

const SearchBar = () => {
  const { filterUser, name, setName } = React.useContext(AppContext);

  useEffect(() => {
    filterUser();
  }, [name]);

  return (
    <StyledInput
      type="text"
      placeholder="Search by name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

export { SearchBar, StyledInput };
