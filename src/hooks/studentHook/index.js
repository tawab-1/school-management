import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

const StudentListContext = createContext();

export const useStudentList = () => {
  const context = useContext(StudentListContext);

  if (!context) {
    throw new Error('useStudentList must be used within a StudentListProvider');
  }

  return context;
};

export const StudentListProvider = ({ children }) => {
  const [allStudentList, setAllStudentList] = useState([]);

  const loadStudentList = async () => {
    try {
      const studentListJson = await AsyncStorage.getItem('students');
      if (studentListJson) {
        const parsedStudentList = JSON.parse(studentListJson);
        setAllStudentList(parsedStudentList);
      }
    } catch (error) {
      console.error('Error loading student list from AsyncStorage:', error);
    }
  };

  const saveStudentList = async () => {
    try {
      const studentListJson = JSON.stringify(allStudentList);
      await AsyncStorage.setItem('students', studentListJson);
    } catch (error) {
      console.error('Error saving student list to AsyncStorage:', error);
    }
  };

  const addStudent = student => {
    setAllStudentList([...allStudentList, student]);
    saveStudentList();
  };

  const updateUser = (studentId, updatedStudent) => {
    const updatedList = allStudentList.map(student =>
      student.id === studentId ? { ...student, ...updatedStudent } : student,
    );
    setAllStudentList(updatedList);
    saveStudentList();
  };

  const deleteUser = studentId => {
    const updatedList = allStudentList.filter(
      student => student.id !== studentId,
    );
    setAllStudentList(updatedList);
    saveStudentList();
  };

  return (
    <StudentListContext.Provider
      value={{
        allStudentList,
        addStudent,
        updateUser,
        deleteUser,
        loadStudentList,
      }}
    >
      {children}
    </StudentListContext.Provider>
  );
};
