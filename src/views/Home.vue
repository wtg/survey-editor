<template>
  <section class="section">
    <h1 class="title">WTG Survey Page Editor</h1>
    <div class="container">
        <div class="field has-addons">
          <div class="control is-expanded">
            <div class="select is-fullwidth">
                <select v-model="newQuestionType">
                    <option :value='0'>Radio</option>
                    <option :value='1'>Text</option>
                    <option :value='2'>Select</option>
                    <option :value='3'>Checkbox</option>
                </select>
            </div>
          </div>
          <div class="control">
              <button class="button is-info" @click="newQuestion">Add</button>
          </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <question-creator v-on:save="closeEdit" v-if="currentlyEditing !== -1" :question="page.questions[currentlyEditing]"/>
        </div>
        <div class="column">
          <h1 class="title">Preview: </h1>
          <div class="field">
            <div class="control">
              <button @click="save" class="button">Download</button>
            </div>
          </div>
          <question-preview @edit="edit" @delete="deleteQuestion" v-for="(myQuestion, idx) in page.questions" :key="myQuestion.id" :question="myQuestion" :index="idx"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import QuestionCreator from '@/components/QuestionCreator.vue';
import QuestionPreview from '@/components/QuestionPreview.vue';
import Question,{ QuestionType } from '@/assets/question';
import Page from '@/assets/page';

export default Vue.extend({
  name: 'home',
  components: {
    QuestionCreator,
    QuestionPreview,
  },
  data() {
    return {
      currentlyEditing: -1,
      page: new Page(),
      newQuestionType: 0,
      question: new Question("", "", QuestionType.radio, [],true),
    } as {
      question: Question;
      page: Page;
      currentlyEditing: number;
      newQuestionType: QuestionType;
    }
  },
  methods: {
    newQuestion(){
      const x = new Question("","",this.newQuestionType,[],false);
      x.setDefaultOptions();
      this.page.questions.push(x);
      this.currentlyEditing = this.page.questions.length - 1;
    },
    download(filename: string, text: string) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    save(){
      this.download('survey.json', JSON.stringify(this.page.asSurveyJSON()));
    },
    closeEdit(){
      this.currentlyEditing = -1;
      this.newQuestion();
    },
    edit(idx: number){
      this.currentlyEditing = idx;
    },
    deleteQuestion(idx: number){
      this.currentlyEditing = -1;
      this.page.deleteQuestion(idx);
    }
  },
  mounted (){
    this.question.setDefaultOptions();
  }
});
</script>
