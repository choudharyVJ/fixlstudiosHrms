FixlStudios HRMS Dashboard
Welcome to the FixlStudios Human Resource Management System (HRMS) Dashboard, a React-based project designed to help manage employee data, attendance, payroll, leaves, and departments with a clean and dynamic user interface.

Key Features
State Management with React Context: We use React's Context API extensively to manage global state. Each major data feature—Employees, Departments, Attendance, Leave Requests, and Payroll—is managed through its own context provider. This modular structure ensures clean separation of concerns and easy scalability.

Dynamic Data Persistence: All core datasets (employees, departments, attendance records, leave requests) are persisted in the browser’s localStorage. This ensures data persistence across sessions without a backend.

Data Synchronization and Updates: Context providers initialize their state from either localStorage or derive data dynamically (e.g., departments derived from employees). All updates to data are consistently synchronized back to localStorage, keeping the UI and storage in sync.

Usage of React useReducer and useState: Some contexts leverage useReducer for complex state actions (like leaves management), while others rely on useState with update functions for simpler state updates (such as attendance and departments). This pragmatic usage balances code maintainability and functionality.

Charts and Data Visualization:

Chart.js and react-chartjs-2: Visual components like bar and line charts display department-wise salaries and attendance trends effectively.

Dynamic charts update live based on localStorage data changes and React state.

Components are designed to gracefully handle empty or initializing data states.

Component-Based UI with Tailwind CSS: The project uses Tailwind CSS for rapid and customizable styling, ensuring responsive and modern design patterns.

Routing and Navigation: React Router DOM provides navigation structure (not detailed here but included in dependencies for future extensions).

Enhanced UX:

Data tables with pagination for attendance and department management.

Modals for adding and editing department details.

CSV export support using react-csv.

Toast notifications via react-hot-toast for instant user feedback on data actions.

Testing Libraries: Set up with popular React testing tools (@testing-library/react, jest-dom, user-event) to encourage robust unit and integration tests.

Main Third-Party Libraries
React: Core UI library

React Router DOM: Navigation and routing

Chart.js & react-chartjs-2: Interactive data visualization

React CSV: Data export functionality

React Hot Toast: Toast notifications

Tailwind CSS: Styling and layout

Testing Libraries: For quality assurance and test writing

Folder Structure Highlights
/context: Context providers for employees, departments, attendance, leave, payroll.

/components: Reusable components including charts, tables, modals, and UI elements.

/pages: Main views like Dashboard, Departments, Attendance management.

/components/chart: Chart components designed to cleanly visualize HR data.
