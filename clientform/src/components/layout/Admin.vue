<template>
  <div>
    <div style="display: flex;" class="login container">
      <form @submit.prevent="populate">
        <div class="field">
        <h5 class="center deep-black-text">Display Student's Checklist</h5>
        
          <label for="username" class="black-text credentials">Enter Student's IUS Username:</label>
          <input type="text" name="username" v-model="username" />
        </div>
        <p class="center" v-bind:style="{color: textColor}" v-if="feedback">{{ feedback }}</p> 
        <div class="field center">
          <button class="btn" style = "background-color:#990000">Display</button>
        </div>
      </form>
      <!-- Creates a separate form for exporting user to csv (in progress)
           - Change login CSS width to 1200px
      <form class="leftSpace" @submit.prevent="exportSpreadsheet">
        <div class="field">
        <h5 class="center deep-black-text">Export User to Spreadsheet</h5>
        
          <label for="usernameForExport" class="black-text credentials">IUS Username:</label>
          <input type="text" name="usernameForExport" v-model="usernameForExport" />
        </div>
        <p class="red-text center" v-if="feedbackForExport">{{ feedbackForExport }}</p> 
        <div class="field center">
          <button class="btn" style = "background-color:#990000">Export</button>
        </div>
      </form>
      -->
    </div>
    <hr>
    <table class="table">
        <tr>
          <td class="white-text items" v-bind:style="{ backgroundColor:'#990000'}" v-for="item in tabs" :key="item.id" @click="populateColumnById(item.id)">
            <div class ="verticalLine">
             <th v-if="selected==item.id" style='color: black'>{{item.id}}</th>
             <th v-else>{{item.id}}</th>
            </div>
          </td>
        </tr>
        <!-- tabs -->
        <tr class="levelsRow">
          <td colspan="3">
            Identified Skill:
            </td>
          <td colspan="3">
            <p class="levelsVerticalLine">
              <center>
                Level 1:<br>
                Performed Independently
              </center>
            </p>
          </td>
          <td colspan="3">
            <p class="levelsVerticalLine">
              <center>
                Level 2:<br>
                Performed with Assistance
              </center>
            </p>
          </td>
          <td colspan="3">
            <p class="levelsVerticalLine">
              <center>
                Level 3:<br>
                Performed in Simulation
              </center>
            </p>
          </td>
          <td colspan="3">
            <p class="levelsVerticalLine">
              <center>
                Level 4:<br>
                NEVER Performed in Clinical or Sim
              </center>
            </p>
          </td>
        </tr>
        <tr v-for="check in checks" :key="check.id">
          <td colspan="3" class="tasksVerticalLine">{{check.get("name")}}</td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level1')" type="checkbox" disabled  class="chkbox" checked/>
              <input v-else type="checkbox" disabled class="chkbox"/>
              <span></span>
            </center></label>
          </td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level2')" type="checkbox" disabled class="chkbox" checked/>
              <input v-else type="checkbox" disabled class="chkbox"/>
              <span></span>
            </center></label>
          </td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level3')" type="checkbox" disabled class="chkbox" checked/>
              <input v-else type="checkbox" disabled  class="chkbox" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level4')" type="checkbox"  disabled class="chkbox" checked/>
              <input v-else type="checkbox" disabled class="chkbox " />
              <span></span>
            </center></label>
          </td>
        </tr>
      <!-- checks row -->
    </table>
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

  data(){
    return {
      selected: "General",
      tabs: [],
      checks: [],
      user: null,
      username: null,
      //usernameForExport: null,
      feedback: null,
      //feedbackForExport: null,
      slug: null,
      userdoc: null,
      textColor: ''
    }
  },
  methods: {
    populate() {         
      if (this.username){
        this.tabs = []
        // slugify always takes two params
        this.slug = slugify(this.username, {
          replacement: "-",
          //   regex globals
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // let ref is going to equal an object from the users collection
        // .doc will reference the slug passed as the id
        let ref = db.collection("users").doc(this.slug)
        // Check to determine if the reference exists
        ref.get().then(doc => {
          if (doc.exists) {
            db.collection("users").where("username", "==", this.slug).get()
            .then((userSnap) => {
              this.user = userSnap.docs[0].ref
              this.user.collection("checklist").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      this.tabs.push(doc)
                  });
              });
              this.populateColumnById("General")
              this.textColor = 'green'
              this.feedback = `IUS username '${this.username}' was successfully displayed.`;
            })
            this.feedback = '';
          } else {
            this.textColor = 'red'
            this.feedback = `User '${this.username}' does not exist, please try again.`;
          }
        })
      } 
    },
      // Attempting to figure out how to export to Json, then convert to csv
      // exportSpreadsheet() {         
      //   if (this.usernameForExport){
      //     // slugify always takes two params
      //     this.slug = slugify(this.usernameForExport, {
      //       replacement: "-",
      //       //   regex globals
      //       remove: /[$*_+~.()'"!\-:@]/g,
      //       lower: true
      //     });
      //     // let ref is going to equal an object from the users collection
      //     // .doc will reference the slug passed as the id
      //     let ref = db.collection("users").doc(this.slug)
      //     // Check to determine if the reference exists
      //     ref.get().then(doc => {
      //       if (doc.exists) {
      //         db.collection("users").where("username", "==", this.slug).get()
      //         .then((userSnap) => {
      //           this.user = userSnap.docs[0].ref
      //           this.user.collection("checklist").get().then((querySnapshot) => {
      //               querySnapshot.forEach((doc) => {
      //                   this.tabs.push(doc)
      //               });
      //           });
      //         this.feedbackForExport = `User '${this.usernameForExport}' was successfully exported.`;
      //         })
      //         this.feedbackForExport = '';
      //       } else {
      //         this.feedbackForExport = `User '${this.usernameForExport}' does not exist , please try again.`;
      //       }
      //     })
      //   } 
      // },
    populateColumnById: function (id) {
      //this.backgroundColor = 800000 // attempt to dynamically change the tab color
      this.selected = id
      this.checks = []
      var checkitems = this.user.collection("checklist").doc(id).collection("checkitems")
      checkitems.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              this.checks.push(doc)
          })
      })
    },     
    loadPage: function() {
      if(this.$session.get('logout_notification') == null){
        this.$router.push({name: 'Login'})
      }

      //Get decrypted values from local storage
      var encryptedSessionUsername = ""
      var encryptedSessionPassword = ""

      //Check if session data is available
      if (this.$session.get('super_awesome_value') != null && this.$session.get('another_super_awesome_value')){
        encryptedSessionUsername = this.$session.get('super_awesome_value')
        encryptedSessionPassword = this.$session.get('another_super_awesome_value')
      }

      //Check if variables have been populated by session data
      if (encryptedSessionUsername != "" && encryptedSessionPassword != ""){
        const decryptedUsername = this.CryptoJS.AES.decrypt(encryptedSessionUsername, "Username").toString(this.CryptoJS.enc.Utf8)
        const decryptedPassword = this.CryptoJS.AES.decrypt(encryptedSessionPassword, "Password").toString(this.CryptoJS.enc.Utf8)

        this.slug = slugify(decryptedUsername, {
          replacement: "-",
          //   regex globals
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            firebase.auth().signInWithEmailAndPassword(doc.get("email"), decryptedPassword)
          } 
        })
      }
      else {
        this.$router.push({ name: 'Login' })
      }
    }
  },
  beforeMount() {
    this.loadPage()
  }
}

//JavaScript - converts firebase to JSON (NOT WORKING) - Google firestore2json
//   const admin = require('firebase-admin');
// const fs = require('fs');

// var firebaseConfig = {
//     apiKey: "AIzaSyCPym2WqUGrMU6tMY0O2qp7Y3HcBP1Yt0g",
//     authDomain: "nursingdb-test.firebaseapp.com",
//     databaseURL: "https://nursingdb-test.firebaseio.com",
//     projectId: "nursingdb-test",
//     storageBucket: "nursingdb-test.appspot.com",
//     messagingSenderId: "926234803998",
//     appId: "1:926234803998:web:1b9cdcad765c8fed0c530f",
//     measurementId: "G-CTKE6YMR9X"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// const schema = require('./schema').schema;

// const firestore2json = (db, schema, current) => {
//   return Promise.all(
//     Object.keys(schema).map(collection => {
//       return db
//         .collection(collection)
//         .get()
//         .then(data => {
//           let promises = [];
//           data.forEach(doc => {
//             if (!current[collection]) current[collection] = { __type__: 'collection' };
//             current[collection][doc.id] = doc.data();
//             promises.push(
//               firestore2json(
//                 db.collection(collection).doc(doc.id),
//                 schema[collection],
//                 current[collection][doc.id]
//               )
//             );
//           });
//           return Promise.all(promises);
//         });
//     })
//   ).then(() => current);
// };

// firestore2json(firebaseApp.firestore(), { ...schema }, {}).then(res =>
//   fs.writeFileSync('./src/native_web/firebase/local_db.json', JSON.stringify(res, null, 2), 'utf8')
// );
</script>

<style>

  hr{
    padding-top: 5px;
    margin: 0px;
    background-color:#DEDEDE;
  }

  p{
    padding: 0px;
    margin: 0px;    
  }

  .items {
    cursor: pointer;
  }
  
  .chkbox {
    align-content: center;
  }

  .levelsRow{
    background-color:#D4D4D4;
  }

  .tasksVerticalLine {
    border-left: solid rgba(243, 238, 238, 0.829);
  }

  .levelsVerticalLine {
    border-left: solid rgba(70, 66, 66, 0.747);
    padding-top: 0px;
  }

  .verticalLine {
    border-left: solid rgba(114, 7, 3, 0.788);
    height: 100px;
  }

  ul.categoryBullet {
    border-left: solid black;
    list-style-type: circle;
  }

.login {
  max-width: 400px;
  margin-top: 60px;
}

.leftSpace {
  margin-left: 40%;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>