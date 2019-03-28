import React from "react";
import Row from "../row";
import { PlanetDetails, PlanetList } from "../sw-components";
import { withRouter } from "react-router-dom";

const PlanetPage = ({ match, history }) => {
  const { id } = match.params;
  return (
    <Row
      left={<PlanetList onItemSelected={id => history.push(id)} />}
      right={<PlanetDetails itemId={id} />}
    />
  );
};

export default withRouter(PlanetPage);
