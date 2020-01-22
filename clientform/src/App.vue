/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <TabsList />
    <CheckList />
    <router-view />
  </div>
</template>

<script>
// import the Navbar Component into the main Vue
import Navbar from "@/components/layout/Navbar";
//import the Tabs Component into the main vue
import TabsList from "@/components/layout/TabsList";
//import checkitems component into main vue
import CheckList from "@/components/layout/CheckList";

export default {
  name: "App",
  components: {
    Navbar,
    TabsList,
    CheckList
  }
};
</script>

<style>
</style>
