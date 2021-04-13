export const getAllInfo = async (page, offset) => {
  const characters = await fetch(`http://gateway.marvel.com/v1/public/${page}?ts=1&apikey=dc2433b50c094d3da0f1ef9a87b20c11&hash=c4bffd34a2f51c35532039af81050a3c&limit=10&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
  const response = await characters.json();
  return response.data.results;
};
