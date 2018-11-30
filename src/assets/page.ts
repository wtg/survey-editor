import Question, {SurveyJSON, QuestionType} from './question';

export default class Page {
    public questions: Question[] = [];
    public name: string = '';

    public deleteQuestion(idx: number) {
        this.questions.splice(idx, 1);
    }

    public fromSurveyJSON(json: SurveyJSON[]) {
        this.questions = [];

        for (let i = 0; i < json.length; i ++) {
            this.questions.push(new Question(json[i].id, json[i].question, this.stringTypeToQuestionType(json[i].type), json[i].options === undefined ? [] : (json[i].options as String[] | Number[]), json[i].required, json[i].show_if_id, json[i].show_if_value));
        }
    }

    public asSurveyJSON(): SurveyJSON[] {
        const ret: SurveyJSON[] = [];
        for (let i = 0; i < this.questions.length; i ++) {
            if (this.questions[i].id != '') {
                ret.push(this.questions[i].asSurveyJSON());
            }
        }
        return ret;
    }

    private stringTypeToQuestionType(val: string): QuestionType {
        if (val === 'radio') {
            return QuestionType.radio;
        } else if (val === 'text') {
            return QuestionType.text;
        } else if (val === 'select') {
            return QuestionType.select;
        } else {
            return QuestionType.checkbox;
        }
    }
}
