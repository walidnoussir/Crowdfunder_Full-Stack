import ProjectForm from "../components/ProjectForm";
import { createProject } from "../features/projects/projectsSlice";

function CreateProject() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <ProjectForm submit={createProject} />
    </div>
  );
}

export default CreateProject;
