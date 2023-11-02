"use client";

import {
  ThirdwebProvider,
  embeddedWallet,
  useAddress,
  useEmbeddedWallet,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const connectEmbedded = useEmbeddedWallet();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const address = useAddress();

  useEffect(() => {
    connectEmbedded.connect({
      strategy: "jwt",
      jwt: token,
    });
  }, [connectEmbedded, token]);

  const submit = async () => {
    await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setToken(res.token);
      });
  };

  return (
    <ThirdwebProvider
      activeChain="goerli"
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      supportedWallets={[embeddedWallet()]}
    >
      <main className={styles.main}>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button onClick={submit}>Login</button>
        </div>
      </main>
    </ThirdwebProvider>
  );
};

export default Home;
