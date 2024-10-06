// ----------------------------------------------------------------------
// DATA TO SHOW FOR EACH PLANET
// ----------------------------------------------------------------------
const planetData = [
  {
    name: "Sun",
    description: "The Sun is the star at the center of the Solar System.",
    diameter: "1,391,000 kilometers",
    distanceFromEarth: "149.6 million kilometers",
    orbitalPeriod: "About 365.25 days",
    gravity: "274 m/s²",
    atmosphere: "Composed mainly of hydrogen and helium",
    moons: [],
    surfaceTemperature:
      "15 million degrees Celsius (27 million degrees Fahrenheit)",
    orbitalEccentricity: "0.0167",
    axialTilt: "7.25 degrees",
    ringSystem: false,
    surfaceFeatures:
      "The Sun's surface is turbulent, with sunspots, solar flares, and prominences.",
    discovery: "Known since prehistoric times",
    notableMissions: [],
    rotationPeriod:
      "About 25 days near the equator, longer at higher latitudes",
    magneticFieldStrength: "Varies, with an average of 1-2 Gauss",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Magnificent_CME_Erupts_on_the_Sun_-_August_31.jpg/640px-Magnificent_CME_Erupts_on_the_Sun_-_August_31.jpg",
  },
  {
    name: "Mercury",
    description:
      "Mercury is the smallest and innermost planet in the Solar System.",
    diameter: "4,880 kilometers",
    distanceFromSun: "57.91 million kilometers",
    orbitalPeriod: "88 days",
    gravity: "3.7 m/s²",
    atmosphere: "Thin and composed mainly of oxygen, sodium, and hydrogen",
    moons: [],
    surfaceTemperature: "430°C (800°F)",
    orbitalEccentricity: "0.206",
    axialTilt: "2.04 degrees",
    ringSystem: false,
    surfaceFeatures: "Craters and plains",
    discovery: "Known to ancient civilizations",
    notableMissions: [],
    rotationPeriod: "59 days",
    magneticFieldStrength: "0.00006 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mercury_MESSENGER_MDIS_Basemap_MD3Color_Mosaic_Global_665m.tif/lossy-page1-640px-Mercury_MESSENGER_MDIS_Basemap_MD3Color_Mosaic_Global_665m.tif.jpg",
  },
  {
    name: "Venus",
    description:
      "Venus is the second planet from the Sun, named after the Roman goddess of love and beauty.",
    diameter: "12,104 kilometers",
    distanceFromSun: "108.2 million kilometers",
    orbitalPeriod: "225 days",
    gravity: "8.87 m/s²",
    atmosphere:
      "Thick with clouds of sulfuric acid, causing a runaway greenhouse effect",
    moons: [],
    surfaceTemperature: "471°C (880°F)",
    orbitalEccentricity: "0.007",
    axialTilt: "177.36 degrees",
    ringSystem: false,
    surfaceFeatures: "Volcanoes and plains",
    discovery: "Known to ancient civilizations",
    notableMissions: [],
    rotationPeriod: "243 days",
    magneticFieldStrength: "0.000015 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/PIA00233-_Venus_-_3D_Perspective_View_of_Eistla_Regio.jpg/640px-PIA00233-_Venus_-_3D_Perspective_View_of_Eistla_Regio.jpg",
  },
  {
    name: "Earth",
    description:
      "Earth is the third planet from the Sun, and the only celestial body known to support life.",
    diameter: "12,742 kilometers",
    distanceFromSun: "149.6 million kilometers",
    orbitalPeriod: "365.25 days",
    gravity: "9.81 m/s²",
    atmosphere:
      "Rich in nitrogen and oxygen, supporting a diverse range of life forms",
    moons: ["Moon"],
    surfaceTemperature: "Varies (-88°C to 58°C / -126°F to 136°F)",
    orbitalEccentricity: "0.017",
    axialTilt: "23.44 degrees",
    ringSystem: false,
    surfaceFeatures: "Oceans, mountains, and diverse landscapes",
    discovery: "Known to ancient civilizations",
    notableMissions: ["Apollo 11", "Curiosity Rover"],
    rotationPeriod: "24 hours",
    magneticFieldStrength: "0.25 to 0.65 Gauss",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Dream_land_on_planet_earth_-_Saiful_Muluk_Lake.jpg/640px-Dream_land_on_planet_earth_-_Saiful_Muluk_Lake.jpg",
  },
  {
    name: "Mars",
    description:
      'Mars is the fourth planet from the Sun, often called the "Red Planet" due to its reddish appearance.',
    diameter: "6,779 kilometers",
    distanceFromSun: "227.9 million kilometers",
    orbitalPeriod: "687 days",
    gravity: "3.71 m/s²",
    atmosphere: "Thin and composed mainly of carbon dioxide",
    moons: ["Phobos", "Deimos"],
    surfaceTemperature: "-87°C (-125°F) to -5°C (23°F)",
    orbitalEccentricity: "0.093",
    axialTilt: "25.19 degrees",
    ringSystem: false,
    surfaceFeatures: "Valleys, deserts, and polar ice caps",
    discovery: "Known to ancient civilizations",
    notableMissions: ["Mars Rover (various missions)"],
    rotationPeriod: "24.6 hours",
    magneticFieldStrength: "0.001 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mars_Perseverance_ZL0_0069_0673066054_500ECV_N0032208ZCAM05053_026050J-web1.jpg/640px-Mars_Perseverance_ZL0_0069_0673066054_500ECV_N0032208ZCAM05053_026050J-web1.jpg",
  },
  {
    name: "Jupiter",
    description:
      "Jupiter is the largest planet in the Solar System, known for its prominent bands of clouds and the Great Red Spot.",
    diameter: "139,820 kilometers",
    distanceFromSun: "778.5 million kilometers",
    orbitalPeriod: "11.86 years",
    gravity: "24.79 m/s²",
    atmosphere: "Primarily composed of hydrogen and helium",
    moons: ["Io", "Europa", "Ganymede", "Callisto"],
    surfaceTemperature: "-145°C (-234°F)",
    orbitalEccentricity: "0.049",
    axialTilt: "3.13 degrees",
    ringSystem: true,
    surfaceFeatures: "Gas giant with bands of clouds and the Great Red Spot",
    discovery: "Known to ancient civilizations",
    notableMissions: ["Galileo Probe", "Juno"],
    rotationPeriod: "9.8 hours",
    magneticFieldStrength: "14 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/PIA22939_-_Jupiter%27s_Brown_Barge.jpg/640px-PIA22939_-_Jupiter%27s_Brown_Barge.jpg",
  },
  {
    name: "Saturn",
    description:
      "Saturn is the sixth planet from the Sun, famous for its spectacular ring system.",
    diameter: "116,460 kilometers",
    distanceFromSun: "1.43 billion kilometers",
    orbitalPeriod: "29.46 years",
    gravity: "10.44 m/s²",
    atmosphere: "Mainly hydrogen and helium",
    moons: ["Titan", "Enceladus", "Mimas", "Rhea"],
    surfaceTemperature: "-178°C (-289°F)",
    orbitalEccentricity: "0.056",
    axialTilt: "26.73 degrees",
    ringSystem: true,
    surfaceFeatures: "Gas giant with a prominent ring system",
    discovery: "Known to ancient civilizations",
    notableMissions: ["Cassini-Huygens"],
    rotationPeriod: "10.7 hours",
    magneticFieldStrength: "0.22 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Saturn_Outer_Rings.jpg/640px-Saturn_Outer_Rings.jpg",
  },
  {
    name: "Uranus",
    description:
      "Uranus is the seventh planet from the Sun, known for its unique rotation on its side.",
    diameter: "50,724 kilometers",
    distanceFromSun: "2.87 billion kilometers",
    orbitalPeriod: "84 years",
    gravity: "8.69 m/s²",
    atmosphere: "Primarily composed of hydrogen, helium, and methane",
    moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"],
    surfaceTemperature: "-224°C (-371°F)",
    orbitalEccentricity: "0.046",
    axialTilt: "97.77 degrees",
    ringSystem: true,
    surfaceFeatures: "Gas giant with a tilted rotation axis",
    discovery: "Discovered by William Herschel in 1781",
    notableMissions: [],
    rotationPeriod: "17.2 hours",
    magneticFieldStrength: "0.23 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Two_color_images_of_Uranus_from_9.1_million_km_%28Voyager_2%2C_P-29478%29.tif/lossless-page1-640px-Two_color_images_of_Uranus_from_9.1_million_km_%28Voyager_2%2C_P-29478%29.tif.png",
  },
  {
    name: "Neptune",
    description:
      "Neptune is the eighth and farthest planet from the Sun, known for its vibrant blue color.",
    diameter: "49,244 kilometers",
    distanceFromSun: "4.5 billion kilometers",
    orbitalPeriod: "164.8 years",
    gravity: "11.15 m/s²",
    atmosphere: "Mainly composed of hydrogen, helium, and methane",
    moons: ["Triton", "Nereid", "Proteus", "Larissa"],
    surfaceTemperature: "-201°C (-330°F)",
    orbitalEccentricity: "0.010",
    axialTilt: "28.32 degrees",
    ringSystem: true,
    surfaceFeatures: "Storms and a dynamic atmosphere",
    discovery: "Discovered mathematically before direct observation in 1846",
    notableMissions: ["Voyager 2"],
    rotationPeriod: "16.1 hours",
    magneticFieldStrength: "0.46 times that of Earth",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Springtime_on_Neptune-_Increased_Brightness_Shows_Seasonal_Change.jpg/640px-Springtime_on_Neptune-_Increased_Brightness_Shows_Seasonal_Change.jpg",
  },
  {
    name: "Pluto",
    description:
      "Pluto is a dwarf planet located in the Kuiper Belt, beyond Neptune.",
    diameter: "2,377 kilometers",
    distanceFromSun: "5.91 billion kilometers",
    orbitalPeriod: "248 years",
    gravity: "0.62 m/s²",
    atmosphere:
      "Thin and primarily composed of nitrogen, methane, and carbon monoxide",
    moons: ["Charon", "Styx", "Nix", "Kerberos", "Hydra"],
    surfaceTemperature: "-233°C (-387°F) to -223°C (-369°F)",
    orbitalEccentricity: "0.248",
    axialTilt: "122.53 degrees",
    ringSystem: false,
    surfaceFeatures:
      "Varied terrain with plains, mountains, and possible ice volcanoes",
    discovery: "Discovered by Clyde Tombaugh in 1930",
    notableMissions: ["New Horizons"],
    rotationPeriod: "6.4 days",
    magneticFieldStrength: "Unknown",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pluto-FarSideView-2019.jpg/640px-Pluto-FarSideView-2019.jpg",
  },
];

// ----------------------------------------------------------------------
// CREATE THE SOLAR SYSTEM
// ----------------------------------------------------------------------

// VARIABLES TO REPRESENT EACH PLANET
var sunImage,
  mercuryImage,
  venusImage,
  earthImage,
  marsImage,
  jupiterImage,
  saturnImage,
  uranusImage,
  neptuneImage,
  plutoImage;

var planetDistances = [0, 400, 580, 760, 1000, 2000, 2500, 3300, 3900, 4400];

var planetSizes = {
  Sun: 300,
  Mercury: 50,
  Venus: 121,
  Earth: 127,
  Mars: 110,
  Jupiter: 200,
  Saturn: 170,
  Uranus: 160,
  Neptune: 150,
  Pluto: 50,
};

var planetNames = [
  "Sun",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

var selectedPlanet = null;
var zoom = 1;
var zoomRate = 0.02; // Adjusted zoom rate
var backgroundImage;
var solarSystemCanvas;
var canvasContainer = document.getElementById("solar-system-simulator")

// FUNCTION TO DRAW THE BACKGROUND
function drawBackground() {
  // Draw the background image
  imageMode(CORNER);
  image(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function preload() {
  backgroundImage = loadImage("public/assets/simulator_bg.jpg");
  sunImage = loadImage("public/assets/Celestial Objects/sun.png");
  mercuryImage = loadImage("public/assets/Celestial Objects/mercury.png");
  venusImage = loadImage("public/assets/Celestial Objects/venus.png");
  earthImage = loadImage("public/assets/Celestial Objects/earth.png");
  marsImage = loadImage("public/assets/Celestial Objects/mars.png");
  jupiterImage = loadImage("public/assets/Celestial Objects/jupiter.png");
  saturnImage = loadImage("public/assets/Celestial Objects/saturn.png");
  uranusImage = loadImage("public/assets/Celestial Objects/uranus.png");
  neptuneImage = loadImage("public/assets/Celestial Objects/neptune.png");
  plutoImage = loadImage("public/assets/Celestial Objects/pluto.png");
}

function setup() {
  canvasContainer = select("#solar-system-simulator");
  solarSystemCanvas = createCanvas( canvasContainer.width, canvasContainer.height);
  solarSystemCanvas.parent("solar-system-simulator");
  resizeCanvasToParent()
}


function draw() {
  background(0);
  drawBackground();

  // Draw Planets and Orbits
  for (let i = 0; i < planetDistances.length; i++) {
    // Calculate planet position
    const angle = millis() * 0.0001 * (i + 1); // Make planets move slowly
    const planetX = width / 2 + planetDistances[i] * cos(angle) * zoom;
    const planetY = height / 2 + planetDistances[i] * sin(angle) * zoom;

    // Draw orbit
    noFill();
    stroke(100);
    let orbitRadius = abs(planetDistances[i] * 2) * zoom;
    ellipse(canvas.width / 2, canvas.height / 2, orbitRadius);

    // Draw planet image with adjusted size
    let planetImage;
    if (i === 0) {
      // Sun
      planetImage = sunImage;
    } else {
      planetImage = eval(`${planetNames[i].toLowerCase()}Image`);
    }

    if (planetImage) {
      imageMode(CENTER);
      image(
        planetImage,
        planetX,
        planetY,
        planetSizes[planetNames[i]] * zoom,
        planetSizes[planetNames[i]] * zoom
      );
    }

    // Check if mouse is over the planet
    const distanceToMouse = dist(mouseX, mouseY, planetX, planetY);
    const planetRadius = (planetSizes[planetNames[i]] / 2) * zoom;
    if (distanceToMouse < planetRadius) {
      cursor(HAND);
      if (mouseIsPressed) {
        selectedPlanet = planetNames[i];
        console.log(`Clicked on ${selectedPlanet}`);
        showPlanetInfo(selectedPlanet);
      }
    }
  }
}

function windowResized() {
  // Call the function to resize the canvas whenever the window is resized
  resizeCanvasToParent();
}

function resizeCanvasToParent() {
  // Set the canvas size to match the parent size
  let canvasWidth = canvasContainer.width;
  let canvasHeight = canvasContainer.height;
  resizeCanvas(canvasWidth, canvasHeight);
}

function mouseWheel(event) {
  // Check if the cursor is inside the container
  if (
    mouseX >= 0 &&
    mouseX <= canvas.width &&
    mouseY >= 0 &&
    mouseY <= canvas.height
  ) {
    // Zoom based on mouse wheel movement
    zoom *= pow(1.1, event.delta * 0.01);
    // Prevent the default behavior of the wheel event
    event.preventDefault();
  }
}

function mousePressed() {
  // Start dragging
  if (mouseButton === LEFT) {
    isDragging = true;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

function mouseReleased() {
  // Stop dragging
  if (mouseButton === LEFT) {
    isDragging = false;
  }
}

function mouseDragged() {
  // Drag the scene when the left mouse button is held down
  if (isDragging) {
    offsetX += mouseX - prevMouseX;
    offsetY += mouseY - prevMouseY;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
  return false;
}

// ----------------------------------------------------------------------
// SHOW AND REMOVE THE CARD FOR PLANET INFO AS REQUIRED
// ----------------------------------------------------------------------

function showPlanetInfo(planetName) {
  // Import card elements
  const planetInfo = document.getElementById("display-planet-info");
  const planetInfoName = document.getElementById("planet-info-name");
  const planetInfoPara = document.getElementById("planet-info-para");
  const planetInfoImg = document.getElementById("planet-info-img");
  const planetClose = document.getElementById("planet-card-close");

  // Decide for which planet, the card will show info
  let idx = 0;
  switch (planetName) {
    case "Sun":
      idx = 0;
      break;
    case "Mercury":
      idx = 1;
      break;
    case "Venus":
      idx = 2;
      break;
    case "Earth":
      idx = 3;
      break;
    case "Mars":
      idx = 4;
      break;
    case "Jupiter":
      idx = 5;
      break;
    case "Saturn":
      idx = 6;
      break;
    case "Uranus":
      idx = 7;
      break;
    case "Neptune":
      idx = 8;
      break;
    case "Pluto":
      idx = 9;
      break;
    default:
      idx = 0;
  }

  // Set the title of the Card
  planetInfoName.textContent = planetData[idx].name;
  planetInfoImg.setAttribute("src", planetData[idx].url);

  // Select the object from list
  const obj = planetData[idx];

  // Create a list
  const ulElement = document.createElement("div");

  // Loop through the object properties and create list items
  for (const key in planetData[idx]) {
    if (key == "url") {
      continue;
    }
    if (obj.hasOwnProperty(key)) {
      const liElement = document.createElement("p");
      const keySpan = document.createElement("b");
      keySpan.textContent = key;
      keySpan.classList.add("txt-body-bold");

      // Append the key span and the value to the list item
      liElement.appendChild(keySpan);
      liElement.innerHTML += `: ${obj[key]}`;
      ulElement.appendChild(liElement);
    }
  }

  // Append the unordered list to the output element
  planetInfoPara.innerHTML = "";
  planetInfoPara.innerText = "";

  planetInfo.classList.add("active");
  planetInfoPara.appendChild(ulElement);

  planetClose.addEventListener("click", () => {
    planetInfo.classList.remove("active");
  });
}

const planetNameElements = document.querySelectorAll(".planet-option");

// Attach click event listener to each element
planetNameElements.forEach((element) => {
  element.addEventListener("click", function () {
    // Call showInfo function with text content as an argument
    showPlanetInfo(this.textContent);
  });
});
