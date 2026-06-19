export interface Answer {
  id: string;
  author: string;
  text: string;
}

export type BeaconCategory =
  | "ai"
  | "career"
  | "research"
  | "startup"
  | "coding"
  | "cybersecurity"
  | "design"
  | "general";

export interface Beacon {
  id: string;

  title: string;

  author: string;

  category: BeaconCategory;

  position: [
    number,
    number,
    number
  ];

  type:
    | "question"
    | "idea"
    | "discussion";

  answers: Answer[];
}