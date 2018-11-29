<template>
<div>
    <section class="section">
        <h1 class="title is-3">WTG Survey Editor</h1>
        <div class="container">
            <h2 class="subtitle is-5" @blur="setName" contenteditable="true">{{this.survey.name}}</h2>
            <div class="field">
                <div class="control">
                    <button @click="addPage" class="button is-info">New</button>
                </div>
            </div>
            <div class="box" v-for="(page, idx) in this.survey.pages" :key="idx">
                <div class="field">
                    <div class="control">
                        <button @click="$router.push('/page/' + survey.name + '/' + String(idx) + '/')" class="button is-info">Editor</button>
                    </div>
                </div>
                <p class="is-size-3">Page # {{idx}}</p>
                <p class="is-size-5">{{page.questions.length}} Questions</p>
            </div>
        </div>
    </section>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Survey from '@/assets/survey'
import Page from '@/assets/page';
import StorageProvider from '@/assets/serviceproviders/storage.service';

(window as any).sp = StorageProvider;

export default Vue.extend({
    data () {
        return {
            survey: new Survey(),
            pageToEdit: new Page(),
        }as {
            survey: Survey;
            pageToEdit: Page;
        }
    },
    methods: {
        addPage(){
            this.survey.pages.push(new Page())
            StorageProvider.saveSurvey(this.survey.name, this.survey)
        },
        setName(val: FocusEvent){
            if(val.srcElement != null){
                StorageProvider.deleteSurvey(this.survey.name);
                this.survey.name = val.srcElement.innerHTML;
                StorageProvider.saveSurvey(this.survey.name, this.survey);
            }
        }
    },
    mounted(){
        this.survey = StorageProvider.getSurveys()[0]
    }
})
</script>
