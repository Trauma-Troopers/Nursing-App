
import firebase from "@/firebase/init"
export default {
    name: 'Tabs',
   components: {
       firebase,
    },
    data: function() {
       return{
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
        loadPage: function(){
            firebase.collection("checklist").get().then((querySnapshot) => {
                this.tabnum = (querySnapshot.size)/5
                querySnapshot.forEach((doc) => {
                    this.tabs.push(doc)
                });
            }); 
            this.filterChecks("General")
        },
        filterChecks: function(id){
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
    beforeMount(){
        this.loadPage()
    }
}

    

/*var tabsHTML=""
var currentTab = "General"
firebase.collection("checklist").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        tabsHTML+=("<td class='tab' id="+doc.id+">"+doc.id+"</td>")
document.getElementById("tabsRow").innerHTML = tabsHTML
    });
    setTabClicks()
});

function setTabClicks(){
    var tabs = document.getElementsByClassName("tab")
for (var i =0; i<tabs.length; i++){
tabs[i].onclick = tabSelected(tabs[i].id)
}
}

function tabSelected(id){
    currentTab = id
}*/
