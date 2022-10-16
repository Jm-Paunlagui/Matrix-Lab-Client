import React, { useEffect } from "react";
import httpClient from "../http/httpClient";
import { toast } from "react-toastify";

export default function Auth() {
  const [user, setUser] = React.useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    role: "",
    path: "",
  });

  useEffect(() => {
    (async () => {
      // Make a single request to the API to get the user data and store it in the session storage
      const response = await httpClient.get("/get_user");
      if (response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
      } else {
        toast(response.data.message, {
          type: "error",
          autoClose: 2500,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    })();
  }, []);

  return user;
}
