import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userServices from './users-service';

export const getUsersThunk = createAsyncThunk(
    'users/getUsers',
    async () => {
        return await userServices.getUsers();
    }
);

export const getUserByIdThunk = createAsyncThunk(
    'users/getUserById',
    async (id) => {
        return await userServices.getUserById(id);
    }
);

export const createUserThunk = createAsyncThunk(
    'users/createUser',
    async (user) => {
        return await userServices.createUser(user);
    }
);

export const updateUserThunk = createAsyncThunk(
    'users/updateUser',
    async (user) => {
        return await userServices.updateUser(user);
    }
);

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        return await userServices.deleteUser(id);
    }
);

export const signinThunk = createAsyncThunk(
    'users/signin',
    async (credentials) => {
        try {
            return await userServices.signin(credentials);
        } catch (error) {
            if (error && error.message === "User not found.") {
                throw new Error("Invalid email or password, please try again.");
              } else {
                throw new Error("An unexpected error occurred.");
              }
        }
    }
);

export const signupThunk = createAsyncThunk(
    'users/signup',
    async (user) => {
        try {
            return await userServices.signup(user);
        } catch (error) {
            if (error && error.message === "Email has already been registered.") {
                throw new Error("This email has already been registered, please try again or sign in.");
              } else {
                throw new Error("An unexpected error occurred.");
              }
        }
    }
);

export const signoutThunk = createAsyncThunk(
    'users/signout',
    async () => {
        return await userServices.signout();
    }
);
