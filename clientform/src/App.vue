/* eslint-disable */ 
<template>
  <div id="app">
    <Navbar />
    <Table />
    <router-view />
  </div>
</template>

<script>
// import the Navbar Component into the main Vue
import Navbar from "@/components/layout/Navbar";
//import the Table Component into the main vue
import Table from "@/components/layout/Table";
export default {
  name: "App",
  components: {
    Navbar,
    Table
  }
};
</script>

<style>
</style>
