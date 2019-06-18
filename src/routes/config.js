import homeRoutes from '@/views/web/routes'
import adminRoutes from '@/views/admin/routes'

console.log(homeRoutes);
let childRoutes = [
  homeRoutes,
  adminRoutes
]

const routes = [
  ...childRoutes.filter(item => item.component || (item.childRoutes && item.childRoutes.length> 0))
]

/**
 * 过滤路由信息，路由信息中含有 isIndex 作为首次渲染的对象
 *
 * @param {Object} route - 路由对象信息
 */
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) return
  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = ''
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first)  //添加到路由的开头位置
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)
export default routes
