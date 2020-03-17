import { Model, CreateReactStoreOptions } from './types'
import createSagaMiddleware from 'redux-saga'

export function createReactStore<T = any>(
    models: Model<T>[],
    options: CreateReactStoreOptions,
) {
    const { sagaOptions } = options
    const sagaMiddleware = createSagaMiddleware(sagaOptions)
}
