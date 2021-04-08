export const getAllInfo = async (endpoint, offset) => {
  const characters = await fetch(`${endpoint}&limit=20&offset=${offset}`);
  const response = await characters.json();
  return response.data.results;
};

export const getByName = async (end1, page, name, end2) => {
  const characters = await fetch(`${end1}${page}?name=${name}&${end2}`);
  const response = await characters.json();
  return response.data.results[0];
};

export const getById = async (end1, page, id, end2) => {
  const characters = await fetch(`${end1}${page}/${id}?${end2}`);
  const response = await characters.json();
  return response.data.results[0];
}