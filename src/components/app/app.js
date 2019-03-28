import React from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorIndicator from "../error-indicator";
import { SwapiServiceProvider } from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
//import DummySwapiService from "../../services/dummy-swapi-service";
import {
  PeoplePage,
  StarshipPage,
  PlanetPage,
  LoginPage,
  SecretPage
} from "../pages";
import ErrorBoundry from "../error-boundry";
import {
  BrowserRouter as Router,
  Route,
  Switch
  //Redirect
} from "react-router-dom";
import "./app.css";

export default class App extends React.Component {
  state = {
    hasError: null,
    swapiService: new SwapiService()
    /* isLoggedIn: false */
  };

  /* onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }; */

  /* onServerChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  }; */

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    /* const { isLoggedIn } = this.state; */

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
              <Switch>
                <Route
                  path="/swdatabase/"
                  component={() => <h2>Welcome to StarDB</h2>}
                  exact
                />
                <Route path="/swdatabase/people/:id?" component={PeoplePage} />
                <Route path="/swdatabase/planets/:id?" component={PlanetPage} />
                <Route
                  path="/swdatabase/starships/:id?"
                  component={StarshipPage}
                />
                {/*                 <Route
                  path="/swdatabase/login"
                  render={() => {
                    return (
                      <LoginPage
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}
                      />
                    );
                  }}
                />
                <Route
                  path="/swdatabase/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                /> */}
                {/* <Redirect to="/swdatabase/" /> */}
                <Route render={() => <h1>Page not found</h1>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
