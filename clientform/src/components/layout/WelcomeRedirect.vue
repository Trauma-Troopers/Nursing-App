<template>
  <div class="confirmation container">
        <div class="center outset alert-formatting">
            <h2 class="center h2-font-weight">Welcome to the IUS Nursing Checklist!</h2>
            <div class="field center padding-top">
                <a class="btn" style = "background-color:#990000" @click="$router.push('/login')">Login</a>
            </div>
            <div class="field center padding-top">
                <a class="btn" style = "background-color:#990000" @click="$router.push('/signup')">Signup</a>
            </div>
            <div class="field center padding-top">
                <a class="btn" style = "background-color:#990000" @click="$router.push('/readme')">How to Use</a>
            </div>
        </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  name: 'WelcomeRedirect',
    methods: {
      loadPage: function () {
        if(firebase.auth().currentUser == null){
          this.$router.push({ name: 'Login' })
          }
      }
    },
    beforeMount() {
        this.loadPage()
    }
}
</script>

<style>
.confirmation {
  max-width: 700px;
  margin-top: 60px;
}

.confirmation h2 {
  font-size: 2.4em;
}

.confirmation .field {
  margin-bottom: 40px;
}

.alert-formatting {
  font-size: 14px;
  color: #990000;
  background-color:#D4D4D4; 
  font-weight: 500;
}

.large-font {
    font-size: 24px;
}

.h2-font-weight{
    color: black;
    font-weight: 600;
    text-decoration: underline;
}

div.outset {
    border-style: outset;
}
</style>
