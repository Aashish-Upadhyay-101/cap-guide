import { CookieOptions, Response } from "express";

export const setCookies = (
  res: Response,
  key: string,
  value: string,
  options?: CookieOptions,
) => {
  let maxAge = 1000 * 60 * 60 * 24 * 365; // default max age is 1 year
  switch (key) {
    case "accessToken":
      maxAge = 1000 * 60 * 15;
      break;
    case "refreshToken":
      maxAge = 1000 * 60 * 60 * 24 * 60;
      break;
  }

  res.cookie(key, value, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // true for production: Only send cookies over HTTPS
    maxAge: maxAge,
    ...options,
  });
};

export const clearCookies = (
  res: Response,
  key: string,
  options?: CookieOptions,
) => {
  res.clearCookie(key, {
    ...options,
  });
};
