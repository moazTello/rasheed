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

  OrganizData: JSON.parse(sessionStorage.getItem('organization')) || [],
  setOrganizData: (OrganizData) => {
    JSON.parse(sessionStorage.getItem('user')).role === 'OrgAdmin' &&
      sessionStorage.setItem('organization', JSON.stringify(OrganizData));
    set({ OrganizData });
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
      set({ filtersList: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  logoutMaster: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosPrivate.get('/api/masterAdmin/logout', {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  logoutOrg: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosPrivate.get('/api/organization/logout', {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  Organizations: [],
  setOrganizations: (Organizations) => set({ Organizations }),
  // fetchOrganizationsList: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axiosPrivate.get('/api/client/getOrganizations');
  //     set({ Organizations: response.data, isLoading: false });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //     set({ error: error.message, isLoading: false });
  //   }
  // },

  fetchOrganizationsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get('api/masterAdmin/getOrganizations?page=1&per_page=10', {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ Organizations: response.data.organizations, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchProgectOrg: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get('/api/organization/getProjects?page=1&per_page=10', {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addOrganization: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.post('/api/masterAdmin/addOrg', data, {
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

  EditOrganization: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.post(`/api/masterAdmin/updateOrg/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          _method: 'put',
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addProjectMaster: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/masterAdmin/createPro/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addProjectOrg: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/organization/createPro`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditProjectMaster: async (data, orgid, projid) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/masterAdmin/updatePro/${orgid}/${projid}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          "_method":"put",
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditProjectOrg: async (data, projid) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/organization/updatePro/${projid}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          "_method":"put",
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  


  addActivityMaster: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/masterAdmin/createActivity/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addActivityOrg: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/organization/createActivity/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditActivityMaster: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/masterAdmin/updateActivity/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditActivityOrg: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/organization/updateActivity/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  DeleteActivityMaster: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(`/api/masterAdmin/deleteActivity/${id}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  DeleteActivityOrg: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(`/api/organization/deleteActivity/${id}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  deleteProjectMaster: async (id, orgid) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.delete(`/api/masterAdmin/deletePro/${Number(orgid)}/${Number(id)}`, {
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

  deleteProjectOrg: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.delete(`/api/organization/deletePro/${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
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

  problems: [],
  fetchProblemsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get('/api/masterAdmin/getProblems?page=1&per_page=50', {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ problems: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProblem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.delete(`/api/masterAdmin/deleteProblem/${Number(id)}`, {
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
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  editedProject: null,
  fetcheditedProjectMaster: async (orgid,projid) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/masterAdmin/getProject/${orgid}/${projid}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ editedProject: response.data.project, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetcheditedProjectOrg: async (projid) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/organization/getProject/${projid}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ editedProject: response.data.project, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  commentProjects:null,
  fetchCommentsProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/client/getProjectComments/${id}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ commentProjects: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  commentAct:null,
  fetchCommentsAct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/client/getActivityComments/${id}`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ commentAct: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  openions:null,
  fetchOpenions: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/masterAdmin/getOpinions/${id}?page=1&per_page=50`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ openions: response.data.opinions, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  deleteOpenion: async (projid, id) => {
    set({ isLoading: true, error: null });
    try {
      await DataTransfer.delete(`/api/masterAdmin/deleteOpinion/${Number(projid)}/${Number(id)}`, {
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

  trafics:null,
  getTrafics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/masterAdmin/getTraffic`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      set({ trafics: response.data.traffic, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },


}));

export default useStore;
