import React from "react";
import ListItem from "./ListItem";

import { AppContext } from "../context";

const List = () => {
  const { displayProfies } = React.useContext(AppContext);

  return (
    <main>
      {displayProfies.map((profile) => {
        let {
          //   city,
          //   company,
          //   email,
          //   firstName,
          grades,
          //   id,
          //   lastName,
          //   pic,
          //   skill,
        } = profile;

        let numArray = grades.map(Number);
        const sum = numArray.reduce((a, b) => a + b, 0);
        const avg = sum / numArray.length || 0;

        profile = { ...profile, avg };

        return <ListItem profile={profile} key={profile.id} />;
      })}
    </main>
  );
};

export default List;
