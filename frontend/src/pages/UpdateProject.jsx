import ProjectForm from "../components/ProjectForm";
import Back from "../components/ui/Back";

function UpdateProject() {
  return (
    <div className="min-h-screen p-6">
      <Back />
      <div className="w-full flex justify-center">
        <ProjectForm />
      </div>
    </div>
  );
}

export default UpdateProject;
