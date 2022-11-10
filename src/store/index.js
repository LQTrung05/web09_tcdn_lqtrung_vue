import state from './state'
// import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { createStore } from 'vuex'

const storeConfigs = createStore({
  state,
  actions,
  mutations
})

export default storeConfigs;


