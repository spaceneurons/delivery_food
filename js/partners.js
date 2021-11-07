const renserItems = (data) => {
  console.log(data);
};

fetch("https://delivery-9c0f2-default-rtdb.firebaseio.com/db/partners.json")
  .then((response) => response.json())
  .then((data) => {
    renserItems(data);
  })
  .catch((error) => {
    console.log(error);
  })
  
