import axios from "axios";

function Current() {
  const options = {
    method: "GET",
    url: "https://ai-weather-by-meteosource.p.rapidapi.com/current",
    params: {
      place_id: "Paris",
      timezone: "auto",
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
      <section className="glasseffect h-full w-[45%] m:w-full m:mb-4 rounded-md"></section>
      <section className="glasseffect h-full w-[45%] m:w-full rounded-md"></section>
    </>
  );
}

export default Current;
