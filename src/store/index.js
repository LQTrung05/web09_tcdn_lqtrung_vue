import { createStore } from "vuex";
import employee from "./modules/employee/index";
import provider from './modules/provider/index'
import main from './modules/main/index'

const storeConfigs = createStore({
  modules: {
    employee,
    provider,
    main
  },
});

export default storeConfigs;