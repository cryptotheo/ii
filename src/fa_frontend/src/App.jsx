import { useState } from 'react';
import {fa_backend, createActor} from 'declarations/fa_backend';
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";
// const path = require("path");

function App() {
  const [greeting, setGreeting] = useState('');

  // function initCanisterEnv() {
  //   let localCanisters, prodCanisters;
  //   try {
  //     localCanisters = require(path.resolve('/.dfx/local/canister_ids.json'))
  //   } catch (error) {
  //     console.log("No local canister_ids.json found. Continuing production");
  //   }
  //   try {
  //     prodCanisters = require(path.resolve("canister_ids.json"));
  //   } catch (error) {
  //     console.log("No production canister_ids.json found. Continuing with local");
  //   }

  //   // const canisterConfig = network === "local" ? localCanisters : prodCanisters;

  //   const canisterConfig = localCanisters;

  //   return Object.entries(canisterConfig).reduce((prev, current) => {
  //     const [canisterName, canisterDetails] = current;
  //     prev[canisterName.toUpperCase() + "_CANISTER_ID"] =
  //       canisterDetails[network];
  //     return prev;
  //   }, {});
  // }
    
  // const canisterEnvVariables = initCanisterEnv();
  // const internetIdentityUrl = network === "local" ? `http://${canisterEnvVariables["INTERNET_IDENTITY_CANISTER_ID"]}.localhost:4943/` : `https://identity.ic0.app`

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const greeting = await fa_backend.greet();
      setGreeting(greeting);
    } catch {
      console.error('Error fetching greeting:', error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(process.env.FA_BACKEND_CANISTER_ID)

    try {
      let authClient = await AuthClient.create();
      await new Promise((resolve) => {
        authClient.login({
          identityProvider: "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/",
          onSuccess: resolve,
        });
      });
      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      actor = await createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
        agent,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }

  } 

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <form action="#" onSubmit={handleLogin}>
        <button type="submit">Login</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
