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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Video, Image as ImageIcon } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { PortfolioItem, PortfolioItemFormData, createEmptyPortfolioItem, portfolioCategoryLabels, PortfolioCategory } from "@/types/cms";
import ImageUpload, { ImageDisplayOptions } from "./ImageUpload";

const PortfolioManager: React.FC = () => {
  const { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useCMS();
  const portfolioItems = getPortfolioItems();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState<PortfolioItemFormData & { displayOptions?: ImageDisplayOptions }>(createEmptyPortfolioItem());

  const categories: PortfolioCategory[] = ["movies", "documentaries", "commercials", "tv-shows", "music-videos", "photos"];

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(createEmptyPortfolioItem());
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      videoUrl: item.videoUrl || "",
      coverImage: item.coverImage || "",
      images: item.images || [],
      category: item.category,
      priority: item.priority,
      published: item.published,
      displayOptions: {
        objectFit: (item as any).objectFit || "cover",
        orientation: (item as any).orientation || "landscape",
      },
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingItem) {
      updatePortfolioItem(editingItem._id, formData);
    } else {
      createPortfolioItem(formData);
    }
    setIsDialogOpen(false);
    setFormData(createEmptyPortfolioItem());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deletePortfolioItem(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <Badge key={cat} variant="outline" className="whitespace-nowrap">
            {portfolioCategoryLabels[cat]}: {portfolioItems.filter((i) => i.category === cat).length}
          </Badge>
        ))}
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Video</TableHead>
              <TableHead className="w-[80px]">Priority</TableHead>
              <TableHead className="w-[80px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioItems.map((item) => (
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
                  <Badge variant="secondary">
                    {portfolioCategoryLabels[item.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.videoUrl ? (
                    <Video className="w-4 h-4 text-green-500" />
                  ) : item.images && item.images.length > 0 ? (
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>
                  <Badge variant={item.published ? "default" : "secondary"}>
                    {item.published ? "Published" : "Draft"}
                  </Badge>
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
            {portfolioItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No portfolio items yet. Click "Add Portfolio Item" to create one.
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
              {editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
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
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as PortfolioCategory })}
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
              <Label>Video URL (YouTube/Vimeo)</Label>
              <Input
                value={formData.videoUrl || ""}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={formData.coverImage || ""}
                onChange={(url, displayOptions) => {
                  setFormData({ ...formData, coverImage: url });
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
            <Button onClick={handleSubmit} disabled={!formData.title}>
              {editingItem ? "Save Changes" : "Create Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManager;
