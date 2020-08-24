<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <div>
        <p class="center outset alert-formatting">
          Please visit 
            <a href @click="$router.push('/readme')">
              THIS PAGE
            </a> 
          to learn how to use <br> the website
          before creating your account.
        </p>
      </div>
      <h2 class="center deep-black-text">Sign Up</h2>
      <div class="field">
        <label for="username" class="black-text credentials">IUS Username:</label>
        <input type="text" name="username" v-model="username" />
      </div>
      <div class="field">
        <label for="email" class="black-text credentials">Email:</label>
        <input type="text" name="email" v-model="email" />
        
      </div>
      <div class="field">
        <label for="password" class="black-text credentials"><br>Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <!-- if the feedback exisists display the message  -->
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn" style = "background-color:#990000">Sign Up</button>
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

        this.$session.destroy()

        //notification to be triggered when user logs out
        const logoutNotification = "You have been signed out, please re-login."
        //encrypt username and password
        const encryptedUsername = this.CryptoJS.AES.encrypt(this.username.toLowerCase(), "Username").toString()
        const encryptedPassword = this.CryptoJS.AES.encrypt(this.password, "Password").toString()
        
        // start session then push to local storage
        this.$session.start()
        this.$session.set('logout_notification', logoutNotification)
        this.$session.set('super_awesome_value', encryptedUsername)
        this.$session.set('another_super_awesome_value', encryptedPassword)

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
            this.feedback = "That user exists, please retry or Login.";
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
                  if(this.slug == "admin" || this.slug == "superuser"){
                    this.$router.push({name: 'Admin'})
                  }else 
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
    },
    loadPage: function() {
      if(this.$session.get('logout_notification') != null){
        this.$router.push({name: 'Login'})
      }
    }
  },
  beforeMount() {
    this.loadPage()
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

.alert-formatting {
  font-size: 14px;
  color: #990000;
  background-color:#D4D4D4; 
  font-weight: 700;
}

p.outset {
  border-style: outset;
}

.credentials {
  font-size:16px;
}
</style>