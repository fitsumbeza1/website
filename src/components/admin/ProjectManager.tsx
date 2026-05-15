import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pencil,
  Trash2,
  Plus,
  Eye,
  ExternalLink,
  Github,
} from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { Project, ProjectFormData, createEmptyProject } from "@/types/cms";
import ImageUpload, { ImageDisplayOptions } from "./ImageUpload";

const ProjectManager: React.FC = () => {
  const { getProjects, createProject, updateProject, deleteProject } = useCMS();
  const projects = getProjects();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData & { displayOptions?: ImageDisplayOptions }>(createEmptyProject());

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(createEmptyProject());
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags,
      techStack: project.techStack,
      imageUrl: project.imageUrl,
      link: project.link || "",
      github: project.github || "",
      priority: project.priority,
      displayOptions: {
        objectFit: (project as any).objectFit || "cover",
        orientation: (project as any).orientation || "landscape",
      },
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingProject) {
      updateProject(editingProject._id, formData);
    } else {
      createProject(formData);
    }
    setIsDialogOpen(false);
    setFormData(createEmptyProject());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };

  const handleTechStackChange = (value: string) => {
    const techStack = value.split(",").map((t) => t.trim()).filter(Boolean);
    setFormData({ ...formData, techStack });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {project.description}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{project.priority}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {project.link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(project)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No projects yet. Click "Add Project" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Create Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Project title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Image</label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url, displayOptions) => {
                  setFormData({ ...formData, imageUrl: url });
                  if (displayOptions) {
                    setFormData(prev => ({
                      ...prev,
                      objectFit: displayOptions.objectFit,
                      orientation: displayOptions.orientation
                    }));
                  }
                }}
                showDisplayOptions
              />
              <p className="text-xs text-muted-foreground">
                Choose how the image should be displayed: Cover (fills area), Contain (shows full image), Fill (stretches), or set orientation (Landscape, Portrait, Square)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tech Stack</label>
                <Input
                  value={formData.techStack.join(", ")}
                  onChange={(e) => handleTechStackChange(e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input
                  value={formData.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="web, portfolio, featured"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Live URL</label>
                <Input
                  value={formData.link || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={formData.github || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={String(formData.priority)}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} {num === 1 ? "(Highest)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.title}>
              {editingProject ? "Save Changes" : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
