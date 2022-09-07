import { useState } from "react";

export function getJwtToken() {
  return sessionStorage.getItem("jwt");
}

export function setJwtToken(token: any) {
  sessionStorage.setItem("jwt", token);
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}

export function setRefreshToken(token: any) {
  sessionStorage.setItem("refreshToken", token);
}

// fetching access token

export const fetchAccessToken = async (): Promise<any> => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/Members/token/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: getRefreshToken() }),
    }
  );
  if (!res.ok) {
    console.log("error at fetching token");
    throw new Error("Problem fetching token");
  }
  return res.json();
};

// fetching data

export const fetchData = async (api: string): Promise<any> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}${api}`, {
      headers: { authorization: "Bearer " + getJwtToken() },
    });
    if (!res.ok) {
      if (res.status == 401) {
        const newToken = fetchAccessToken();
        console.log(newToken)
        setJwtToken(newToken);

        throw new Error("Problem fetching data, Retrying...");
      } else {
        console.log(
          `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
        );
        throw new Error("Problem fetching data");
      }
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
