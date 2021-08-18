export const searchCityData = (query) => {
  return fetch(`https://api.teleport.org/api/cities/?search=${query}&limit=1&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`);
};

export const searchBlank = (link) => {
  return fetch(`${link}`);
};