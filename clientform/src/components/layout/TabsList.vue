<template>
      <div>
    <table class = "table">
        <tr><td v-for="item in tabs" @click=filterChecks(item.id)>{{item.id}}</td></tr><!-- tabs -->
        <tr><td colspan=3>Name: </td><td colspan=3>Level 1</td><td colspan=3>Level 2</td><td colspan=3>Level 3</td><td colspan=3>Level 4</td></tr>
        <tr v-for="check in checks">
          <td colspan=3>{{check.get("name")}}</td>
            <td colspan=3><input type="checkbox"></td>
            <td colspan=3>level 2</td>
            <td colspan=3>level 3</td>
            <td colspan=3>level 4</td>
            </tr><!-- checks row -->
    </table>
  </div>
</template>

<script src = "@/populateTabs.js">
</script>

<style>
input[type=checkbox]
{
  -webkit-appearance:checkbox;
}
</style>