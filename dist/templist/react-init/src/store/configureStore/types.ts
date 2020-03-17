import { Middleware } from 'redux'
import { SagaMiddlewareOptions } from 'redux-saga'

export interface InitialState {
    [key: string]: any
    [key: number]: any
}

export interface Model<T> {
    nameSpace: string
    state: T
    reducers: {
        [key: string]: (state: T, payload: any) => T
    }
    effects?: {
        [key: string]: (...args: any[]) => void
    }
}

export interface CreateReactStoreOptions {
    initialState: InitialState
    middlewares: Middleware[]
    sagaOptions: SagaMiddlewareOptions
}
