import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobileDevices: false,
    power: true,
    stuList: [],
    editStu: {},  // 编辑学生
  },
  mutations: {
    setStuList(state, list) {
      state.stuList = list;
    },
    // edit student info
    editStuInfo(state, params) {
      state.editStu = params
    },
    // ble ==> boolean
    setMobileDevices(state, ble) {
      state.isMobileDevices = ble;
    },
    setPower(state, ble) {
      state.power = ble;
    }
  },
  actions: {

  }
})
