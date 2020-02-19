<template>
      <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link to="/checklist">
          <a href class="brand-logo left">IUS Nursing Form</a>
        </router-link>
        <ul class="right">
          <li>
            <router-link to="/signup">Sign up</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Navbar'
    
}
</script>

<style>

</style>