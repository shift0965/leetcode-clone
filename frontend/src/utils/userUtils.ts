import { userApi } from "../api";
import { jwtDecode } from "jwt-decode";

export async function getAuthToken(): Promise<string> {
  // Check if token already exists in localStorage
  // localStorage.removeItem("userToken")
  const existingToken = localStorage.getItem("userToken");

  if (existingToken) {
    const payload = parseJwt(existingToken)
    const nowSec = Math.floor(Date.now() / 1000); // current time in seconds
    const oneDaySec = 24 * 60 * 60;

    if (payload?.iat && (nowSec - payload.iat < oneDaySec)) {
      return existingToken;
    } else {
      try {
        const { userToken } = await userApi.updateToken(existingToken);
        localStorage.setItem("userToken", userToken);
        return userToken;
      } catch (err) {
        console.warn("Failed to refresh token:", err);
      }
    }
  }

  // No token found, create new user
  try {
    const data = await userApi.create();
    const token = data.userToken;

    if (!token) {
      throw new Error("No token received from server");
    }

    // Store token in localStorage
    localStorage.setItem("userToken", token);

    return token;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

type Payload = {
  userPublicId: string;
  exp?: number;
  iat?: number;
};

export function parseJwt(token: string): Payload | null {
  try {
    return jwtDecode<Payload>(token);
  } catch {
    return null;
  }
}