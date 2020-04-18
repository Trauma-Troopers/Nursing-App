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
        <label for="username">username:</label>
        <input type="text" name="username" v-model="username" />
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
      username: null,
      feedback: null,
      slug: null,
      userdoc: null
    };
  },
  methods: {
    signup() {
      // checks for user auth
      if (this.username && this.email && this.password) {
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
            this.feedback = "That username already exists";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                // console.log(cred.user);
                db.collection("users")
                  .doc(this.slug)
                  .set({
                    username: this.username,
                    user_id: cred.user.uid
                  });
              }).then(cred => {this.$router.push({name: 'CheckList'});})
              .catch(error => {// Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.feedback = errorMessage;
              });
            this.feedback = `User ${this.username} created`;
        //iterateChecklist(db.collection("users").doc(this.slug));
        iterateTabs(db.collection("users").doc(this.slug));
          }
        })
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
}

function iterateTabs(user){
       db.collection("checklist").get().then((querySnapshot) => {
                querySnapshot.forEach((docTab) => { //docTab is a document snapshot NOT a document reference
                    user.collection("checklist").doc(docTab.id).set({name: docTab.id}) //sets a blank document with the tabs id
                    //probably have to wait for it to finish
                   window.setTimeout(iterateCheckItems(docTab, user),1000);
                });//outer for each
            });
    }

    function iterateCheckItems(docTab, user){
      console.log("iterate items hit")
       docTab.ref.collection("checkitems").get().then((querySnapshot) => {
                      querySnapshot.forEach((docItem) => {
                        user.collection("checklist").doc(docTab.id).collection("checkitems").doc().set({
                          name: docItem.get("name"),
                          level1: docItem.get("level1"),
                          level2: docItem.get("level2"),
                          level3: docItem.get("level3"),
                          level4: docItem.get("level4")})
                })//inner for each
               })
    }

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