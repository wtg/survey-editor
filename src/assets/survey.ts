import Page from '@/assets/page';
import { SurveyJSON } from './question';

export default class Survey {
    public pages: Page[] = [];
    public name: string = "";

    public fromJSON(json: SurveyJSON[][]){
        for(let i = 0; i < json.length; i ++){
            let pg = new Page()
            pg.fromSurveyJSON(json[i])
            this.pages.push(pg)
        }
    }

    public toJSON(): SurveyJSON[][]{
        let ret: SurveyJSON[][] = [];
        for(let i = 0; i < this.pages.length; i ++){
            ret.push(this.pages[i].asSurveyJSON())
        } 
        return ret;
    }
}