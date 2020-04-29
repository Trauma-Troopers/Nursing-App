<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-black-text">Welcome Administrator</h2>
      <h2 class="center deep-black-text">Enter Student's IUS Username</h2>
      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn" style = "background-color:#990000">Login</button>
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
  name: "Admin",
  data() {
    return {
      username: null,
      feedback: null,
      slug: null,
      userdoc: null
    };
  },
  methods: {
    login() {
      if (this.username == 'daleruss') {
        
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

            //TODO: Auth here.  Not sure if possible without password.
            //Possible to pull a view of users checklist without auth?
            this.$router.push({name: 'CheckList'}); //create a new AdminChecklist vue file that is readonly (cannot uncheck/check).
          } else {
            this.feedback = "User does not exist, please try again."
          }
        })
      } else {
        this.feedback = "Something went wrong, please try again.";
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