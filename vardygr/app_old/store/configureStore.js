import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger({
    stateTransformer: state => state.toJS()
});

const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
    let store = createStore(reducer,
                initialState,
                applyMiddleware(sagaMiddleware, loggerMiddleware));
    sagaMiddleware.run(sagas);
    return store;
};
