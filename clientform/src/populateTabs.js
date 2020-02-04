
import firebase from "@/firebase/init"
export default {
    name: 'Tabs',
   components: {
       firebase,
    },
    data: function() {
       return{
           tabs: []
       } 
    },
    methods: {
        loadPage: function(){
            firebase.collection("checklist").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.tabs.push(doc)
                });
            }); 
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
