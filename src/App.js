import { useState } from 'react';

import loadState from './persistence/loadState';
import saveState from './persistence/saveState';
import WeatherWidget from './WeatherWidget';
import './App.css';

let initialCoords = loadState('coords');

if (!initialCoords) {
    initialCoords = [53.550556, 9.993333];  // Hamburg
}

function App() {
    const [coords, setCoords] = useState(initialCoords);

    function handleCoordsChange(coords) {
        //saveState('coords', coords);
        setCoords(coords);
    }

    return (
        <div className="App">
            <header className="App-header">
                <WeatherWidget
                    lat={coords[0]}
                    lon={coords[1]}
                    onCoordsChange={handleCoordsChange}
                />
            </header>
        </div>
  );
}

export default App;
