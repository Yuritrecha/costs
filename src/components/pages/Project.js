import { parse, v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "./static/Container";
import Loading from "./Loading";
import ProjectForm from "../project/ProjectForm";
import Message from "./static/Message";
import ServiceForm from "../forms/ServiceForm";
import ServiceCard from "../forms/ServiceCard";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function editPost(project) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Edição concluída com sucesso!");
        setType("succes");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function createService() {
    setMessage("");

    //last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation

    if (newCost > parseFloat(project.budget)) {
      setMessage(" Orçamento ultrapassado, verifique o valor do serviço.");
      setType("error");
      project.services.pop();
      setShowServiceForm(false);
      return false;
    }

    // add service cost to project total cost
    project.cost = newCost;

    
    }

    function removeService(id, cost) {
      const serviceUpdate = project.services.filter(
        (service) => service.id !== id
      );

      const projectUpdated = project;
      projectUpdated.services = serviceUpdate;
      projectUpdated.cost = parseFloat(project.cost) - parseFloat(cost);

      fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
        method: "PATCH",
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(projectUpdated)
          })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(projectUpdated)
            setServices(serviceUpdate)
            setMessage('Serviço removido com sucesso')
            setType('succes')
    })
          .catch((err) => console.log(err))

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.detail_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento Total:</span> R$ {project.budget}
                  </p>
                  <p>
                    <span>Total utilizado: </span>R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços </h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços a serem exibidos</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
