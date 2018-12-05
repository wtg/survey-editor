<template>
  <section class="section">
    <div v-if="this.page != undefined" class="container">
      <h1 class="title">WTG Survey Page Editor</h1>
      <h2 class="subtitle is-5" @blur="setName" contenteditable="true">{{this.page.name}}</h2>
        <div class="field is-fullwidth has-text-centered has-addons is-flex-right">
          <div class="control">
              <button class="button is-success" @click="newQuestion">New Question</button>
          </div>
          <!-- <div class="control">
            <button @click="downloadPage" class="button">Download Page</button>
          </div> -->
          <div class="control">
            <button @click="save" class="button is-info">Save Page</button>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <question-creator v-on:save="closeEdit" v-if="currentlyEditing !== -1" :question="page.questions[currentlyEditing]"/>
          </div>
          <div style="height: 100%; overflow: auto;" class="column">
            <h1 class="title">Preview: </h1>
            <question-preview @edit="edit" @delete="deleteQuestion" v-for="(myQuestion, idx) in page.questions" :key="myQuestion.id" :selected="idx === currentlyEditing" :question="myQuestion" :index="idx"/>
          </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import QuestionCreator from '@/components/QuestionCreator.vue';
import QuestionPreview from '@/components/QuestionPreview.vue';
import Question, { QuestionType } from '@/assets/question';
import Page from '@/assets/page';
import StorageProvider from '@/assets/serviceproviders/storage.service';
import Survey from '@/assets/survey';

export default Vue.extend({
  name: 'home',
  components: {
    QuestionCreator,
    QuestionPreview,
  },
  data() {
    return {
      currentlyEditing: -1,
      pageNum: 0,
      newQuestionType: 0,
      question: new Question('', '', QuestionType.radio, [], true),
      survey: new Survey(),
    } as {
      question: Question;
      pageNum: number;
      currentlyEditing: number;
      newQuestionType: QuestionType;
      survey: Survey;
    };
  },
  computed: {
    page(): Page {
      return this.survey.pages[this.pageNum];
    },
    currentlyEditedQuestion(): Question {
      if (this.page !== undefined) {
        return this.page.questions[this.currentlyEditing];
      } else {
        return new Question('', '', QuestionType.radio, [], false);
      }
    },
  },
  watch: {
    'page.questions'() {
      StorageProvider.saveSurvey(this.survey.name, this.survey);
    },

  },
  methods: {
    newQuestion() {
      let x: Question;

      if (this.page.questions.length > 0) {
        const id = this.page.questions[this.page.questions.length - 1].id;
        let idNum = Number(id[id.length - 1]);
        let newID: string;
        if (Number.isNaN(idNum)) {
          idNum = 0;
          newID = id + Number(idNum);
        } else {
          newID = id.substring(0, id.length - 1) + (Number(idNum) + 1) + id.substring(id.length);
        }
        x = new Question(newID, '', this.newQuestionType, [], false);
      } else {
        x = new Question('', '', this.newQuestionType, [], false);
      }

      x.setDefaultOptions();
      this.page.questions.push(x);
      this.currentlyEditing = this.page.questions.length - 1;
    },
    setName(val: FocusEvent) {
        if (val.srcElement != null) {
            this.page.name = val.srcElement.innerHTML;
            StorageProvider.saveSurvey(this.survey.name, this.survey);
        }
    },
    download(filename: string, text: string) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    downloadPage() {
      this.download('survey.json', JSON.stringify(this.page.asSurveyJSON()));
    },
    save() {
      StorageProvider.saveSurvey(this.survey.name, this.survey);
      this.$router.push('/survey/' + this.survey.name);
    },
    closeEdit() {
      if (this.currentlyEditing === this.page.questions.length - 1) {
        this.currentlyEditing = -1;
        this.newQuestion();
      } else {
        this.currentlyEditing++;
      }

    },
    edit(idx: number) {
      this.currentlyEditing = idx;
    },
    deleteQuestion(idx: number) {
      this.currentlyEditing = -1;
      this.page.deleteQuestion(idx);
    },
  },
  mounted() {
    this.question.setDefaultOptions();
    if (StorageProvider.getSurveyByName(this.$route.params.name) !== undefined) {
      this.survey = (StorageProvider.getSurveyByName(this.$route.params.name) as Survey);
    }
    this.pageNum = Number(this.$route.params.num);
  },
});
</script>
<style lang="scss" scoped>
  .is-flex-right{
    justify-content: flex-end;
  }
</style>
