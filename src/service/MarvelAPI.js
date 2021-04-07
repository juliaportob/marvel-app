export const getAllInfo = async (endopoint) => {
  const characters = await fetch(endopoint);
  const response = await characters.results;
  return response
};
