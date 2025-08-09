# 📚 Flashcard Quizzer

A modern, responsive flashcard application built with React that helps you create, organize, and study custom flashcard decks with an intelligent spaced repetition system.

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.0.4-green.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-blue.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-purple.svg)

## ✨ Features

### 🎯 Core Functionality

-   **Create Custom Decks**: Build personalized flashcard collections with titles and descriptions
-   **Smart Card Management**: Add, edit, and delete flashcards with front/back content
-   **Intelligent Quiz System**: Spaced repetition algorithm that adapts to your learning progress
-   **Progress Tracking**: Monitor your performance with detailed statistics and scores
-   **Responsive Design**: Seamless experience across desktop and mobile devices

### 🧠 Learning Features

-   **Spaced Repetition**: Cards are scheduled for review based on your performance
-   **Due Card Notifications**: See exactly how many cards are ready for review
-   **Performance Analytics**: Track correct/incorrect answers and overall progress
-   **Adaptive Scheduling**: Cards you struggle with appear more frequently
-   **Quiz Completion Scores**: Get instant feedback with percentage-based results

### 🎨 User Experience

-   **Modern UI**: Clean, intuitive interface built with styled-components
-   **Dark/Light Themes**: Comfortable studying in any lighting condition
-   **Smooth Animations**: Subtle transitions enhance the user experience
-   **Keyboard Navigation**: Efficient studying with keyboard shortcuts
-   **Confirmation Dialogs**: Prevent accidental deletions with safety prompts

## 🚀 Quick Start

### Prerequisites

-   Node.js 16+
-   npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/flashcard-quizzer.git
    cd flashcard-quizzer
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development servers**

    ```bash
    # Start both the JSON server and Vite dev server
    npm run dev:all

    # Or start them separately:
    npm run server  # JSON server on port 3001
    npm run dev     # Vite dev server on port 5173
    ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using the application!

## 📖 How to Use

### Creating Your First Deck

1. Click **"Create Deck"** on the dashboard
2. Enter a deck name and description
3. Add flashcards with front/back content
4. Save your deck to start studying

### Studying with Flashcards

1. Click **"Start Quiz"** or **"Review Cards"** on any deck
2. Read the front of the card and try to recall the answer
3. Click **"Reveal Answer"** to see the back
4. Mark your response as **Correct** or **Incorrect**
5. The spaced repetition system will schedule the next review

### Managing Your Decks

-   **Edit**: Update deck details and modify flashcards
-   **Delete**: Remove decks you no longer need (with confirmation)
-   **Statistics**: View card counts, due reviews, and last quiz scores

## 🛠️ Built With

### Frontend Technologies

-   **[React 19.1.0](https://react.dev/)** - Modern UI library with latest features
-   **[Vite 7.0.4](https://vitejs.dev/)** - Lightning-fast development build tool
-   **[React Router 7.7.1](https://reactrouter.com/)** - Client-side routing and navigation
-   **[Redux Toolkit 2.8.2](https://redux-toolkit.js.org/)** - State management solution

### Styling & UI

-   **[TailwindCSS 4.1.11](https://tailwindcss.com/)** - Utility-first CSS framework
-   **[Styled Components 6.1.13](https://styled-components.com/)** - CSS-in-JS styling
-   **[tailwind-styled-components](https://github.com/MathiasGilson/tailwind-styled-components)** - Tailwind + Styled Components integration
-   **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - Beautiful icon library
-   **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Development Tools

-   **[ESLint 9.30.1](https://eslint.org/)** - Code linting and quality assurance
-   **[React Hook Form 7.62.0](https://react-hook-form.com/)** - Performant form handling
-   **[date-fns 4.1.0](https://date-fns.org/)** - Modern date utility library
-   **[JSON Server 1.0.0](https://github.com/typicode/json-server)** - Mock REST API for development

## 📁 Project Structure

```
flashcard-quizzer/
├── src/
│   ├── components/           # Feature-based components
│   │   ├── Dashboard/       # Main dashboard and deck cards
│   │   ├── Deck/           # Deck creation and editing
│   │   └── Quiz/           # Quiz functionality
│   ├── ui/                 # Reusable UI components
│   ├── services/           # API communication layer
│   ├── utils/              # Helper functions and utilities
│   ├── data/               # JSON server database
│   └── styles/             # Global styling
├── public/                 # Static assets
└── package.json           # Project configuration
```

## 🎯 Key Features Deep Dive

### Spaced Repetition Algorithm (Built by Copilot)

The application implements an intelligent spaced repetition system that:

-   Tracks each card's difficulty level based on your performance
-   Schedules reviews at optimal intervals (1 day, 3 days, 1 week, etc.)
-   Adapts to your learning pace - difficult cards appear more frequently
-   Maximizes long-term retention with minimal study time

### Performance Analytics

-   **Card Statistics**: See total cards, due for review, and mastery levels
-   **Quiz Results**: Track your percentage scores over time
-   **Progress Indicators**: Visual feedback on your learning journey
-   **Time Tracking**: Monitor when decks were created and last updated

### Responsive Design

-   **Mobile-First**: Optimized for studying on any device
-   **Touch-Friendly**: Large buttons and intuitive gestures
-   **Adaptive Layouts**: Content reorganizes for different screen sizes
-   **Performance Optimized**: Fast loading and smooth interactions

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start Vite development server
npm run server       # Start JSON server for API
npm run dev:all      # Start both servers concurrently

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint for code quality
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

-   Follow the existing code style and conventions
-   Write meaningful commit messages
-   Test your changes thoroughly
-   Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   **Spaced Repetition**: Inspired by proven learning methodologies
-   **Modern React Patterns**: Following current best practices and hooks
-   **Accessibility**: Built with inclusive design principles
-   **Performance**: Optimized for speed and efficiency

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/flashcard-quizzer/issues) page
2. Create a new issue with detailed information
3. Reach out to the maintainers

---

**Happy Learning! 🎓** Start building your flashcard decks and enhance your study routine today.
