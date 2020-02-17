/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <TabsList />
    <router-view />
  </div>
</template>

<script>

// Components:
import Navbar from "@/components/layout/Navbar";
import TabsList from "@/components/layout/TabsList";


export default {
  name: "App",
  components: {
    Navbar,
    TabsList
  }
};
</script>

<style>
</style>
