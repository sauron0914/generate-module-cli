import { put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'

export function* helloSaga() {
    // yield console.log('Hello Sagas!')
}

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
    let response: any
    yield axios
        .get('/h5/ads/query?positionId=6&pageSize=100&currentPage=1')
        .then(r => (response = r))
    console.log('res', response.data)
    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
    // console.log('watchIncrementAsync')
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
    yield all([helloSaga(), watchIncrementAsync()])
}

// export function reduxConnect<StateProps = {}, DispatchProps = {}>(
//     mapStateToProps?: null | MapState<StateProps>,
//     mapDispatchToProps?: null | MapDispatch<DispatchProps>,
//     mergeProps?: any,
//     options?: any,
// ): InferableComponentEnhancerWithProps<
//     StateProps & DispatchProps & DefaultDispatchProps,
//     any
// > {
//     return connect(
//         mapStateToProps,
//         defaultDispatchToProps(mapDispatchToProps),
//         mergeProps,
//         options,
//     )
// }

export function deal<State = {}, DisPatch = () => void>(
    state: State,
    dispatch: DisPatch,
): Promise<any> {
    return new Promise(res => res())
}
