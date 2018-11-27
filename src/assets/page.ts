import Question, {SurveyJSON} from './question';

export default class Page{
    public questions: Question[] = [];

    public deleteQuestion(idx: number){
        this.questions.splice(idx, 1);
    }

    public asSurveyJSON(): SurveyJSON[]{
        let ret: SurveyJSON[] = [];
        for (let i = 0; i < this.questions.length; i ++){
            if(this.questions[i].id != ''){
                ret.push(this.questions[i].asSurveyJSON())
            }
        }
        return ret;
    }
}