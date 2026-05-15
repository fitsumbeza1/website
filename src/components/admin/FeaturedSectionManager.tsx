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
import { Switch } from "@/components/ui/switch";
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
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Star } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { FeaturedSection, FeaturedSectionFormData, PortfolioCategory, portfolioCategoryLabels, ImageLayout } from "@/types/cms";
import ImageUpload, { ImageDisplayOptions } from "./ImageUpload";

const FeaturedSectionManager: React.FC = () => {
  const { getFeaturedSections, createFeaturedSection, updateFeaturedSection, deleteFeaturedSection } = useCMS();
  const featuredSections = getFeaturedSections();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeaturedSection | null>(null);
  const [formData, setFormData] = useState<FeaturedSectionFormData>({
    title: "",
    description: "",
    coverImage: "",
    categoryId: "documentaries",
    link: "",
    imageObjectFit: "cover",
    imageOrientation: "landscape",
    layout: "image-above",
    priority: 0,
    published: false,
  });

  const categories: PortfolioCategory[] = ["movies", "documentaries", "commercials", "tv-shows", "music-videos", "photos"];

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      coverImage: "",
      categoryId: "documentaries",
      link: "",
      imageObjectFit: "cover",
      imageOrientation: "landscape",
      layout: "image-above",
      priority: featuredSections.length + 1,
      published: true,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: FeaturedSection) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      coverImage: item.coverImage,
      categoryId: item.categoryId,
      link: item.link || "",
      imageObjectFit: item.imageObjectFit || "cover",
      imageOrientation: item.imageOrientation || "landscape",
      layout: item.layout || "image-above",
      priority: item.priority,
      published: item.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingItem) {
      updateFeaturedSection(editingItem._id, formData);
    } else {
      createFeaturedSection(formData);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this featured section?")) {
      deleteFeaturedSection(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Section</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Featured Project
        </Button>
      </div>

      <p className="text-muted-foreground">
        Manage the featured project section on the homepage. This shows a highlighted project with its cover image.
      </p>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[80px]">Priority</TableHead>
              <TableHead className="w-[80px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featuredSections.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {item.coverImage && (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {portfolioCategoryLabels[item.categoryId as PortfolioCategory] || item.categoryId}
                  </span>
                </TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.published ? "Active" : "Hidden"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {featuredSections.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No featured projects yet. Click "Add Featured Project" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Featured Project" : "Add Featured Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {portfolioCategoryLabels[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={formData.coverImage}
                onChange={(url, displayOptions) => {
                  setFormData({ ...formData, coverImage: url });
                  if (displayOptions) {
                    setFormData(prev => ({
                      ...prev,
                      imageObjectFit: displayOptions.objectFit,
                      imageOrientation: displayOptions.orientation
                    }));
                  }
                }}
                showDisplayOptions
              />
              <p className="text-xs text-muted-foreground">
                Choose how the image should be displayed: Cover (fills area), Contain (shows full image), Fill (stretches), or set orientation (Landscape, Portrait, Square)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Layout</Label>
              <Select 
                value={formData.layout || "image-above"} 
                onValueChange={(value: ImageLayout) => setFormData({ ...formData, layout: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image-above">Image Above Text</SelectItem>
                  <SelectItem value="side-by-side">Side by Side</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose how the image and text should be arranged
              </p>
            </div>

            <div className="space-y-2">
              <Label>Button Link (optional)</Label>
              <Input
                value={formData.link || ""}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="/work/documentaries or https://youtube.com/..."
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use default category link
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label>Published</Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <span className="text-sm">{formData.published ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.title || !formData.coverImage}>
              {editingItem ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeaturedSectionManager;
