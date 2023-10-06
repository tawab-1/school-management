import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import React from 'react';
import { CustomButton, CustomInput, CustomSelect } from '../../components';
import ImagePicker from 'react-native-image-crop-picker';

const AddStudentForm = ({ handleChange, addingUser }) => {
  const countries = [
    'BS (Computer Science)',
    'BS (Information Technology)',
    'BS (English)',
    'BS (Economics)',
  ];
  const openImagePicker = async () => {
    try {
      const galleryPermission = await check(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (galleryPermission === RESULTS.GRANTED) {
        Alert.alert('Upload Picture', 'Choose Option', [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => {} },
        ]);
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      if (image) {
        imageToBase64(image.path).then(base64String => {
          handleChange('image', base64String);
        });
      }
    });
  };
  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      if (image) {
        imageToBase64(image.path).then(base64String => {
          handleChange('image', base64String);
        });
      }
    });
  };
  const imageToBase64 = async imagePath => {
    try {
      const response = await fetch(`file://${imagePath}`);
      const blob = await response.blob();
      const base64String = await blobToBase64(blob);
      return base64String;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  // Function to convert a Blob to base64
  const blobToBase64 = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <CustomInput
        labelStyle={styles.labelStyle}
        style={styles.inputStyle}
        label="Student Name"
        placeholder="Full Name"
        defaultValue={addingUser.name}
        onChangeText={text => handleChange('name', text)}
      />
      <CustomInput
        labelStyle={styles.labelStyle}
        style={styles.inputStyle}
        label="Father Name"
        placeholder="Father Name"
        defaultValue={addingUser.father_name}
        onChangeText={text => handleChange('father_name', text)}
      />
      <CustomInput
        labelStyle={styles.labelStyle}
        style={styles.inputStyle}
        label="Email"
        placeholder="example@gmail.com"
        defaultValue={addingUser.email}
        onChangeText={text => handleChange('email', text)}
      />
      <CustomInput
        phoneInputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        defaultPhoneCode="PK"
        phoneInput
        label="Phone"
        phonePlaceholder="3358332635"
        phoneDefaultValue={addingUser.phone}
        onChangePhoneFormattedText={text => handleChange('phone', text)}
      />
      <CustomInput
        labelStyle={styles.labelStyle}
        style={styles.inputStyle}
        label="CNIC"
        placeholder="5323525325325"
        defaultValue={addingUser.cnic}
        onChangeText={text => handleChange('cnic', text)}
      />
      <CustomSelect
        label="Department"
        data={countries}
        selectStyle={styles.inputStyle}
        defaultButtonText={addingUser.department}
        labelStyle={styles.labelStyle}
        onSelect={text => handleChange('department', text)}
      />
      <View style={styles.inputStyle}>
        <CustomButton onPress={openImagePicker} title="upload image" />
      </View>
    </ScrollView>
  );
};

export default AddStudentForm;

const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    marginVertical: 10,
  },
  form: {
    width: '100%',
  },
  labelStyle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontStyle: 'normal',
    letterSpacing: 0.4,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  inputStyle: {
    marginBottom: 10,
  },
});
