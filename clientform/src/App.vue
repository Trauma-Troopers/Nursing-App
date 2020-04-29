/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>

// Components:
import Navbar from "@/components/layout/Navbar";
import CheckList from "@/components/layout/CheckList";
import Admin from "@/components/layout/Admin";
import ReadMe from "@/components/layout/ReadMe";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
