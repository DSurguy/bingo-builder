import React from 'react';
import { Button, Container } from '@material-ui/core';
import { Project, NewProject, FreeSpaceSetting, AppStep } from '../types';
import { getSeedLines } from '../lipsumSeed';
import { loadedProjectState, saveProject } from '../store/project';
import { useSetRecoilState } from 'recoil';
import { appStepState } from '../store/appState';

export default function ProjectList() {
  const setLoadedProject = useSetRecoilState(loadedProjectState);
  const setAppStep = useSetRecoilState(appStepState);

  const handleNewProjectClick = async () => {
    const newProject: NewProject = {
      name: 'New Project',
      lines: {
        easy: getSeedLines(20).split(/[\n\r]/g),
        medium: getSeedLines(10).split(/[\n\r]/g),
        hard: getSeedLines(5).split(/[\n\r]/g),
      },
      settings: {
        freeSpace: FreeSpaceSetting.center,
        easy: 12,
        medium: 9,
        hard: 3
      }
    }
    
    let savedProject: Project;
    try {
      savedProject = await saveProject(newProject);
    } catch (e) {
      console.error("Error saving newly created project", e);
      return;
    }
    
    setLoadedProject(savedProject);

    setAppStep(AppStep.input);
  }

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleNewProjectClick}>Create New Project</Button>
    </Container>
  )
}