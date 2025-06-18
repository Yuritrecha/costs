import Message from "./static/Message";
import { useLocation } from "react-router-dom";
import Container from "./static/Container.js";
import LinkButton from "../LinkButton.js";
import ProjectCard from "../project/ProjectCard.js";
import { useState, useEffect } from "react";
import Loading from './Loading.js'
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [removeLoader, setRemoveLoader] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoader(true)
        })
        .catch((err) => console.log(err));
    }, 100)
  }, []);

  function removeProject(id){
    fetch (`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data =>{
        setProjects(projects.filter((project) => project.id !== id))
      })
      .catch(err => console.log (err))      
  }

  return (
    <div className={styles.project_container}>
      {message && <Message type="succes" msg={message} />}
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton text="Novo Projeto" to="/NewProject" />
      </div>

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category?.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
          {!removeLoader && <Loading />}
          {removeLoader && projects.length === 0 && (
            <p>Não há projetos a serem exibidos.</p>
          )}
      </Container>
      
    </div>
  );
}

export default Projects;
