import { USER_CREATE } from "../api.const";

export async function getAuthToken(): Promise<string> {
  // Check if token already exists in localStorage
  const existingToken = localStorage.getItem("userToken");

  if (existingToken) {
    return existingToken;
  }

  // No token found, create new user
  try {
    const response = await fetch(USER_CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    const data = await response.json();
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