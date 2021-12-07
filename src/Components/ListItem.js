import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";

const Grid = styled.section`
  display: grid;
  grid-template-columns: 0.1fr 1fr 0.1fr;
  align-items: center;
  justify-items: start;
  background: white;
  width: 100%;
`;
const Flex = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: left;
  row-gap: 10px;
  /* margin: 0; */
`;
const Hrline = styled.br`
  display: block;
  content: "";
`;
const ExtendBtn = styled.button`
  border: none;
  background: 0;
  color: #aaaaaa;

  align-self: start;
  margin-top: 1rem;
  font-size: 3rem;

  &:hover {
    color: black;
  }
`;
const TagFlexbox = styled.section`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  justify-content: left;
  margin-left: 1rem;
`;

const TagInputStyled = styled.input`
  width: 5rem;
  margin-right: 1rem;
  margin-left: 1rem;
  border-width: thin;
  border-width: 0 0 1px;
  border-color: var(--border-color);
  outline: none;
  font-size: 0.8rem;
  margin-top: 0;
`;

const TagHolder = styled.div`
  font-family: "Raleway", sans-serif;
  background: var(--border-color);
  border-radius: 5px;
  padding: 8px 10px;
`;

const ListItem = (props) => {
  const [extended, setExtended] = useState(false);
  const { profiles, setProfiles, setDisplayProfies } = useContext(AppContext);
  const TagInput = useRef(null);

  const currProfile = props.profile;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = TagInput.current;
    const tag = form["tag"].value;

    let profileToBeChanged = profiles.find((x) => x.id === currProfile.id);
    const indxprofileTobeChanged = profiles.findIndex(
      (x) => x.id === currProfile.id
    );

    //ifin posht hiqe se tagun e shton pas axios
    if (!profileToBeChanged.tags) {
      profileToBeChanged = { ...profileToBeChanged, tags: [] };
    }
//rreg ket ne vend te letit lart
    // setProfiles((profiles) => {
    //   return profiles.map((profile) => {
    //     if (profile.id === currProfile.id) {
    //       currProfile.tags.push(tag);
    //       return {...currProfile};
    //     }
    //     return profile;
    //   });
    // });

    profileToBeChanged.tags.push(tag);
    profiles[indxprofileTobeChanged] = profileToBeChanged;

    form["tag"].value = "";
    setProfiles((state) => [...state]);
    setDisplayProfies((x) => [...x]);
  };

  return (
    <section
      key={currProfile.id}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        rowGap: "2px",
        margin: "0",
      }}
    >
      <Grid>
        <img src={currProfile.pic} alt={currProfile.pic} className="image" />
        <Flex>
          <h1 className="title">
            <strong>
              {currProfile.firstName} {currProfile.lastName}
            </strong>
          </h1>
          <h4>Email: {currProfile.email}</h4>
          <h4>Company: {currProfile.company}</h4>
          <h4>Skill: {currProfile.skill}</h4>
          <h4>Average: {currProfile.avg}% </h4>

          {extended && (
            <div key={currProfile.id}>
              {currProfile.grades.map((k, v) => {
                return (
                  <h4
                    style={{ marginBottom: "3px" }}
                    key={`${currProfile.id}test${v + 1}`}
                  >{`Test${v + 1}:\u00A0\u00A0\u00A0\u00A0\u00A0 ${k}%`}</h4>
                );
              })}
            </div>
          )}

          <TagFlexbox>
            {currProfile.tags.map((tag) => {
              return <TagHolder>{`${tag}`}</TagHolder>;
            })}
          </TagFlexbox>
          <form ref={TagInput} onSubmit={handleSubmit} style={{ margin: 0 }}>
            <TagInputStyled type="text" name="tag" placeholder="Add a tag" />
          </form>
          <br />
        </Flex>

        <ExtendBtn
          onClick={() => {
            setExtended(!extended);
          }}
        >
          {extended ? "-" : "+"}
        </ExtendBtn>
      </Grid>
      <Hrline />
    </section>
  );
};

export default ListItem;
