import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

export interface PayslipItem {
  id: string;
  month: string;
  year: number;
  netSalary: number;
  status: 'Paid' | 'Processing' | 'Pending';
  pdfUrl?: string;
}

export interface PayrollState {
  payslips: PayslipItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PayrollState = {
  payslips: [],
  isLoading: false,
  error: null,
};

export const fetchPayslips = createAsyncThunk(
  'payroll/fetchPayslips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/payslips');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payslips');
    }
  }
);

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    clearPayrollError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayslips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPayslips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payslips = action.payload || [];
      })
      .addCase(fetchPayslips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPayrollError } = payrollSlice.actions;
export default payrollSlice.reducer;
