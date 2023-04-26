// export const API_URL = "https://frederikhess.dk/tomcat/exam";
export const API_URL = "http://localhost:8080";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

export const setEmail = (email) => {
  localStorage.setItem("email", email);
};
export const getEmail = () => {
  return localStorage.getItem("email");
};

export const removeEmail = () => {
  localStorage.removeItem("email");
};

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    removeEmail();
  };

  const login = (email, password) => {
    const options = makeOptions("POST", true, {
      email: email,
      password: password,
    });
    return fetch(API_URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setEmail(res.email);
      });
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
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
