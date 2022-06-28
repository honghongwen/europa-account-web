import Vue from 'vue'
import vuex from 'vuex'
import token_store from './modules/token.js'

Vue.use(vuex);

export default new vuex.Store({
    modules: {
        token : token_store
    }
})
