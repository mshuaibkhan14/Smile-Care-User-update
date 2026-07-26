import { createSlice } from '@reduxjs/toolkit';
import { saveLoggedInUser, loadLoggedInUser, clearLoggedInUser } from '../utils/auth';

// Plain Redux slice (not RTK Query) — this is client-side session state,
// not server data. Hydrated once from localStorage so a refresh keeps you
// logged in. The auth modal's open/closed state (and which tab it should
// open on) lives here too, so any page (Navbar, BookAppointment, a
// protected route) can trigger it without prop-drilling.
const initialState = {
  user: loadLoggedInUser(),
  isModalOpen: false,
  modalTab: 'login',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      saveLoggedInUser(action.payload);
    },
    logout(state) {
      state.user = null;
      clearLoggedInUser();
    },
    openAuthModal(state, action) {
      state.isModalOpen = true;
      state.modalTab = action.payload || 'login';
    },
    closeAuthModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { setUser, logout, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;
