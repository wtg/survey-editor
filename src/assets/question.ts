export enum QuestionType {
    radio,
    text,
    select,
    checkbox,
}

export interface SurveyJSON {
    id: string;
    question: string;
    type: string;
    options?: String[] | Number [];
    required: boolean;
    show_if_id?: string | undefined;
    show_if_value?: string | number | undefined;
}

// Question represents a survey question, options, and type
export default class Question {
    public id: string;
    public question: string;
    public type: QuestionType;
    public options: String[] | Number [];
    public required: boolean;
    public showIfId: string | undefined;
    public showIfValue: string | number | undefined;
    private defaultsSet: boolean = false;

    constructor(id: string, question: string, type: QuestionType, options: String[] | Number [],
                required: boolean, showIfId?: string, showIfValue ?: string | number ) {
            this.id = id;
            this.question = question;
            this.type = type;
            this.options = options;
            this.required = required;
            this.showIfId = showIfId;
            this.showIfValue = showIfValue;
        }

    // Returns true if this question has had defaults set for its type
    public hasDefaultsSet(): boolean {
        return this.defaultsSet;
    }

    // sets the default options for the question type, returns true if set successfully
    // returns false if defaults have already been set
    public setDefaultOptions(): boolean {
        if (this.defaultsSet) {
            return false;
        }
        this.defaultsSet = true;
        switch (this.type) {
            case QuestionType.radio: {
                this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                break;
            }
            case QuestionType.checkbox: {
                this.options = ['option one', 'option two', 'option three'];
                break;
            }
            case QuestionType.select: {
                this.options = ['option one', 'option two', 'option three'];
                break;
            }
            case QuestionType.text: {
                this.options = [];
                break;
            }
        }
        return true;
    }

    // Sets the question to the type
    public setType(q: QuestionType) {
        this.type = q;
        this.defaultsSet = false;
    }

    // Sets the question type and the defaults for that question
    public setTypeAndDefaults(q: QuestionType) {
        this.setType(q);
        this.setDefaultOptions();
    }

    public asSurveyJSON(): SurveyJSON {
        const typeToString = ['radio', 'text', 'select', 'checkbox'];
        const ret: SurveyJSON = {
            id: this.id,
            question: this.question,
            type: typeToString[this.type],
            required: this.required,
        };
        if (this.type != QuestionType.text) {
            ret.options = this.options;
        }
        if (this.showIfId != '' && this.showIfId != undefined) {
            ret.show_if_id = this.showIfId;
            ret.show_if_value = this.showIfValue;
        }

        return ret;
    }

}
