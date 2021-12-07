import React from "react";
import List from "./List";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import SearchTag from "./SearchTag";

const StyledMain = styled.main`
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 2px gray;
  height: fit-content;
`;

const ScrollablePlatform = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;
  
  height: 70vh;
  width: 60vw;

  scroll-behavior: auto;

  &::-webkit-scrollbar {
    background-color: #f5f5f5;
    width: 7px;
    visibility: hidden;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaaaaa;
    /* outline: 1px solid slategrey; */
    border-radius: 5px;
  }
`;

const PlatformComponent = () => {
  return (
    <StyledMain style={{ gridArea: "2/ 2/ 4 / 2" }}>
      <SearchBar />
      <SearchTag />
      <ScrollablePlatform>
        <List />
      </ScrollablePlatform>
    </StyledMain>
  );
};

export default PlatformComponent;
