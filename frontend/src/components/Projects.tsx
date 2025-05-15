/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import { FC, ReactElement, ReactNode, useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import axios, { AxiosResponse, AxiosError } from 'axios';
/****************************************************/

/*****************************************INTERFACES*/
import { IHubProject, ISkill } from '../interfaces/data/data.ts';
/****************************************************/

/*****************************************COMPONENTS*/
//import { Modal } from './Modal.tsx';
/****************************************************/
/************************************************************************/


/***************************************************************PROJECTS*/
export const Projects: FC = (): ReactElement => {
    /*****************************STATES & VARIABLES*/
    const location: string = useLocation().pathname.split('/')[1];

    const [projects, setProjects] = useState<IHubProject[]>([]);
    //const [selectedProject, setSelectedProject] = useState<IHubProject>();

    //const [openModal, setOpenModal] = useState<boolean>(false);
    /************************************************/

    /******************************EFFECTS & METHODS*/
    // [ GET PROJECTS ] EFFECT
    useEffect((): void => {
        let baseURL: string = '';

        if (import.meta.env.MODE === 'development') {
            baseURL = `${import.meta.env.VITE_HUB_DEV_HOSTNAME || ''}:${import.meta.env.VITE_HUB_DEV_PORT || ''}`;
        }
        else if (import.meta.env.MODE === 'production') {
            baseURL = import.meta.env.VITE_HUB_PREPROD_URL || '';
        }

        axios.get(`${baseURL}/projects/${location}`)

            .then((response: AxiosResponse): void => setProjects(response.data))

            .catch((error: AxiosError): void => console.error(error));
    }, [location]);


    // const selectProject = (project: IHubProject): void => {
    //     setSelectedProject(project);

    //     setOpenModal(true);
    // };
    /************************************************/

    /*****************************************RETURN*/
    return (
        <>
            {/* {
                selectedProject && openModal && (
                    <Modal
                        setOpenModal={setOpenModal}
                        project={selectedProject}
                    />
                )
            } */}

            <div className='projects'>
                <div className='projects_presentation'>
                    <h2>
                        <NavLink
                            to='/'
                            className='clickable'
                        >
                            <i
                                className='fa-solid fa-chevron-left'
                                title='Retour'
                            />
                        </NavLink>

                        <span className='title'>
                            {location === 'training' ? 'Ma formation' : 'Mes projets'}
                        </span>
                    </h2>

                    <div className='text'>
                        {
                            location === 'training' ? (
                                <>
                                    <span>J'ai effectué ma formation de développeur sur la plateforme <strong>OpenClassrooms</strong>.</span>

                                    <span>Les six projets ci-dessous ont été réalisés au cours de ces huit mois de formation.</span>
                                </>
                            ) : (
                                <>
                                    <span>Les projets ci-dessous sont mes créations, bacs à sable et autres expérimentations.</span>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className='cards'>
                    {
                        projects.map((project: IHubProject, index: number): ReactNode =>
                            <div
                                className={`clickable p${index}`}
                            //onClick={(): void => selectProject(project)}
                            >
                                <div className='image'>
                                    <img src={project.image} alt={`Projet ${project.name}`} />
                                </div>

                                <div className='skills'>
                                    {
                                        project.skills.map((skill: ISkill): ReactNode =>
                                            !skill.icon.includes('base64') ? (
                                                <i
                                                    className={skill.icon}
                                                    title={skill.name}
                                                />
                                            ) : (
                                                <img src={skill.icon} alt={`Projet ${project.name}`} />
                                            )
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