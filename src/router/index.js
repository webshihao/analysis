import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Login = r => require.ensure([],()=>r(require('../page/login/login.vue')),'login');
const Home = r => require.ensure([],()=>r(require('../page/home/home.vue')),'home');
const PubOpi = r => require.ensure([],()=>r(require('../page/pubOpi/pubOpi.vue')),'pubOpi');
const RptLst = r => require.ensure([],()=>r(require('../page/rptLst/rptLst.vue')),'rptLst');
const ReportEdit = r => require.ensure([],()=>r(require('../page/reportEdit/reportEdit.vue')),'reportEdit');

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/reportEdit',
		component: ReportEdit
	},
	{
		path: '/home',
		component: Home,
		redirect: '/home/pubOpi',
		children: [
			{
				path: '/home/pubOpi',
				component: PubOpi
			},
			{
				path: '/home/rptLst',
				component: RptLst
			},
			
		]
	}
];

export default new Router({
	mode: 'history',
	routes: routes,
	base: __dirname,
	linkActiveClass: 'link-active'
})
