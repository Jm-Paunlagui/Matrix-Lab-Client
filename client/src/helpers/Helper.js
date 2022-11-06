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
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
);

/**
 * @description Public RSA key to decrypt the encrypted data from the server.
 * @type {string}
 */
export const MATRIX_RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----\n${process.env.REACT_APP_MATRIX_RSA_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

/**
 * @description Gets only the number from the string.
 * @param string
 * @returns {*}
 */
export const getNumberFromString = (string) => {
  return string.split(" - ")[0];
}

/**
 * @description Gets only the name from the string.
 * @param string
 * @returns {*}
 */
export const getNameFromString = (string) => {
    return string.split(" - ")[1];
}