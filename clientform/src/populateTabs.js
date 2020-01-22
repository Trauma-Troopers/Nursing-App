
import firebase from "@/firebase/init"
export default {
    name: 'Tabs',
   components: {
       firebase
    } 
}

var tabsHTML=""
firebase.collection("checklist").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        tabsHTML+=("<td class='tab'>"+doc.id+"</td>")
document.getElementById("tabsRow").innerHTML = tabsHTML
    }
    );
});

