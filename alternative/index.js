const formSearchElement = document.getElementById("form-search");

formSearchElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formSearchElement);

  const keyword = formData.get("keyword");

  console.log({ keyword });
});
