<template>
  <div>
      <div class ="frame-padding">
          <div class="field center">
            <a class="btn" style = "background-color:#990000" @click="$router.go(-1)">Go Back</a>
        </div>
      <center><iframe src="https://docs.google.com/document/d/e/2PACX-1vRWANkKxdKlv_8QUjJ3BoyjGJqF38rYitt3wVVh6Fo9J967DIwf7qp-xtR03faZ9BiFJJB8gD7CUheV/pub?embedded=true" height="800" width=800></iframe></center>
    </div> 
  </div>
</template>

<script>
    export default {
        name: 'CheckDoc'
    }
</script>

<style>
    .frame-padding{
        padding-top: 20px;
    }
</style>
