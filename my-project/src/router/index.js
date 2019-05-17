import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import H from '@/components/H'
import Mobile from '@/components/Mobile'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'H',
			component: H
		},
		{
			path: '/A',
			name: 'Mobile',
			component: Mobile
		}
	]
})
