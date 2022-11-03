import { importSPKI, jwtVerify } from 'jose';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getCookie,
  removeCookie,
  setCookie, updateUser
} from '../../helpers/Auth';
import { MATRIX_RSA_PUBLIC_KEY } from '../../helpers/Helper';
import httpClient from '../../http/httpClient';
import { PersonalInformation, SecurityInformation, SignInInformation } from '../../forms/CredentialForms';

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {
  /**
   * @description State variables for the admin profile form.
   */
  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
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

  const {
    email,
    first_name,
    last_name,
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
      role
  } = profile;

  const loadProfile = () => {
    const token = getCookie("token");
    httpClient
        .get("/user/get_user",{
            headers: {
                Authorization: token,
            }
        }).then((response) => {
            setProfile({
                ...profile,
                email: response.data.user.email,
                first_name: response.data.user.first_name,
                last_name: response.data.user.last_name,
                secondary_email: response.data.user.secondary_email,
                recovery_email: response.data.user.recovery_email,
                username: response.data.user.username,
                role: response.data.user.role
            })

    }).catch((error) => {
      window.location.href = "/unauthorized-access";
      toast(`Error: ${error}`, { type: "error" });
    });
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChangeForPersonalInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPersonalInfo: false,
      errorMessageforPersonalInfo: "",
      showButtonforPersonalInfo: false,
    });
  };
  const handleChangeForSecurityInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforSecurityInfo: false,
      errorMessageforSecurityInfo: "",
      showButtonforSecurityInfo: false,
    });
  };
  const handleChangeForUsername = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforUsername: false,
      errorMessageforUsername: "",
      showButtonforUsername: false,
    });
  };
  const handleChangeForPassword = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPassword: false,
      errorMessageforPassword: "",
      template: false,
    });
  };

// Function for jwt verification
  const verifyJWT = async (token) => {
    jwtVerify(token, await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256")).then((result) => {
      removeCookie("token");
      setCookie("token", token);
      updateUser(result.payload, () => {
        toast("Profile updated successfully", { type: "success" });
      })
    }).catch((error) => {
      toast(`Error: ${error}`, { type: "error" });
      window.location.href = "/invalid-token";
    });
  }

  const handleUpdatePersonalInfo = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforPersonalInfo: true,
      textChangeforPersonalInfo: "Updating...",
    });
    await httpClient.put("/user/update-personal-info", {
      email,
      first_name,
      last_name,
    }).then(async (response) => {
      await verifyJWT(response.data.token).then(() => {
        setProfile({
          ...profile,
          okforPersonalInfo: false,
          showButtonforPersonalInfo: true,
          textChangeforPersonalInfo: "Update",
        });
      }).catch((error) => {
        setProfile({
          ...profile,
          errorEffectforPersonalInfo: true,
          errorMessageforPersonalInfo: error.message,
          okforPersonalInfo: false,
          textChangeforPersonalInfo: "Update",
        })
      })
    }).catch((error) => {
        setProfile({
            ...profile,
            errorEffectforPersonalInfo: true,
            errorMessageforPersonalInfo: error.response.data.message,
            okforPersonalInfo: false,
            textChangeforPersonalInfo: "Update",
        });
    });
  }

  const handleUpdateSecurityInfo = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforSecurityInfo: true,
      textChangeforSecurityInfo: "Updating...",
    });
    await httpClient.put("/user/update-security-info", {
      secondary_email,
      recovery_email,
    }).then(async (response) => {
      await verifyJWT(response.data.token).then(() => {
        setProfile({
          ...profile,
          okforSecurityInfo: false,
          showButtonforSecurityInfo: true,
          textChangeforSecurityInfo: "Update",
        });
      }).catch((error) => {
        setProfile({
          ...profile,
          errorEffectforSecurityInfo: true,
          errorMessageforSecurityInfo: error.message,
          okforSecurityInfo: false,
          textChangeforSecurityInfo: "Update",
        })
      })
    }).catch((error) => {
        setProfile({
            ...profile,
            errorEffectforSecurityInfo: true,
            errorMessageforSecurityInfo: error.response.data.message,
            okforSecurityInfo: false,
            textChangeforSecurityInfo: "Update",
        });
    });
  }

  const handleUpdateUsername = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforUsername: true,
      textChangeforUsername: "Updating...",
    });
    await httpClient.put("/user/update-username", {
      username,
    }).then(async (response) => {
      await verifyJWT(response.data.token).then(() => {
        setProfile({
          ...profile,
          okforUsername: false,
          showButtonforUsername: true,
          textChangeforUsername: "Update",
        });
      }).catch((error) => {
        setProfile({
          ...profile,
          errorEffectforUsername: true,
          errorMessageforUsername: error.message,
          okforUsername: false,
          textChangeforUsername: "Update",
        })
      })
    }).catch((error) => {
        setProfile({
            ...profile,
            errorEffectforUsername: true,
            errorMessageforUsername: error.response.data.message,
            okforUsername: false,
            textChangeforUsername: "Update",
        });
    });
  }

    const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforPassword: true,
      textChangeforPassword: "Updating...",
    });
    await httpClient.put("/user/update-password", {
      old_password,
      new_password,
      confirm_password
    }).then(async (response) => {
        setProfile({
          ...profile,
          old_password: "",
            new_password: "",
            confirm_password: "",
          okforPassword: false,
          textChangeforPassword: "Update",
        });
        toast(response.data.message, { type: "success" });
    }).catch((error) => {
        setProfile({
            ...profile,
            errorEffectforPassword: true,
            errorMessageforPassword: error.response.data.message,
            okforPassword: false,
            textChangeforPassword: "Update",
        });
    });
  }

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded md:h-48 outline outline-2 outline-gray-200">
          <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Account Management
          </h1>
          <h1 className="text-sm font-medium text-gray-500">
            @{username}
          </h1>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col w-full mb-8 bg-white rounded outline outline-2 outline-gray-200">
            <div className="grid w-full h-full grid-cols-1 rounded md:grid-cols-5">
              <div className="col-span-2 p-8 bg-gray-50">
                <h1 className="mb-4 text-xl font-bold text-gray-700">
                  Account Type
                </h1>
              </div>
              <div className="flex flex-col w-full h-full col-span-3 p-8 pb-8 space-y-4">
                <div className="flex flex-col w-full space-y-2">
                  This account is an {role} account. This account has the
                  highest privileges in the system.
                </div>
              </div>
            </div>
          </div>
          {new PersonalInformation(
              errorEffectforPersonalInfo,
              setProfile,
              profile,
              handleUpdatePersonalInfo,
              handleChangeForPersonalInfo,
              email,
              first_name,
              last_name,
              errorMessageforPersonalInfo,
              showButtonforPersonalInfo,
              okforPersonalInfo,
              textChangeforPersonalInfo,
          )}
          {new SecurityInformation(
              errorEffectforSecurityInfo,
              setProfile,
              profile,
              handleUpdateSecurityInfo,
              handleChangeForSecurityInfo,
              secondary_email,
              recovery_email,
              errorMessageforSecurityInfo,
              showButtonforSecurityInfo,
              okforSecurityInfo,
              textChangeforSecurityInfo
            )}
          {new SignInInformation(
              errorEffectforUsername,
              errorEffectforPassword,
              setProfile,
              profile,
              handleUpdateUsername,
              handleChangeForUsername,
              username,
              errorMessageforUsername,
              showButtonforUsername,
              okforUsername,
              textChangeforUsername,
              handleUpdatePassword,
              handleChangeForPassword,
              old_password,
              new_password,
              confirm_password,
              errorMessageforPassword,
              showButtonforPassword,
              okforPassword,
              textChangeforPassword,
              template
          )}
        </div>
      </div>
    </div>
  );
}
