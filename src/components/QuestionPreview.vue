<template>
    <div class="questionpreview notification" :class="{'has-blue-border': this.selected}">
        <div class="field has-addons is-pulled-right">
            <div class="control">
                <button @click="$emit('edit', index);" v-if="index != -1" class="button is-info">Edit</button>
            </div>
            <div class="control">
                <button @click="$emit('delete', index);" v-if="index != -1" class="button is-danger">Delete</button>
            </div>
        </div>

        <p class="caption" title="Not visible on the live survey">id: {{this.question.id}}</p>
        <p class="is-size-5">{{this.question.question}}</p>
        <p class="help is-danger" v-if="question.required == true">Required</p>
        <!-- Multiple Radios (inline) -->
        <div class="field">
            <div v-if="this.question.type === 0" class="control">
                <span style="margin-left: 10px;" v-for="option in this.question.options" :key="option">
                    <label class="radio inline">
                    <input type="radio">
                        {{option}}
                    </label>
                </span>
            </div>
            <div v-if="this.question.type === 1" class="control">
                <textarea class="textarea"></textarea>
            </div>
            <div v-if="this.question.type === 2" class="control">
                <div class="select">
                    <select >
                    <option v-for="option in this.question.options" :key="option">{{option}}</option>
                    </select>
                </div>
            </div>
            <div v-if="this.question.type === 3" class="control">
                <span style="margin-left: 10px;" v-for="option in this.question.options" :key="option">
                    <label class="radio inline">
                    <input type="checkbox">
                        {{option}}
                    </label>
                </span>
            </div>
        </div>
        <p v-if="this.question.showIfId != undefined && this.question.showIfId != ''" class="help">This shows if question: {{this.question.showIfId}} has value: {{this.question.showIfValue}}</p>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Question, { QuestionType } from '@/assets/question';
export default Vue.extend({
    props: {
        question: {
            type: Object as () => Question,
            default: () => {
                const q = new Question('', '', QuestionType.radio, [], true);
                q.setDefaultOptions();
                return q;
            },
        },
        index: {
            type: Number,
            default: () => -1,
        },
        selected: {
            type: Boolean,
            default: () => false,
        },
    },
});
</script>
<style lang="scss" scoped>
    .questionpreview {
        margin: 20px;
    }
    .has-blue-border{
        border-style: solid;
        border-width: 2px;
        border-color: hsl(204, 86%, 53%);
    }
</style>

