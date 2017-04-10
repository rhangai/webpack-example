import Index  from './views/Index';
import About  from './views/About';
import Parent from './views/Parent';

const routes = [{
	path: '/',
	component: Parent,
	children: [
		{
			path: '/',
			component: Index,
		},
		{
			path: '/about',
			component: About,
		},
	],
}];
export default routes;
