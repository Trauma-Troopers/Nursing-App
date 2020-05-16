<template>
  <div class="confirmation container">
        <div class="center outset alert-formatting">
            <h2 class="center h2-font-weight">Please Check Your Email</h2>
            <p class="large-font">An email has been sent to the email address on file.  
                                 <br>This is the email that you entered upon sign up
                                 <br> and is not necessarily your IUS email.</p>
            <div class="field center padding-top">
                <a class="btn" style = "background-color:#990000"@click="$router.push('/')">Return to Login</a>
            </div>
        </div>
  </div>
</template>

<script>


export default {
  name: "Confirmation"
}
  
</script>

<style>
.confirmation {
  max-width: 700px;
  margin-top: 60px;
}

.confirmation h2 {
  font-size: 2.4em;
}

.confirmation .field {
  margin-bottom: 40px;
}

.alert-formatting {
  font-size: 14px;
  color: #990000;
  background-color:#D4D4D4; 
  font-weight: 500;
}

.large-font {
    font-size: 24px;
}

.h2-font-weight{
    color: black;
    font-weight: 600;
    text-decoration: underline;
}

div.outset {
    border-style: outset;
}
</style>