# YatraCalci – Map-Based Fare Estimator

YatraCalci is a modern, animated, map-based cab fare estimator built using HTML, CSS, JavaScript, and Leaflet Maps.
It calculates real-world distance, draws routes between points, estimates fare, assigns demo drivers,
and offers an attractive animated interface with a moving road and running cars.

---

## Screenshots

### Header Preview

![Header Preview](header-preview.png)

### Map Screen Preview

![Map Preview](map-preview.png)

### Bottom Panel Preview

![Panel Preview](panel-preview.png)

---

## Live Demo

[https://yug1505-coder.github.io/YatraCalci/](https://yug1505-coder.github.io/YatraCalci/)

---

## Features

### Map Features

* Click once to set the pickup location
* Click again to set the drop location
* Draws a clean route between both points
* Calculates the distance using the Haversine formula
* Offers location search using the OpenStreetMap Nominatim API

### Fare Calculation

* Base fare + per-kilometer pricing
* Includes a 5% tax
* Displays fare details clearly
* Assigns a random demo driver with name, car, and rating

### Animated Header

* Dark glowing header
* Moving road animation
* Colorful cars moving in different lanes
* Fully responsive layout suitable for both mobile and desktop screens

---

## Tech Stack

| Component     | Technology         |
| ------------- | ------------------ |
| Map Rendering | Leaflet.js         |
| Geocoding     | Nominatim OSM API  |
| Frontend      | HTML and CSS       |
| Animations    | CSS Keyframes      |
| Logic         | Vanilla JavaScript |
| Hosting       | GitHub Pages       |

---

## Folder Structure

```
YatraCalci/
├── index.html
├── style.css
├── app.js
└── README.md
```

---

## Installation and Running Locally

### 1. Clone the Repository

```
git clone https://github.com/yug1505-coder/YatraCalci.git
```

### 2. Open the Project

Open the folder in a code editor, or simply double-click the `index.html` file.

### 3. Optional: Use Live Server

If using VS Code, right-click on `index.html` and select “Open with Live Server” for easier testing.

---

## How It Works

### 1. Pickup and Drop Selection

* First click on the map sets the pickup point
* Second click sets the drop point
* A third click resets and allows selecting new points

### 2. Distance Calculation

Distance between the two points is calculated using the Haversine formula, providing an accurate real-world value.

### 3. Route Drawing

Leaflet’s routing engine draws a clean polyline route between the pickup and drop locations.

### 4. Fare Calculation

The fare is calculated using the formula:
Base Fare + (Distance × Price per km) + 5% tax

### 5. Driver Assignment

A random demo driver is displayed with basic details such as name, car model, and rating.

---

## License

MIT License suggested. You may use or modify the project with proper credit.

---

## Author

Yug Babbar
B.Tech CSE (2nd Year)
Full-Stack and AI Learner
GitHub: [https://github.com/yug1505-coder](https://github.com/yug1505-coder)

---

## Notes for Recruiters

This project demonstrates:

* Practical JavaScript logic
* Working with external APIs
* Map-based UI development
* Frontend animation and UI design skills
* Clean file structure and organization
* Real-time interaction handling

---

© 2025 Yug Babbar. All rights reserved.
