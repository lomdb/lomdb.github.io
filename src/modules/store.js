import { createStore } from 'vuex';

export default createStore({
  state: {
    theme: false,
  },
  mutations: {
    setValue(state, payload) {
      state[payload.name] = payload.value;
    },
    toggleValue(state, payload) {
      state[payload] = !state[payload];
    },
    toggleTheme(state, payload) {
      if(state.selection.timeline[payload.name] !== payload.value){
        state.selection.timeline[payload.name] = payload.value;
      } else {
        state.selection.timeline[payload.name] = payload.alt;
      }
    },
  },
  getters: {
    getTheme: state => state.theme,
  }
})
