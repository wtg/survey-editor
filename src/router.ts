import Vue from 'vue';
import Router from 'vue-router';
import SurveyEditor from './views/SurveyEditor.vue';
import PageEditor from './views/PageEditor.vue';
import SurveyOverview from './views/SurveyOverview.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SurveyOverview',
      component: SurveyOverview,
    },
    {
      path: '/survey/:name',
      name: 'SurveyEditor',
      component: SurveyEditor,
    },
    {
      path: '/page/:name/:num',
      name: 'pageEditor',
      component: PageEditor,
    },

  ],
});
