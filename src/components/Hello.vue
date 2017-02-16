<template>
	<div @click="onClick">
		HELLO {{x}}
	</div>
</template>

<script>
	export default {
		data() {
			return { x: 10 }
		},
		methods: {
			onClick() {
				this.x += 1;
			}
		}
	};
</script>
