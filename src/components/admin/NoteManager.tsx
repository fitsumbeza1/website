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
import { Label } from "@/components/ui/label";
import {
  Pencil,
  Trash2,
  Plus,
  Type,
  ImageIcon,
  Code,
  List,
  Heading1,
} from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import {
  Note,
  NoteFormData,
  ContentBlock,
  createEmptyNote,
  createContentBlock,
} from "@/types/cms";
import ImageUpload from "./ImageUpload";

const NoteManager: React.FC = () => {
  const { getNotes, createNote, updateNote, deleteNote } = useCMS();
  const notes = getNotes();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState<NoteFormData>(createEmptyNote());

  const handleOpenCreate = () => {
    setEditingNote(null);
    setFormData(createEmptyNote());
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      blocks: note.blocks,
      tags: note.tags,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingNote) {
      updateNote(editingNote._id, formData);
    } else {
      createNote(formData);
    }
    setIsDialogOpen(false);
    setFormData(createEmptyNote());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock = createContentBlock(type);
    setFormData({
      ...formData,
      blocks: [...formData.blocks, newBlock],
    });
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setFormData({
      ...formData,
      blocks: formData.blocks.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    });
  };

  const removeBlock = (id: string) => {
    setFormData({
      ...formData,
      blocks: formData.blocks.filter((b) => b.id !== id),
    });
  };

  const getBlockIcon = (type: ContentBlock["type"]) => {
    switch (type) {
      case "heading":
        return <Heading1 className="w-4 h-4" />;
      case "paragraph":
        return <Type className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "code":
        return <Code className="w-4 h-4" />;
      case "list":
        return <List className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[150px]">Created</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note._id}>
                <TableCell className="font-medium">{note.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{note.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(note.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(note)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(note._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {notes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No notes yet. Click "Add Note" to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNote ? "Edit Note" : "Create Note"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Note title"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input
                value={formData.tags.join(", ")}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="cheatsheet, tutorial, reference"
              />
            </div>

            {/* Content Blocks */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Content</Label>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock("heading")}
                  >
                    <Heading1 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock("paragraph")}
                  >
                    <Type className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock("image")}
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock("code")}
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addBlock("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {formData.blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="flex gap-2 items-start p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {getBlockIcon(block.type)}
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      {block.type === "heading" && (
                        <div className="flex gap-2">
                          <select
                            className="border rounded px-2 py-1 text-sm"
                            value={block.level || 2}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                level: parseInt(e.target.value),
                              })
                            }
                          >
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <option key={l} value={l}>
                                H{l}
                              </option>
                            ))}
                          </select>
                          <Input
                            value={block.content}
                            onChange={(e) =>
                              updateBlock(block.id, { content: e.target.value })
                            }
                            placeholder="Heading text"
                          />
                        </div>
                      )}
                      {block.type === "paragraph" && (
                        <Textarea
                          value={block.content}
                          onChange={(e) =>
                            updateBlock(block.id, { content: e.target.value })
                          }
                          placeholder="Paragraph text"
                          rows={3}
                        />
                      )}
                      {block.type === "image" && (
                        <div className="space-y-2">
                          <Input
                            value={block.content}
                            onChange={(e) =>
                              updateBlock(block.id, { content: e.target.value })
                            }
                            placeholder="Image URL"
                          />
                          <Input
                            value={block.alt || ""}
                            onChange={(e) =>
                              updateBlock(block.id, { alt: e.target.value })
                            }
                            placeholder="Alt text"
                          />
                        </div>
                      )}
                      {block.type === "code" && (
                        <div className="space-y-2">
                          <select
                            className="border rounded px-2 py-1 text-sm"
                            value={block.language || "javascript"}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                language: e.target.value,
                              })
                            }
                          >
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="json">JSON</option>
                          </select>
                          <Textarea
                            value={block.content}
                            onChange={(e) =>
                              updateBlock(block.id, { content: e.target.value })
                            }
                            placeholder="Code content"
                            rows={4}
                            className="font-mono text-sm"
                          />
                        </div>
                      )}
                      {block.type === "list" && (
                        <Textarea
                          value={block.content}
                          onChange={(e) =>
                            updateBlock(block.id, { content: e.target.value })
                          }
                          placeholder="List items (one per line)"
                          rows={3}
                        />
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBlock(block.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {formData.blocks.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No content blocks. Add one using the buttons above.
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.title}>
              {editingNote ? "Save Changes" : "Create Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteManager;
