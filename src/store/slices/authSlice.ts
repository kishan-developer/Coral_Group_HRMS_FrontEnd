import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  role: string;
  employeeId?: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  registrationStep: number;
  registrationEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
  registrationStep: 1,
  registrationEmail: null,
};

// Async Thunks

// 1. Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string; rememberMe?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const data = response.data;

      if (data.success && data.data?.accessToken) {
        const { accessToken, user } = data.data;
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          Cookies.set('accessToken', accessToken, {
            expires: credentials.rememberMe ? 30 : 1,
          });
        }
        return { accessToken, user, message: data.message };
      }

      return rejectWithValue(data.message || 'Login failed');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'An error occurred during login';
      return rejectWithValue(message);
    }
  }
);

// 2. Register Step 1 (Send OTP)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    payload: { email: string; password: string; confirmPassword: string; role?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/auth/register', payload);
      const data = response.data;
      if (data.success) {
        return { email: payload.email, message: data.message };
      }
      return rejectWithValue(data.message || 'Registration step 1 failed');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// 3. Complete Registration (Verify OTP)
export const completeRegistration = createAsyncThunk(
  'auth/completeRegistration',
  async (
    payload: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/auth/complete-registration', payload);
      const data = response.data;
      if (data.success && data.data?.accessToken) {
        const { accessToken, user } = data.data;
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          Cookies.set('accessToken', accessToken, { expires: 1 });
        }
        return { accessToken, user, message: data.message };
      }
      return rejectWithValue(data.message || 'OTP verification failed');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'OTP verification failed';
      return rejectWithValue(message);
    }
  }
);

// 4. Resend OTP
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (
    payload: { email?: string; userId?: string; type?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/auth/resend-otp', payload);
      const data = response.data;
      if (data.success) {
        return { message: data.message };
      }
      return rejectWithValue(data.message || 'Failed to resend OTP');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'Failed to resend OTP';
      return rejectWithValue(message);
    }
  }
);

// 5. Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', payload);
      const data = response.data;
      if (data.success) {
        return { email: payload.email, message: data.message };
      }
      return rejectWithValue(data.message || 'Failed to send password reset email');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'Failed to process forgot password';
      return rejectWithValue(message);
    }
  }
);

// 6. Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    payload: { email: string; otp: string; newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/reset-password', payload);
      const data = response.data;
      if (data.success) {
        return { message: data.message };
      }
      return rejectWithValue(data.message || 'Password reset failed');
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'Password reset failed';
      return rejectWithValue(message);
    }
  }
);

// 7. Logout User
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (userId: string | undefined = undefined) => {
    try {
      if (userId) {
        await axiosInstance.post('/api/v1/auth/logout', { userId });
      }
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        Cookies.remove('accessToken');
      }
    }
    return true;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('accessToken') || Cookies.get('accessToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          try {
            state.accessToken = storedToken;
            state.user = JSON.parse(storedUser);
            state.isAuthenticated = true;
          } catch {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        } else {
          state.accessToken = null;
          state.user = null;
          state.isAuthenticated = false;
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setRegistrationStep: (state, action: PayloadAction<number>) => {
      state.registrationStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Register Step 1
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrationStep = 2;
        state.registrationEmail = action.payload.email;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Complete Registration
    builder
      .addCase(completeRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(completeRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Resend OTP
    builder
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
    });
  },
});

export const { initializeAuth, clearError, clearMessage, setRegistrationStep } = authSlice.actions;

export default authSlice.reducer;
