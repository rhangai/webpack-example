const UUID_CLASS="rippleJS--id";
export default {
	bind( el, { arg, value } ) {
		const ripple = document.createElement( "div" );
		updateRipple( el, ripple, value, arg );
		el.appendChild( ripple );
	},
	update( el, { value, arg } ) {
		let ripple = null;
		const ripples = el.getElementsByClassName( UUID_CLASS );
		for ( let i = 0, len = ripples.length; i<len; ++i ) {
			const current = ripples[ i ];
			if ( current.parentNode === el ) {
				ripple = current;
				break;
			}	
		}
		if ( !ripple )
			throw new Error( "Invalid parent for ripple" );
		updateRipple( el, ripple, value, arg );
	},
};
function updateRipple( el, ripple, value, arg ) {
	if ( value !== false ) {
		if ( arg === 'fill' )
			ripple.className = UUID_CLASS+" rippleJS fill";
		else
			ripple.className = UUID_CLASS+" rippleJS";
	} else {
		ripple.className = UUID_CLASS;
	}
}
