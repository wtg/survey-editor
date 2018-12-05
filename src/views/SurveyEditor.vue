<template>
<div>
    <section class="section">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <span>
                        <h1 class="title is-3">WTG Survey Editor</h1>
                        <h2 class="subtitle is-5" @blur="setName" contenteditable="true">{{this.survey.name}}</h2>
                    </span>
                </div>
                <div class="level-right">
                    <div class="field has-addons is-pulled-right">
                        <div class="control">
                            <button @click="addPage" class="button is-info">New Page</button>
                        </div>
                        <div class="control">
                            <button @click="save" class="button">Download Survey</button>
                        </div>
                        <div class="control">
                            <button @click="save" class="button is-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box" v-for="(page, idx) in this.survey.pages" :key="idx">
                <div class="field has-addons">
                    <div class="control">
                        <button @click="$router.push('/page/' + survey.name + '/' + String(idx) + '/')" class="button is-info">Editor</button>
                    </div>
                    <div class="control">
                        <button @click="deletePage(idx)" class="button is-danger">Delete Page</button>
                    </div>
                </div>
                <p class="is-size-3">Page # {{idx}}</p>
                <p class="is-size-5">{{page.questions.length}} Questions</p>
            </div>
            <div class="box has-background-warning" @mouseleave="purgePage()" v-if="deleteTimer">
                <div class="field has-addons">
                    <div class="control">
                        <button @click="undo" class="button is-info">Undo</button>
                    </div>

                </div>
                <p class="is-size-3">Page # --</p>
                <p class="is-size-5">-- Questions</p>
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
            survey: new Survey(),
            pageToEdit: new Page(),
            deleteTimer: false,
        }as {
            survey: Survey;
            pageToEdit: Page;
            deleteTimer: boolean;
        };
    },
    methods: {
        addPage() {
            this.survey.pages.push(new Page());
            StorageProvider.saveSurvey(this.survey.name, this.survey);
        },
        deletePage(idx: number) {
            this.deleteTimer = true;
            this.survey.pages.splice(idx, 1);
        },
        purgePage() {
            setTimeout(() => {
                this.deleteTimer = false;
                StorageProvider.saveSurvey(this.survey.name, this.survey);
            }, 2000);
        },
        undo() {
            this.deleteTimer = false;
            if (StorageProvider.getSurveyByName(this.survey.name) !== undefined) {
                this.survey = (StorageProvider.getSurveyByName(this.survey.name) as Survey);
            }
        },
        setName(val: FocusEvent) {
            if (val.srcElement != null) {
                StorageProvider.deleteSurvey(this.survey.name);
                this.survey.name = val.srcElement.innerHTML;
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
        save() {
            this.download(this.survey.name + '.json', JSON.stringify(this.survey.toJSON()));
        },
    },
    mounted() {
        if (StorageProvider.getSurveyByName(this.$route.params.name) !== undefined) {
            this.survey = (StorageProvider.getSurveyByName(this.$route.params.name) as Survey);
        }
    },
});
</script>
