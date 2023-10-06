import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    addStudent: (state, action) => {
      const { email } = action.payload;
      const studentExists = state.some(student => student.email === email);
      if (!studentExists) {
        state.push(action.payload);
      } else {
        console.log('Student Already Exist');
      }
    },
    editStudent: (state, action) => {
      const { index, data } = action.payload;
      state[index].name = data.name;
      state[index].father_name = data.father_name;
      state[index].email = data.email;
      state[index].phone = data.phone;
      state[index].cnic = data.cnic;
      state[index].department = data.department;
    },
    deleteStudent: (state, action) => {
      state.splice(action.payload, 1);
    },
    clearStudentsData: state => {
      state.splice(0, state.length);
    },
  },
});

export const { clearStudentsData, addStudent, editStudent, deleteStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
