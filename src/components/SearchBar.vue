<template>
    <form 
        class="search-form"
        :id="sid+'-form'"
        method="get"
        action="search" 
        @focusin="focusinEvent" 
        @focusout="timeoutFocusout"
    >
        <div class="search-bar" :id="sid+'-bar'">
            <input 
                class="text-input" 
                :id="sid+'-q'" 
                name="q" 
                type="text" 
                v-model="search" 
                :placeholder="title"
                autocomplete="off" 
                maxlength="999" 
            />
            <button class="search-button" :id="sid+'-btn'">
                <span class="material-symbols-outlined search-button-icon">send</span>
            </button>
        </div>
    </form>
    <div 
        class="suggests" 
        v-if="active == true && prediction.length == 0"
    >
        <a 
            class="suggest-link"
            v-for="suggest in suggestions"
            :key="suggest"
            :href="suggest.url"
        >
            <div class="suggest">
                <div class="suggest-group">
                    <span class="material-symbols-outlined suggest-badge">mode_heat</span>
                    <p class="suggest-title">{{ suggest.title }}</p>
                </div>
                <p class="suggest-url">{{ suggest.url }}</p>
            </div>
        </a>
        <p class="credits">&copy; SHUP {{ year }}</p>
    </div>
</template>

<style src="@/assets/style/components/SearchBar.css" scoped/>

<script>
export default {
    name: 'SearchBar',
    props: {
        title: String,
        sid: String,
        vmodel: String,
    },
    data() {
        return {
            active: false,
            search: this.vmodel,
            year: new Date().getFullYear(),
            suggestions: [
                {title: 'Youtube', url: 'https://www.youtube.com'},
                {title: 'Twitter', url: 'https://www.twitter.com'},
                {title: 'Facebook', url: 'https://www.facebook.com'},
                {title: 'Wikipedia', url: 'https://www.wikipedia.org'}
            ],
            prediction: [],
        }
    },
    methods: {
        focusinEvent(){
            document.getElementById(this.sid+'-form').style.borderBottomLeftRadius = '0'; 
            document.getElementById(this.sid+'-bar').style.borderBottomLeftRadius = '0';
            document.getElementById(this.sid+'-bar').style.borderBottomRightRadius = '0'; 
            document.getElementById(this.sid+'-q').style.borderBottomLeftRadius = '0'; 
            document.getElementById(this.sid+'-btn').style.borderBottomRightRadius = '0'; 
            this.active = true;
        },
        timeoutFocusout() {
            setTimeout(this.focusoutEvent, 150)
        },
        focusoutEvent(){
            document.getElementById(this.sid+'-form').style.borderBottomLeftRadius = '25px'; 
            document.getElementById(this.sid+'-bar').style.borderBottomLeftRadius = '25px'; 
            document.getElementById(this.sid+'-bar').style.borderBottomRightRadius = '25px'; 
            document.getElementById(this.sid+'-q').style.borderBottomLeftRadius = '25px'; 
            document.getElementById(this.sid+'-btn').style.borderBottomRightRadius = '25px';  
            this.active = false;
        },        
    }
}
</script>