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
import { Pencil, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { HeroSlide, HeroSlideFormData } from "@/types/cms";
import ImageUpload, { ImageDisplayOptions } from "./ImageUpload";

const RubySlidesManager: React.FC = () => {
  // Using heroSlides from CMS but filtering for Ruby Pictures slideshow
  const { heroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide } = useCMS();
  
  // For now, we'll manage these separately - in production you'd have a separate collection
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      _id: "ruby-1",
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158034/DJI_360_htxtip.jpg",
      priority: 1,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "ruby-2",
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158027/DJI_0248_s5ckjn.jpg",
      priority: 2,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "ruby-3",
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158022/DJI_0227-Pano_m9sdpp.jpg",
      priority: 3,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "ruby-4",
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158024/DJI_0247_cxp0yy.jpg",
      priority: 4,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "ruby-5",
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158156/PANO0002_knurcc.jpg",
      priority: 5,
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "ruby-6",
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1771158130/PANO0001-Pano_qi8rer.jpg",
      priority: 6,
      published: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [formData, setFormData] = useState<HeroSlideFormData & { displayOptions?: ImageDisplayOptions }>({
    title: "Ruby Pictures",
    description: "A film production company in Addis Ababa, Ethiopia",
    fallbackImage: "",
    priority: 0,
    published: true,
    displayOptions: {
      objectFit: "cover",
      orientation: "landscape",
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  
  const handleOpenCreate = () => {
    setEditingSlide(null);
    setFormData({
      title: "Ruby Pictures",
      description: "A film production company in Addis Ababa, Ethiopia",
      fallbackImage: "",
      priority: slides.length + 1,
      published: true,
      displayOptions: {
        objectFit: "cover",
        orientation: "landscape",
      },
    });
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
      displayOptions: {
        objectFit: (slide as any).objectFit || "cover",
        orientation: (slide as any).orientation || "landscape",
      },
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingSlide) {
      setSlides(prev => prev.map(s => s._id === editingSlide._id ? { ...s, ...formData, fallbackImage: formData.fallbackImage } : s).sort((a, b) => a.priority - b.priority));
    } else {
      setSlides(prev => [...prev, { _id: crypto.randomUUID(), ...formData, createdAt: new Date().toISOString() }].sort((a, b) => a.priority - b.priority));
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      setSlides(prev => prev.filter(s => s._id !== id));
    }
  };

  const activeSlides = slides.filter(s => s.published).sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ruby Pictures Slideshow</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </Button>
      </div>

      <p className="text-muted-foreground">
        Manage the main slideshow on the homepage header. These are the drone and panorama shots that appear behind the Ruby Pictures logo.
      </p>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Preview</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.sort((a, b) => a.priority - b.priority).map((slide) => (
              <TableRow key={slide._id}>
                <TableCell>
                  {slide.fallbackImage && (
                    <img
                      src={slide.fallbackImage}
                      alt="Slide preview"
                      className="w-24 h-14 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>{slide.priority}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${slide.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {slide.published ? "Active" : "Hidden"}
                  </span>
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
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSlide ? "Edit Slide" : "Add Slide"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Slide Image (required)</Label>
              <ImageUpload
                value={formData.fallbackImage}
                onChange={(url, displayOptions) => setFormData({ ...formData, fallbackImage: url, displayOptions })}
                showDisplayOptions={true}
              />
              <p className="text-xs text-muted-foreground">
                Choose how the image should be displayed: Cover (fills area), Contain (shows full image), Fill (stretches), or set orientation (Landscape, Portrait, Square)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                placeholder="1"
              />
              <p className="text-xs text-muted-foreground">Order in which slides appear</p>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.published}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, published: checked })}
              />
              <Label>Published (show in slideshow)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.fallbackImage}>
              {editingSlide ? "Save Changes" : "Add Slide"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RubySlidesManager;
