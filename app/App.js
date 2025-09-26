import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from 'react';

import Home from "./screens/home/index_home";
import CreateQuiz from "./screens/create-quiz/index_create_quiz"
import CreateNewTheme from "./screens/create-new-theme/index-create-new-theme";
// import CreateQuestions from "./screens/create-questions/index-create-questions";
import PlayQuiz from "./screens/play-quiz/index_play_quiz";

import * as tbThemes from './services/themes_table_database_services';
import * as tbAnswers from './services/answers_table_database_services';
import * as tbQuestions from './services/questions_table_database_services';
import * as tbResults from './services/results_table_database_services';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await tbThemes.createThemesTable();
        await tbQuestions.createQuestionsTable();
        await tbAnswers.createAnswersTable();
        await tbResults.createResultsTable();
        console.log("Database tables created successfully");
      } catch (error) {
        console.error("Error creating tables:", error);
      }
    };
    setupDatabase();
  }, []);

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false, }} />
        <Stack.Screen name="CreateQuiz" component={CreateQuiz} options={{ headerBackVisible: false, }} />
        <Stack.Screen name="CreateNewTheme" component={CreateNewTheme} options={{ headerBackVisible: false, }} />
        <Stack.Screen name="PlayQuiz" component={PlayQuiz} options={{headerBackVisible: false, }} />
        {/* <Stack.Screen name="CreateQuestions" component={CreateQuestions} options={{ headerBackVisible: false, }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}