/**
 * @description Hides the full email address and shows only the first 2 characters, and the last 1 characters.
 * @param email
 * @returns {string|*}
 */
export const maskEmail = (email) => {
  if (email.includes("*") || email === "") {
    return email;
  } // Splits the email into two parts

  const maskedEmail = email.split("@");
  return `${maskedEmail[0].slice(0, 2)}**${maskedEmail[0].slice(-1)}@${
    maskedEmail[1]
  }`;
};

/**
 * @description Hides the full username and shows only the first 2 characters, and the last 1 characters.
 * @param username
 * @returns {string|*}
 */
export const maskUsername = (username) => {
  if (username.includes("*") || username === "") {
    return username;
  } // Splits the email into two parts

  return `${username.slice(0, 2)}**${username.slice(-1)}`;
};

/**
 * @description Regex to validate the email address with RFC 5322 Official Standard.
 * @type {RegExp}
 */
export const emailRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape,no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/g,
);

export const MATRIX_RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----\n${process.env.REACT_APP_MATRIX_RSA_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
