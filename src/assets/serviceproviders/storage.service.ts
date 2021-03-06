import Survey from '@/assets/survey';
import { SurveyJSON } from '../question';

export default class Storage {
    public static SURVEY_NAME = 'SURVEY_NAMES';
    public static SURVEY_CONTAINER = 'SURVEY_';

    public static getSurveyNames(): string[] {
        const ret = localStorage.getItem(Storage.SURVEY_NAME);
        if (ret !== null) {
            const val: string[] = JSON.parse(ret);
            return val;
        } else {
            return [];
        }
    }

    public static setSurveyNames(names: string[]) {
        localStorage.setItem(this.SURVEY_NAME, JSON.stringify(names));
    }

    public static deleteSurvey(name: string) {
        const names = this.getSurveyNames();
        names.splice(names.indexOf(name), 1);
        this.setSurveyNames(names);
    }

    public static getSurveys(): Survey[] {
        const names = this.getSurveyNames();
        const ret: Survey[] = [];
        for (let i = 0; i < names.length; i ++) {
            const survey = new Survey();
            const val = localStorage.getItem(this.SURVEY_CONTAINER + names[i]);
            if (val !== null) {
                const surveyRaw: SurveyJSON[][] = JSON.parse(val);
                survey.fromJSON(surveyRaw);
                survey.name = names[i];
                ret.push(survey);
            }
        }
        return ret;
    }

    public static getSurveyByName(name: string): Survey | undefined {
        const val = localStorage.getItem(Storage.SURVEY_CONTAINER + name);
        if (val != null) {
            const ret = new Survey();
            ret.fromJSON(JSON.parse(val));
            ret.name = name;
            return ret;
        }
        return undefined;
    }

    public static saveSurvey(name: string, survey: Survey) {
        const names = this.getSurveyNames();
        if (!names.includes(name)) {
            names.push(name);
        }
        localStorage.setItem(this.SURVEY_CONTAINER + name, JSON.stringify(survey.toJSON()));

        this.setSurveyNames(names);
    }
}
