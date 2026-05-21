import { useSelector } from "react-redux";

function Projects() {
  const { myProjects, isLoading } = useSelector((state) => state.projects);

  console.log(myProjects);

  return <div></div>;
}

export default Projects;
