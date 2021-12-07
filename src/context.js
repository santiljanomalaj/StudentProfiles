import React, { useState, useEffect } from "react";
import axios from "axios";
// import mockProfiles from "./mockData/mockProfiles";

const AppContext = React.createContext();
const apiURL = "https://api.hatchways.io/assessment/students";

const AppProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [displayProfies, setDisplayProfies] = useState([]);
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");

  

  const fetchData = () => {
    axios
      .get(apiURL)
      .then((data) => {
        data.data.students.map((obj) => (obj.tags = []));
        setProfiles(data.data.students);
        setDisplayProfies(data.data.students);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchUser = (searchName) => {
    if (searchName) {
      setDisplayProfies(
        [...profiles].filter((student) =>
          `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(searchName.toLowerCase())
        )
      );
    } else setDisplayProfies(profiles);
  };

  const fetchUserByTag = (searchTag) => {
    if (searchTag) {
      setDisplayProfies(
        [...profiles].filter((student) =>
          student.tags.some((x) => x.startsWith(searchTag))
        )
      );
    } else setDisplayProfies(profiles);
  };

  const filterUser = () => {
    if (name && tag) {
      setDisplayProfies(
        [...profiles].filter(
          (student) =>
            `${student.firstName} ${student.lastName}`
              .toLowerCase()
              .includes(name.toLowerCase()) && student.tags.some((x) => x.startsWith(tag))
        )
      );
    } else if (name) {
      fetchUser(name);
    } else if (tag) {
      fetchUserByTag(tag);
    } else setDisplayProfies(profiles);
  };

  useEffect(fetchData, []);

  return (
    <AppContext.Provider
      value={{
        profiles,
        setProfiles,
        displayProfies,
        setDisplayProfies,
        filterUser,
        name,
        setName,
        tag,
        setTag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
