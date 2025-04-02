import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { createStackNavigator } from "@react-navigation/stack";
import LoginView from "src/screens/LoginView";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginView">
        <Stack.Screen name="LoginView" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
