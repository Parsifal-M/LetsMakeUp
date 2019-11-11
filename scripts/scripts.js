function getData() {
  //Remove previous results to create new cards
  const parent = document.getElementById("root");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }

  //Create new results
  var app = document.getElementById("root");

  var hideTitle = document.getElementById("landingTitle");
  hideTitle.style.display = "none";

  pValue = document.getElementById("myInput").value;

  var productSelected = pValue;

  var container = document.createElement("div");
  container.setAttribute(
    "class",
    "container",
    "shadow-lg p-3 mb-5 bg-white rounded"
  );

  app.appendChild(container);

  var request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=${productSelected}`,
    true
  );
  request.onload = function() {
    // Begin accessing JSON data here, we create cards with hyperlinks to the product.
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400 && data.length > 0) {
      data.forEach(vProd => {
        var cardLink = document.createElement("a");
        cardLink.setAttribute(`href`, `${vProd.product_link}`);
        cardLink.setAttribute("style", "text-decoration:none; color:inherit;");
        cardLink.setAttribute("target", "_blank");

        var card = document.createElement("div");
        card.setAttribute("class", "card");

        var h1 = document.createElement("h1");
        h1.setAttribute("class", "card-title");
        h1.textContent = vProd.name;

        var paraOne = document.createElement("p");
        paraOne.setAttribute("class", "card-text");
        vProd.description = vProd.description.substring(0, 5000);
        paraOne.textContent = `${vProd.description}`;

        container.appendChild(cardLink);
        container.appendChild(card);
        cardLink.appendChild(card);
        card.appendChild(h1);
        card.appendChild(paraOne);
      });
      //Error message if no results are found or API call is not successful.
    } else {
      const errorMessage = document.createElement("h6");
      errorMessage.setAttribute("id", "error-text");
      errorMessage.textContent = `No results! Try again..`;
      app.appendChild(errorMessage);
    }
  };
  request.send();
}
