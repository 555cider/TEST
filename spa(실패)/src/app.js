import { api } from './api.js';
import { Auth } from './components/auth.js';
import { Locations } from './components/locations.js';
import { Trucks } from './components/trucks.js';
import { Simulate } from './components/simulate.js';

// 9adca5f19095a0770b24ecd6fb410845

export class App {
  constructor($app) {
    this.state = {
      problem: 1,
      key: '',
      command: [],
    };
    // auth
    this.auth = new Auth({
      $app,
      initialState: {
        ...this.state,
      },
      onClick: async () => {
        try {
          const token = document.querySelector('#token').value;
          const key = await api.auth(token, 1);
          console.log('key: ' + key);
          this.auth.setState({
            ...this.state,
            key: key,
          });
        } catch (e) {
          console.error(e);
        }
      },
    });

    // locations
    this.locations = new Locations({
      $app,
      initialState: '',
      onClick: () => {
        try {
          const key = document.querySelector('#key').value;
          const locationsResult = api.locations(key);
          this.locations.setState(locationsResult);
        } catch (e) {
          console.error(e);
        }
      },
    });

    // // trucks
    this.trucks = new Trucks({
      $app,
      initialState: '',
      onClick: () => {
        try {
          const key = document.querySelector('#key').value;
          const trucksResult = api.trucks(key);
          this.trucks.setState(trucksResult);
        } catch (e) {
          console.error(e);
        }
      },
    });

    // simulate
    this.simulate = new Simulate({
      $app,
      initialState: '',
      onClick: (commands) => {
        try {
          const key = document.querySelector('#key').value;
          const simulateResult = api.simulate(key, commands);
          this.simulate.setState(simulateResult);
        } catch (e) {
          console.error(e);
        }
      },
    });
  }
}
