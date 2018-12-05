<template>
<div>
    <section class="section">
        <div class="container">
            <div class="modal" :class="{'is-active': this.loadSurveyModal}">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <p class="title is-5">Import Survey</p>
                        <div class="field">
                            <label class="label">Name</label>
                            <input v-model="newSurveyName" class="input" type="text" />
                            <p v-if="newSurveyName.length === 0" class="help is-danger">Required</p>
                        </div>
                        <div class="field">
                            <input @input="loadFile" type="file" />
                            <p v-if="this.surveyFile === undefined" class="help is-danger">Required</p>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-info" :disabled="newSurveyName.length === 0 || this.surveyFile === undefined" @click="importSurvey">
                                    Import
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="loadSurveyModal = false;"></button>
            </div>
            <div class="level">
                <div class="level-left">
                    <span>
                        <h1 class="title is-3">Survey Overview</h1>
                    </span>
                </div>
                <div class="level-right">
                    <a href="https://webtech.union.rpi.edu" style="width: 100px;">
                        <img src="@/assets/wtg.svg" />
                    </a>
                </div>
            </div>
            <div class="field is-fullwidth has-text-centered has-addons is-flex-right">
                <div class="control is-expanded">
                    <input v-model="newSurveyName" type="text" class="input" />
                </div>
                <div class="control">
                    <button class="button is-success" @click="newSurvey">New Survey</button>
                </div>
                <div class="control">
                    <button class="button" @click="loadSurveyModal = true;">Import Survey</button>
                </div>
            </div>
            <div v-if="loadError" class="notification is-danger">
                <a class="delete"></a>
                <p>Error Loading Survey</p>
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
            loadSurveyModal: false,
            surveyFile: undefined,
            newName: '',
            loadError: false,
        }as {
            surveys: Survey[];
            newSurveyName: string;
            loadSurveyModal: false;
            surveyFile: File | undefined;
            newName: string;
            loadError: boolean;
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
        loadFile(resp: any) {
            this.surveyFile = (resp.target.files[0]);
        },
        importSurvey() {
            this.loadSurveyModal = false;
            const reader = new FileReader();
            if (this.surveyFile !== undefined) {
                reader.readAsText(this.surveyFile);
            }
            reader.onload = (evt) => {
                if (evt.target != null) {
                    const newSurvey = new Survey();
                    try {
                        const x = JSON.parse((evt.target as any).result);
                        if (x.length === undefined || x.length === 0) {
                            throw new Error();
                        }
                        if (x[0] === undefined) {
                            throw new Error();
                        }
                        newSurvey.fromJSON(x);
                        newSurvey.name = this.newSurveyName;
                        StorageProvider.saveSurvey(newSurvey.name, newSurvey);
                        this.surveys = StorageProvider.getSurveys();
                    } catch {
                        this.loadError = true;
                    }
                }
            };

        },
    },
    mounted() {
        this.surveys = StorageProvider.getSurveys();

    },
});
</script>
