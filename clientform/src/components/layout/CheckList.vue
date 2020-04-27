<template>
  <div>
    <hr>
    <p style="font-size:30px; background-color:#D4D4D4"><center>IU Southeast School of Nursing Skills Checklist</center></p>
    <hr>
    <table class="table">
        <tr>
          <td class="white-text items" style="background-color:#990000" v-for="item in tabs" @click="filterChecks(item.id)">
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
        <tr v-for="check in checks">
          <td colspan="3">{{check.get("name")}}</td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" v-model="checked1" class="chkbox" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" v-model="checked2" class="chkbox" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" v-model="checked3" class="chkbox" />
              <span></span>
            </center></label>
          </td>
          <td colspan="3">
            <label><center>
              <input type="checkbox" v-model="checked4" class="chkbox" />
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
            tabs: [],
            checks: [],
            checked1: [],
            checked2: [],
            checked3: [],
            checked4: [],
            user: null
        }
    },
    methods: {
        loadPage: function () {
          console.log(this.user)
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
          
            
        },
        filterChecks: function (id) {
            this.checks = []
            var checkitems = this.user.collection("checklist").doc(id).collection("checkitems")
            checkitems.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.checks.push(doc)
                    this.checked1.push(doc.get("level1"))
                    this.checked2.push(doc.get("level2"))
                    this.checked3.push(doc.get("level3"))
                    this.checked4.push(doc.get("level4"))
                })
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
