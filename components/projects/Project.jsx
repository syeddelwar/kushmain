import React, { useState } from "react";
import Card from "./Card";

const categories = [
  {
    id: 1,
    title: "Angola",
    type: "Angola",
  },
  {
    id: 2,
    title: "Benin",
    type: "benin",
  },
  {
    id: 3,
    title: "Burkina Faso",
    type: "burkina",
  },
  {
    id: 4,
    title: "DRC",
    type: "drc",
  },
  {
    id: 5,
    title: "Guinea",
    type: "guinea",
  },
  {
    id: 6,
    title: "Indonesia",
    type: "Indonesia",
  },
  {
    id: 7,
    title: "Ivory Coast",
    type: "ivory",
  },
  {
    id: 8,
    title: "Mali",
    type: "mali",
  },
  {
    id: 9,
    title: "Nigeria",
    type: "nigeria",
  },
  {
    id: 10,
    title: "Sudan",
    type: "sudan",
  },
  {
    id: 11,
    title: "Togo",
    type: "togo",
  },
  {
    id: 12,
    title: "Zimbawe",
    type: "zimbawe",
  },
];
const Project = ({ data }) => {
  const [projects, setProjects] = useState(data?.projects);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleProject = (type) => {
    setSelectedCategory(type);
    if (type === "all") {
      setProjects(data?.projects);
    } else {
      const filterProject = data?.projects?.filter(
        (project) => project.name.toLowerCase() == type.toLowerCase()
      );
      setProjects(filterProject);
    }
  };

  return (
    <>
      <section className="dark:bg-[#161519]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <ul className="flex flex-wrap justify-center gap-3">
              <li onClick={() => handleProject("all")}>
                <a>
                  <span className="text-[#cb9833] font-semibold">All</span>
                </a>
              </li>
              {categories?.map((category) => (
                <li
                  onClick={() => handleProject(category?.type)}
                  className="flex gap-4"
                  key={category.id}
                >
                  /
                  <a>
                    <span className="text-[#cb9833] font-semibold">
                      {category.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <h3 className="text-primary text-xl font-semibold">
                {selectedCategory}
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-3">
              {projects?.map((project, index) => (
                <Card
                  key={index}
                  id={project.id}
                  name={project.name}
                  country={project.country}
                  image={project.image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;