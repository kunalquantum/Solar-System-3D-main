// ------------------------------------------------------------
// ALERT METHODS
// ------------------------------------------------------------

function showBackendProgressAlertMessage() {
  alert(
    "This functionality is currently unavailable.\nBackend Work is in Progress.",
  );
}

// ------------------------------------------------------------
// Astronomical Picture of the Day
// ------------------------------------------------------------

async function fetchAndSetAPOD() {
  const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

  const response = await fetch(apodUrl);
  const data = await response.json();
  // console.log(data)
  const apodImageUrl = data.url;
  const apodImage = document.getElementById("apod-img");
  const apodPara = document.getElementById("apod-para");
  const apodTitle = document.getElementById("apod-title");

  if (apodImage) {
    apodImage.src = apodImageUrl;
    apodImage.alt = data.title;
    apodTitle.innerText = data.title;
    para = data.explanation;
    let words = data.explanation.split(" ");

    if (words.length > 60) {
      // Truncate the text to 80 words
      var truncatedText = words.slice(0, 60).join(" ");

      // Create a span element for the truncated text
      var truncatedSpan = document.createElement("span");
      truncatedSpan.textContent = truncatedText;

      // Create a span element for the ellipsis
      var ellipsisSpan = document.createElement("span");
      ellipsisSpan.textContent = "...";

      // Create an anchor tag for "Read More"
      var readMoreLink = document.createElement("a");
      readMoreLink.href = "#"; // You can set the actual link here
      readMoreLink.textContent = "Read More";
      readMoreLink.addEventListener("click", function () {
        // Replace the truncated text with the full text
        apodPara.innerHTML = para;
      });

      // Append the elements to the paragraph
      apodPara.innerHTML = "";
      apodPara.appendChild(truncatedSpan);
      apodPara.appendChild(ellipsisSpan);
      apodPara.appendChild(readMoreLink);
    } else {
      apodPara.textContent = data.explanation;
    }
  }
}

// Call the function to fetch and set the APOD
fetchAndSetAPOD();

function truncateText(text, wordLimit = 80) {
  words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  } else {
    let truncatedText = words.slice(0, wordLimit).join(" ") + "...";
    const readMore = document.createElement("a");
    readMore.innerText = "Read More";
    readMore.addEventListener("click", () => {
      // action
    });

    return truncatedText;
  }
}

// ------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------

const eventTitle = document.getElementById("event-heading");
const eventPara = document.getElementById("event-para");
const eventImg = document.getElementById("event-img");
const eventSaveBtn = document.getElementById("event-save-btn");
const eventYTBtn = document.getElementById("event-yt-btn");
const calendarContainer = document.getElementById("calendar");
var events;
var currEvent;

async function updateCalendar() {
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;

  // Calculate the first day of the month and the total number of days
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 is Sunday, 1 is Monday, etc.
  const daysInMonth = new Date(year, month, 0).getDate();

  // Clear previous calendar content
  calendarContainer.innerHTML = "";

  // Display weekdays row
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach((weekday) => {
    const weekdayCell = document.createElement("div");
    weekdayCell.classList.add("weekday");
    weekdayCell.textContent = weekday;
    calendarContainer.appendChild(weekdayCell);
  });

  events = await getEventsForAMonth(year, month);

  // Create calendar grid
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("date", "empty");
    calendarContainer.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateCell = document.createElement("div");
    dateCell.classList.add("date");
    if (events[day]) {
      dateCell.classList.add("event");
      dateCell.addEventListener("click", updateEventCard);
    }
    dateCell.textContent = day;
    calendarContainer.appendChild(dateCell);
  }
}

function updateEventCard(event) {
  eventSaveBtn.classList.remove("hidden");
  eventYTBtn.classList.remove("hidden");
  currEvent = events[parseInt(event.target.textContent)];
  console.log(currEvent);
  eventTitle.textContent = currEvent.name;
  eventPara.textContent = currEvent.description;
  eventImg.setAttribute("src", currEvent.feature_image);
  eventYTBtn.setAttribute("href", currEvent.video_url);
}

async function getEventsForAMonth(year, month) {
  // const launchMainURL = 'https://launchlibrary.net/1.3/launch/upcoming';
  // const eventsMainURL = 'https://ll.thespacedevs.com/2.2.0/event/'
  const eventsDevURL = `https://lldev.thespacedevs.com/2.2.0/event?month=${month}&year=${year}`;
  const response = await fetch(eventsDevURL);
  const data = await response.json();
  const results = data.results;
  results.forEach((event) => {
    const date = new Date(event.date).getDate();
    // console.log(date)
    event.date = date;
  });
  // console.log(results);

  const objectOfObjects = results.reduce((acc, obj) => {
    acc[obj.date] = obj;
    return acc;
  }, {});

  // console.log(objectOfObjects);
  return objectOfObjects;
}

// Initial calendar update when the page loads
updateCalendar();

// --------------------------------------------------------------------------------------------
// NEWS
// --------------------------------------------------------------------------------------------

const newsHeading = document.getElementById("news-heading");
const newsCreditHeading = document.getElementById("news-credit");
const newsImage = document.getElementById("news-image");
const newsDescription = document.getElementById("news-description");
const spaceNewsContainer = document.getElementById("space-news-container");
const displayArticleBtn = document.getElementById("open-latest-news-article");

async function getArticleFromSpaceflight() {
  try {
    const path = `https://api.spaceflightnewsapi.net/v4/articles`;
    const queries = `?_limit=1&_sort=published_at:DESC`;
    const url = `${path}${queries}`;
    const response = await fetch(url);

    const data = await response.json();
    const article = data.results[0]; // Get the first article
    // console.log(article);

    // Update the content with the retrieved news
    newsHeading.textContent = article.title;
    newsCreditHeading.textContent = `Credit: ${article.news_site}`;
    newsImage.src = article.image_url || "placeholder-image-url"; // Use placeholder if image not available
    newsDescription.textContent = article.summary;
    displayArticleBtn.href = `${path}/${article.id}`;
  } catch (error) {
    console.error("Error fetching news:", error);
    // Handle errors gracefully, e.g., display an error message to the user
    newsHeading.textContent =
      "Failed to fetch latest news. Please try RELOADING.";
  }
}

async function displayISRONews() {
  const path = `https://api.spaceflightnewsapi.net/v4/articles`;
  const queries = `?title_contains=isro&_limit=1&_sort=published_at:DESC`;
  const url = `${path}${queries}`;
  const response = await fetch(url);

  const data = await response.json();
  const article = data.results[0]; // Get the first article
  // console.log(article);

  const heading = document.getElementById("news-isro-heading");
  const para = document.getElementById("news-isro-para");
  const btn = document.getElementById("news-isro-btn");
  const img = document.getElementById("news-isro-img");
  const imgCredit = document.getElementById("news-isro-img-credit");

  heading.textContent = article.title;
  para.textContent = article.summary;
  btn.href = `${path}/${article.id}`;
  imgCredit.textContent = `Credit: ${article.news_site}`;
  img.src = article.image_url || "placeholder-image-url"; // Use placeholder if image not available
}

async function displayNASANews() {
  const path = `https://api.spaceflightnewsapi.net/v4/articles`;
  const queries = `?title_contains=nasa&_limit=1&_sort=published_at:DESC`;
  const url = `${path}${queries}`;
  const response = await fetch(url);

  const data = await response.json();
  const article = data.results[0]; // Get the first article
  // console.log(article);

  const heading = document.getElementById("news-nasa-heading");
  const para = document.getElementById("news-nasa-para");
  const btn = document.getElementById("news-nasa-btn");
  const img = document.getElementById("news-nasa-img");
  const imgCredit = document.getElementById("news-nasa-img-credit");

  heading.textContent = article.title;
  para.textContent = article.summary;
  btn.href = `${path}/${article.id}`;
  imgCredit.textContent = `Credit: ${article.news_site}`;
  img.src = article.image_url || "placeholder-image-url"; // Use placeholder if image not available
}

async function displaySpaceXNews() {
  const path = `https://api.spaceflightnewsapi.net/v4/articles`;
  const queries = `?title_contains=spacex&_limit=1&_sort=published_at:DESC`;
  const url = `${path}${queries}`;
  const response = await fetch(url);

  const data = await response.json();
  const article = data.results[0]; // Get the first article
  // console.log(article);

  const heading = document.getElementById("news-spacex-heading");
  const para = document.getElementById("news-spacex-para");
  const btn = document.getElementById("news-spacex-btn");
  const img = document.getElementById("news-spacex-img");
  const imgCredit = document.getElementById("news-spacex-img-credit");

  heading.textContent = article.title;
  para.textContent = article.summary;
  btn.href = `${path}/${article.id}`;
  imgCredit.textContent = `Credit: ${article.news_site}`;
  img.src = article.image_url || "placeholder-image-url"; // Use placeholder if image not available
}

getArticleFromSpaceflight();
displayISRONews();
displayNASANews();
displaySpaceXNews();

// ------------------------------------------------------------
