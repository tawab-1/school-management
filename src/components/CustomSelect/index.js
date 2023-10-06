import { StyleSheet, Text } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const CustomSelect = ({
  label,
  data,
  defaultButtonText,
  labelStyle,
  selectStyle,
  onSelect,
}) => {
  return (
    <>
      {label && (
        <Text style={[styles.defaultLabelStyle, labelStyle]}>{label}</Text>
      )}
      <SelectDropdown
        buttonStyle={[styles.defaultSelectStyle, selectStyle]}
        defaultButtonText={defaultButtonText}
        dropdownStyle={styles.defaultDropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        data={data}
        onSelect={onSelect}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  defaultSelectStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#0a4191',
    height: 45,
  },
  defaultDropdownStyle: {
    backgroundColor: '#ccdff7',
    borderRadius: 10,
    marginTop: 4,
  },
  rowTextStyle: {
    color: '#0a4191',
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontStyle: 'normal',
    letterSpacing: 0.5,
  },
});
