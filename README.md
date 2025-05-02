
📊 Angular ECharts Demo
An interactive and responsive dashboard built with Angular and ECharts to visualize programming language usage.

🌐 GitHub Repository: AngularEChartsDemo

🚀 Features
Dynamic chart type switching: Bar, Line, Pie

Tooltip with additional technical insights

Responsive chart resizing

Clean, modular architecture using Angular services and components

Easy to extend with live or API-based data

💻 Tech Stack
Angular 17

ECharts 5.x

TypeScript

🧱 Project Structure
ChartComponent: Main ECharts display with dynamic chart selection

ChartService: Provides chart data (mocked; can be connected to APIs)

ChartData Model: Interface for chart data structure

AppComponent: Wrapper for the chart and layout

🛠 Setup Instructions
Clone the repository and install dependencies:

bash
Copy
Edit
git clone https://github.com/pandeyshikha123/AngularEChartsDemo.git
cd AngularEChartsDemo
npm install
Start the development server:

bash
Copy
Edit
ng serve
Then open your browser at: http://localhost:4200/

📦 Build
To build the project for production:

bash
Copy
Edit
ng build
Build output will be in the dist/ directory.

✅ Testing
To run unit tests:

bash
Copy
Edit
ng test
