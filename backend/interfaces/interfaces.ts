interface ISkill {
    name: string,
    icon: string
};

interface IStarting {
    name: string,
    link: string
};

export interface IHubProject {
    number?: number,
    name: string,
    image: string,
    subject: string,
    skills: ISkill[],
    difficulty: number,
    startings?: IStarting[]
};