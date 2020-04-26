<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Welcome Student</h2>
      <h3 class="center deep-purple-text">Login</h3>
      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
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
              if(this.slug == "admin"){
                this.$router.push({name: 'Admin'})
              }else this.$router.push({name: 'CheckList'});
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              this.feedback = errorMessage;
              // ...
            });
          } else {
            this.feedback = "User does not exist, please sign up"
          }
        })
      } else {
        this.feedback = "You must enter all fields";
      }
    }
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