<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-black-text">Welcome Student</h2>
      <h3 class="center deep-black-text">Login</h3>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" v-mode="password" />
      </div>
      <div class="field center">
        <button class="btn" style = "background-color:#990000">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      userdoc: null
    };
  },
  methods: {
    login() {}
  }
};
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>