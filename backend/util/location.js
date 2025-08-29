const axios = require("axios");

// Fallback coordinates of Taj Mahal
const DUMMY_COORDS = { lat: 27.1751, lng: 78.0421 };

async function geocodeAddress(address) {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json"
      },
      headers: {
        "User-Agent": "journeypin@gmail.com"
      }
    });


    if (!response.data || response.data.length === 0) {
      console.warn(`No results for "${address}". Returning Taj Mahal coords.`);
      return DUMMY_COORDS; 
    }

    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon)
    };
  } catch (err) {
    return DUMMY_COORDS;
  }
}

module.exports = geocodeAddress;
