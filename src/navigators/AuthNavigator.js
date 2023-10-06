import React from 'react';
import { Dashboard, StudentManagement } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const AuthNavigator = ({ setStatus }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard">
        {props => <Dashboard {...props} setStatus={setStatus} />}
      </Stack.Screen>
      <Stack.Screen name="StudentsManagement" component={StudentManagement} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
