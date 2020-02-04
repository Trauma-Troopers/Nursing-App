<template>
      <div>
    <table class = "table">
        <tr><td v-for="item in tabs" @click=test(item.id)>{{item.id}}</td></tr><!-- tabs -->
        <tr id="checksRow">test item
            <td>level 1</td>
            <td>level 2</td>
            <td>level 3</td>
            <td>level 4</td>
            </tr><!-- checks row -->
    </table>
  </div>
</template>

<script src = "@/populateTabs.js">

</script>