<template>
	<div>
		{{x}}
		<Hello />
		<Hello />
		<Hello />
		<Hello />
	</div>
</template>

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
