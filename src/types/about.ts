export interface Strength {
    id: string;
    title: string;
    desc: string;
    tags: string[];
}

export interface AboutData {
    name: string;
    role: string;
    strengths: Strength[];
    weakness: string;
    workEthics: string[];
}