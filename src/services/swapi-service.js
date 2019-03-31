export default class SwapiService {
  mapPeople = new Map();
  mapStarships = new Map();
  mapPlanets = new Map();
  _apiBase = `https://swapi.co/api`;
  _imgBase = `https://starwars-visualguide.com/assets/img`;
  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async id => {
    if (this.mapPeople.has(id)) {
      return this.mapPeople.get(id);
    }
    const person = await this.getResource(`/people/${id}/`);
    let result = this._transformPerson(person);
    this.mapPeople.set(id, result);
    return result;
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async id => {
    if (this.mapPlanets.has(id)) {
      return this.mapPlanets.get(id);
    }
    const planet = await this.getResource(`/planets/${id}/`);
    let result = this._transformPlanet(planet);
    this.mapPlanets.set(id, result);
    return result;
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  };

  getStarship = async id => {
    if (this.mapStarships.has(id)) {
      return this.mapStarships.get(id);
    }
    const starship = await this.getResource(`/starships/${id}/`);
    let result = this._transformStarship(starship);
    this.mapStarships.set(id, result);
    return result;
  };

  getPersonImage = async ({ id }) => {
    /* let result = await fetch(`${this._imgBase}/characters/${id}.jpg`);
    if (result.status === 200) {
      return await `${this._imgBase}/characters/${id}.jpg`;
    } else { */
    return `https://cdn.browshot.com/static/images/not-found.png`;
    /* } */
  };

  getStarshipImage = async ({ id }) => {
    /* let result = await fetch(`${this._imgBase}/starships/${id}.jpg`);

    if (result.status === 200) {
      return await `${this._imgBase}/starships/${id}.jpg`;
    } else { */
    return `https://cdn.browshot.com/static/images/not-found.png`;
    /* } */
  };

  getPlanetImage = async ({ id }) => {
    /* let result = await fetch(`${this._imgBase}/planets/${id}.jpg`);

    if (result.status === 200) {
      return await `${this._imgBase}/planets/${id}.jpg`;
    } else { */
    return `https://cdn.browshot.com/static/images/not-found.png`;
    /* } */
  };

  _extractId = item => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = planet => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  _transformStarship = starship => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufactured: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    };
  };

  _transformPerson = person => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };
}
