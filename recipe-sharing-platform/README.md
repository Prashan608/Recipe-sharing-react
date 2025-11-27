# Recipe Sharing Platform

A modern, responsive React-based platform for food enthusiasts to discover, share, and organize their favorite recipes.

## 🌟 Features

*   **Recipe Discovery**: Browse and search for recipes using a powerful external API (TheMealDB).
*   **Create & Share**: User-friendly interface for creating and publishing your own recipes.
*   **Nutrition Analysis**: Integrated with Edamam API to calculate nutritional information (Calories, Protein, Fat, Carbs) for recipes.
*   **Categories**: Filter recipes by categories like Breakfast, Vegetarian, Chicken, Seafood, and more.
*   **Responsive Design**: Fully responsive UI built with Tailwind CSS, supporting both Light and Dark modes.
*   **User Authentication**: (Mock) Login and Registration flow with protected routes.
*   **Interactive UI**: Beautiful recipe cards, star ratings, and commenting system.

## 🛠️ Tech Stack

*   **Frontend Framework**: React 19 + Vite
*   **Styling**: Tailwind CSS v4
*   **Routing**: React Router v7
*   **State Management**: Context API (AuthContext)
*   **API Integration**: Axios (TheMealDB & Edamam)
*   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/recipe-sharing-platform.git
    cd recipe-sharing-platform
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    *   Create a `.env` file in the root directory.
    *   Add your Edamam API credentials (optional, but required for nutrition analysis):
        ```env
        VITE_EDAMAM_APP_ID=your_app_id
        VITE_EDAMAM_APP_KEY=your_app_key
        ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components (Header, RecipeCard, etc.)
├── context/            # Global state management (AuthContext)
├── hooks/              # Custom React hooks (useAuth)
├── pages/              # Application pages (Home, RecipeView, CreateRecipe, etc.)
├── services/           # API services (recipeService, nutritionService)
├── App.jsx             # Main application component with routing
└── main.jsx            # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
