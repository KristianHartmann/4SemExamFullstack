import jwt_decode from "jwt-decode";
export const API_URL = "http://localhost:4000/graphql";

interface TokenPayload {
  _id: string;
  email: string;
  role: string;
}


function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

export const decodeToken = () => {
  const storedJwtToken = localStorage.getItem("jwtToken");
    console.log("stored: " + storedJwtToken);
    if (storedJwtToken) {
      // Parse the jwtToken as a JSON object and set it to the state

      const decodedToken = jwt_decode<TokenPayload>(storedJwtToken);
      return decodedToken;
    }
    return null;
  }

export const setEmail = (email: string) => {
  localStorage.setItem("email", email);
};

export const getEmail = () => {
  return localStorage.getItem("email");
};

export const removeEmail = () => {
  localStorage.removeItem("email");
};

function apiFacade() {
  const setToken = (token: string) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const token = getToken();
    return token != null && token !== "undefined";
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    removeEmail();
  };

  const isAdmin = () => {
    const decodedToken = decodeToken();
    return decodedToken?.role === "admin";
  };

  const makeOptions = (method: string, addToken: boolean, body?: any) => {
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (addToken && loggedIn()) {
      headers["Authorization"] = `Bearer ${getToken()}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return options;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    logout,
    decodeToken,
    isAdmin,
  };
}

const facade = apiFacade();

export default facade;
