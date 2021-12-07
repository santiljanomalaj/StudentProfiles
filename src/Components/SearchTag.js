import React, { useContext, useEffect } from "react";
import { StyledInput } from "./SearchBar";
import { AppContext } from "../context";

const SearchTag = () => {
  const { filterUser, tag, setTag } = useContext(AppContext);

  useEffect(() => {
    filterUser();
  }, [tag]);

  return (
    <StyledInput
      type="text"
      placeholder="Search by tag"
      value={tag}
      onChange={(e) => setTag(e.target.value)}
    />
  );
};

export default SearchTag;
