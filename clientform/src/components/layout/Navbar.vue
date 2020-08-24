<template>
  <div class="navbar">
    <nav style="background-color:#990000">
      <div class="container">
          <a class="brand-logo left" href @click="$router.push('/home')">IUS Nursing</a>
        <ul href class="right">
          <li>
            <router-link :to="dynamicRouteElementOne">{{ dynamicDisplayElementOne }}</router-link>
          </li>
          <li>
            <router-link :to="dynamicRouteElementTwo">{{ dynamicDisplayElementTwo }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import router from "@/router/index";
export default {
  name: 'Navbar',
  
  data(){
    return {
      dynamicRouteElementOne: '',
      dynamicDisplayElementOne: '',
      dynamicRouteElementTwo: '',
      dynamicDisplayElementTwo: '',
    }
  },
  watch: {
    '$route' () {
      //Check if signed in and if admin
      var isSignedIn = false
      var isAdmin = false

     //Get decrypted values from local storage
      var encryptedSessionUsername = ""
      var decryptedSessionUsername = ""
      //Check if session data is available
      if (this.$session.get('super_awesome_value') != null){
        encryptedSessionUsername = this.$session.get('super_awesome_value')
      }

      //Check if signed in 
      if (encryptedSessionUsername != ""){
        isSignedIn = true;
        decryptedSessionUsername = this.CryptoJS.AES.decrypt(encryptedSessionUsername, "Username").toString(this.CryptoJS.enc.Utf8)

        //check if admin
        if (decryptedSessionUsername === "admin" || decryptedSessionUsername === "superuser"){
          isAdmin = true;
        }
      }

      //Check if session data is available
      if (isSignedIn && isAdmin){
        console.log("Admin Signed in")
        switch(this.$route.path){
          case '/login':
            //if Login, display Usage and Signup
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Signup'
            this.dynamicRouteElementTwo = '/signup'
            break
          case '/signup':
            //if Signup, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/checklist':
            //if Checklist, display Usage and Log Out
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/readme':
            //if Usage, display Signup and Login
            this.dynamicDisplayElementOne = 'Admin Page'
            this.dynamicRouteElementOne = '/admin'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/passwordreset':
            //if Passwordreset, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/admin':
            //if Passwordreset, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          default:
            //Blank for 'Welcome' page
            this.dynamicDisplayElementOne = ''
            this.dynamicRouteElementOne = ''
            this.dynamicDisplayElementTwo = ''
            this.dynamicRouteElementTwo = ''
        }
      }
      else if (isSignedIn){
        console.log("Signed in")
        switch(this.$route.path){
          case '/login':
            //if Login, display Usage and Signup
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Signup'
            this.dynamicRouteElementTwo = '/signup'
            break
          case '/signup':
            //if Signup, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/checklist':
            //if Checklist, display Usage and Log Out
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/readme':
            //if Usage, display Signup and Login
            this.dynamicDisplayElementOne = 'Checklist'
            this.dynamicRouteElementOne = '/checklist'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/passwordreset':
            //if Passwordreset, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/admin':
            //if Passwordreset, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          default:
            //Blank for 'Welcome' page
            this.dynamicDisplayElementOne = ''
            this.dynamicRouteElementOne = ''
            this.dynamicDisplayElementTwo = ''
            this.dynamicRouteElementTwo = ''
        }
      }
      else{
        console.log("Signed out")
        switch(this.$route.path){
          case '/login':
            //if Login, display Usage and Signup
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Signup'
            this.dynamicRouteElementTwo = '/signup'
            break
          case '/signup':
            //if Signup, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/checklist':
            //if Checklist, display Usage and Log Out
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/readme':
            //if Usage, display Signup and Login
            this.dynamicDisplayElementOne = 'Signup'
            this.dynamicRouteElementOne = '/signup'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/passwordreset':
            //if Passwordreset, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Login'
            this.dynamicRouteElementTwo = '/login'
            break
          case '/admin':
            //if Passwordreset, display Usage and Login
            this.dynamicDisplayElementOne = 'Usage'
            this.dynamicRouteElementOne = '/readme'
            this.dynamicDisplayElementTwo = 'Log Out'
            this.dynamicRouteElementTwo = '/login'
            break
          default:
            //Blank for 'Welcome' page
          this.dynamicDisplayElementOne = ''
          this.dynamicRouteElementOne = ''
          this.dynamicDisplayElementTwo = ''
          this.dynamicRouteElementTwo = ''
      }
    }
    }
  }
}


</script>

<style>
</style>