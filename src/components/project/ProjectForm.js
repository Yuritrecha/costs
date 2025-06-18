import { useEffect, useState } from "react";

import InputForm from "../forms/InputForm";
import Submit from "../forms/Submit";
import Select from "../forms/Select";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
    console.log(project);
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
    console.log(project);
  }

  return (
    <form onSubmit={submit}>
      <InputForm
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <InputForm
        type="number"
        text="Orçamento total:"
        placeholder="Digite o orçamento total"
        name="budget"
        handleOnChange={handleChange}
        value={project.budget || ''}
      />
      <Select
        name="category_id"
        text="selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <Submit text={btnText} />
    </form>
  );
}

export default ProjectForm;
