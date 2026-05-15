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
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Video, Image as ImageIcon } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { HeroSlide, HeroSlideFormData, createEmptyHeroSlide } from "@/types/cms";
import ImageUpload, { ImageDisplayOptions } from "./ImageUpload";

const HeroSlidesManager: React.FC = () => {
  const { getHeroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide } = useCMS();
  const heroSlides = getHeroSlides();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<HeroSlideFormData & { displayOptions?: ImageDisplayOptions }>({
  ...createEmptyHeroSlide(),
  displayOptions: {
    objectFit: "cover",
    orientation: "landscape",
  },
});

  const handleOpenCreate = () => {
    setEditingSlide(null);
    setFormData(createEmptyHeroSlide());
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      videoUrl: slide.videoUrl || "",
      fallbackImage: slide.fallbackImage,
      priority: slide.priority,
      published: slide.published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingSlide) {
      updateHeroSlide(editingSlide._id, formData);
    } else {
      createHeroSlide(formData);
    }
    setIsDialogOpen(false);
    setFormData(createEmptyHeroSlide());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      deleteHeroSlide(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Slides</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Hero Slide
        </Button>
      </div>

      <p className="text-muted-foreground">
        Manage the hero carousel slides on the homepage. Published slides will appear in rotation.
      </p>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Background</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Media</TableHead>
              <TableHead className="w-[80px]">Priority</TableHead>
              <TableHead className="w-[80px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heroSlides.map((slide) => (
              <TableRow key={slide._id}>
                <TableCell>
                  {slide.fallbackImage && (
                    <img
                      src={slide.fallbackImage}
                      alt={slide.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{slide.title}</TableCell>
                <TableCell className="max-w-xs truncate">{slide.description}</TableCell>
                <TableCell>
                  {slide.videoUrl ? (
                    <Badge variant="outline" className="gap-1">
                      <Video className="w-3 h-3" /> Video
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <ImageIcon className="w-3 h-3" /> Image
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{slide.priority}</TableCell>
                <TableCell>
                  <Badge variant={slide.published ? "default" : "secondary"}>
                    {slide.published ? "Active" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(slide)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(slide._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {heroSlides.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No hero slides yet. Click "Add Hero Slide" to create one.
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
              {editingSlide ? "Edit Hero Slide" : "Add Hero Slide"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., The Coffee Project"
              />
            </div>

            <div className="space-y-2">
              <Label>Subtitle (optional)</Label>
              <Input
                value={formData.subtitle || ""}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Subtitle text"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short description"
              />
            </div>

            <div className="space-y-2">
              <Label>Video URL (optional)</Label>
              <Input
                value={formData.videoUrl || ""}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://res.cloudinary.com/.../video.mp4"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for image-only slide. Video takes priority over image.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Fallback Image (required)</Label>
              <ImageUpload
                value={formData.fallbackImage}
                onChange={(url, displayOptions) => {
                  setFormData({ ...formData, fallbackImage: url });
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
                <Label>Priority</Label>
                <Input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                  placeholder="1"
                />
                <p className="text-xs text-muted-foreground">Lower number = shown first</p>
              </div>
              <div className="space-y-2">
                <Label>Published</Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <span className="text-sm">{formData.published ? "Active" : "Hidden"}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.title || !formData.fallbackImage}>
              {editingSlide ? "Save Changes" : "Create Slide"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSlidesManager;
