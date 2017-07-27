import Vuex from 'vuex';
import _ from 'lodash';

const context = require.context( "./", true, /\.js$/i );

function contextRequire( name ) {
	const module = context( name );
	return module.__esModule ? module['default'] : module;
}

const modules = {};
_.each( context.keys(), ( file ) => {
	if ( file === './index.js' )
		return;
	const module = contextRequire( file );
	
	let name = file;
	if ( name.substr(0,2) == './' )
		name = name.substr(2);
	if ( name.substr(-3) == '.js' )
		name = name.substr(0, name.length - 3);
	name = name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
	modules[ name ] = _.extend({ namespaced: true }, module );
});

export default new Vuex.Store({
	modules: modules,
	actions: {
		init({ dispatch }) {
			const promises = [];
			for ( let key in modules ) {
				const m = modules[ key ];
				if ( m.actions.init )
					promises.push( dispatch( `${key}/init` ) );
			}
			return Promise.all( promises );
		}
	},
});
