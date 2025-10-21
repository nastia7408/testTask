# Bike Shop Filter Page

A responsive bike listing page built with **React**, **TypeScript**, and **Vite**, featuring filters, price range, pagination, and dark mode.

## Demo

Check the live demo here: [https://nastia7408.github.io/testTask](https://nastia7408.github.io/testTask)

## Features

- Filter bikes by type/specifications
- Filter by minimum and maximum price
- Histogram slider for price range
- Sort bikes by price, closest, newest, or retailer
- Pagination with adjustable results per page
- Dark mode toggle
- Fully responsive design

## Technologies Used

- **React 19** with **TypeScript**
- **Vite** for bundling and development server
- **Sass** for styling
- **Git & GitHub** for version control
- **gh-pages** for deployment

## Installation & Running Locally

1. Clone the repository:

git clone https://github.com/nastia7408/testTask.git
cd testTask

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Deployment

The project is deployed via **GitHub Pages**:

npm run deploy

## Folder Structure

testTask/
├─ src/
│ ├─ App.tsx
│ ├─ bikes.ts
│ ├─ HistogramSlider.tsx
│ └─ App.css
├─ public/
├─ package.json
├─ tsconfig.json
└─ README.md

## Notes

- Make sure to adjust the `homepage` field in `package.json`:

"homepage": "https://nastia7408.github.io/testTask"

- All changes are version-controlled with Git. Commit often for easier tracking.
