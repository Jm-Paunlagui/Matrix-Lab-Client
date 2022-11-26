import { importSPKI, jwtVerify } from "jose";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCookie,
  removeCookie,
  setCookie,
  updateUser,
} from "../../helpers/Auth";
import { MATRIX_RSA_PUBLIC_KEY } from "../../helpers/Helper";
import httpClient from "../../http/httpClient";
import {
  AccountType,
  PersonalInformation,
  SecurityInformation,
  SignInInformation,
} from "../../forms/CredentialForms";

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {
  /**
   * @description State variables for the admin profile form.
   */
  const [profile, setProfile] = useState({
    email: "",
    full_name: "",
    okforPersonalInfo: false,
    errorEffectforPersonalInfo: false,
    errorMessageforPersonalInfo: "",
    showButtonforPersonalInfo: true,
    textChangeforPersonalInfo: "Update",
    secondary_email: "",
    recovery_email: "",
    okforSecurityInfo: false,
    errorEffectforSecurityInfo: false,
    errorMessageforSecurityInfo: "",
    showButtonforSecurityInfo: true,
    textChangeforSecurityInfo: "Update",
    username: "",
    okforUsername: false,
    errorEffectforUsername: false,
    errorMessageforUsername: "",
    showButtonforUsername: true,
    textChangeforUsername: "Update",
    old_password: "",
    new_password: "",
    confirm_password: "",
    okforPassword: false,
    errorEffectforPassword: false,
    errorMessageforPassword: "",
    showButtonforPassword: true,
    textChangeforPassword: "Update",
    template: true,
    role: "",
  });
  /**
   * @description Deconstructs the state variables for the admin profile form.
   */
  const {
    email,
    full_name,
    okforPersonalInfo,
    errorEffectforPersonalInfo,
    errorMessageforPersonalInfo,
    showButtonforPersonalInfo,
    textChangeforPersonalInfo,
    secondary_email,
    recovery_email,
    okforSecurityInfo,
    errorEffectforSecurityInfo,
    errorMessageforSecurityInfo,
    showButtonforSecurityInfo,
    textChangeforSecurityInfo,
    username,
    okforUsername,
    errorEffectforUsername,
    errorMessageforUsername,
    showButtonforUsername,
    textChangeforUsername,
    old_password,
    new_password,
    confirm_password,
    okforPassword,
    errorEffectforPassword,
    errorMessageforPassword,
    showButtonforPassword,
    textChangeforPassword,
    template,
    role,
  } = profile;

  /**
   * @description Handles the Profile form change
   */
  const loadProfile = () => {
    const token = getCookie("token");
    httpClient
      .get("/user/get_user", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setProfile({
          ...profile,
          email: response.data.user.email,
          full_name: response.data.user.full_name,
          secondary_email: response.data.user.secondary_email,
          recovery_email: response.data.user.recovery_email,
          username: response.data.user.username,
          role: response.data.user.role,
        });
      })
      .catch((error) => {
        window.location.href = "/unauthorized-access";
        toast(`Error: ${error.message}`, { type: "error" });
      });
  };

  /**
   * @description UseEffect hook to load the profile form on page load.
   */
  useEffect(() => {
    loadProfile();
  }, []);

  /**
   * @description Handles the Personal Information form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForPersonalInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPersonalInfo: false,
      errorMessageforPersonalInfo: "",
      showButtonforPersonalInfo: false,
    });
  };

  /**
   * @description Handles the Security Information form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForSecurityInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforSecurityInfo: false,
      errorMessageforSecurityInfo: "",
      showButtonforSecurityInfo: false,
    });
  };

  /**
   * @description Handles the Username form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForUsername = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforUsername: false,
      errorMessageforUsername: "",
      showButtonforUsername: false,
    });
  };

  /**
   * @description Handles the Password form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForPassword = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPassword: false,
      errorMessageforPassword: "",
      template: false,
    });
  };

  /**
   * @description Handles the token verification with the public key for security purposes.
   * @param token
   * @returns {Promise<void>}
   */
  const verifyJWT = async (token) => {
    jwtVerify(token, await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"))
      .then((result) => {
        removeCookie("token");
        setCookie("token", token);
        updateUser(result.payload, () => {
          toast("Profile updated successfully", { type: "success" });
        });
      })
      .catch((error) => {
        toast(`Error: ${error}`, { type: "error" });
        window.location.href = "/invalid-token";
      });
  };

  /**
   * @description Handles the Personal Information form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdatePersonalInfo = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforPersonalInfo: true,
      textChangeforPersonalInfo: "Updating...",
    });
    await httpClient
      .put("/user/update-personal-info", {
        email,
        full_name,
      })
      .then(async (response) => {
        await verifyJWT(response.data.token)
          .then(() => {
            setProfile({
              ...profile,
              okforPersonalInfo: false,
              showButtonforPersonalInfo: true,
              textChangeforPersonalInfo: "Update",
            });
          })
          .catch((error) => {
            setProfile({
              ...profile,
              errorEffectforPersonalInfo: true,
              errorMessageforPersonalInfo: error.message,
              okforPersonalInfo: false,
              textChangeforPersonalInfo: "Update",
            });
          });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforPersonalInfo: true,
          errorMessageforPersonalInfo: error.response.data.message,
          okforPersonalInfo: false,
          textChangeforPersonalInfo: "Update",
        });
      });
  };

  /**
   * @description Handles the Security Information form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdateSecurityInfo = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforSecurityInfo: true,
      textChangeforSecurityInfo: "Updating...",
    });
    await httpClient
      .put("/user/update-security-info", {
        secondary_email,
        recovery_email,
      })
      .then(async (response) => {
        await verifyJWT(response.data.token)
          .then(() => {
            setProfile({
              ...profile,
              okforSecurityInfo: false,
              showButtonforSecurityInfo: true,
              textChangeforSecurityInfo: "Update",
            });
          })
          .catch((error) => {
            setProfile({
              ...profile,
              errorEffectforSecurityInfo: true,
              errorMessageforSecurityInfo: error.message,
              okforSecurityInfo: false,
              textChangeforSecurityInfo: "Update",
            });
          });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforSecurityInfo: true,
          errorMessageforSecurityInfo: error.response.data.message,
          okforSecurityInfo: false,
          textChangeforSecurityInfo: "Update",
        });
      });
  };

  /**
   * @description Handles the Username form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdateUsername = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforUsername: true,
      textChangeforUsername: "Updating...",
    });
    await httpClient
      .put("/user/update-username", {
        username,
      })
      .then(async (response) => {
        await verifyJWT(response.data.token)
          .then(() => {
            setProfile({
              ...profile,
              okforUsername: false,
              showButtonforUsername: true,
              textChangeforUsername: "Update",
            });
          })
          .catch((error) => {
            setProfile({
              ...profile,
              errorEffectforUsername: true,
              errorMessageforUsername: error.message,
              okforUsername: false,
              textChangeforUsername: "Update",
            });
          });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforUsername: true,
          errorMessageforUsername: error.response.data.message,
          okforUsername: false,
          textChangeforUsername: "Update",
        });
      });
  };

  /**
   * @description Handles the Password form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforPassword: true,
      textChangeforPassword: "Updating...",
    });
    await httpClient
      .put("/user/update-password", {
        old_password,
        new_password,
        confirm_password,
      })
      .then((response) => {
        setProfile({
          ...profile,
          old_password: "",
          new_password: "",
          confirm_password: "",
          okforPassword: false,
          textChangeforPassword: "Update",
        });
        toast(response.data.message, { type: "success" });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforPassword: true,
          errorMessageforPassword: error.response.data.message,
          okforPassword: false,
          textChangeforPassword: "Update",
        });
      });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Account Management
          </h1>
          <h1 className="text-sm font-medium text-gray-500">@{username}</h1>
        </div>
        <div className="col-span-2">
          {new AccountType(role)}
          {
            new PersonalInformation(
              email,
              errorEffectforPersonalInfo,
              errorMessageforPersonalInfo,
              full_name,
              handleChangeForPersonalInfo,
              handleUpdatePersonalInfo,
              okforPersonalInfo,
              profile,
              setProfile,
              showButtonforPersonalInfo,
              textChangeforPersonalInfo,
            )
          }
          {
            new SecurityInformation(
              errorEffectforSecurityInfo,
              errorMessageforSecurityInfo,
              handleChangeForSecurityInfo,
              handleUpdateSecurityInfo,
              okforSecurityInfo,
              profile,
              recovery_email,
              secondary_email,
              setProfile,
              showButtonforSecurityInfo,
              textChangeforSecurityInfo,
            )
          }
          {
            new SignInInformation(
              confirm_password,
              errorEffectforPassword,
              errorEffectforUsername,
              errorMessageforPassword,
              errorMessageforUsername,
              handleChangeForPassword,
              handleChangeForUsername,
              handleUpdatePassword,
              handleUpdateUsername,
              new_password,
              okforPassword,
              okforUsername,
              old_password,
              profile,
              setProfile,
              showButtonforPassword,
              showButtonforUsername,
              template,
              textChangeforPassword,
              textChangeforUsername,
              username,
            )
          }
        </div>
      </div>
    </div>
  );
}
