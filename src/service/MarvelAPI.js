export const getAllInfo = async (endpoint, offset) => {
  const characters = await fetch(`${endpoint}&limit=10&offset=${offset}`);
  const response = await characters.json();
  return response.data.results;
};