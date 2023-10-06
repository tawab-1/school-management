import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from '../screens';
import { useTheme } from '../hooks';
import { useFlipper } from '@react-navigation/devtools';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginNavigator from './LoginNavigator';
import AuthNavigator from './AuthNavigator';
import { StudentListProvider } from '../hooks/studentHook';

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      setStatus(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <StudentListProvider>
      <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          {loading ? (
            <Startup />
          ) : !status ? (
            <LoginNavigator setStatus={setStatus} />
          ) : (
            <AuthNavigator setStatus={setStatus} />
          )}
        </NavigationContainer>
      </SafeAreaView>
    </StudentListProvider>
  );
};
export default ApplicationNavigator;
