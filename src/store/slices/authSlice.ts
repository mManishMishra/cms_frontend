import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, deleteCookie, getCookie } from 'cookies-next'; // Import cookie management

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    alternatePhoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    preferredCurrency?: string;
    languagePreference?: string;
    purchaseHistory?: string[];
    favoriteProperties?: string[];
    isVerified: boolean;
    role: string;
    savedPaymentMethods?: string[];
    createdAt: string;
    updatedAt: string;
    token: string;
}

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

// Check cookies to initialize the state from existing session
const tokenFromCookie = getCookie('authToken') as string | undefined;
const userFromCookie = getCookie('authUser') ? JSON.parse(getCookie('authUser') as string) : null;

// If token and user are present in cookies, set them in the initial state
if (tokenFromCookie && userFromCookie) {
    initialState.user = { ...userFromCookie, token: tokenFromCookie };
    initialState.isLoggedIn = true;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Login Actions
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;

            // Set auth token and user data in cookies
            setCookie('authToken', action.payload.token, { path: '/' });
            setCookie('authUser', JSON.stringify(action.payload), { path: '/' });
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Registration Actions
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;

            // Set auth token and user data in cookies
            setCookie('authToken', action.payload.token, { path: '/' });
            setCookie('authUser', JSON.stringify(action.payload), { path: '/' });
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Logout Action
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.loading = false;

            deleteCookie('authToken', { path: '/' });
            deleteCookie('authUser', { path: '/' });
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
