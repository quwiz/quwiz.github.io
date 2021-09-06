export interface Question {
    id: string;
    text: string;
    options: Option[];
    meta: Meta;
}

export interface Option {
    text: string;
    weight: number;
}

export interface Meta {
    multimedia: Multimedia[];
}

export interface Multimedia {
    contentType: string;
    content: string;
}

export interface QuizTemplateIdentity {
  _id: string;
  name: string;
}
