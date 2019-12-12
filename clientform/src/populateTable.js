
import firebase from "@/firebase/init"
export default {
    name: 'Table',
   components: {
       firebase
    } 
}

var tabsHTML=""
firebase.collection("checklist").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        tabsHTML+=("<td>"+doc.id+"</td>")
document.getElementById("tabs").innerHTML = tabsHTML
    },
    );
});

