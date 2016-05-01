import Vue from "vue";
import StarHistoryView from './components/star-history.vue'

//dynamic data managed by Vue
//Vue.component('star-history-component', StarHistoryView);
let starHistoryComponent = Vue.extend(StarHistoryView);
new starHistoryComponent().$mount('star-history-component');