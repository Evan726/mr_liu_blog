// import { asyncRouterMap, constantRouterMap } from '@/router'
import { getRouter } from '@/api/getUrlRouter'
const _import = require('../../router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout'

/**
 * 格式化动态加载的路由
 * @param  {[type]} router [路由数据]
 * @return {[type]}        [返回格式为标准vue-router 数据格式]
 */
function farmatRouter(router) {
    var addRouters = [];
    for (var i = 0; i < router.length; i++) {
        if (!router[i].children) {
            var children = []
            children.push({
                path: '',
                component: _import(router[i].File),
                name: router[i].Name,
                meta: {
                    title: router[i].Name,
                    icon: router[i].icon,
                }
            })
            addRouters.push({
                path: router[i].Route,
                component: Layout,
                redirect: router[i].Route,
                meta: {
                    title: router[i].Name,
                    icon: router[i].icon,
                },
                children: children
            })
        } else {
            var children = []
            var child = router[i].children
            for (var j = 0; j < child.length; j++) {
                children.push({
                    path: child[j].Route,
                    component: _import(child[j].File),
                    name: child[j].Name,
                    meta: {
                        title: child[j].Name,
                        icon: child[j].icon,
                    },
                    children: child[j].children ? farmatRouter(child[j].children) : null
                })
            }
            addRouters.push({
                path: router[i].Route,
                component: Layout,
                redirect: router[i].Route + "/" + child[0].Route,
                meta: {

                },
                children: children
            })
        }
    }
    return addRouters;
}


/**
 * 格式化菜单
 * @param  {[type]} router     [路由数据]
 * @param  {[type]} parentPath [上级路由]
 * @return {[type]}            [element中menu的标准数据]
 */
function farmetMenu(router, parentPath) {
    var menu = []
    for (var i = 0; i < router.length; i++) {
        if (!router[i].children) {
            menu.push({
                path: parentPath ? parentPath + "/" + router[i].Route : router[i].Route,
                Name: router[i].Name,
                children: []
            })
        } else {
            menu.push({
                path: router[i].Route,
                Name: router[i].Name,
                children: farmetMenu(router[i].children, router[i].Route)
            })
        }
    }
    return menu
}

/**
 * 路由
 * @type {Object} 
 */
const router_url = {
    state: {
        routers: [],
        menuData: [],
        addRouters: [],
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.routers = routers
            state.menuData = farmetMenu(routers)
            state.addRouters = farmatRouter(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }) {
            return new Promise((rosolve, reject) => {
                getRouter().then(response => {
                    var data = response.data
                    commit("SET_ROUTERS", data)
                    rosolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default router_url
