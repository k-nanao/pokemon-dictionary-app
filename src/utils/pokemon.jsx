export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.jaon())
      .then((data) => resolve(data));
  });
};
