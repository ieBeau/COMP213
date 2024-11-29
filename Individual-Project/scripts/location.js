main();

async function main() {

}

async function getData() {
  const response = await fetch('./data/restaurants.json');
  const data = await response.json();
  return data;
}

async function createList(data) {
  const restaurantList = document.querySelector('#restaurant-container');

  for (const restaurant of data) {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.classList.add('restaurant');
    restaurantDiv.innerHTML = `
      <div class="location-result">
        <div class="location-result-header">
          <img class="location-result-image" src="./assets/pizzahut-small.png" alt="restaurant image" height="75px" >
          <h2 class="location-result-title">${restaurant.name}</h2>
        </div>
        <p class="location-result-address">${restaurant.address}</p>
        <p class="location-result-phone">${restaurant.phone}</p>
        <button class="location-result-button" onclick="searchFilter(\`${restaurant.address}\`)">Show on Map</button>
        <button class="location-result-button" onclick="window.open('https://www.pizzahut.ca/', '_blank');">Order</button>
      </div>
    `;
    restaurantList.appendChild(restaurantDiv); 
  }

  return restaurantList;
}

function searchFilter(address) {
  let input, filter, ul, li, a, i, txtValue;
  
  input = document.getElementById("location-search-input");
  filter = input.value.toUpperCase();

  ul = document.getElementById("restaurant-container");
  li = ul.getElementsByClassName("restaurant");

  ulMap = document.getElementById("map");
  liMap = ulMap.getElementsByClassName("property");

  if (address == 'refresh') input.value = '', filter = '';
  else if (address) input.value = address, filter = address;

  if (filter == '') document.querySelector('.refresh-icon').style.display = 'none';
  else document.querySelector('.refresh-icon').style.display = 'block';

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("location-result-address")[0];
    aMap = liMap[i].getElementsByClassName("address")[0];
    
    txtValue = a.textContent || a.innerText;
    if (address) {
      if (txtValue.toUpperCase().indexOf(address.toUpperCase()) > -1 || address == 'refresh') {
        liMap[i].style.display = "";
        li[i].style.display = "";
      } else {
        liMap[i].style.display = "none";
        li[i].style.display = "none";
      }
    } else {
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        liMap[i].style.display = "";
        li[i].style.display = "";
      } else {
        liMap[i].style.display = "none";
        li[i].style.display = "none";
      }
    }
  }
}

let map;

async function initMap() {
  const restaurants = await getData();
  
  await createList(restaurants);

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: 43.70062, lng: -79.373517 },
    zoom: 11,
    mapId: "4504f8b37365c3d0",
  });

  for (const restaurant of restaurants) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(restaurant),
      position: {lat: restaurant.latitude, lng: restaurant.longitude},
      title: restaurant.name,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, restaurant);
    });
  }
}

function toggleHighlight(markerView, restaurant) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(restaurant) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        <img src="./assets/pizzahut-small.png" alt="restaurant image" height="50px" >
    </div>
    <div class="details">
        <div class="name">${restaurant.name}</div>
        <div class="phone">${restaurant.phone}</div>
        <div class="address">${restaurant.address}</div>
        <div class="button-container">
          <button class="fa fa-ruler fa-lg order" title="order" type="button" aria-hidden="true"  onclick="window.open('https://www.pizzahut.ca/', '_blank')">Order</button>
          <button class="fa fa-ruler fa-lg review" title="review" type="button" aria-hidden="true"  onclick="window.open('${restaurant.yelp}', '_blank')">Review</button>
        </div>
    </div>
    `;
  return content;
}