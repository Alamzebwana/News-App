const API_KEY = "1d64ed33c3bcc190e5c8fb50506882fb"; 
const url = `https://gnews.io/api/v4/search?q=`;


window.addEventListener("load", () => fetchNews("technology")); 
const dropdownMenu = document.querySelector("#dropdown-menu");
dropdownMenu.addEventListener("change", function () {
  const selectedOption = this.value;
  fetchNews(selectedOption);
});

// Handle click events on list items
const listItems = document.querySelectorAll("li");
listItems.forEach((item) => {
  item.addEventListener("click", function () {
    listItems.forEach((li) => li.classList.remove("active")); 
    this.classList.add("active");
    fetchNews(this.innerText);
  });
});

// Handle search button click
const searchButton = document.querySelector("#search-button");
const searchText = document.querySelector("#search-text");
searchButton.addEventListener("click", function () {
  const query = searchText.value;
  fetchNews(query);
});

// Fetch news articles from GNews API
async function fetchNews(query) {
  console.log(`Fetching news for query: ${query}`); // Debugging log

  try {
    const res = await fetch(`${url}${query}&token=${API_KEY}`);
    const data = await res.json();
    console.log("API Response:", data); // Debugging log for API response

    if (!data.articles || data.articles.length === 0) {
      showError("No news found. Please try a different query.");
      return;
    }

    bindData(data.articles);
  } catch (error) {
    showError("Failed to load news. Please try again later.");
    console.error("Error fetching news:", error);
  }
}

// Bind articles to the page
function bindData(articles) {
  const cardsContainer = document.querySelector(".card-container");
  cardsContainer.innerHTML = ""; 

  articles.forEach((element) => {
    if (element.image === null) return; // Skip articles without images
    const card = `
    <div class="card">
      <div class="card-img" style="background-image: url('${element.image}'); background-size: cover; height: 200px;"></div>
      <a href="${element.url}" target="_blank" class="card-link">
        <div class="card-img-hovered"></div>
      </a>
      <div class="card-info">
        <div class="card-about">
          <a class="card-tag tag-news">NEWS</a>
          <div class="card-time">${new Date(element.publishedAt).toLocaleString()}</div>
        </div>
        <h1 class="card-title">${element.title}</h1>
        <div class="card-creator">by ${element.source.name || "Unknown"}</div>
      </div>
    </div>`;

    cardsContainer.innerHTML += card;
  });
}

// Show error message if data cannot be fetched
function showError(message) {
  const cardsContainer = document.querySelector(".card-container");
  cardsContainer.innerHTML = `<p class="error">${message}</p>`;
}





let icon = document.querySelector(".light-dark-mode");

icon.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    icon.src = "download.png";
    if ((icon.src = "download.png")) {
      icon.style.color = "white";
    }
  } else {
    icon.src = "moon.png";
  }
});
