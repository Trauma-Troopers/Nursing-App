/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <TabsList />
    <router-view />
  </div>
</template>

<script>
// import the Navbar Component into the main Vue
import Navbar from "@/components/layout/Navbar";
//import the Tabs Component into the main vue
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
