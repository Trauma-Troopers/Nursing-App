<template>
  <div class="readme container">
      <form  class="card-panel">
        <h3><center><strong>
            WEBSITE USAGE
        </strong></center></h3>
        <center><p class="outset category"> Signup and Login</p></center>
        <ol class="olli-font"> 
            <li>
                Signup using your <strong class="link-weight">IUS USERNAME</strong> (e.g. <strong class="link-weight">ThisIsYourUsername</strong>@ius.edu).  
                Please choose any email or password you will easily remember. You may use your IUS email address 
                but it is not required; your most-used email is best.
            </li>
            <li>
                Now in the future you can login using your IUS username and the password you chose. 
            </li>
            <li> 
                If you forget your password, you can <a class="link-weight" href @click="$router.push('/passwordreset')">RESET YOUR PASSWORD</a> by entering your IUS username 
                and then you will receive an email to the address you signed up with.
            </li>
        </ol>  
        <center><p class="outset category"> IUS Skills Checklist</p></center>
        <ol class="olli-font">      
            <li>
                Upon successfully signing up or logging in, you will be directed to the Checklist page.
            </li>
            <li>
                Complete the self-assessment by checking the box under the level that most accurately 
                reflects your experience. Share this with your preceptor or clinical instructor.
            </li>
            <li>
                Checkboxes save automatically in real time.  
                If you check or uncheck a box, you are saving this state for your next login.
                Check as many items as you need and you can close your browser any time. 
                If you navigate away from the checklist page and try to go back you 
                will be redirected to login again for authorization.
            <li> 
                Use the following Key to assess your skills:
            </li>
        </ol>
        <div class="key-container">
            <p class="padding-top level-section outset">
                <strong style="font-size:18px">
                    KEY:
                </strong><br>
                LEVEL 1: Have Performed Independently in Clinical (No verbal or visual cues)<br>
                LEVEL 2: Perform With Assistance in Clinical (Verbal, physical, visual cues)<br>
                LEVEL 3: Performed in Simulation (Junior or Senior Level, NOT S & T)<br>
                LEVEL 4: Have NEVER Performed in Clinical or Simulation (Don’t count S & T)<br>
            </p>
        </div>
        <div class="field center">
            <strong><p>View the original <a href @click="$router.push('/checkdoc')">IUS SKILLS CHECKLIST</a> document that this site was based on.</p></strong>
       </div>
        <div class="field center padding-top">
            <a class="btn" style = "background-color:#990000" @click="$router.go(-1)">Go Back</a>
       </div>
       <div class="field center">
            <strong><p>For user support, please contact <a href="mailto: traumatrooperstrio@gmail.com">traumatrooperstrio@gmail.com</a>.</p></strong>
       </div>
       </form>
  </div>
</template>

<script>
    export default {
        name: 'ReadMe'
    }
</script>

<style>
    .readme {
        max-width: 800px;
        margin-top: 60px;
    }

    .key-container {
        max-width: 800px;
        text-align: center;
    }

    .level-section {
        display: inline-block;
        padding: 10px 10px 10px 10px;
        text-align: left;
        background-color:#D4D4D4; 
        font-size: 18px;
    }

    .padding-top {
        padding-top: 20px;
    }

    .category{
        font-size: 24px;
        max-width: 250px;
        background-color:#D4D4D4; 
        font-weight: 700;
        color: #990000;
    }
    
    p.outset {
        border-style: outset;
    }

    .olli-font{
        font-size: 18px;
    }
    
    .link-weight{
        font-weight: 700;
    }
</style>
