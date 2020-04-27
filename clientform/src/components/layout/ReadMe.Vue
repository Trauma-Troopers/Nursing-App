<template>
  <div class="readme container">
      <form  class="card-panel">
        <h2><center><strong>
            How To Use
        </strong></center></h2>

        <p style="font-size:20px"><center><strong>
            COMPLETE THIS SELF-ASSESSMENT BY CHECKING THE BOX UNDER <br>THE LEVEL THAT MOST ACCURATELY
            REFLECTS YOUR EXPERIENCE. <br>SHARE THIS WITH YOUR PRECEPTOR / CLINICAL INSTRUCTOR.
        </strong></center></p>

        <p class="padding-top level-section" style="font-size:18px">
            <strong style="font-size:20px">
                KEY:
            </strong><br>
            LEVEL 1: Have Performed Independently in Clinical (No verbal or visual cues)<br>
            LEVEL 2: Perform With Assistance in Clinical (Verbal, physical, visual cues)<br>
            LEVEL 3: Performed in Simulation (Junior or Senior Level, NOT S & T)<br>
            LEVEL 4: Have NEVER Performed in Clinical or Simulation (Don’t count S & T)<br>
        </p>
        <div class="field center padding-top">
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
        margin-top: 150px;
    }

    .padding-top {
        padding-top: 40px;
    }

    .level-section {
        padding-left: 75px;
    }
</style>
