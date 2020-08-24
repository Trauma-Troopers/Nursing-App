/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>

// Components:
import Home from "@/components/layout/Home";
import WelcomeRedirect from "@/components/layout/WelcomeRedirect";
import Navbar from "@/components/layout/Navbar";
import CheckList from "@/components/layout/CheckList";
import Admin from "@/components/layout/Admin";
import ReadMe from "@/components/layout/ReadMe";
import CheckDoc from "@/components/layout/CheckDoc";
import PassordReset from "@/components/auth/PasswordReset";
import Confirmation from "@/components/auth/Confirmation";


export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
