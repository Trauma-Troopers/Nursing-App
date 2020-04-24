<template>
      <div class="navbar">
    <nav style="background-color: #990000">
      <div class="container">
        <router-link to="/">
          <a href class="brand-logo left">IUS Nursing Form</a>
        </router-link>
        <ul class="right">
          <li>
            <router-link to="/signup">Sign up</router-link>
          </li>
          <li>
            <router-link to="/">Login</router-link>
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