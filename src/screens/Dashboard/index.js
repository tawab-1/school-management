import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '../../components';

const Dashboard = ({ navigation, setStatus }) => {
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState();
  const { Images, Layout } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem('token');
    setUserToken(token);
    const allusers = await AsyncStorage.getItem('users');
    setUsers(JSON.parse(allusers) || []);
    setIsLoading(false);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setStatus(false);
  };

  return isLoading ? (
    <SafeAreaView style={styles.screenWrapper}>
      <View style={[Layout.fullWidth, Layout.alignItemsCenter]}>
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.screenWrapper}>
      <View style={[Layout.fullWidth, Layout.alignItemsCenter]}>
        <View style={[styles.header]}>
          <Text style={styles.headTitle}>CURRENT USER</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pageContent}>
          {users.length > 0 &&
            users.map(current => {
              if (current.email === userToken) {
                return (
                  <View style={styles.userCard}>
                    <View style={styles.userImageWrapper}>
                      <Image
                        style={styles.userImage}
                        source={Images.userDummyImage}
                      />
                    </View>
                    <View style={styles.currentUserDetails}>
                      <Text style={styles.username}>{current.name}</Text>
                      <Text style={styles.userEmail}>{current.email}</Text>
                      <Text style={styles.userPhone}>
                        {current.formattedPhoneValue}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}
          <View style={styles.managementButtons}>
            <CustomButton
              onPress={() => navigation.navigate('StudentsManagement')}
              style={styles.managementBtn}
              title="Student Management"
            />
            <CustomButton
              style={styles.managementBtn}
              title="Library Management"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#ccdff7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0a4191',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    letterSpacing: 0.3,
    fontStyle: 'normal',
  },
  logoutBtn: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 8,
  },
  pageContent: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userCard: {
    backgroundColor: '#0a4191',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    elevation: 10,
    overflow: 'hidden',
  },
  userImageWrapper: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  currentUserDetails: {
    paddingVertical: 10,
  },
  username: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'Poppins',
    fontWeight: '800',
  },
  userEmail: {
    textAlign: 'center',
    color: '#f5f0f0',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  userPhone: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 25,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  managementButtons: {
    gap: 10,
  },
  managementBtn: {},
});
