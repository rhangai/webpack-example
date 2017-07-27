import Vue from 'vue';
import App from './App';
import Components from './components';

import "./index.scss";

Vue.use( Components );

const app = new Vue( App );
app.$store.dispatch( "init" );
app.$mount( "#app" );
