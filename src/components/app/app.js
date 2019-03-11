import React from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator";
import { SwapiServiceProvider } from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, StarshipPage, PlanetPage } from "../pages";
import ErrorBoundry from "../error-boundry";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";
import { StarshipDetails } from "../sw-components";

export default class App extends React.Component {
  state = {
    hasError: null,
    swapiService: new SwapiService()
  };

  onServerChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServerChange={this.onServerChange} />
              <RandomPlanet />
              <Route
                path="/"
                component={() => <h2>Welcome to StarDB</h2>}
                exact
              />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" component={StarshipPage} exact />
              <Route
                path="/starships/:id"
                exact
                render={({ match }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />;
                }}
              />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
