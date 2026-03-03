export interface Project {
    name: string;
    role: string;
    tech: string[];
}

export interface CareerData {
    id: number;
    date: string;
    title: string;
    desc: string;
    color: string;
    type?: string;
    projects?: Project[]; // 터미널에 노출될 상세 프로젝트
}