import Head from "next/head";
import { useState } from "react";
import LoginRegister from "@/components/LoginRegister";

export default function User() {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  return (
    <>
      <Head>
        <title>Rönesans | TO-DO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="user-container">
        <LoginRegister
          type={loginOrRegister}
          setLoginOrRegister={setLoginOrRegister}
        />
      </div>
    </>
  );
}
