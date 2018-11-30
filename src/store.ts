import Vue from 'vue';
import Vuex from 'vuex';
import Survey from './assets/survey';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    surveys: [],
    survey: new Survey(),
  } as {
    surveys: Survey[]
    survey: Survey,
  },
  mutations: {

  },
  actions: {

  },
});
