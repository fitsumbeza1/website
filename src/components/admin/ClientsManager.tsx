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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { Client, ClientFormData, createEmptyClient } from "@/types/cms";
import ImageUpload from "./ImageUpload";

const ClientsManager: React.FC = () => {
  const { getClients, createClient, updateClient, deleteClient } = useCMS();
  const clients = getClients();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<ClientFormData>(createEmptyClient());

  const handleOpenCreate = () => {
    setEditingClient(null);
    setFormData(createEmptyClient());
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      logo: client.logo || "",
      website: client.website || "",
      description: client.description || "",
      priority: client.priority,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingClient) {
      updateClient(editingClient._id, formData);
    } else {
      createClient(formData);
    }
    setIsDialogOpen(false);
    setFormData(createEmptyClient());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      deleteClient(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <p className="text-muted-foreground">
        Manage your clients and partners. These appear in the clients carousel on your website.
      </p>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="w-[80px]">Priority</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client._id}>
                <TableCell>
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-16 h-12 object-contain rounded"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">No logo</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="max-w-xs truncate">{client.description || "-"}</TableCell>
                <TableCell>
                  {client.website ? (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{client.priority}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(client)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(client._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No clients yet. Click "Add Client" to create one.
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
              {editingClient ? "Edit Client" : "Add Client"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Client/Brand Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Company or brand name"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo</Label>
              <ImageUpload
                value={formData.logo || ""}
                onChange={(url) => setFormData({ ...formData, logo: url })}
              />
            </div>

            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input
                value={formData.website || ""}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the client"
                rows={2}
              />
            </div>

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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name}>
              {editingClient ? "Save Changes" : "Add Client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsManager;
