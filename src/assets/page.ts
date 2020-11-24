import Question, {SurveyJSON, QuestionType} from './question';

export default class Page {
    public questions: Question[] = [];
    public name: string = '';
    public showIfRadio: string = 'has_value';
    public ifValue: string | number | undefined;

    public deleteQuestion(idx: number) {
        this.questions.splice(idx, 1);
    }

    public fromSurveyJSON(json: SurveyJSON[]) {
        this.questions = [];

        for (let i = 0; i < json.length; i ++) {
            if ((json[i].show_if_id !== '') && (json[i].show_if_id !== undefined)) {
                if ((json[i].show_if_value !== undefined) && (json[i].show_if_value !== '')) {
                    this.showIfRadio = 'has_value';
                    this.ifValue = json[i].show_if_value;
                } else {
                    this.showIfRadio = 'has_value_not';
                    this.ifValue = json[i].show_if_value_not;
                }
            } else {
                this.showIfRadio = 'has_value';
                this.ifValue = undefined;
            }
            this.questions.push(new Question(json[i].id, json[i].question, this.stringTypeToQuestionType(json[i].type), json[i].options === undefined ? [] : (json[i].options as string[] | number[]), json[i].required, this.showIfRadio, json[i].show_if_id, this.ifValue));
        }
    }

    public asSurveyJSON(): SurveyJSON[] {
        const ret: SurveyJSON[] = [];
        for (let i = 0; i < this.questions.length; i ++) {
            if (this.questions[i].id !== '') {
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
