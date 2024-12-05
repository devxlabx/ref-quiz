![React Quiz App Template Cover Image](./src/assets/images/ReactJS-Quiz-App-Template.jpg)

# REF'QUIZ - Multi-Sport Quiz App for Referees

REF'QUIZ is a specialized quiz application designed to support referees across various sports in improving their rule knowledge, sharpening decision-making skills, and staying up-to-date with official regulations. Built with scalability and customization in mind, REF'QUIZ provides a strong foundation to create engaging and educational quizzes tailored to the needs of referees.

---

## **Why REF'QUIZ?**

With **REF'QUIZ**, you won't have to build a quiz app from scratch. This template simplifies the development process, allowing you to focus on crafting quizzes that enhance referee knowledge and accuracy in decision-making. It’s structured to follow best practices, ensuring both beginners and experienced developers can create a robust app with ease.

The application is designed to provide a modular and scalable architecture, enabling the addition of new sports, rulesets, and features as the needs of referees evolve. REF'QUIZ ensures that referees can access quizzes that reflect real-world scenarios, helping them refine their expertise.

---

## **Powerful Tech Stack**

- **ReactJS**: A robust framework for creating dynamic and interactive user interfaces that respond seamlessly to user input.
- **TypeScript**: Adds type safety and better developer productivity with static typing and powerful tooling.
- **Styled Components**: Provides efficient, component-scoped styling for customizable and professional designs.

---

## **Features of REF'QUIZ**

- **Light and Dark Modes**: Easily switch between light and dark themes for optimal visibility in different lighting conditions.
- **Multi-Sport Support**: Select quiz topics by sport, such as football, basketball, rugby, or tennis.
- **Timer-Based Challenges**: Each quiz session has a timer to simulate real-time decision-making pressure.
- **Diverse Question Types**:
    - Multiple Choice Questions (MCQs)
    - True/False Questions
    - Multiple Answer Questions (MAQs)
- **Interactive Content**: Supports questions with images and code snippets (for VAR-like decision-making scenarios).
- **Dynamic Scoring**: Weighted scoring system based on question difficulty.
- **Detailed Results Screen**:
    - Breakdown of correct and incorrect answers
    - Total score, time taken, and pass/fail status
    - Display of correct answers for learning opportunities.

---

## **Code Features**

- **TypeScript Components**: All components leverage TypeScript for enhanced productivity, reducing bugs with type checking and IntelliSense.
- **Customizable Themes**: Easily modify styles using Styled Components, enabling full customization of the app's appearance.
- **Flexible Data Structure**: Questions are stored in a structured JSON/TypeScript format, which can also integrate with external APIs for fetching live data.
- **Context and Hooks**: Built with React Context and custom hooks for clean, reusable, and maintainable code.
- **Scalable Architecture**: Designed with modular principles for easy addition of new sports, rulesets, and question types.

---

## **Screens and Components**

REF'QUIZ includes the following main screens:

1. **Welcome Screen**: Introduces users to the app and allows them to select a sport or topic.
2. **Quiz Selection Screen**: Users can choose the specific quiz they wish to attempt.
3. **Question Screen**: Displays questions with options, a timer, and navigation controls.
4. **Results Screen**: Summarizes user performance, highlights correct answers, and offers an option to retry or explore other quizzes.

Reusable components, such as buttons, modals, and answer cards, are stored in a dedicated **UI Components** folder for better maintainability.

---

## **How to Get Started**

To set up and run REF'QUIZ locally, follow these steps:

1. Clone the repository and navigate to the project folder:
   
First, clone the GitHub repository:

git clone <repository-url>
Replace <repository-url> with the actual URL of the GitHub repository.

then navigate into the project folder:

cd refquiz-front

2. Install Dependencies
Once inside the project folder, install all the necessary dependencies using **npm (Node Package Manager)**:

npm install

This command will read the **package.json** file and install the required modules for the project.

3. Start the Project
After installing the dependencies, you can start the development server to run the application locally:

npm start

This will start the project, and you can access it in your browser at **http://localhost:3000** (or the configured port).

# Customizing and Expanding REF'QUIZ

This guide explains how to customize and expand **REF'QUIZ** to suit your needs. Whether it’s adjusting the theme, adding new sports categories, or enhancing the app’s functionality, these steps will guide you through the process.

---

## **Changing the App Theme**

To customize the app's theme:

1. Open the **`styles/Themes`** file.
2. Modify the colors in the theme files to reflect your desired branding.

---

## **Changing the App Font**

To change the app's font:

1. Navigate to **`assets/fonts`**.
2. Replace the existing font files with your preferred fonts.
3. Update the **`fonts.module.css`** file with the new font names and paths.
4. In the **`theme`** file, change the font name to match your new font.
5. Update the global styles in the **`body`** section with the new font.

---

## **Modifying Quiz Topics or Adding New Sports**

To modify the Quiz Topics screen or add new sports:

1. Open the **`data/quizTopics`** file.
2. Edit existing topics, icons, or add new ones by including a new object in the **`quizTopics`** array.

Example:

```jsx
export const quizTopics: QuizTopic[] = [
  {
    title: 'Football',
    icon: <FootballIcon />,
  },
  {
    title: 'Basketball',
    icon: <BasketballIcon />,
  },
  {
    title: 'Tennis',
    icon: <TennisIcon />,
  },
];
