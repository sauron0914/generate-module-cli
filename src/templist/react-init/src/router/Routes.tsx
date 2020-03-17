import React from 'react'
import {
    RouteProps,
    Switch,
    Route,
    RouteComponentProps,
    Redirect,
} from 'react-router'
import Loadable from '@loadable/component'
import { createBrowserHistory } from 'history'
import { ReactGuard, Guard } from './guard'

interface GenerateRouteProps extends RouteProps {
    meta?: {
        requireAuth?: boolean
        [key: string]: string | boolean | undefined
    }
    redirect?: string
}

const VoidComp = () => <></>

/* eslint-disable */
/** webpackChunkName: "SkillTree" */
const SkillTree = Loadable(() => import('@/views/SkillTree/SkillTree'))
/** webpackChunkName: "SkillTreeDashboard" */
const SkillTreeDashboard = Loadable(() => import('@/views/SkillTree/Dashboard/Dashboard'))

const SkillTreeRoutes = {
    SkillTreeIndex: { path: '/skill-tree', exact: true, redirect: '/skill-tree/dashboard'},
    Dashboard: { path: '/skill-tree/dashboard', component: SkillTreeDashboard },
}

const Routes = {
    Index: { path: '/', exact: true, component: VoidComp },
    SkillTree: { path: '/skill-tree', component: SkillTree, meta:{ requireAuth: true }},
}
/* eslint-enable */

export function generate(router: GenerateRouteProps[], guard?: Guard) {
    return (
        <Switch>
            {router.map((route, i) => {
                const { meta, redirect, component: Component, ...rest } = route
                return redirect ? (
                    <Route
                        {...rest}
                        render={() => <Redirect to={redirect} />}
                        key={i}
                    />
                ) : (
                    <Route
                        {...rest}
                        key={i}
                        component={ReactGuard(Component, meta, guard)}
                    />
                )
            })}
        </Switch>
    )
}

export function generateRoutes() {
    const guard: Guard = (to, next) => {
        if (to.location.pathname === '/') {
            next({
                path: '/skill-tree',
                replace: true,
            })
        }
    }
    return generate(Object.values(Routes), guard)
}

export function generateSkillRoutes() {
    return generate(Object.values(SkillTreeRoutes), undefined)
}

export function generateTestCompRoute(
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>,
) {
    return generate([{ path: '/', component }])
}

export const browserHistory = createBrowserHistory()
