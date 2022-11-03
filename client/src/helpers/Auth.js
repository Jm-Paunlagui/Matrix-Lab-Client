import React from "react";
import cookie from "js-cookie";

// Set in Cookie
export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
  return false;
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  // setLocalStorage('user', result.payload);
  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
    return false;
  }
};

// Signout
export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

export const updateUser = (response, next) => {
  if (typeof window !== "undefined") {
    let auth;
    auth = response;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
