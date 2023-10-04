import React, { useState } from "react";

function CovidCountryInfo() {
  const [countryName, setCountryName] = useState("");
  const [countryData, setCountryData] = useState(null);

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://disease.sh/v3/covid-19/countries`);
      if (response.ok) {
        const data = await response.json();
        console.log(countryName);
        const filteredData = data.filter((item) => {
          return item.country.toLowerCase() === countryName.toLowerCase();
        });
        console.log("filteredData", filteredData);
        if (filteredData.length > 0) {
          // Display details for the selected country
          setCountryData(filteredData);
        } else {
          // No data found for the selected country
          setCountryData(null);
        }
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const handleFetchAndSubmit = () => {
    // Call fetchData when the button is clicked
    fetchData();
  };

  return (
    <div>
      <h1>COVID-19 Country Info</h1>
      <input
        type="text"
        placeholder="enter country name"
        value={countryName}
        onChange={handleInputChange}
      />

      <button onClick={handleFetchAndSubmit}>Submit</button>

      {countryData &&
        countryData.map((country, index) => (
          <div key={index}>
            <h2>Country: {country.country}</h2>
            <p>Cases: {country.cases}</p>
            <p>Deaths: {country.deaths}</p>
            <p>Recovered: {country.recovered}</p>
            {/* Add more properties as needed */}
          </div>
        ))}
    </div>
  );
}

export default CovidCountryInfo;
