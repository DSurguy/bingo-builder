import { atom } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import { Project, NewProject, ListItemProject } from '../types'

export const loadedProjectState = atom<Project | null>({
  key: 'useStorage',
  default: null
})

export async function saveProject(unsavedProject: Project | NewProject): Promise<Project> {
  const projectId = unsavedProject.id || uuidv4();
  const projectKey = `projects/${projectId}`;
  const newProject: Project = {
    ...unsavedProject,
    id: projectId
  };
  try {
    localStorage.setItem(projectKey, JSON.stringify(newProject));
  } catch (e) {
    console.error(`LocalStorage setItem failed for ${projectId}, storage may be full`);
  }
  return newProject;
}

export async function getProject(projectId: string): Promise<Project | null> {
  const projectKey = `projects/${projectId}`;
  const projectJson = localStorage.getItem(projectKey);
  return projectJson ? JSON.parse(projectJson) : null;
}

export async function listProjects(): Promise<ListItemProject[]> {
  const projectKeyRegex = /^projects\/[\w\-]{36}$/i;
  const projectIds = Object.keys(localStorage).filter(key => projectKeyRegex.test(key)).map(path => path.slice(-36));
  const projects = projectIds.map(projectId => {
    const storedItem = localStorage.getItem(`projects/${projectId}`);
    if( !storedItem ) return null;
    try {
      const parsedProject = JSON.parse(storedItem) as Project;
      return {
        id: parsedProject.id,
        name: parsedProject.name
      }
    } catch (e) {
      return null;
    }
  }).filter((f): f is Project => !!f); //Typescript is so dumb sometimes
  return projects;
}