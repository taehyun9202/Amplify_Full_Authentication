import React, { useEffect, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import "../configureAmplify";

const AmpAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  console.log(user);
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };
  if (!user) return null;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>welcome, {user.username}</p>
    </div>
  );
};

export default withAuthenticator(AmpAuth);
