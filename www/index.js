// Main code
import Vue from 'vue';

const vm = new Vue({
	el: "#app",
	data: {
		msg: "Hello world",
	},
	render( h ) {
		return h( "div", {}, this.msg );
	}
});
