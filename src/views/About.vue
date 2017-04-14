<template>
	<div>
		<div class="row">
			<div class="small-12 columns">
				<h1>Turpis egestas integer</h1>
			</div>
			<div class="small-12 columns">
				Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a molestie lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam. Faucibus nisl tincidunt eget nullam.
			</div>
		</div>
		<form @submit.prevent="submit">
			<div class="row">
				<div class="small-12 columns">
					<h1>Ipsum consequat nisl</h1>
				</div>
				<div class="small-12 columns">
					<label>Nome
						<input type="text" v-model="model.name" />
					</label>
				</div>
				<div class="small-12 columns">
					<label>Endereço
						<input type="text" v-model="model.address" />
					</label>
				</div>
			</div>
			<div class="row">
				<div class="medium-offset-8 medium-4 columns">
					<input type="submit" class="button expanded" />
				</div>
			</div>
		</form>
		<div class="row" v-if="!submitted">
			<div class="small-12 columns">
				Por favor, envie o form
			</div>
		</div>
		<template v-else>
			<div class="row">
				<div class="small-12 columns">
					Olá, {{ saved.name }}
				</div>
				<div class="small-12 columns">
					Você mora em {{saved.address}}
				</div>
			</div>
			<div class="row">
				<div class="small-12 columns">
					<router-link to="/" class="button">Voltar ao índice</router-link>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				submitted: false,
				saved: {},
				model: {
					name: "",
					address: "",
				},
			};
		},
		methods: {
			submit() {
				this.saved     = Object.assign({}, this.model);
				this.submitted = true;
			}
		},
	};
</script>
