<template>
  <div class="home">
    <img alt="Shup Logo" src="../assets/logo.png">
    <SearchBar title="Start a SHUP!" sid="srb"/>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
img{
  width: 40%;
}
</style>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'HomeView',
  components: {
    SearchBar
}
}
</script>
