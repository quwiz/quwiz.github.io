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

export interface QuizTemplate {
  _id: string;
  name: string;
  title: string;
  titleImages: Multimedia[];
  status: string;
  roundsIndex: Map<string, RoundIndex>;
  rounds: Round[];
}

export interface RoundIndex {
  name: string;
  index: number;
}

export interface Round {
  questionTime: number;
  countdownAutoStart: boolean;
  questions: string[];
}
