import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Signup } from '../screens';
const Stack = createStackNavigator();

const LoginNavigator = ({ setStatus }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login">
        {props => <Login setStatus={setStatus} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
export default LoginNavigator;
