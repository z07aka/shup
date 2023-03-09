<template>
  <div class="header"> 
    <a href="/"><img class="shup-logo" src="@/assets/logo.png" alt="shup-logo"></a>
    <div class="search-bar">
      <SearchBar class="search-bar" :vmodel="query || ''" title="Let's SHUP something!" sid="shup-resultbar"/>
    </div>
    <button class="header-button">
      <span class="material-icons header-button-icon">settings</span>
    </button>
  </div>
  <div class="container">
    <div class="results-container">
      <div class="results">
        <div class="result" v-for="result in reqStore.get_res[0]" :key="result">
          <div>          
            <a class="result-title" :href="result.url">{{ result.name }}</a>
            <p class="result-link">{{ result.url }}</p>
            <p class="result-desc">{{ result.snippet }}</p>
          </div>
        </div> 
      </div>   
    </div>
    <footer class="footer">
      <p>SHUP - &copy; {{ year }}</p>
      <p class="bing-creds">Search results by Microsoft Bing</p>
    </footer>
  </div>
</template>

<style src="@/assets/style/views/SearchView.css" scoped/>

<style>
  html, body {
    background-color: white;
    overflow-x: hidden;
  }
</style>

<script>
import SearchBar from '@/components/SearchBar.vue'
import https from 'https-browserify'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { requestStore } from '@/store/index'
import config from '@/assets/config/config'

export default {
  name: 'SearchView',
  components: {
    SearchBar
  },
  setup() {
    const reqStore = requestStore()

    let host = 'api.bing.microsoft.com'
    let path = '/v7.0/search'
    let q = useRoute().query.q
    let query = '?q=' + encodeURI(q)
    let subscriptionKey = config.API_KEY.SEARCH

    let body = '';

    let responseHandler = function(response) {
      response.on('data', function(data) {
        body += data;
      })
      response.on('end', function() {
        let json = JSON.stringify(JSON.parse(body), null, '  ')
        reqStore.save_req(json)
        reqStore.save_res(JSON.parse(json).webPages["value"])
      })
    }
    let Search = function () {
      let request_params = {
        method : 'GET',
        hostname : host,
        path : path + query,
        headers : {
          'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
      }

      let req = https.request (request_params, responseHandler)
      req.end ()
    }
    onMounted(() => {
      Search()
    })
    return {reqStore};
  },
  data() {
    return {
      query: this.$route.query.q,
      year: new Date().getFullYear(),
    }
  },
  methods: {
    
  }
}
</script>
