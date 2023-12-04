import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'test/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'test/mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'test/admin', { headers: authHeader() });
  }

  getUserPasswordEntries() {
    return axios.get(API_URL + 'password-entries', { headers: authHeader() });
  }

  getPasswordEntryById(id) {
    return axios.get(API_URL + 'password-entries/' + id, { headers: authHeader() });
  }

  savePasswordEntry(passwordEntryData) {
    return axios.post(API_URL + 'password-entries', passwordEntryData, { headers: authHeader() });
  }

  editPasswordEntry(id, passwordEntryData) {
    return axios.put(API_URL + 'password-entries/' + id, passwordEntryData, { headers: authHeader() });
  }
  
}

export default new UserService();
