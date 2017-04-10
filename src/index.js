import "./index.scss";
import App from './App.vue';
import Vue from 'vue';

const AppElement = Vue.extend( App );
new AppElement({
	el: "#app",
});

