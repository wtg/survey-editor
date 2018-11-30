<template>
<div>
    <section class="section">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <span>
                        <h1 class="title is-3">WTG Survey Editor</h1>
                    </span>
                </div>
            </div>
            <div class="field is-fullwidth has-text-centered has-addons is-flex-right">
                <div class="control is-expanded">
                    <input v-model="newSurveyName" type="text" class="input" />
                </div>
                <div class="control">
                    <button class="button is-success" @click="newSurvey">New Survey</button>
                </div>
            </div>
            <div v-for="survey in surveys" :key="survey.name" class="box">
                <div class="field is-fullwidth has-text-centered has-addons is-flex-right">
                    <div class="control">
                        <button class="button is-info" @click="$router.push('/survey/'+survey.name)">Open</button>
                    </div>

                </div> 
                <p class="is-size-3">{{survey.name}}</p>
                <p class="is-size-5">{{survey.pages .length}} Pages</p>
            </div>
        </div>
    </section>
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import Survey from '@/assets/survey';
import Page from '@/assets/page';
import StorageProvider from '@/assets/serviceproviders/storage.service';

(window as any).sp = StorageProvider;

export default Vue.extend({
    data() {
        return {
            surveys: [],
            newSurveyName: 'mySurvey',
        }as {
            surveys: Survey[];
            newSurveyName: string;
        };
    },
    methods: {
        newSurvey() {
            if (!StorageProvider.getSurveyNames().includes(this.newSurveyName)) {
                const newSurvey = new Survey();
                newSurvey.name = this.newSurveyName;
                this.surveys.push(newSurvey);
                StorageProvider.saveSurvey(newSurvey.name, newSurvey);
                this.$router.push('/survey/' + newSurvey.name);
            }
        },
    },
    mounted() {
        this.surveys = StorageProvider.getSurveys();
    },
});
</script>
