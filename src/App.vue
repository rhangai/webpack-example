<template>
	<div>
		<router-view />
	</div>
</template>
<style lang="scss">
</style>
<script>
	import VueRouter from 'vue-router';
	import routes from './Routes';
	const router = new VueRouter({ routes });
	
	export default {
		router,
		data() {
			return { x: 10 }
		}
	};
</script>
