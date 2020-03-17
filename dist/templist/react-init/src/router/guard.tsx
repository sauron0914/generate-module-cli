import React from 'react'
import { RouteProps, RouteComponentProps } from 'react-router'
import { History } from 'history'

type Path =
    | History.Path
    | {
          path: History.Path
          replace?: boolean
      }

type Meta =
    | {
          requireAuth?: boolean
          [key: string]: string | boolean | undefined
      }
    | undefined

export type Guard = (
    to: RouteComponentProps & { meta: Meta },
    next: (path?: Path) => void,
) => void

export function ReactGuard(
    PageComponent: RouteProps['component'],
    meta?: {
        requireAuth?: boolean
        [key: string]: string | boolean | undefined
    },
    guard?: Guard,
) {
    if (!guard) return PageComponent
    return class extends React.Component<RouteComponentProps<any>> {
        constructor(props: RouteComponentProps<any>) {
            super(props)
            guard!({ ...props, meta }, this.next)
        }

        readonly next: any = (path: Path) => {
            const $path =
                typeof path === 'string' ? { path, replace: false } : path

            if ($path.replace) {
                this.props.history.replace($path.path)
            } else {
                this.props.history.push($path.path)
            }
        }
        render() {
            const { props } = this
            return PageComponent ? <PageComponent {...props} /> : null
        }
    }
}
