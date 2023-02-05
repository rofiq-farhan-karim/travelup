const formSearchElement = document.getElementById("form-search");
const travelListElement = document.getElementById("list-travel");

formSearchElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formSearchElement);
  const keyword = formData.get("keyword");

  const url = `https://api.kontenbase.com/query/api/v1/14f22a94-a5ab-4f5c-96e5-a37e13f087b9/posts?title[$contains]=${keyword}`;
  const response = await fetch(url);
  const destinations = await response.json();

  renderDestinations(destinations);
});

function renderDestinations(destinations) {
  travelListElement.innerHTML = destinations
    .map((destination) => {
      const imageUrl =
        destination.image?.length > 0 && destination.image[0]?.url;

      return `
        <div>
          <h3>${destination.title}</h3>
          <img src=${imageUrl} alt=${destination.title} height="300">
          <p>${destination.detail}</p>
          <a href=${destination.link}>Google Maps</a>
        </div>
      `;
    })
    .join("");
}

async function main() {
  const url = `https://api.kontenbase.com/query/api/v1/14f22a94-a5ab-4f5c-96e5-a37e13f087b9/posts`;
  const response = await fetch(url);
  const destinations = await response.json();

  renderDestinations(destinations);
}

main();
