import React from 'react';
import { SafeAreaView, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import LoginScreen from './src/screen/LoginScreen';
import CreateStudentForm from './src/screen/CreateStudentForm';
import ViewData from './src/screen/ViewData';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreateStudentForm" component={CreateStudentForm} />
        <Stack.Screen name="ViewData" component={ViewData} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;


