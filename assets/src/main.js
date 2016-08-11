import Vue from 'vue'
import store from './store'
import router from './router'

const App = Vue.extend({
    store
});

router.start(App, '#app');