<template>
  <div class="home">
    <img src="../assets/logo.png" alt="Shup Logo">
    <SearchBar 
      title="Start a SHUP!" 
      sid="shup-searchbar"
    />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 50%;
  margin-top: -25%;
  user-select: none;
}

img {
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
