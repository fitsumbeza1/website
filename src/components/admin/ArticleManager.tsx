import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Type, ImageIcon, Video } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { Article, ArticleFormData, ContentBlock, createEmptyArticle, createContentBlock } from "@/types/cms";
import ImageUpload from "./ImageUpload";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  category: string;
  priority: number;
  published: boolean;
}

interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  role?: string;
}

interface Client {
  _id: string;
  name: string;
  logo: string;
  website?: string;
}

const ArticleManager: React.FC = () => {
  const { getArticles, createArticle, updateArticle, deleteArticle } = useCMS();
  const articles = getArticles();

  const [activeTab, setActiveTab] = useState<"articles" | "portfolio" | "testimonials" | "clients">("portfolio");
  const [formData, setFormData] = useState<ArticleFormData>(createEmptyArticle());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    { _id: "1", title: "Sample Music Video", description: "A great music video", videoUrl: "", imageUrl: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png", category: "music-videos", priority: 1, published: true }
  ]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { _id: "1", name: "John Doe", quote: "Great work!", role: "CEO" }
  ]);
  const [clients, setClients] = useState<Client[]>([
    { _id: "1", name: "Drama Deluxe", logo: "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png" }
  ]);

  const [isPortfolioDialogOpen, setIsPortfolioDialogOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [portfolioForm, setPortfolioForm] = useState({ title: "", description: "", videoUrl: "", imageUrl: "", category: "music-videos", priority: 1, published: true });

  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({ name: "", quote: "", role: "" });

  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientForm, setClientForm] = useState({ name: "", logo: "", website: "" });

  const categories = [
    { id: "movies", label: "Movies" },
    { id: "music-videos", label: "Music Videos" },
    { id: "commercials", label: "Commercials" },
    { id: "documentaries", label: "Documentaries" },
    { id: "tv-shows", label: "TV Shows" },
  ];

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setFormData(createEmptyArticle());
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({ title: article.title, blocks: article.blocks, tags: article.tags, imageUrl: article.imageUrl, published: article.published });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingArticle) updateArticle(editingArticle._id, formData);
    else createArticle(formData);
    setIsDialogOpen(false);
    setFormData(createEmptyArticle());
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this article?")) deleteArticle(id);
  };

  const savePortfolio = () => {
    if (editingPortfolio) setPortfolioItems(prev => prev.map(p => p._id === editingPortfolio._id ? { ...p, ...portfolioForm } : p));
    else setPortfolioItems(prev => [...prev, { _id: crypto.randomUUID(), ...portfolioForm }]);
    setIsPortfolioDialogOpen(false);
  };

  const saveTestimonial = () => {
    if (editingTestimonial) setTestimonials(prev => prev.map(t => t._id === editingTestimonial._id ? { _id: t._id, ...testimonialForm } : t));
    else setTestimonials(prev => [...prev, { _id: crypto.randomUUID(), ...testimonialForm }]);
    setIsTestimonialDialogOpen(false);
  };

  const saveClient = () => {
    if (editingClient) setClients(prev => prev.map(c => c._id === editingClient._id ? { _id: c._id, ...clientForm } : c));
    else setClients(prev => [...prev, { _id: crypto.randomUUID(), ...clientForm }]);
    setIsClientDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b pb-2">
        <Button variant={activeTab === "portfolio" ? "default" : "ghost"} onClick={() => setActiveTab("portfolio")}>Portfolio</Button>
        <Button variant={activeTab === "articles" ? "default" : "ghost"} onClick={() => setActiveTab("articles")}>Articles</Button>
        <Button variant={activeTab === "testimonials" ? "default" : "ghost"} onClick={() => setActiveTab("testimonials")}>Testimonials</Button>
        <Button variant={activeTab === "clients" ? "default" : "ghost"} onClick={() => setActiveTab("clients")}>Clients</Button>
      </div>

      {activeTab === "portfolio" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Portfolio Items</h2>
            <Button onClick={() => { setEditingPortfolio(null); setPortfolioForm({ title: "", description: "", videoUrl: "", imageUrl: "", category: "music-videos", priority: 1, published: true }); setIsPortfolioDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />Add Item
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Video</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-16 h-12 object-cover rounded" />}</TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell><Badge variant="secondary">{categories.find(c => c.id === item.category)?.label}</Badge></TableCell>
                    <TableCell>{item.videoUrl ? <Video className="w-4 h-4 text-green-500" /> : <span className="text-muted-foreground">-</span>}</TableCell>
                    <TableCell><Badge variant={item.published ? "default" : "secondary"}>{item.published ? "Published" : "Draft"}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingPortfolio(item); setPortfolioForm(item); setIsPortfolioDialogOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setPortfolioItems(prev => prev.filter(p => p._id !== item._id))} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {activeTab === "articles" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Articles</h2>
            <Button onClick={handleOpenCreate}><Plus className="w-4 h-4 mr-2" />Add Article</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article._id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell><div className="flex flex-wrap gap-1">{article.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}</div></TableCell>
                    <TableCell><Badge variant={article.published ? "default" : "secondary"}>{article.published ? "Published" : "Draft"}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(article)}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(article._id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {activeTab === "testimonials" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Testimonials</h2>
            <Button onClick={() => { setEditingTestimonial(null); setTestimonialForm({ name: "", quote: "", role: "" }); setIsTestimonialDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Add</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{t.quote}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingTestimonial(t); setTestimonialForm(t); setIsTestimonialDialogOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setTestimonials(prev => prev.filter(x => x._id !== t._id))} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {activeTab === "clients" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Clients</h2>
            <Button onClick={() => { setEditingClient(null); setClientForm({ name: "", logo: "", website: "" }); setIsClientDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Add</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.logo && <img src={c.logo} alt={c.name} className="w-16 h-12 object-contain rounded" />}</TableCell>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.website || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingClient(c); setClientForm(c); setIsClientDialogOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setClients(prev => prev.filter(x => x._id !== c._id))} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Portfolio Dialog */}
      <Dialog open={isPortfolioDialogOpen} onOpenChange={setIsPortfolioDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingPortfolio ? "Edit Portfolio Item" : "Add Portfolio Item"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Title</Label><Input value={portfolioForm.title} onChange={e => setPortfolioForm({ ...portfolioForm, title: e.target.value })} placeholder="Project title" /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={portfolioForm.description} onChange={e => setPortfolioForm({ ...portfolioForm, description: e.target.value })} placeholder="Description" rows={3} /></div>
            <div className="space-y-2"><Label>Category</Label><select className="w-full border rounded px-3 py-2" value={portfolioForm.category} onChange={e => setPortfolioForm({ ...portfolioForm, category: e.target.value })}>{categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
            <div className="space-y-2"><Label>Video URL</Label><Input value={portfolioForm.videoUrl} onChange={e => setPortfolioForm({ ...portfolioForm, videoUrl: e.target.value })} placeholder="https://youtube.com/..." /></div>
            <div className="space-y-2"><Label>Cover Image</Label><ImageUpload value={portfolioForm.imageUrl} onChange={url => setPortfolioForm({ ...portfolioForm, imageUrl: url })} /></div>
            <div className="space-y-2"><Label>Priority</Label><Input type="number" value={portfolioForm.priority} onChange={e => setPortfolioForm({ ...portfolioForm, priority: parseInt(e.target.value) })} /></div>
            <div className="flex items-center gap-2"><Switch checked={portfolioForm.published} onCheckedChange={checked => setPortfolioForm({ ...portfolioForm, published: checked })} /><Label>Published</Label></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsPortfolioDialogOpen(false)}>Cancel</Button><Button onClick={savePortfolio} disabled={!portfolioForm.title}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonial Dialog */}
      <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Name</Label><Input value={testimonialForm.name} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="Client name" /></div>
            <div className="space-y-2"><Label>Role</Label><Input value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="CEO, Artist, etc." /></div>
            <div className="space-y-2"><Label>Quote</Label><Textarea value={testimonialForm.quote} onChange={e => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} placeholder="Testimonial quote" rows={4} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsTestimonialDialogOpen(false)}>Cancel</Button><Button onClick={saveTestimonial} disabled={!testimonialForm.name || !testimonialForm.quote}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Dialog */}
      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingClient ? "Edit Client" : "Add Client"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Client Name</Label><Input value={clientForm.name} onChange={e => setClientForm({ ...clientForm, name: e.target.value })} placeholder="Client/Brand name" /></div>
            <div className="space-y-2"><Label>Website</Label><Input value={clientForm.website} onChange={e => setClientForm({ ...clientForm, website: e.target.value })} placeholder="https://example.com" /></div>
            <div className="space-y-2"><Label>Logo</Label><ImageUpload value={clientForm.logo} onChange={url => setClientForm({ ...clientForm, logo: url })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsClientDialogOpen(false)}>Cancel</Button><Button onClick={saveClient} disabled={!clientForm.name}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Article Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingArticle ? "Edit Article" : "Create Article"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Article title" /></div>
            <div className="space-y-2"><Label>Cover Image</Label><ImageUpload value={formData.imageUrl || ""} onChange={url => setFormData({ ...formData, imageUrl: url })} /></div>
            <div className="space-y-2"><Label>Tags</Label><Input value={formData.tags.join(", ")} onChange={e => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })} placeholder="react, typescript" /></div>
            <div className="flex items-center gap-2"><Switch checked={formData.published} onCheckedChange={checked => setFormData({ ...formData, published: checked })} /><Label>Published</Label></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={handleSubmit} disabled={!formData.title}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleManager;
