import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [api, setApi] = useState();
  const [state, setState] = useState('');

  useEffect(() => {
    if(state.length === 2){
      const handle = setTimeout(() => {
        fetch(`https://corona-api.com/countries/${state}`).
        then(resp => resp.json()).
        then(result => setApi(result.data));
      }, 1000);

      return () => {
        clearTimeout(handle);
      }

    }
  }, [state]);

  let confirmed;
  let name;
  let population;
  let deaths;
  let critical;
  let recovered;
  if(api !== undefined){
    confirmed = api.latest_data.confirmed;
    population = api.population;
    name = api.name;
    deaths = api.latest_data.deaths;
    critical = api.latest_data.critical;
    recovered = api.latest_data.recovered;
  }

  return (
    <div className="App">
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      {name ? <h1>{name}</h1> : null}
      {population ? <h3>population is {population}</h3> : null}
      {deaths ? <h3>As a result of coronavirus there are {deaths} deaths, which is {(deaths / population * 100).toFixed(2)}% of total population</h3> : null}
      {critical ? <h3>{critical} people are in critical condition</h3> : null}
      {recovered ? <h3>{recovered} people has been recovered</h3> : null}
    </div>
  );
}

export default App;
