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
};

/**
 * @description Gets only the name from the string.
 * @param string
 * @returns {*}
 */
export const getNameFromString = (string) => {
  return string.split(" - ")[1];
};

/**
 * @description Formats to a readable text.
 * @param name
 * @returns {*}
 */
export const toReadableName = (name) => {
  // remove file extension from the name if it exists
  const fileName = name.split(".")[0];
  // replace all underscores with spaces
  const readableName = fileName.replace(/_/g, " ");
  // capitalize the first letter of each word
  return readableName.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

/**
 * @description Removes the brackets from the string.
 * @param str
 * @returns {*}
 */
export const removeBrackets = (str) => {
  return str.replace(/[[\]']+/g, "");
};

/**
 * @description Removes the commas from the string.
 * @param str
 * @returns {*}
 */
export const removeComma = (str) => {
  return str.replace(/[, ]+/g, "_");
};

/**
 * @description Time Format for minutes and seconds as well as milliseconds and microseconds.
 */
export function timeFormat(time) {
  // If the time is greater than 1 minute then format it to minutes and seconds else format it to seconds
  if (time >= 60) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time - minutes * 60);

    // Correct terms like 1 minute 1 seconds to 1 minute and 1 second instead
    if (minutes === 1 && seconds === 1) {
      return `${minutes} minute and ${seconds} second`;
    } else if (minutes === 1) {
      return `${minutes} minute and ${seconds} seconds`;
    } else if (seconds === 1) {
      return `${minutes} minutes and ${seconds} second`;
    }
    return `${minutes} minutes and ${seconds} seconds`;
  } else if (time <= 60 && time > 1) {
    const seconds = Math.round(time);
    const milliseconds = Math.round((time - seconds) * 1000);
    // Correct terms like 1 second 1 milliseconds to 1 second and 1 millisecond instead
    if (seconds === 1 && milliseconds === 1) {
      return `${seconds} second and ${milliseconds} millisecond`;
    } else if (seconds === 1) {
      return `${seconds} second and ${milliseconds} milliseconds`;
    } else if (milliseconds === 1) {
      return `${seconds} seconds and ${milliseconds} millisecond`;
    }
    return `${seconds} seconds and ${milliseconds} milliseconds`;
  }
  const milliseconds = Math.round(time * 1000);
  const microseconds = Math.round((time - milliseconds) * 1000);

  // Correct terms like 1 millisecond 1 microseconds to 1 millisecond and 1 microsecond instead
  if (milliseconds === 1 && microseconds === 1) {
    return `${milliseconds} millisecond and ${microseconds} microsecond`;
  } else if (milliseconds === 1) {
    return `${milliseconds} millisecond and ${microseconds} microseconds`;
  } else if (microseconds === 1) {
    return `${milliseconds} milliseconds and ${microseconds} microsecond`;
  }
  return `${milliseconds} milliseconds and ${microseconds} microseconds`;
}
