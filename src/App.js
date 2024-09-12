import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    console.log('Hello world');
    axios
      .get('https://crio-location-selector.onrender.com/countries')
      .then((response) => {
        console.log('Countries data:', response); // Log countries data
        setCountries(response.data || []);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      console.log('Selected Country:', selectedCountry); // Log selected country
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => {
          console.log('States data:', response); // Log states data
          setStates(response.data || []);
        })
        .catch((error) => console.error('Error fetching states:', error));
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      console.log('Selected State:', selectedState); // Log selected state
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => {
          console.log('Cities data:', response); // Log cities data
          setCities(response.data || []);
        })
        .catch((error) => console.error('Error fetching cities:', error));
    }
  }, [selectedState]);

  // Handle the selection of country, state, and city
  const handleCountryChange = (e) => {
    const selected = e.target.value;
    console.log('Country Changed:', selected); // Log country change
    setSelectedCountry(selected);
    setSelectedState(''); // Reset state and city
    setSelectedCity('');
    setStates([]);
    setCities([]);
    setSelectionMessage('');
  };

  const handleStateChange = (e) => {
    const selected = e.target.value;
    console.log('State Changed:', selected); // Log state change
    setSelectedState(selected);
    setSelectedCity('');
    setCities([]);
    setSelectionMessage('');
  };

  const handleCityChange = (e) => {
    const selected = e.target.value;
    console.log('City Changed:', selected); // Log city change
    setSelectedCity(selected);
    setSelectionMessage(
      `You selected ${selected}, ${selectedState}, ${selectedCountry}`
    );
  };

  return (
    <div className='location-selector'>
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <div className='dropdown'>
        <label htmlFor='country'>Country: </label>
        <select
          id='country'
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value=''>Select Country</option>
          {countries.length > 0 &&
            countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div className='dropdown'>
        <label htmlFor='state'>State: </label>
        <select
          id='state'
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value=''>Select State</option>
          {states.length > 0 &&
            states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className='dropdown'>
        <label htmlFor='city'>City: </label>
        <select
          id='city'
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value=''>Select City</option>
          {cities.length > 0 &&
            cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>

      {/* Display the selected location */}
      {selectionMessage && (
        <p className='selection-message'>{selectionMessage}</p>
      )}
    </div>
  );
}

export default App;
