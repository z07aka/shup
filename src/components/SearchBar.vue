<template>
    <div class="sbcontainer" @focusin="focusinEvent" @focusout="timeoutFocusout">
        <form method="get" :id="sid+'-form'" class="form" action="search">
            <div class="search-area">
                <input type="text" name="q" v-model="search" class="search-bar" autocomplete="off" :placeholder="title" :id="sid+'-q'" maxlength="999"/>
                <button :id="sid+'-btn'" class="search-button">
                    <span class="material-symbols-outlined icon">send</span>
                </button>
            </div>
            <div class="suggestions-form" v-if="active == true && prediction.length == 0">
                <div href="#" class="suggest" v-for="suggestion in suggestions" v-bind:key="suggestion">
                    <p class="siteTitle">
                        {{ suggestion.title }}
                    </p>
                    <div style="display: flex;">
                        <p class="siteLink">{{ suggestion.link }}</p>
                        <span style="color: #ff0000; scale: 0.6; opacity: 0.6;" class="material-symbols-outlined">mode_heat</span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.icon {
    transform: rotate(-45deg)
}

.siteTitle {
    font-weight: 700;
    font-size: 12px
}

.siteLink {
    font-weight: 300;
    font-size: 12px
}

.suggest {
    display: flex;
    justify-content: space-between;
    padding-inline: 7.5px;
    transition: .2s;
    border-radius: 5px;
    cursor: pointer
}

.suggest:hover {
    background-color: rgba(0, 0, 0, .2);
    transition: .2s
}

.suggestions-form {
    height: auto;
    padding: 7.5px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .3);
    border-top: none;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px
}

.search-area {
    display: flex;
    flex-direction: row
}

.search-bar {
    flex-grow: 2;
    min-width: 240px;
    height: 40px;
    padding-left: 15px;
    border: 1px solid rgba(0, 0, 0, .3);
    border-right: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px
}

.search-bar:focus {
    outline: 0
}

.search-button {
    width: 10%;
    min-width: 45px;
    border: 2px solid red;
    background: red;
    color: #fff;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    cursor: pointer
}

.sbcontainer {
    margin: 0;
    padding: 0;
    border-radius: 20px;
    width: 45%
}

.material-symbols-outlined {
    font-variation-settings: 'FILL'0, 'wght'400, 'GRAD'0, 'opsz'48
}
</style>

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
            suggestions: [
                {title: 'Youtube', link: 'https://www.youtube.com'},
                {title: 'Twitter', link: 'https://www.twitter.com'},
                {title: 'Facebook', link: 'https://www.facebook.com'},
                {title: 'Wikipedia', link: 'https://www.wikipedia.org'}
            ],
            prediction: [],
        }
    },
    methods: {
        focusinEvent(){
            document.getElementById(this.sid+'-q').style.borderBottomLeftRadius = '0'; 
            document.getElementById(this.sid+'-form').style.borderBottomLeftRadius = '0'; 
            document.getElementById(this.sid+'-btn').style.borderBottomRightRadius = '0'; 
            this.active = true;
        },
        timeoutFocusout() {
            setTimeout(this.focusoutEvent, 150)
        },
        focusoutEvent(){
            document.getElementById(this.sid+'-q').style.borderBottomLeftRadius = '20px'; 
            document.getElementById(this.sid+'-form').style.borderBottomLeftRadius = '20px'; 
            document.getElementById(this.sid+'-btn').style.borderBottomRightRadius = '20px';  
            this.active = false;
        },        
    }
}
</script>