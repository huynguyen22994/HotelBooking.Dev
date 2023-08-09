import { createStore } from 'redux'
import Reducer from './reducer'

const storeRedux = createStore(Reducer);

// export  { default as Reducer } from './reducer'
export  * from './constants'
export default storeRedux;