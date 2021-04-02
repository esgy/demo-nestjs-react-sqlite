export const getFromAPI = (baseURL: string) => (endpoint: string) =>
  fetch(`${baseURL}${endpoint}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err.message);
    });
