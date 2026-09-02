import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import { AttendanceRecord } from '@/types';

export interface AttendanceState {
  records: AttendanceRecord[];
  todayStatus: 'Present' | 'Absent' | 'Not Checked In';
  checkInTime: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  records: [],
  todayStatus: 'Not Checked In',
  checkInTime: null,
  isLoading: false,
  error: null,
};

export const markCheckIn = createAsyncThunk(
  'attendance/markCheckIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/attendance/check-in');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Check-in failed');
    }
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearAttendanceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markCheckIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markCheckIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayStatus = 'Present';
        state.checkInTime = new Date().toLocaleTimeString();
      })
      .addCase(markCheckIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAttendanceError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
