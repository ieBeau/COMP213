main();

async function main() {
  const food = await getData();
  
  const foodHead = document.querySelector('#food-head');
  const foodList = document.querySelector('#food-menu');

  const foodCol = document.createElement('div');
  foodCol.style.marginLeft = '25px';

  const foodRow = document.createElement('tr');
  foodRow.style.display = 'flex';
  foodRow.style.flexDirection = 'row';
  foodRow.style.gap = '20px';
  foodRow.style.marginBottom = '20px';

  let type, counter;

  for (let i = 0; i < food.length; i++) {
    const item = food[i];
    const serving = item.serving[0];

    // Add a new header for each type of food
    if (type !== item.type) {


      // Add row to list if it's not empty
      if (foodRow.innerHTML != '') {
        foodList.appendChild(foodRow.cloneNode(true));
        foodRow.innerHTML = '';
      }

      type = item.type;
      counter = 0;
      
      // categories.push(item.type); // Add category to list

      foodCol.classList.add('head');
      foodCol.innerHTML = `
          <a href="#${item.type.toUpperCase()}" style="cursor: pointer;">
            <h3 style="margin: 0;">${item.type.toUpperCase()}</h3>
          </a>
      `;
      
      foodHead.appendChild(foodCol.cloneNode(true));

      foodRow.classList.add('food');
      foodRow.innerHTML = `
        <th id="${item.type.toUpperCase()}" style="text-align: start; width: 100%;">
          <h1 style="font-size: xx-large; margin-bottom: 10px;">${item.type.toUpperCase()}</h1>
        </th>
      `;
      
      foodList.appendChild(foodRow.cloneNode(true));
      foodRow.innerHTML = '';
    }

    // Add food item to row
    foodRow.classList.add('food');
    foodRow.innerHTML += `
        <td class="food-container">
          <div class="image-container">
              <img class="img-small" src="./assets/food/${item.image}" height="250px">
          </div>
          <h4 style="justify-content: center; margin: 10px">${serving.size.split(' ')[0]} ${item.name}</h4>
          <p style="text-align: start; margin: 10px; font-size: smaller">${item.description}</p>
          <p>${serving.portion ? `${serving.portion} | ` : ""}${serving.calories}</p>
          <a class="button" href="./details.html?view=Search&item=${item.id}">
            <span style="width: 100%;"></span>Purchase<span style="width: 100%; text-align: end; margin-right: 10px">$${serving.price}</span>
          </a>
        </td>
    `;
    
    // Add a new row every 4 items
    if (++counter % 4 === 0 || i === food.length - 1) {
      foodList.appendChild(foodRow.cloneNode(true));
      foodRow.innerHTML = '';
    }
  }
}

async function getData() {
    const response = await fetch('./data/food.json');
    const data = await response.json();
    return data;
}