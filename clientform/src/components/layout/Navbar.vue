<template>
  <div class="navbar">
    <nav style="background-color:#990000">
      <div class="container">
          <a class="brand-logo left">IUS Nursing Form</a>
        <ul class="right">
          <li>
            <router-link to="/signup">Sign Up</router-link>
          </li>
          <li>
            <router-link to="/">Login</router-link>
          </li>
          <li>
            <router-link to="/readme">How to Use</router-link>
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