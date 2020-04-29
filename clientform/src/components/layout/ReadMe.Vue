<template>
  <div class="readme container">
      <form  class="card-panel">
        <h3><center><strong>
            How To Use
        </strong></center></h3>

        <p style="font-size:18px"><center><strong>
            COMPLETE THIS SELF-ASSESSMENT BY CHECKING THE BOX UNDER THE LEVEL THAT <br> MOST ACCURATELY
            REFLECTS YOUR EXPERIENCE. SHARE THIS WITH YOUR PRECEPTOR OR CLINICAL INSTRUCTOR.
        </strong></center></p>
         
         <div class="key-container">
            <p class="padding-top level-section outset" style="font-size:16px">
                <strong style="font-size:18px">
                    KEY:
                </strong><br>
                LEVEL 1: Have Performed Independently in Clinical (No verbal or visual cues)<br>
                LEVEL 2: Perform With Assistance in Clinical (Verbal, physical, visual cues)<br>
                LEVEL 3: Performed in Simulation (Junior or Senior Level, NOT S & T)<br>
                LEVEL 4: Have NEVER Performed in Clinical or Simulation (Don’t count S & T)<br>
            </p>
            </div>
        <p class="padding-top level-section" style="font-size:16px"> 

        Note: 
        <br>As soon as an item is checked or unchecked, the update is saved in real time. 
        Check as many items as you need and you can close your browser any time. 
        If you navigate away from the checklist page you will be redirected to login again for authorization.

        </p>
        <div class="field center padding-top">
            <a class="btn" style = "background-color:#990000" @click="$router.go(-1)">Go Back</a>
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

    .padding-top {
        padding-top: 20px;
    }

    .level-section {
        display: inline-block;
        padding: 10px 10px 10px 10px;
        text-align: left;
    }
    
    p.outset {border-style: outset;}

    
</style>
