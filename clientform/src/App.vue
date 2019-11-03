/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
// import the Navbar Component into the main Vue
import Navbar from "@/components/layout/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
