<template>
	<div class="test">
		{{x}}
		<Hello />
		<Hello />
	</div>
</template>
<style lang="sass">
.test { color: #f00; }
</style>
<script>
	import Hello from './components/Hello.vue';
	export default {
		data() {
			return { x: 10 }
		},
		components: {
			Hello
		}
	};
</script>
