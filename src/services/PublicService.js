import Rest from './api';

/**
 * A class representing a service that processes the public access data.
 */
class PublicService {
  _apiVersion;

  /**
   * Sets the API version.
   * @param {apiVersion} apiVersion Api version.
   */
  setApiVersion(apiVersion) {
    this._apiVersion = apiVersion;
  }

  /**
   * Returns the Api Version.
   *
   * @returns {apiVersion} Api version.
   */
  getApiVersion() {
    return this._apiVersion;
  }

  /**
   * Asynchronic function to fetch the api version from the server.
   */
  async fetchApiVersion() {
    try {
      const response = await Rest.get('/api/version');
      this.setApiVersion(response.data.version);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Asynchronic function to fetch the auth token from the server.
   */
  async fetchAuthToken() {
    try {
      const response = await Rest.get('/api/v1/getAccessToken');
      this.setAuthToken(response.data.access_token);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sets the auth token to axios instance.
   * @param {authToken} authToken Auth token.
   */
  setAuthToken(authToken) {
    Rest.setToken(authToken);
  }
}

export default PublicService;
