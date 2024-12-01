async function main() {
  const data = await getData();

  const id = window.location.search.split('=')[2];
  const food = data.find(item => item.id === id);
  const serving = food.serving;
  
  const imageContainer = document.querySelector('#detail-container');

  const image = document.createElement('div');
  image.style.display = 'flex';
  image.style.flexDirection = 'column';
  image.style.alignItems = 'center';
  image.style.justifyContent = 'center';
  image.style.width = '500px';

  image.innerHTML = `
      <div class="image-large-container">
          <img class="img-large" src="./assets/food/${food.image}" height="325px">
      </div>
      <h2>${serving[0].size} ${food.name}</h2>
      <div class="hor-ruler"></div>
      <p>${food.description}</p>
      <div class="hor-ruler"></div>
  `;

  const priceContainer = document.querySelector('#price-options');
  
  const price = document.createElement('div');
  price.style.display = 'flex';
  price.style.flexDirection = 'row';
  price.style.textAlign = 'center';

  // Add serving options
  for (let i = 0; i < serving.length; i++) {
    price.innerHTML += `
      <div>
        <p>${serving[i].size ? `${serving[i].size}${serving[i].portion ? " | " : ""}` : ""}${serving[i].portion ? `${serving[i].portion}` : ""}</p>
        <a class="button" href="./menu.html">$${serving[i].price}</a>
      </div>
    `;
  }

  priceContainer.appendChild(price.cloneNode(true));
  imageContainer.appendChild(image.cloneNode(true));
}

async function getData() {
  const response = await fetch('./data/food.json');
  const data = await response.json();
  return data;
}

main()