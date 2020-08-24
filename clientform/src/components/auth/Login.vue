<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-black-text">Log In</h2>
      <div class="field">
        <label for="username" class="black-text credentials">IUS Username:</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <div class="field">
        <label for="password" class="black-text credentials">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn" style = "background-color:#990000">Log In</button>
      </div>
      <div>
        <p class="center outset alert-formatting">Forgot your password? <a href @click="$router.push('/passwordreset')">Click here.</a></p>
      </div>
    </form>
  </div>
</template>

<script>

// Import Slugify into the project
import slugify from "slugify";
// imports firestore db
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      feedback: null,
      slug: null,
      userdoc: null
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {

        this.$session.destroy()

        //notification to be triggered when user logs out
        const logoutNotification = "You have been signed out, please re-login."
        //encrypt username and password
        const encryptedUsername = this.CryptoJS.AES.encrypt(this.username.toLowerCase(), "Username").toString()
        const encryptedPassword = this.CryptoJS.AES.encrypt(this.password, "Password").toString()
        
        // start session then push to local storage
        this.$session.start()
        //this.$session.set('is_signed_in', "true")
        this.$session.set('logout_notification', logoutNotification)
        this.$session.set('super_awesome_value', encryptedUsername)
        this.$session.set('another_super_awesome_value', encryptedPassword)
        
        // //Working decryption from session variable
        // var encryptedSessionText = this.$session.get('another_super_awesome_value')
        // console.log(encryptedSessionText)
        // const decryptedText = this.CryptoJS.AES.decrypt(encryptedSessionText, "Password").toString(this.CryptoJS.enc.Utf8)
        // console.log(decryptedText)

         // slugify always takes two params
        this.slug = slugify(this.username, {
          replacement: "-",
          //   regex globals
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // let ref is going to equal an object from the users collection
        // .doc will reference the slug passed as the id
        let ref = db.collection("users").doc(this.slug);
        // Check to determine if the reference exists
        ref.get().then(doc => {
          if (doc.exists) {
            firebase.auth().signInWithEmailAndPassword(doc.get("email"), this.password)
            .then(() => {
              if(this.slug == "admin" || this.slug == "superuser"){
                this.$router.push({name: 'Admin'})
              }else 
                this.$router.push({name: 'CheckList'});
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              this.feedback = "Incorrect password.";
              // ...
            });
          } else {
            this.feedback = "User does not exist, please Signup."
          }
        })
      } else {
        this.feedback = "You must enter all fields.";
      }
    },
    loadPage: function() {
      if(this.$session.get('logout_notification') != null){
        var logoutNotification = this.$session.get('logout_notification')
        this.$alert(logoutNotification);
      }
      this.$session.destroy()
    }
  },
  beforeMount() {
    this.loadPage()
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

.credentials {
  font-size:16px;
}
</style>