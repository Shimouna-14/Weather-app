import axios from "axios";

function Daily() {
  const options = {
    method: "GET",
    url: "https://ai-weather-by-meteosource.p.rapidapi.com/daily",
    params: {
      place_id: "Paris",
      language: "fr",
      units: "metric",
    },
    headers: {
      "x-rapidapi-key": import.meta.env.KEY,
      "x-rapidapi-host": import.meta.env.HOST,
    },
  };

  try {
    const response = axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  return (
    <>
    </>
  );
}

export default Daily;
