import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../hooks';
import Icon, { IconType } from 'react-native-dynamic-vector-icons';
import CustomModal from '../../components/CustomModals/CustomModal';
import AddStudentForm from './AddStudentForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudent,
  editStudent,
  deleteStudent,
} from '../../store/studentManagement';

const StudentManagement = ({ navigation }) => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);

  const [addingUser, setAddingUser] = useState({
    image: '',
    name: '',
    father_name: '',
    email: '',
    phone: '',
    cnic: '',
    department: '',
  });
  const [visible, setVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userIndex, setUserIndex] = useState();
  const { Layout } = useTheme();
  const handleChange = (key, val) => {
    setAddingUser(prevState => ({ ...prevState, [key]: val }));
  };

  const addUserHandler = () => {
    setIsUpdate(false);
    setVisible(true);
    setAddingUser({
      image: '',
      name: '',
      father_name: '',
      email: '',
      phone: '',
      cnic: '',
      department: '',
    });
  };

  const goBack = () => {
    navigation.goBack();
  };
  const onConfirm = () => {
    if (isUpdate) {
      const payload = { index: userIndex, data: addingUser };
      dispatch(editStudent(payload));
      setVisible(false);
      setIsUpdate(false);
    } else {
      dispatch(addStudent(addingUser));
      setVisible(false);
    }
  };
  const editUserHandler = (item, index) => {
    setIsUpdate(true);
    setVisible(true);
    setUserIndex(index);
    setAddingUser({
      image: item.image,
      name: item.name,
      father_name: item.father_name,
      email: item.email,
      phone: item.phone,
      cnic: item.cnic,
      department: item.department,
    });
  };
  const deleteUserHandler = index => {
    setUserIndex(index);
    dispatch(deleteStudent(index));
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ccdff7' }}>
        <View style={[Layout.fullWidth, Layout.alignItemsCenter]}>
          <View style={[styles.header]}>
            <TouchableOpacity onPress={goBack}>
              <Icon
                style={styles.TopIcons}
                type={IconType.Ionicons}
                name="chevron-back-outline"
                size={26}
              />
            </TouchableOpacity>
            <Text style={styles.headTitle}>STUDENTS</Text>
            <TouchableOpacity onPress={addUserHandler}>
              <Icon
                style={styles.TopIcons}
                type={IconType.Ionicons}
                name="add-outline"
                size={26}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listWrapper}>
            <FlatList
              data={students}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.renderedItem} key={index}>
                    <View style={styles.imageWrapper}>
                      <Image
                        style={styles.userImage}
                        resizeMode="cover"
                        source={{ uri: `data:image/png;base64,${item.image}` }}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.username}>{item.name}</Text>
                      <Text style={styles.useremail}>{item.email}</Text>
                      <Text style={styles.userphone}>{item.phone}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => editUserHandler(item, index)}
                    >
                      <Icon
                        style={styles.actionIcon}
                        type={IconType.Ionicons}
                        name="create-outline"
                        size={26}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteUserHandler(index)}>
                      <Icon
                        style={styles.actionIcon}
                        type={IconType.Ionicons}
                        name="trash-outline"
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <CustomModal
        modalIcon={
          <Image
            style={styles.userImage}
            resizeMode="cover"
            source={{ uri: `data:image/png;base64,${addingUser.image}` }}
          />
        }
        onConfirm={onConfirm}
        animationType="slide"
        visible={visible}
        setVisible={setVisible}
        headerText="Add Student"
        isUpdate={isUpdate}
        childrenView={
          <AddStudentForm handleChange={handleChange} addingUser={addingUser} />
        }
      />
    </>
  );
};

export default StudentManagement;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0a4191',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    letterSpacing: 0.3,
    fontStyle: 'normal',
  },
  TopIcons: {
    color: '#FFF',
  },
  actionIcon: {
    color: '#000',
  },
  listWrapper: {
    width: '100%',
  },

  renderedItem: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  imageWrapper: {
    width: 50,
    height: 50,
  },
  userImage: {
    width: '90%',
    height: '90%',
    borderRadius: 40,
  },
  userDetails: {
    flex: 1,
    borderColor: '#646464',
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  username: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  useremail: {
    color: '#646464',
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  userphone: {
    color: '#646464',
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
});
