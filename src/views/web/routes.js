import Layout from '@/components/web/layout'
import Home from '@/components'

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home },
    { path: 'archives', component: Layout },
    { path: 'article/:id', component: Layout },
    { path: 'categories', component: Layout },
    { path: 'categories/:name', component: Layout },
    { path: 'tags/:name', component: Layout },
    { path: 'about', component: Layout },
    { path: '*', component: Home }
  ]
}
