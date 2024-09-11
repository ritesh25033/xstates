import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const [selectionMessage, setSelectionMessage] = useState('');

  // Fetch all countries on initial render
  useEffect(() => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data.countries || []))  // Safely handle undefined data
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data.states || []))  // Safely handle undefined data
        .catch(error => console.error('Error fetching states:', error));
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data.cities || []))  // Safely handle undefined data
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedState]);

  // Handle the selection of country, state, and city
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(''); // Reset state and city
    setSelectedCity('');
    setStates([]);
    setCities([]);
    setSelectionMessage('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setCities([]);
    setSelectionMessage('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectionMessage(`You Selected ${e.target.value}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div className="location-selector">
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <div>
        <label htmlFor="country">Country: </label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.length > 0 && countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div>
        <label htmlFor="state">State: </label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.length > 0 && states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div>
        <label htmlFor="city">City: </label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.length > 0 && cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Display the selected location */}
      {selectionMessage && <p>{selectionMessage}</p>}
    </div>
  );
}

export default App;
