<template>
  <div>
    <table class="table">
      <tr>
        <td style="background-color: #EEEDEB" v-for="item in tabs" @click="filterChecks(item.id)">{{item.id}}</td>
      </tr>
      <!-- tabs -->
      <tr>
        <td colspan="3">Name:</td>
        <td colspan="3">Level 1</td>
        <td colspan="3">Level 2</td>
        <td colspan="3">Level 3</td>
        <td colspan="3">Level 4</td>
      </tr>
      <tr v-for="check in checks">
        <td colspan="3">{{check.get("name")}}</td>
        <td colspan="3">
          <input type="checkbox" v-model="checked1" />
        </td>
        <td colspan="3">
          <input type="checkbox" v-model="checked2" />
        </td>
        <td colspan="3">
          <input type="checkbox" v-model="checked3" />
        </td>
        <td colspan="3">
          <input type="checkbox" v-model="checked4" />
        </td>
      </tr>
      <!-- checks row -->
    </table>
  </div>
</template>



<script>
import firebase from "@/firebase/init";
import user1 from "../auth/Signup"
import user2 from "../auth/Login"
export default {
  name: 'CheckList',
    data(){
        return {
            user: user1 || user2 || "fail to get user",
            tabs: [],
            checks: [],
            tabnum: 0,
            checked1: [],
            checked2: [],
            checked3: [],
            checked4: []
      }
       },
    methods: {
        loadPage: function () {
          console.log(this.user.data.userdoc);
            firebase.collection("checklist").get().then((querySnapshot) => {
                this.tabnum = (querySnapshot.size) / 5
                querySnapshot.forEach((doc) => {
                    this.tabs.push(doc)
                });
            });
            this.filterChecks("General")
        },
        filterChecks: function (id) {
            this.checks = []
            var checkitems = firebase.collection("checklist").doc(id).collection("checkitems")
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
.items {
  cursor: pointer;
}
</style>