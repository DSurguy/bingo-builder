import { atom } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import { Project, NewProject } from '../types'

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
  localStorage.setItem(projectKey, JSON.stringify(newProject));
  return newProject;
}

export async function getProject(projectId: string): Promise<Project | null> {
  const projectKey = `projects/${projectId}`;
  const projectJson = localStorage.getItem(projectKey);
  return projectJson ? JSON.parse(projectJson) : null;
}