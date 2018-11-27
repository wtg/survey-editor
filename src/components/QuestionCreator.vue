<template>
    <div>
        <div class="box">
            <div class="field">
                <label class="label">Question Type</label>
                <div class="select is-fullwidth">
                    <select v-model="question.type">
                        <option :value='0'>Radio</option>
                        <option :value='1'>Text</option>
                        <option :value='2'>Select</option>
                        <option :value='3'>Checkbox</option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label">Question ID</label>
                <div class="control is-expanded">
                    <input v-model="question.id" type="text" class="input" />
                </div>
                <p v-if="question.id.length < 1" class="help is-danger">Required</p>
            </div>
            <div class="field">
                <label class="label">Question Text</label>
                <div class="control is-expanded">
                    <input v-model="question.question" type="text" class="input" />
                </div>
                <p v-if="question.question.length < 1" class="help is-danger">Required</p>
            </div>
            <div class="field">
                <label class="label">Show if Question:</label>
                <div class="control is-expanded">
                    <input placeholder="question id" v-model="question.showIfId" type="text" class="input" />
                </div>
                <label class="label">Has Value</label>
                <div class="control is-expanded">
                    <input v-model="question.showIfValue" type="text" class="input" />
                </div>  
            </div>
            <div class="field">
                <label class="label">Required</label>
                <label class="checkbox">
                <input v-model="question.required" type="checkbox">
                    Required
                </label>
            </div>
            <label v-if="question.type != 1" class="label">Options</label>
            <div class="field">
                <button class="button is-success" @click="question.options.push('')">Add</button>
            </div>
            <div v-for="(option, idx) in question.options" :key="option" class="field has-addons">
                <div class="control is-expanded">
                    <input v-model.lazy="question.options[idx]" type="text" class="input" />
                </div>
                <div class="control">
                    <button class="button is-danger" @click="question.options.splice(idx,1)">x</button>
                </div>
            </div>
            <div class="field has-text-right">
                <button @click="$emit('save')" class="button is-info">Save Question</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Question from '@/assets/question.ts';
import { QuestionType } from '@/assets/question.ts';

export default Vue.extend({
    props: {
        question: {
            type: Object as () => Question,
            default: () => {
                let q = new Question("", "", QuestionType.radio, [],true);
                q.setDefaultOptions();
                return q;
            },
        }
    },
    watch: {
        'question.type' () {
            this.question.setTypeAndDefaults(this.question.type)
        }
    },
    data(){
        return {
            questionType: QuestionType.radio,
            numOptions: 1,
        }as {
            questionType: QuestionType;
            numOptions: number;
        }
    },


})
</script>
