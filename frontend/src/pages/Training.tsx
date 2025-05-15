/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
//import { NavLink } from 'react-router-dom';
//import axios, { AxiosResponse, AxiosError } from 'axios';
/****************************************************/

/*****************************************INTERFACES*/
import { IHubProject, ISkill } from '../interfaces/data/data.ts';
/****************************************************/

/*****************************************COMPONENTS*/
import { Modal } from '../components/Modal.tsx';
/****************************************************/

/**********************************************TOOLS*/
import { controlHover } from '../tools/general_methods.ts';
/****************************************************/
/************************************************************************/


/**********************************************************TRAINING PAGE*/
export const Training: FC = (): ReactElement => {
    /*****************************STATES & VARIABLES*/
    //const [isReturnHovered, setIsReturnHovered] = useState<boolean>();

    const [selectedProject, setSelectedProject] = useState<IHubProject>();
    const [projects, setProjects] = useState<IHubProject[]>([]);

    const [isP1Hovered, setIsP1Hovered] = useState<boolean>();
    const [isP2Hovered, setIsP2Hovered] = useState<boolean>();
    const [isP3Hovered, setIsP3Hovered] = useState<boolean>();
    const [isP4Hovered, setIsP4Hovered] = useState<boolean>();
    const [isP5Hovered, setIsP5Hovered] = useState<boolean>();
    const [isP6Hovered, setIsP6Hovered] = useState<boolean>();


    const [openModal, setOpenModal] = useState<boolean>(false);
    /************************************************/

    /******************************EFFECTS & METHODS*/
    const setHoveredProject = (action: string, index: number): void => {
        switch (action) {
            case 'enter':
                switch (index) {
                    case 0:
                        setIsP1Hovered(true);
                        break;

                    case 1:
                        setIsP2Hovered(true);

                        break;

                    case 2:
                        setIsP3Hovered(true);

                        break;

                    case 3:
                        setIsP4Hovered(true);

                        break;

                    case 4:
                        setIsP5Hovered(true);

                        break;

                    case 5:
                        setIsP6Hovered(true);

                        break;
                }

                break;

            case 'leave':
                switch (index) {
                    case 0:
                        setIsP1Hovered(false);
                        break;

                    case 1:
                        setIsP2Hovered(false);

                        break;

                    case 2:
                        setIsP3Hovered(false);

                        break;

                    case 3:
                        setIsP4Hovered(false);

                        break;

                    case 4:
                        setIsP5Hovered(false);

                        break;

                    case 5:
                        setIsP6Hovered(false);

                        break;
                }

                break;
        }
    };


    const returnHoveredProject = (index: number): boolean | undefined => {
        switch (index) {
            case 0:
                return isP1Hovered;

            case 1:
                return isP2Hovered;

            case 2:
                return isP3Hovered;

            case 3:
                return isP4Hovered;

            case 4:
                return isP5Hovered;

            case 5:
                return isP6Hovered;
        }
    };


    const selectProject = (project: IHubProject): void => {
        setSelectedProject(project);

        setOpenModal(true);
    };


    useEffect((): void => {
        setProjects([])
        // axios.get('http://localhost:3000/projects/training')

        //     .then((response: AxiosResponse): void => setProjects(response.data))

        //     .catch((error: AxiosError): void => console.error(error))
    }, []);
    /************************************************/

    /*****************************************RETURN*/
    return (
        <>
            {
                selectedProject && openModal && (
                    <Modal
                        setOpenModal={setOpenModal}
                        project={selectedProject}
                    />
                )
            }

            <div className='training'>
                <div className='training_information'>
                    <h2>
                        {/* <NavLink
                            to='/overview'
                            className={`clickable ${controlHover(isReturnHovered)}`}
                            onMouseEnter={(): void => setIsReturnHovered(true)}
                            onMouseLeave={(): void => setIsReturnHovered(false)}
                        >
                            <i
                                className='fa-solid fa-chevron-left'
                                title='Retour'
                            />
                        </NavLink> */}

                        <span>Ma formation</span>
                    </h2>

                    <p>J'ai effectué ma formation de développeur sur la plateforme <strong>OpenClassrooms</strong>.</p>

                    <p>Les 6 projets ci-dessous ont été réalisés au cours de ces huit mois de formation.</p>
                </div>

                <div className='training_projects'>
                    {
                        projects.map((project: IHubProject, index: number): ReactNode =>
                            <div
                                className={`clickable p${index} ${controlHover(returnHoveredProject(index))}`}
                                onMouseEnter={(): void => setHoveredProject('enter', index)}
                                onMouseLeave={(): void => setHoveredProject('leave', index)}
                                onClick={(): void => selectProject(project)}
                            >
                                <div className='image'>
                                    <img src={`./assets/training_page/p${index + 1}.png `} alt={`Projet ${project.name}`} />
                                </div>

                                <div className='skills'>
                                    {
                                        project.skills.map((skill: ISkill): ReactNode =>
                                            <i
                                                className={skill.icon}
                                                title={skill.name}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
    /************************************************/
};
/************************************************************************/