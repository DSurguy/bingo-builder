import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Project, NewProject, FreeSpaceSetting, AppStep, ListItemProject } from '../types';
import { getSeedLines } from '../lipsumSeed';
import { getProject, listProjects, loadedProjectState, saveProject } from '../store/project';
import { useSetRecoilState } from 'recoil';
import { appStepState } from '../store/appState';

export default function ProjectList() {
  const setLoadedProject = useSetRecoilState(loadedProjectState);
  const setAppStep = useSetRecoilState(appStepState);
  const [listItemProjects, setListItemProjects] = useState<ListItemProject[]>([])

  useEffect(() => {
    (async () => {
      try {
        setListItemProjects(await listProjects());
      } catch (e) {
        console.log("Error listing projects", e);
      }
    })()
  }, [])

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

  const onProjectClick = async (projectId: string) => {
    try {
      const project = await getProject(projectId);
      if( !project ) throw new Error("Project was null");
      setLoadedProject(project);
      setAppStep(AppStep.input);
    } catch (e) {
      console.error("Error loading project", e);
    }
  }

  return (
    <Container>
      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleNewProjectClick}>Create New Project</Button>
      </Box>
      <Box marginTop={2}>
        <Typography variant="h4">Projects</Typography>
        <Divider />
        <List aria-label="projects">
          {listItemProjects.map(project => (
            <ListItem button key={project.id} onClick={() => onProjectClick(project.id)}>
              <ListItemText primary={project.name} secondary={project.id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )
}