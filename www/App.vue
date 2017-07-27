<template>
	<router-view />
</template>
<script>
	import router from './Router';
	import store from './store';
	import $ from 'jquery';
	
	export default {
		router,
		store,
		mounted() {
			$( document ).foundation();
		},
	};
</script>
