import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';
const Brand = ({ height, width, mode }) => {
  const { Layout, Images, darkMode: isDark } = useTheme();
  return (
    <View testID={'brand-img-wrapper'} style={{ height, width }}>
      <Image
        style={[Layout.fullSize, isDark ? styles.darklogo : styles.lightLogo]}
        source={Images.logo}
        resizeMode={mode}
      />
    </View>
  );
};
Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
};

const styles = StyleSheet.create({
  darklogo: {
    tintColor: '#dfdfdf',
  },
  lightLogo: {
    tintColor: '#0A4191',
  },
});
export default Brand;
