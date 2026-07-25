import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { services } from '../data/services';
import { dentists } from '../data/dentists';
import { testimonials } from '../data/testimonials';
import { getUsers, saveUsers, getAppointments, saveAppointments, generateId } from '../data/localStore';

// RTK Query — the final stage in the course's data-fetching progression:
// plain fetch in useEffect -> fetch+debounce -> custom useFetch hook
// -> Redux Toolkit slice -> createAsyncThunk -> RTK Query (auto-generated
// hooks, caching, loading states).
//
// No backend at all here — `fakeBaseQuery` lets every endpoint run a plain
// JS function (`queryFn`) instead of making an HTTP request. Services,
// dentists, and testimonials are hardcoded arrays (src/data/*.js). Users and
// appointments are read from/written to localStorage (src/data/localStore.js)
// so signup/login/booking still work and persist across a refresh, just
// scoped to one browser instead of a shared server. Every component below
// still uses the same generated hooks (useGetServicesQuery, etc.) — nothing
// outside this file had to change.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Services', 'Dentists', 'Testimonials', 'Appointments', 'Users'],
  endpoints: (builder) => ({
    getServices: builder.query({
      queryFn: () => ({ data: services }),
      providesTags: ['Services'],
    }),
    getServiceById: builder.query({
      queryFn: (id) => {
        const found = services.find((s) => s.id === id);
        return found ? { data: found } : { error: 'Service not found' };
      },
      providesTags: (result, error, id) => [{ type: 'Services', id }],
    }),
    getDentists: builder.query({
      queryFn: () => ({ data: dentists }),
      providesTags: ['Dentists'],
    }),
    getTestimonials: builder.query({
      queryFn: () => ({ data: testimonials }),
      providesTags: ['Testimonials'],
    }),
    // Powers the token/slot picker — which tokens are already taken for this
    // doctor on this date, so the UI can grey them out and block re-booking.
    getAppointmentsForDoctorDate: builder.query({
      queryFn: ({ doctorCode, date }) => ({
        data: getAppointments().filter((a) => a.doctorCode === doctorCode && a.date === date),
      }),
      providesTags: ['Appointments'],
    }),
    createAppointment: builder.mutation({
      queryFn: (appointment) => {
        const list = getAppointments();
        const record = { ...appointment, id: generateId() };
        list.push(record);
        saveAppointments(list);
        return { data: record };
      },
      invalidatesTags: ['Appointments'],
    }),

    // ---- Auth / profile ----------------------------------------------------
    // No real auth server — plain records in localStorage compared
    // client-side (see src/utils/auth.js for the caveats). Fine for a demo/
    // portfolio project, not for anything handling real user data.
    getUserByEmail: builder.query({
      queryFn: (email) => ({ data: getUsers().filter((u) => u.email === email) }),
      providesTags: ['Users'],
    }),
    signupUser: builder.mutation({
      queryFn: (newUser) => {
        const list = getUsers();
        const record = { ...newUser, id: generateId() };
        list.push(record);
        saveUsers(list);
        return { data: record };
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      queryFn: ({ id, ...patch }) => {
        const list = getUsers();
        const idx = list.findIndex((u) => u.id === id);
        if (idx === -1) return { error: 'User not found' };
        list[idx] = { ...list[idx], ...patch };
        saveUsers(list);
        return { data: list[idx] };
      },
      invalidatesTags: ['Users'],
    }),
    // Profile page: every appointment (upcoming + past) for the logged-in
    // patient, keyed by their internal user id (not the public UID).
    getAppointmentsForUser: builder.query({
      queryFn: (userId) => ({ data: getAppointments().filter((a) => a.userId === userId) }),
      providesTags: ['Appointments'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetDentistsQuery,
  useGetTestimonialsQuery,
  useGetAppointmentsForDoctorDateQuery,
  useCreateAppointmentMutation,
  useGetUserByEmailQuery,
  useLazyGetUserByEmailQuery,
  useSignupUserMutation,
  useUpdateUserMutation,
  useGetAppointmentsForUserQuery,
} = apiSlice;
