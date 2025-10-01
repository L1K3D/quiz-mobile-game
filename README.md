# Quiz Mobile Game

A versatile and engaging mobile quiz application built with React Native and Expo. Create your own themes, add questions with multiple-choice answers, and challenge yourself by playing quizzes. The app stores all data locally on your device using SQLite, making it fully functional offline.

## ✨ Features

- **Theme Management**: Create, edit, and delete custom quiz themes.
- **Question Management**: Add, edit, and delete questions with multiple-choice answers for any theme.
- **Play Quiz**: Choose a theme, select the number of questions, and enjoy a shuffled quiz experience every time.
- **Scoring & Results**: Get immediate feedback on your answers and view a detailed performance summary at the end of each quiz.
- **Local Data Persistence**: All themes, questions, answers, and results are stored in a local SQLite database.

## 📱 Screens

- **Home**: The main entry point. Navigate to quiz management or start a new game.
- **Manage Quizzes**: A central hub to view, create, edit, and delete your quiz themes.
- **Visualize Questions**: For a selected theme, view, add, or edit its questions and answers.
- **Play Quiz**: The core gameplay interface where you answer questions.
- **Quiz Summary**: Displays your score and a breakdown of your answers after completing a quiz.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **Database**: [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- **Language**: JavaScript

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) app on your iOS or Android device.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oliveiraenzo/Ultimate-Quiz-Game.git
    cd quiz-mobile-game
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3.  **Run the application:**
    ```bash
    npx expo start
    ```

4.  **Open the app:**
    Scan the QR code shown in the terminal with the Expo Go app on your mobile device.

## 📂 Project Structure

```
quiz-mobile-game/
├── app/
│   ├── assets/
│   ├── screens/
│   │   ├── home/
│   │   ├── create-quiz/
│   │   ├── play-quiz/
│   │   └── ... (other screens)
│   ├── services/
│   │   ├── themes_table_database_services.js
│   │   └── ... (other services)
│   └── App.js
└── README.md
```

- `app/screens`: Contains all the UI components for each screen of the application.
- `app/services`: Includes modules for interacting with the SQLite database.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.