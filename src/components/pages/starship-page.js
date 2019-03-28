import React from "react";
import Row from "../row";
import { StarshipList, StarshipDetails } from "../sw-components";
import { withRouter } from "react-router-dom";

const StarshipPage = ({ match, history }) => {
  const { id } = match.params;
  return (
    <Row
      left={<StarshipList onItemSelected={id => history.push(id)} />}
      right={<StarshipDetails itemId={id} />}
    />
  );
};

export default withRouter(StarshipPage);
