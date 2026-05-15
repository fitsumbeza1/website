import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const colorMap: Record<string, string> = {
  ruby: "group-hover:text-ruby",
  electric: "group-hover:text-electric",
  amber: "group-hover:text-amber",
  emerald: "group-hover:text-emerald",
  violet: "group-hover:text-violet",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/work/${project.id}`} className="group block">
        <div className="project-card aspect-[4/3] mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-display text-xl font-semibold tracking-tight transition-colors duration-500 ${colorMap[project.color] || "group-hover:text-ruby"}`}>
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm font-mono mt-1">{project.category}</p>
          </div>
          <span className="text-muted-foreground text-xs font-mono mt-1">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
