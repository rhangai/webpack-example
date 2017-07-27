import 'expose-loader?Promise!bluebird';
import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';
import 'expose-loader?_!lodash';

import "dropzone";
import "font-awesome/scss/font-awesome.scss";
import "roboto-fontface/css/roboto/sass/roboto-fontface.scss";
import "foundation-sites/dist/js/foundation.js";
import "quill";
import "quill/dist/quill.snow.css";
import "vanilla-ripplejs";

import "./common.scss";

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use( VueRouter );
Vue.use( Vuex );

