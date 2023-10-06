import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '../../hooks';
import { CustomButton, CustomInput } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const { Layout, Gutters } = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhoneValue, setFormattedPhoneValue] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !formattedPhoneValue || !password) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem('users');
      let users = [];

      if (usersData) {
        users = JSON.parse(usersData);
      }
      const newUser = { name, email, phone: formattedPhoneValue, password };
      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('User registered successfully.');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[Gutters.regularHPadding, styles.upperContainer]}>
        <Text style={styles.heading1}>Hay!</Text>
        <Text style={styles.heading2}>Join Now</Text>
      </View>
      <View style={[Layout.fill, styles.lowerContainer]}>
        <View style={[Gutters.regularHPadding, styles.curvedDesign]}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.loginText]}>Sign Up</Text>
          </View>
          <CustomInput
            labelStyle={styles.inputLable}
            label="Full Name"
            placeholder="Full Name"
            onChangeText={val => setName(val)}
          />
          <CustomInput
            labelStyle={styles.inputLable}
            label="Email"
            placeholder="example@mail.com"
            onChangeText={val => setEmail(val)}
          />
          <CustomInput
            phoneInput
            phoneDefaultValue={phone}
            labelStyle={styles.inputLable}
            label="Phone"
            defaultPhoneCode="PK"
            onChangePhoneFormattedText={text => setFormattedPhoneValue(text)}
            onPhoneChangeText={val => setPhone(val)}
          />
          <CustomInput
            labelStyle={styles.inputLable}
            label="Create Password"
            placeholder="Enter Password"
            onChangeText={val => setPassword(val)}
            secureTextEntry
          />
          <View style={styles.buttonsWrapper}>
            <CustomButton title="Sign Up" onPress={handleSignup} />
            <CustomButton
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#0a4191',
    height: 300,
    justifyContent: 'center',
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
