import React, { FunctionComponent, Fragment } from "react";
import { Camper } from "./Camper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

interface Props {
  campers: Camper[];
}

const CamperList: FunctionComponent<Props> = ({ campers }) => {
  return (
    <List>
      {campers.map((camper, i) => (
        <Fragment key={i}>
          <ListItem>
            <ListItemText
              primary={`${camper.name}${camper.needsAssistance ? "*" : ""}`}
            />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default CamperList;
