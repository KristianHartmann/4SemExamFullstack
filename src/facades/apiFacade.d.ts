export const API_URL: string;

export function setUserName(username: string): void;

export function getUserName(): string | null;

export function removeUserName(): void;

export function makeOptions(method: string, addToken: boolean, body?: any): any;

export function setToken(token: string): void;

export function getToken(): string | null;

export function loggedIn(): boolean;

export function logout(): void;

export function login(user: string, password: string): Promise<void>;

declare function apiFacade(): {
  makeOptions: typeof makeOptions;
  setToken: typeof setToken;
  getToken: typeof getToken;
  loggedIn: typeof loggedIn;
  login: typeof login;
  logout: typeof logout;
};

export default apiFacade;
