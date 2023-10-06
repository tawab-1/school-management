import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import PhoneInput from 'react-native-phone-number-input';

export default function ({
  style,
  label,
  labelStyle,
  onChangeText,
  phoneInputRef,
  onPhoneChangeText,
  phoneDefaultValue,
  onChangePhoneFormattedText,
  defaultPhoneCode,
  phoneWithShadow,
  phoneAutoFocus,
  placeholder,
  inputWrapperStyle,
  phoneInputStyle,
  phoneTextConatinerStyle,
  phoneInputTextStyle,
  secureTextEntry,
  phoneInput,
  phonePlaceholder,
  defaultValue,
}) {
  return (
    <View style={[styles.defaultInputWrapper, inputWrapperStyle]}>
      <Text style={(styles.defaultLabelStyle, labelStyle)}>{label}</Text>
      {phoneInput ? (
        <PhoneInput
          containerStyle={[styles.defaultNumberInputStyle, phoneInputStyle]}
          textContainerStyle={[
            styles.defaultPhoneTextConatinerStyle,
            phoneTextConatinerStyle,
          ]}
          textInputStyle={[
            styles.defaultPhoneInputTextStyle,
            phoneInputTextStyle,
          ]}
          defaultValue={phoneDefaultValue}
          defaultCode={defaultPhoneCode}
          layout="first"
          onChangeText={onPhoneChangeText}
          onChangeFormattedText={onChangePhoneFormattedText}
          withShadow={phoneWithShadow}
          autoFocus={phoneAutoFocus}
          placeholder={phonePlaceholder}
        />
      ) : (
        <TextInput
          style={[styles.defaultInputStyle, style]}
          onChangeText={onChangeText}
          placeholder={placeholder}
          defaultValue={defaultValue}
          secureTextEntry={secureTextEntry}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultInputWrapper: {},
  defaultLabelStyle: {
    marginBottom: 4,
  },
  defaultInputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding: 10,
    borderColor: '#0a4191',
  },
  defaultNumberInputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#0a4191',
    overflow: 'hidden',
  },
  defaultPhoneTextConatinerStyle: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  defaultPhoneInputTextStyle: {
    backgroundColor: 'transparent',
    letterSpacing: 1,
  },
});
