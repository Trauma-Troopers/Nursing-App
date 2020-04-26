<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-black-text">Signup</h2>

      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <!-- if the feedback exisists display the message  -->
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn" style = "background-color:#990000">Signup</button>
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
                    email: this.email,
                    user_id: cred.user.uid
                  });
              })
              .then(cred => {
              iterateChecklistTabs(db.collection("users").doc(this.slug))
                .finally(() => {
                  this.$router.push({name: 'CheckList'});
                })
              })
              .catch(error => {// Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.feedback = errorMessage;
              });
              
            this.feedback = `User ${this.username} created`;
        
          }
        })
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
}

function iterateChecklistTabs(user){
    return new Promise(function(resolve, reject){
              db.collection("checklist").get().then((querySnapshot) => {
                              querySnapshot.forEach((checkTab) => { //checkTab is a document snapshot NOT a document reference
                              createUserTabs(user,checkTab)
                          });
                  })                          
                                  .then(() => {
                                                resolve();
                                            })
    })
       
}

function createUserTabs(user, checkTab){
         user.collection("checklist").doc(checkTab.id).set({name: checkTab.id})
         .then(() => {
          iterateCheckItems(user, checkTab)
         })
        
}

    function iterateCheckItems(user, checkTab){
                checkTab.ref.collection("checkitems").get().then((querySnapshot) => {
                                      querySnapshot.forEach((checkItem) => {
                                       createUserItems(user, checkItem, checkTab)
                                })
                              })
    }

    function createUserItems(user, checkItem, checkTab){
        user.collection("checklist").doc(checkTab.id).collection("checkitems").add({
                                          name: checkItem.get("name"),
                                          level1: checkItem.get("level1"),
                                          level2: checkItem.get("level2"),
                                          level3: checkItem.get("level3"),
                                          level4: checkItem.get("level4")})
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