/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <!-- Only want to Render when Authentication has been made Sucessfully -->
    <!-- <CheckList /> -->
    <router-view />
  </div>
</template>

<script>

// Components:
import Navbar from "@/components/layout/Navbar";
import CheckList from "@/components/layout/CheckList";


export default {
  name: "App",
  components: {
    Navbar,
    CheckList
  }
};
</script>

<style>
</style>
