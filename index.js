let dataTravelItem = [];

const elListTravel = document.getElementById("list-travel");
const elFormSearch = document.getElementById("form-search");

elFormSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const elFormInputSearch = document.getElementById("form-input-search");
  const textSearch = elFormInputSearch.value;
  let filteredTravelData = filterDataTravel(textSearch);
  renderItem(filteredTravelData);

  console.log(textSearch);
});

function filterDataTravel(q) {
  let travelItems = dataTravelItem;

  let filteredData = travelItems.filter((el) =>
    el.title.toLowerCase().includes(q.toLowerCase())
  );
  return filteredData;
}

async function getDataTravel() {
  let url =
    "https://api.kontenbase.com/query/api/v1/14f22a94-a5ab-4f5c-96e5-a37e13f087b9/posts";
  let res = await fetch(url);
  dataTravelItem = await res.json();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderItem(travelItems) {
  removeAllChildNodes(elListTravel);

  for (let index = 0; index < travelItems.length; index++) {
    let travelItem = travelItems[index];

    const elCard = document.createElement("div");
    elCard.classList.add("card");

    const elCardTitle = document.createElement("h3");
    elCardTitle.textContent = travelItem.title;

    const elCardImage = document.createElement("img");
    elCardImage.src = travelItem.image[0].url;
    elCardImage.alt = travelItem.title + "-img";
    elCardImage.classList.add("card-image");

    const elCardDescription = document.createElement("p");
    elCardDescription.textContent = travelItem.detail;

    const elLink = document.createElement("a");
    elLink.href = travelItem.link;

    const elLinkButton = document.createElement("button");
    elLinkButton.textContent = "Google maps";
    elLink.appendChild(elLinkButton);

    elCard.appendChild(elCardTitle);
    elCard.appendChild(elCardImage);
    elCard.appendChild(elCardDescription);
    elCard.appendChild(elLink);

    elListTravel.appendChild(elCard);
  }
}

async function app() {
  await getDataTravel();

  renderItem(dataTravelItem);
}

app();
