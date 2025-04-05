import { useDevfolioStore } from '../../store/useDevfolioStore';

const DevfolioPreview = () => {
  const { name, email, bio, skills, projects } = useDevfolioStore();

  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded-md">
      <h3><b>Preview</b></h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Bio:</strong> {bio}</p>

      <div>
        <strong>Skills:</strong>
        <ul className="list-disc list-inside">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3><b>Projects</b></h3>
        {projects.map((project, i) => (
          <div key={i} className="p-2 my-3 rounded-md bg-gray-200">
            <h4 className="font-semibold">{project.title}</h4>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevfolioPreview;
