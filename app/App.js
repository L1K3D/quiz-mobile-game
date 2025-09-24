import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/home/index_home";
import CreateQuiz from "./screens/create-quiz/index_create_quiz"
import CreateNewTheme from "./screens/create-new-theme/index-create-new-theme";


const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false, }} />
        <Stack.Screen name="CreateQuiz" component={CreateQuiz} options={{ headerBackVisible: false, }} />
        <Stack.Screen name="CreateNewTheme" component={CreateNewTheme} options={{ headerBackVisible: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}