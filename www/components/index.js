import InputMask from './ui/InputMask';
import Ripple from './ui/Ripple';

export default {
	install( vue ) {		
		vue.component( "hc-input-mask", InputMask );
		vue.directive( "ripple", Ripple );
	}
}
