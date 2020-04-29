<template>
  <div class="navbar">
    <nav style="background-color:#990000">
      <div class="container">
          <a class="brand-logo left">IUS Nursing</a>
        <ul class="right">
          <li>
            <router-link to="/readme">Usage</router-link>
          </li>
          <li>
            <router-link to="/signup">Signup</router-link>
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