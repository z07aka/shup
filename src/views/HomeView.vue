<template>
  <div class="home">
    <img src="../assets/logo.png" alt="Shup Logo">
    <SearchBar 
      class="search-bar"
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
  user-select: none;
}

@media (min-width: 1024px) {
  img {
    width: 40%;
  }
}

@media (max-width: 1024px) {
  img {
    width: 50%;
  }
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
