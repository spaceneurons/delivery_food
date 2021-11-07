const restourant = 'food-band'

const renserItems = (data) => {
    console.log(data);
};

fetch(`./db/${restourant}.json`)
  .then((response) => response.json())
  .then((data) => {
    renserItems(data);
  })
  .catch((error) => {
    console.log(error);
  })
