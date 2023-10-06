import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../hooks';
import { CustomButton, CustomInput } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = ({ setStatus }) => {
  const { Layout, Gutters } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      console.error('Please fill in all fields.');
      return;
    }
    try {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const user = users.find(
          u => u.email === email && u.password === password,
        );

        if (user) {
          await AsyncStorage.setItem('token', email);
          setStatus(true);
        } else {
          console.log('Login failed. User not found or incorrect password.');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[Gutters.regularHPadding, styles.upperContainer]}>
        <Text style={styles.heading1}>Hay!</Text>
        <Text style={styles.heading2}>Welcome Back</Text>
      </View>
      <View style={[Layout.fill, styles.lowerContainer]}>
        <View style={[Gutters.regularHPadding, styles.curvedDesign]}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.loginText]}>Login</Text>
          </View>
          <CustomInput
            labelStyle={styles.inputLable}
            label="Email"
            placeholder="example@mail.com"
            onChangeText={val => setEmail(val)}
          />
          <CustomInput
            labelStyle={styles.inputLable}
            label="Password"
            placeholder="Enter Password"
            secureTextEntry
            onChangeText={val => setPassword(val)}
          />
          <View style={styles.buttonsWrapper}>
            <CustomButton title="Login" onPress={handleLogin} />
            <CustomButton
              title="Sign Up"
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#0a4191',
    height: 330,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  heading1: {
    fontSize: 40,
    fontWeight: '800',
    color: 'white',
    fontFamily: 'Pippins',
  },
  heading2: {
    fontSize: 34,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Pippins',
  },
  loginText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0a4191',
    fontFamily: 'Pippins',
    textAlign: 'center',
  },
  heading3: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Pippins',
  },
  lowerContainer: {
    shadowColor: '#000',
    elevation: 50,
    flex: 1,
  },
  curvedDesign: {
    flex: 1,
    backgroundColor: '#ccdff7',
    borderTopRightRadius: 55,
    borderTopLeftRadius: 55,
    marginTop: -50,
    paddingTop: 10,
  },
  titleWrapper: {},
  inputLable: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    padding: 4,
    color: '#0a4191',
  },
  buttonsWrapper: {
    paddingVertical: 10,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
});
