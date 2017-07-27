import VueRouter from 'vue-router';
import {RouteGenerator} from 'vue-utility';


const context   = require.context( "./views", true, /^(?:\.\/)?(?:(?!_)[A-Za-z0-9\-_]+[\\\/])*((?!_)[A-Za-z0-9\-_]+|_404|_Parent)\.(?:jsx?|vue)$/i );
const generator = new RouteGenerator( context, {
	mapName( name ) {
		return RouteGenerator.removeExt( name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase() );
	},
});
const routes    = generator.generateRoutes();

const router = new VueRouter({
	mode: (OPTIONS.server || OPTIONS.local) ? 'hash' : 'history',
	routes
});
export default router;
	
