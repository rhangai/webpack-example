import "./index.scss";
import App from './App.vue';
import Vue from 'vue';
import $ from 'jquery';

const AppElement = Vue.extend( App );
new AppElement({
	el: "#app",
	mounted() {
		$( document ).foundation();
	}
});



