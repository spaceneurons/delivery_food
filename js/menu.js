const meny = () => {
  const menu = document.querySelector(".cards-menu");
  const cartArray = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const restaurantTitle = document.querySelector(".restaurant-title");
  const restaurantRating = document.querySelector(".rating");
  const restaurantPrice = document.querySelector(".price");
  const restaurantCategory = document.querySelector(".category");

  const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });
    } else {
      cartArray.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
  };

  if (localStorage.getItem("restaurant")) {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    fetch(`./db/${restaurant.products}`)
      .then((response) => response.json())
      .then((data) => renderCards(data))
      .catch((error) => console.log(error));

    restaurantTitle.textContent = restaurant.name;
    restaurantRating.textContent = restaurant.stars;
    restaurantPrice.textContent = `От ${restaurant.price} ₽`;
    restaurantCategory.textContent = restaurant.kitchen;
  } else {
    window.location.href = "/";
  }

  function renderCards(cards) {
    cards.forEach(({ image, name, id, description, price }) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
    <img src="${image}" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `;
      card.querySelector(".button-card-text").addEventListener("click", () => {
        addToCart({ name, price, id, count: 1 });
      });

      menu.append(card);
    });
  }
};

meny();
