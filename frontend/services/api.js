import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug interceptors (development only)
if (import.meta?.env?.DEV) {
  api.interceptors.request.use((config) => {
    // eslint-disable-next-line no-console
    console.debug('[API] Request', config.method, config.url, 'Auth?', !!config.headers?.Authorization);
    return config;
  });
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      // eslint-disable-next-line no-console
      console.debug('[API] Error', err.response?.status, err.config?.url);
      throw err;
    }
  );
}
