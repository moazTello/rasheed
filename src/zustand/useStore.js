import { create } from 'zustand';
import { axiosPrivate } from '../api/DataTransfer';
import DataTransfer from '../api/DataTransfer';
const useStore = create((set) => ({
  // user: sessionStorage.getItem('user') || null,
  // setUser: (user) => set({ user }),
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  setUser: (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    sessionStorage.removeItem('user');
    set({ user: null });
  },

  token: sessionStorage.getItem('accessT') || '',
  setToken: (token) => set({ token }),

  isLoading: false,
  error: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  login: async (userName, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.post('/login', {
        email: userName,
        password: password,
      });
      console.log(response);
      set({ filtersList: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  OrganizData: [],
  setOrganizData: (OrganizData) => set({ OrganizData }),

  Organizations: [],
  setOrganizations: (Organizations) => set({ Organizations }),
  fetchOrganizationsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get('/api/client/getOrganizations');
      set({ Organizations: response.data, isLoading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addOrganization: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post('/api/masterAdmin/addOrg', data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditOrganization: async (data, id) => {
    set({ isLoading: true, error: null });
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const response = await DataTransfer.post(`/api/masterAdmin/updateOrg/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          _method: 'put',
        },
      });
      console.log(response);
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addProjectMaster: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.post(`/api/masterAdmin/createPro/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addProjectOrg: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.post(`/api/organization/createPro`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProjectMaster: async (id, orgid) => {
    set({ isLoading: true, error: null });
    try {
      console.log(id);
      const response = await DataTransfer.delete(`/api/masterAdmin/deletePro/${Number(orgid)}/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          // Accept: 'application/json',
        },
      });
      console.log(response);
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProjectOrg: async (id) => {
    set({ isLoading: true, error: null });
    try {
      console.log(id);
      const response = await DataTransfer.delete(`/api/organization/deletePro/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      console.log(response);
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteOrganization: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.delete(`/api/masterAdmin/deleteOrg/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          // Accept: 'application/json',
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  suggestions: [],
  fetchSuggestionsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get('/api/masterAdmin/getSuggests?page=1&per_page=50', {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ suggestions: response.data, isLoading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteSuggestion: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.delete(`/api/masterAdmin/deleteSuggest/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          // Accept: 'application/json',
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  editedorga: null,
  fetcheditedOrga: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/masterAdmin/getOrganization/${id}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ editedorga: response.data.organization, isLoading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
