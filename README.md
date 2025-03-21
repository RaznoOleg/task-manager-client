# Task Manager App

## Overview

This is the frontend application for the Task Management system, providing a user-friendly interface for creating, organizing, and managing tasks and subtasks. The application features a hierarchical task structure with intuitive navigation and management capabilities.

## Technologies Used

- **TypeScript** - Strongly typed programming language
- **React** - JavaScript library for building user interfaces
- **React Router DOM** - Routing library for React applications
- **TailwindCSS** - Utility-first CSS framework
- **Formik** - Form management library for React
- **Yup** - Schema validation library
- **Axios** - Promise-based HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Notification library

## Project Structure

```
├──📂 src/
│ ├──📂 api/                      # API related code
│ │ ├──📂 services/               # Service functions for API calls
│ ├──📂 components/               # Reusable UI components
│ │ ├──📂 Buttons/                # Button components
│ │ │ ├──📂 CreateTaskButton/     # Component for creating new tasks
│ │ │ ├──📂 IconTaskButton/       # Icon buttons for task actions
│ │ ├──📂 Paginator/              # Pagination component
│ │ ├──📂 SearchBar/              # Search functionality
│ │ ├──📂 StatusBadge/            # Visual indicator for task status
│ │ ├──📂 StatusFilter/           # Filter tasks by status
│ │ ├──📂 SubTaskList/            # Display and manage subtasks
│ │ ├──📂 TaskDetailsForm/        # Form for viewing/editing task details
│ │ ├──📂 TaskFormModal/          # Modal for task creation/editing
│ │ │ ├──📂 SubTaskFields/        # Form fields for subtasks
│ │ │ ├──📂 TaskFields/           # Form fields for tasks
│ │ ├──📂 TaskItem/               # Individual task display component
│ │ ├──📂 TasksList/              # List view of all tasks
│ ├──📂 hooks/                    # Custom React hooks
│ ├──📂 pages/                    # Page components
│ ├──📂 schemas/                  # Validation schemas
│ ├──📂 types/                    # TypeScript type definitions
│ ├──📂 utils/                    # Utility functions
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_TASKS_API_URL=http://localhost:5000/api
```

## Installation and Running the Application

### Prerequisites

- Node.js (v14 or higher)
- Backend API running (see backend README for setup)

## Steps

### 1. Clone the repository

```bash
git clone https://github.com/RaznoOleg/task-manager-client.git
cd task-manager-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

### 4. Build for production

```bash
npm run build
```

### 5. Access the application

- Development: `http://localhost:3000`
- Production: Deploy the contents of the `build` directory to your web server

## Features

### Task Management

- Create, view, edit, and delete tasks
- Organize tasks hierarchically with subtasks
- Filter tasks by status (TODO, IN_PROGRESS, DONE)
- Search tasks by title or description

### User Interface

- Responsive design for desktop and mobile devices
- Intuitive task creation and editing forms
- Visual indicators for task status
- Expandable/collapsible subtask lists

### Form Validation

- Client-side validation using Yup schemas
- Form state management with Formik
- Helpful error messages for invalid inputs

### Custom Hooks

The application uses several custom hooks to manage state and functionality:

#### `useTasks`:

- Task state management
- Task filtering
- Modal control for task creation/editing
- CRUD operations with recursive handling for nested tasks
- Error handling with toast notifications

#### `usePagination`:

- Handles pagination for any list of items

### Recursive Task Handling

The application implements recursive functions to handle the nested nature of tasks and subtasks

## Best Practices Used

1. **Component Organization**: Structured by feature and responsibility
2. **Custom Hooks**: Separation of business logic from UI components
3. **TypeScript**: Strong typing for props, state, and API responses
4. **Form Validation**: Client-side validation with Yup schemas
5. **Responsive Design**: User-friendly UI using TailwindCSS
6. **ESLint & Prettier**: Used to enforce a consistent code style
7. **Module Aliases (@)**: Used for cleaner and shorter imports

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, reach out to razno.oleg@gmail.com.
