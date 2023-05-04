export const API_URL = "http://localhost:4000/graphql";

function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
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

  const login = (email: string, password: string) => {
    const options = makeOptions("POST", false, {
      query: `
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          token
        }
      }
      `,
      variables: {
        input: { email, password },
      },
    });

    return fetch(API_URL, options)
      .then(handleHttpErrors)
      .then((data) => {
        const token = data.data.login.token;
        const email = data.data.login.user.email;
        setToken(token);
        setEmail(email);
      });
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
    login,
    logout,
  };
}

const facade = apiFacade();

export default facade;