<template>
	<div class="test">
		<router-view />
	</div>
</template>
<style lang="scss">
.test { color: #f00; }
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
