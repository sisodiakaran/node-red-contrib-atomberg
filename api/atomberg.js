const axios = require("axios")
const jwt = require("jsonwebtoken");

const BASE_URL = "https://api.developer.atomberg-iot.com";

class AtombergApiClient {
  constructor(apiKey, refreshToken) {
    this.baseURL = BASE_URL;
    this.apiKey = apiKey;
    this.refreshToken = refreshToken;
    this.tokenExpirationTime = null;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "x-api-key": apiKey,
      },
    });
    // this.setTokenExpirationTime();
  }

  setTokenExpirationTime(token) {
    // Decode the token without verifying the signature
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken && decodedToken.payload && decodedToken.payload.exp) {
      // Set the token expiration time based on the decoded JWT's exp claim
      this.tokenExpirationTime = new Date(
        decodedToken.payload.exp * 1000 - 60 * 60 * 1000
      ); // 1 hour before actual expiration
    } else {
      // Default to 23 hours from now if no exp claim is present
      const now = new Date();
      this.tokenExpirationTime = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    }
  }

  async get_all_devices() {
    const endpoint = "/v1/get_list_of_devices";
    try {
      if (this.isTokenExpiringSoon()) {
        await this.refreshApiKey();
      }
      const response = await this.client.get(endpoint);
      return response.data.message.devices_list;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.refreshApiKey();
        return this.get_all_devices();
      }
      throw new Error(`GET request to ${endpoint} failed: ${error.message}`);
    }
  }

  async send_command(params) {
    const endpoint = "/v1/send_command";
    try {
      if (this.isTokenExpiringSoon()) {
        await this.refreshApiKey();
      }
      const response = await this.client.post(endpoint, params);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.refreshApiKey();
        return this.send_command(params);
      }
      throw new Error(`GET request to ${endpoint} failed: ${error.message}`);
    }
  }

  async get_device_state(params) {
    const endpoint = "/v1/get_device_state";
    try {
      if (this.isTokenExpiringSoon()) {
        await this.refreshApiKey();
      }
      const response = await this.client.get(endpoint, {
        params: params
      });
      if(params.device_id == "all") {
        return response.data.message.devices_state;
      } else {
        return response.data.message.device_state[0];
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.refreshApiKey();
        return this.get_device_state(params);
      }
      throw new Error(`GET request to ${endpoint} failed: ${error.message}`);
    }
  }

  isTokenExpiringSoon() {
    const now = new Date();
    return now >= this.tokenExpirationTime;
  }

  async refreshApiKey() {
    try {
      const response = await this.client.get("/v1/get_access_token");
      const newAccessToken = response.data.message.access_token;
      this.client.defaults.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      this.setTokenExpirationTime(newAccessToken);
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }
}

module.exports = AtombergApiClient;
