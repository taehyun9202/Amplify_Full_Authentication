import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const Protected = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  });
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (err) {
      console.log(err);
      router.push("/profile");
    }
  };

  if (!user) return null;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Protected page</p>
    </div>
  );
};

export default Protected;
