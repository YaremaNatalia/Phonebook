import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  $instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  $instance.defaults.headers['Authorization'] = '';
};

export const registerUserThunk = createAsyncThunk(
  'authentif/register',
  async (userData, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/signup', userData);
      setToken(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'authentif/login',
  async (userData, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/login', userData);
      setToken(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'authentif/refreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.authentif.token;

    if (token === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }

    try {
      setToken(token);
      const { data } = await $instance.get('/users/current');

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'authentif/logout',
  async (_, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/logout');
      clearToken();

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
