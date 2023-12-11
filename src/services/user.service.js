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

  getUserPasswordEntriesInFavorites() {
    return axios.get(API_URL + 'password-entries/favorites', { headers: authHeader() });
  }

  getUserPasswordEntriesInTrash() {
    return axios.get(API_URL + 'password-entries/trash', { headers: authHeader() });
  }

  togglePasswordEntryInTrash(id) {
    return axios.put(API_URL + 'password-entries/trash/' + id, null, { headers: authHeader() });
  }
  
  getPasswordEntryById(id) {
    return axios.get(API_URL + 'password-entries/' + id, { headers: authHeader() });
  }

  savePasswordEntry(passwordEntryData) {
    console.log("Password entries data: " + passwordEntryData);
    return axios.post(API_URL + 'password-entries', passwordEntryData, { headers: authHeader() });
  }

  updatePasswordEntry(id, passwordEntryData) {
    return axios.put(API_URL + 'password-entries/' + id, passwordEntryData, { headers: authHeader() });
  }

  deletePasswordEntry(id) {
    return axios.delete(API_URL + 'password-entries/' + id, { headers: authHeader() });
  }

  getCategories() {
    return axios.get(API_URL + 'categories', { headers: authHeader() });
  }
  
}

export default new UserService();
