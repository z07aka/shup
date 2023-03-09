<template>
  <div class="search">
    <div class="header"> 
      <a href="/"><img class="shup-logo" src="@/assets/logo.png" alt="shup-logo"></a>
      <div>
        <SearchBar class="search-bar" :vmodel="query || ''" title="Let's SHUP something!"/>
      </div>
      <div class="headerButton-spot">
        <button class="headerButton">
          <span class="material-icons icon">settings</span>
        </button>
      </div>
    </div>
    <div class="filters">
      
    </div>
    <div class="search-container">
      <div class="basic-results-container">
        <div class="basic-result" v-for="result in reqStore.get_res[0]" :key="result">
          <div>          
            <a class="result-title" :href="result.url">{{ result.name }}</a>
            <p class="result-link">{{ result.url }}</p>
            <p class="result-desc">{{ result.snippet }}</p>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;  
  justify-content: space-between;
  background-color: #fffded;
  padding: 20px;
  box-shadow: 1px 1px 10px -5px rgba(0, 0, 0, .75);
  -webkit-box-shadow: 1px 1px 10px -5px rgba(0, 0, 0, .75);
  -moz-box-shadow: 1px 1px 10px -5px rgba(0, 0, 0, .75)
}
.basic-result {
  display: flex;
  background: #fff;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
  line-height: .5;
  gap: 10px
}

.result-title {
  text-decoration: none;
  color: #6d98ba;
  font-size: 16px;
  font-weight: 700
}

.result-title:hover {
  text-decoration: 1px underline #6d98ba
}

.result-link {
  color: #474350;
  font-size: 10px
}

.result-desc {
  color: #474350;
  font-size: 13px;
  line-height: 1.1
}

.basic-results-container {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.search-container {
  margin-top: 50px;
  margin-left: 20px
}

.search-bar {
  position: relative;
}

@media (min-width:1200px) {
  .search-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0
  }

  .basic-results-container {
    grid-area: 1/1/7/4
  }

  .shup-logo {
    display: block
  }
  .search-bar {
    width: 500px;
  }
}

@media (max-width:1200px) {
  .shup-logo {
    display: none
  }  
  .search-bar {
    width: 200px;
  }
}

.headerButton-spot {
  display: flex;
  row-gap: 10px
}

.headerButton {
  width: 40px;
  height: 40px;
  background-color: red;
  border: none;
  border-radius: 20px;
  transition: all .5s;
  color: #fff;
  text-align: center;
  padding-top: 5px;
  cursor: pointer;
  transform: rotate(0)
}

.headerButton:hover {
  background-color: #ff2424;
  transform: rotate(180deg)
}

.headerButton:active {
  background-color: #ff3434
}

.shup-logo {
  height: 40px
}
</style>

<style>
html, body {
  background-color: white;
}
</style>

<script>
import SearchBar from '@/components/SearchBar.vue'
import https from 'https-browserify'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { requestStore } from '@/store/index'

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
    let subscriptionKey = 'f5a6e69e4c9047c39666d623dcd2c7c9'

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
    }
  },
  methods: {
    
  }
}
</script>
