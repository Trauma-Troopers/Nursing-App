<template>
  <div class="reset container">
    <form @submit.prevent="reset" class="card-panel">
      <h2 class="center deep-black-text">Reset Password</h2>
      <div class="field">
        <label for="username" class="black-text credentials">IUS Username:</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn" style = "background-color:#990000">Reset</button>
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
  name: "PasswordReset",
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
    reset() {
      if (this.username) {
        
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
            firebase.auth().sendPasswordResetEmail(doc.get("email"))
            .then(() => {
                this.$router.push({name: 'Confirmation'})
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              this.feedback = "Something went wrong, please try again.";
              // ...
            });
          } else {
            this.feedback = "User does not exist, please re-enter your IUS Username or Signup."
          }
        })
      } else {
        this.feedback = "Please enter your IUS Username.";
      }
    }
  }
};
</script>

<style>
.reset {
  max-width: 400px;
  margin-top: 60px;
}

.reset h2 {
  font-size: 2.4em;
}

.reset .field {
  margin-bottom: 16px;
}

.credentials {
  font-size:16px;
}
</style>