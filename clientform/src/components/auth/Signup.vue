<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>

      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <!-- if the feedback exisists display the message  -->
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
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
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      // checks for user auth
      if (this.alias && this.email && this.password) {
        // slugify always takes two params
        this.slug = slugify(this.alias, {
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
            this.feedback = "This alias already exists";
          } else {
            this.feedback = "This alias is free to use";
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
              });
          }
        });
        console.log(this.slug);
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 16px;
}
</style>