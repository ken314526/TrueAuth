"use client";

import React, { useEffect, useState } from "react";
import Login from "@/components/Login";
import OTP from "@/components/OTP";

export default function LoginPage() {
  const [credentialsNotFilled, setCredentialsNotFilled] = useState(true);

  return (
    <>
      {credentialsNotFilled ? (
        <Login setCredentialsNotFilled={setCredentialsNotFilled} />
      ) : (
        <OTP setCredentialsNotFilled={setCredentialsNotFilled} />
      )}
    </>
  );
}
