import React, {Component} from 'react';
import './App.css';
import { DatePicker } from 'antd';
import { connect } from 'react-redux'
import { addCount } from "./redux/demo/actions";
import AboutService from "@/service/about"
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import routes from '@/routes/config'

import Home from '@/components'

@connect(state => ({
  count: state.demo.count
}), {
  addCount
})


class App extends Component{
  componentDidMount() {
    AboutService.getAboutComments()
  }
  /**
   * 根据路由表生成路由组件
   * @param {Array} routes - 路由配置表
   * @param {String} contextPath - 父级路径。比如后台 admin...
   */
  renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      // 把多个'/'  换成一个 '/'
      newContextPath = newContextPath.replace(/\/+/g, '/')

      // auth handler
      if ((item.protected || newContextPath.includes('admin')) && this.props.auth !== 1) {
        item = {
          ...item,
          component: () => <Redirect to="/login" />,
          children: []
        }
      }

      if (item.component && item.childRoutes) {
        const childRoutes = this.renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))

    return <Switch>{children}</Switch>
  }
  render() {
    const children = this.renderRoutes(routes, '/')
    console.log(children, 'LLLLLLLL')
    return <BrowserRouter>{children}</BrowserRouter>
  }
}

export default App;
