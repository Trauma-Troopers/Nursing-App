<template>
  <div>
    <hr>
    <table class="table">
        <tr>
          <td class="white-text items" v-bind:style="{ backgroundColor:'#990000'}" v-for="item in tabs" :key="item.id" @click="filterChecklistItemsByCategory(item.id)">
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
              <input v-if="check.get('level1')" type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 1)" checked/>
              <input v-else type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 1)" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level2')" type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 2)" checked/>
              <input v-else type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 2)" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level3')" type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 3)" checked/>
              <input v-else type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 3)" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3" class="tasksVerticalLine">
            <label><center>
              <input v-if="check.get('level4')" type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 4)" checked/>
              <input v-else type="checkbox" class="chkbox" @click="updateChecksToFirebase(check.ref.path, 4)" />
              <span></span>
            </center></label>
          </td>
        </tr>
      <!-- checks row -->
    </table>
  </div>
</template>



<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase"
export default {
  name: 'CheckList',
    data(){
        return {
          selected: "General",
            tabs: [],
            checks: [],
            user: null
        }
    },
    methods: {
        loadPage: function () {
          //If we are no longer signed in, go to login
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

            this.username = decryptedUsername
            this.password = decryptedPassword
            
            this.slug = slugify(this.username, {
              replacement: "-",
              //   regex globals
              remove: /[$*_+~.()'"!\-:@]/g,
              lower: true
            });

            let ref = db.collection("users").doc(this.slug);
            ref.get().then(doc => {
              if (doc.exists) {
                firebase.auth().signInWithEmailAndPassword(doc.get("email"), this.password)
                .then(() => {
                  var authMail = firebase.auth().currentUser.email
                  db.collection("users").where("email", "==", authMail).get()
                  .then((userSnap) => {
                    this.user = userSnap.docs[0].ref
                    this.user.collection("checklist").get().then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        this.tabs.push(doc)
                      });
                    });
                  this.filterChecklistItemsByCategory("General")
                  })
                })
              } else {
                this.feedback = "User does not exist, please Signup."
              }
            })
          }
          else if(firebase.auth().currentUser == null){
            this.$router.push({ name: 'Login' })
          }
          else{
            var authMail = firebase.auth().currentUser.email
            db.collection("users").where("email", "==", authMail).get()
            .then((userSnap) => {
              this.user = userSnap.docs[0].ref
              this.user.collection("checklist").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.tabs.push(doc)
                });
              });
            this.filterChecklistItemsByCategory("General")
            })
          }  
        },
        filterChecklistItemsByCategory: function (id) {
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
        updateChecksToFirebase: function (checkPath, level){
        var check = db.doc(checkPath)
        check.get().then(doc => {
          var checkItem = doc
          
          switch(level){
            case 1:
              var valueChanged = checkItem.get("level1")
              checkItem.ref.update({level1: !valueChanged})
              break
              case 2:
              var valueChanged = checkItem.get("level2")
              checkItem.ref.update({level2: !valueChanged})
                break
                case 3:
              var valueChanged = checkItem.get("level3")
              checkItem.ref.update({level3: !valueChanged})
                  break
                  default:
              var valueChanged = checkItem.get("level4")
              checkItem.ref.update({level4: !valueChanged})
          }
        }) 
      }
    },
    beforeMount() {
        this.loadPage()
    }
}
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
</style>
