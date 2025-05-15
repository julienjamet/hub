import { IHubProject } from "../data/data.ts";

export interface IModal {
    setOpenModal: (openModal: boolean) => void,
    project: IHubProject
};