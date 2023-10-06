import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Brand, CustomButton } from '../../components';
import { useTheme } from '../../hooks';
import { useLazyFetchOneQuery } from '../../services/modules/users';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout, Images, darkMode: isDark } = useTheme();
  const { data, isSuccess } = useLazyFetchOneQuery();
  useEffect(() => {
    if (isSuccess && data?.name) {
      Alert.alert(t('example:helloUser', { name: data.name }));
    }
  }, [isSuccess, data]);

  return (
    <ScrollView
      contentContainerStyle={[Layout.fullSize, Layout.fill, Layout.colCenter]}
    >
      <View
        style={[
          Layout.fullWidth,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
          styles.logoWrapper,
        ]}
      >
        <View
          style={[
            styles.logoBackground,
            isDark ? styles.bgDark : styles.bgLight,
          ]}
        />

        <View style={[Layout.absolute, styles.logoImage]}>
          <Brand height={300} width={300} />
        </View>
        <Image
          style={[Layout.absolute, styles.penImage]}
          source={Images.sparkles.topLeft}
          resizeMode={'contain'}
        />
      </View>
      <View
        style={[
          Layout.fill,
          Layout.alignItemsStart,
          Layout.fullWidth,
          Gutters.regularHPadding,
          Gutters.regularVMargin,
          Layout.justifyContentBetween,
        ]}
      >
        <View style={styles.welcomeWrapper}>
          <Text style={[Fonts.titleRegular]}>Welcome to</Text>
          <Text
            style={[Fonts.textBold, Fonts.textRegular, Gutters.regularBMargin]}
          >
            School Management System
          </Text>
          <Text style={[Fonts.textSmall, Fonts.textLight]}>
            A school management system is a software application that is
            designed to streamline various administrative tasks within a school.
          </Text>
        </View>
        <View style={[Layout.fill, styles.buttonsWrapper]}>
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <CustomButton
            title="Sign Up"
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    height: 350,
  },
  logoBackground: {
    height: 250,
    width: 250,
    borderRadius: 140,
  },
  bgDark: {
    backgroundColor: '#000000',
  },
  bgLight: {
    backgroundColor: '#DFDFDF',
  },
  logoImage: {
    height: 300,
    width: 300,
  },
  penImage: {
    top: 0,
    left: 0,
  },
  welcomeWrapper: {
    width: '100%',
  },
  buttonsWrapper: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    gap: 20,
  },
});

export default Home;
