import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/SurveyEditor.vue';
import PageEditor from './views/PageEditor.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/page/:name/:num',
      name: 'pageEditor',
      component: PageEditor,
    }

  ],
});
