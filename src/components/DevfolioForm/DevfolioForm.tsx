import { useState } from 'react';
import { useDevfolioStore } from '../../store/useDevfolioStore';

function DevfolioForm() {
  const { setName, setEmail, setBio, setSkills, addProject, resetProjects } = useDevfolioStore();

  const initialValues = {
    name: '',
    email: '',
    bio: '',
    skills: '',
    projects: [
      {
        title: '',
        description: '',
      },
    ],
  };

  const [params, setParams] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'email' || name === 'bio' || name === 'skills') {
      setParams((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'projectTitle' || name === 'projectDescription') {
      const updatedProjects = [...params.projects];
      if (index !== undefined) {
        updatedProjects[index] = {
          ...updatedProjects[index],
          [name === 'projectTitle' ? 'title' : 'description']: value,
        };
        setParams((prev) => ({ ...prev, projects: updatedProjects }));
      }
    }
  };

  const handleAddProject = () => {
    setParams((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '' }],
    }));
  };

  const handleRemoveProject = (index: number) => {
    const updated = [...params.projects];
    updated.splice(index, 1);
    setParams((prev) => ({ ...prev, projects: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, bio, skills, projects } = params;

    if (!name || !email || !bio || !skills || projects.some((p) => !p.title || !p.description)) {
      alert('All fields are required.');
      return;
    }

    setName(name);
    setEmail(email);
    setBio(bio);
    setSkills(skills.split(',').map((skill) => skill.trim()));

    resetProjects()

    projects.forEach((p) => addProject(p));

    setParams(initialValues)
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3>
            <b>Personal Details</b>
          </h3>
          <input
            name="name"
            value={params.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border px-3 py-2 rounded-md w-full"
          />
          <input
            name="email"
            value={params.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border px-3 py-2 rounded-md w-full mt-2"
          />
          <textarea
            name="bio"
            value={params.bio}
            onChange={handleChange}
            placeholder="Write a short bio"
            className="border px-3 py-2 rounded-md w-full mt-2"
          />
          <input
            name="skills"
            value={params.skills}
            onChange={handleChange}
            placeholder="E.g. React, TypeScript, CSS"
            className="border px-3 py-2 rounded-md w-full mt-2"
          />
        </div>

        <div>
          <h3>
            <b>Projects</b>
          </h3>
          <div className="flex flex-col gap-3">
            {params.projects.map((project, index) => (
              <div key={index} className="relative border p-3 rounded-md flex flex-col gap-2">
                <input
                  name="projectTitle"
                  value={project.title}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Project Title"
                  className="border px-3 py-2 rounded-md w-full"
                />
                <textarea
                  name="projectDescription"
                  value={project.description}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Project Description"
                  className="border px-3 py-2 rounded-md w-full"
                />
                {params.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
                    className="absolute -top-3 -right-2 w-6 h-6 bg-gray-200 rounded-md"
                  >
                    <h6>x</h6>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={handleAddProject}
              className="bg-gray-200 px-3 py-1 rounded-md mt-3"
            >
              Add Project +
            </button>
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DevfolioForm;
