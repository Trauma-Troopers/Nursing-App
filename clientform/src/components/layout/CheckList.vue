<template>
  <div>
    <hr>
    <table class="table">
        <tr>
          <td class="white-text items" v-bind:style="{ backgroundColor: '#' + backgroundColor}" v-for="item in tabs" :key="item.id" @click="filterChecks(item.id)">
            <div class ="verticalLine">
             <th>{{item.id}}</th>
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
          <td colspan="3">{{check.get("name")}}</td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" class="chkbox" @click="updateCheck()" checked='true'/>
              <span></span>
            </center></label>
          </td>
          <td colspan="3">
            <label><center>
              <input type="checkbox"  class="chkbox" @click="updateCheck()"/>
              <span></span>
            </center></label>
          </td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" class="chkbox" @click="updateCheck()"/>
              <span></span>
            </center></label>
          </td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" class="chkbox" @click="updateCheck()"/>
              <span></span>
            </center></label>
          </td>
        </tr>
      <!-- checks row -->
    </table>
  </div>
</template>



<script>
import db from "@/firebase/init";
import firebase from "firebase"
export default {
  name: 'CheckList',
    data(){
        return {
          backgroundColor: 990000,
            tabs: [],
            checks: [],
            user: null
        }
    },
    methods: {
        loadPage: function () {
          if(firebase.auth().currentUser == null){
         this.$router.push({ name: 'Login' })
     }else{
       
          var authMail = firebase.auth().currentUser.email
            db.collection("users").where("email", "==", authMail).get()
          .then((userSnap) => {
            this.user = userSnap.docs[0].ref
            
            this.user.collection("checklist").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                this.tabs.push(doc)
                            });
                        });
                        this.filterChecks("General")
          })
          
     }
        },
        filterChecks: function (id) {
          //this.backgroundColor = 800000 // attempt to dynamically change the tab color
            this.checks = []
            var checkitems = this.user.collection("checklist").doc(id).collection("checkitems")
            checkitems.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.checks.push(doc)
                })
            })
        },
        updateCheck: function (){

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
