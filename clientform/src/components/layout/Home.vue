<template>
  <div class="confirmation container">
    <div class="center outset alert-formatting">
      <h2 class="center h2-font-weight">Welcome to the IUS Nursing Checklist!</h2>
      <div class="field center padding-top">
        <router-link :to="dynamicRouteElementOne">
          <a class="btn" style = "background-color:#990000">{{ dynamicDisplayElementOne }}</a>
        </router-link>
      </div>
      <div class="field center padding-top">
        <router-link :to="dynamicRouteElementTwo">
          <a class="btn" style = "background-color:#990000">{{ dynamicDisplayElementTwo }}</a>
        </router-link>
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
  name: 'Home',

  data(){
    return {
      dynamicRouteElementOne: '',
      dynamicDisplayElementOne: '',
      dynamicRouteElementTwo: '',
      dynamicDisplayElementTwo: '',
    }
  },
  methods: {
    loadPage: function() {

      //Check if signed in and if admin
      var isSignedIn = false
      var isAdmin = false

     //Get decrypted values from local storage
      var encryptedSessionUsername = ""
      var decryptedSessionUsername = ""
      //Check if session data is available
      if (this.$session.get('super_awesome_value') != null){
        encryptedSessionUsername = this.$session.get('super_awesome_value')
      }

      //Check if signed in 
      if (encryptedSessionUsername != ""){
        isSignedIn = true;
        decryptedSessionUsername = this.CryptoJS.AES.decrypt(encryptedSessionUsername, "Username").toString(this.CryptoJS.enc.Utf8)

        //check if admin
        if (decryptedSessionUsername === "admin" || decryptedSessionUsername === "superuser"){
          isAdmin = true;
        }
      }

      if (isSignedIn && isAdmin){
        this.dynamicDisplayElementOne = 'Log Out'
        this.dynamicRouteElementOne = '/login'
        this.dynamicDisplayElementTwo = 'Admin Page'
        this.dynamicRouteElementTwo = '/admin'
      }
      else if (isSignedIn) {
        this.dynamicDisplayElementOne = 'Log Out'
        this.dynamicRouteElementOne = '/login'
        this.dynamicDisplayElementTwo = 'Checklist Page'
        this.dynamicRouteElementTwo = '/checklist'
      } 
      else {
        this.dynamicDisplayElementOne = 'Login'
        this.dynamicRouteElementOne = '/login'
        this.dynamicDisplayElementTwo = 'Signup'
        this.dynamicRouteElementTwo = '/signup'
      }
    }
  },
  beforeMount() {
    this.loadPage()
  }
};
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
