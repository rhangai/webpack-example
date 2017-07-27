<template>
	<input ref="input" @input="update" />
</template>
<script>
	import {createTextMaskInputElement} from 'text-mask-core';

	const REGISTERED_MASKS = {
		cpf:  createMaskFromString( '000.000.000-00' ),
		cnpj: createMaskFromString( '00.000.000/0000-00' ),
		cpfcnpj( value ) {
			value = value.replace( /[^\d+]/g, '' );
			return value.length >= 12 ? REGISTERED_MASKS.cnpj : REGISTERED_MASKS.cpf;
		},
		money( value ) {
			const original = value;
			value   = value.replace( /[^\d+]/g, '' );
			value   = _.trimStart( value, '0' );
			let len = value.length;
			let mask = null;
			if ( len <= 0 )
				mask = ['0',',','0','0'];
			else if ( len <= 1 )
				mask = ['0', ',', '0', /\d/];
			else if ( len <= 2 )
				mask = ['0', ',', /\d/, /\d/];
			else if ( len <= 3 )
				mask = [/\d/, ',', /\d/, /\d/];
			else {
				const ret = [];
				let c = 0;
				for ( let i = 0, n = len-2; i<n; ++i ) {
					if ( c >= 3 ) {
						ret.push( '.' );
						c = 0;
					}
					ret.push( /\d/ );
					c += 1;
				}
				mask = ret.reverse().concat( [',', /\d/, /\d/] );
				value = original;
			}
			return { value, mask };
		},
	};
	export default {
		props: {
			mask: {
				type:     [String, Array],
				required: true,
			},
			value: true,
		},
		computed: {
			processedMask() {
				return getMask( this.mask );
			},
		},
		watch: {
			value( v ) {
				this.update( v );
			},
		},
		created() {
			this.textMaskInput = createTextMaskInputElement();
		},
		methods: {
			update( value ) {
				value = ( value && value.target ) ? value.target.value : value;
				let mask  = this.processedMask;
				if ( typeof(mask) === 'function' )
					mask = mask( value );

				if ( _.isArray( mask ) ) {}
				else if ( typeof( mask ) === 'object' ) {
					value = mask.value;
					mask  = mask.mask;
				}
				
				const ret = this.textMaskInput.update( value, {
					inputElement: this.$refs.input,
					mask:         mask,
					guide:        false,
				});
				this.$emit( 'input', this.$refs.input.value );
			},
		},
		registerMask( name, mask ) {
			REGISTERED_MASKS[ name ] = mask;
		},
	};

	function getMask( mask ) {
		if ( typeof(mask) === 'string' ) {
			const split = mask.split( "|" );
			mask = split.shift();
			if ( REGISTERED_MASKS[ mask ] ) {
				mask = REGISTERED_MASKS[ mask ];
				if ( typeof( mask ) === 'function' && split.length > 0) {
					const maskfn = mask;
					mask = function( value ) {
						return maskfn.apply( this, [value].concat( split ) );
					};
				}
			}
		}
		if ( typeof(mask) === 'string' )
			mask = createMaskFromString( mask );
		return mask;
	}
		
	function createMaskFromString( mask ) {
		if ( typeof(mask) === 'string' ) {
			mask = _.map( mask.split( '' ), ( char ) => {
				if ( char === '0' )
					return /\d/;
				else if ( char === 'a' )
					return [a-z];
				else if ( char === 'A' )
					return [A-Z];
				return char;
			});
		}		
		return mask;
	}
		
	
</script>
