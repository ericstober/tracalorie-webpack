# Tracalorie (Webpack Edition)

Tracalorie is a simple and intuitive calorie tracker app that allows users to log their meals, track calorie consumption, and maintain a healthier lifestyle. This project has been bundled with Webpack for optimized performance and modularity.

## Features

- **Add Meals**: Log meals with calorie information.
- **Edit and Delete Entries**: Update or remove existing meal entries.
- **Calorie Tracking**: Monitor daily calorie consumption.
- **Modern UI**: A clean and responsive user interface.

## Tech Stack

- **HTML**
- **CSS**
- **JavaScript**
- **Webpack**

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**

```bash
git clone https://github.com/ericstober/tracalorie-webpack.git
cd tracalorie-webpack
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

The application will be served to http://localhost:3000/

4. **Build for Production**

```bash
npm run build
```

## Usage

1. Add meals and their calorie values using the input form
2. View the list of meals with their respective calorie counts.
3. Edit or delete entires as needed to keep your calorie log accurate.

## File Structure

```
tracalorie-webpack/
├── src/
│   ├── index.html
│   ├── styles.css
│   ├── index.js
│   └── modules/
│       ├── mealTracker.js
│       └── utils.js
├── dist/
│   ├── [Generated files after build]
├── package.json
├── webpack.config.js
└── README.md
```

