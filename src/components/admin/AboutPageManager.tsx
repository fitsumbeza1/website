import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { AboutPageContentFormData, createEmptyAboutPageContent, ImageLayout } from "@/types/cms";
import ImageUpload, { ImageDisplayOptions } from "./ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AboutPageManager = () => {
  const { getAboutPageContent, updateAboutPageContent } = useCMS();
  const rawAboutPageContent = getAboutPageContent();
  const aboutPageContent = rawAboutPageContent && Object.keys(rawAboutPageContent).length > 0 ? rawAboutPageContent : null;

  const [formData, setFormData] = useState<AboutPageContentFormData | null>(null);
  const [saved, setSaved] = useState(false);
  
  // Display options state for images
  const [aboutImageOptions, setAboutImageOptions] = useState<ImageDisplayOptions>({ objectFit: "cover", orientation: "landscape" });
  const [ceoImageOptions, setCeoImageOptions] = useState<ImageDisplayOptions>({ objectFit: "cover", orientation: "landscape" });
  const [aboutPhotosOptions, setAboutPhotosOptions] = useState<ImageDisplayOptions>({ objectFit: "cover", orientation: "landscape" });
  
  // Layout options state
  const [aboutLayout, setAboutLayout] = useState<ImageLayout>("side-by-side");
  const [ceoLayout, setCeoLayout] = useState<ImageLayout>("side-by-side");

  useEffect(() => {
    if (aboutPageContent) {
      setFormData({
        aboutTitle: aboutPageContent.aboutTitle,
        aboutContent: aboutPageContent.aboutContent,
        aboutImage: aboutPageContent.aboutImage,
        aboutImageObjectFit: aboutPageContent.aboutImageObjectFit || "cover",
        aboutImageOrientation: aboutPageContent.aboutImageOrientation || "landscape",
        ceoName: aboutPageContent.ceoName,
        ceoTitle: aboutPageContent.ceoTitle,
        ceoContent: aboutPageContent.ceoContent,
        ceoImage: aboutPageContent.ceoImage,
        ceoImageObjectFit: aboutPageContent.ceoImageObjectFit || "cover",
        ceoImageOrientation: aboutPageContent.ceoImageOrientation || "landscape",
        aboutPhotos: aboutPageContent.aboutPhotos,
        aboutPhotosObjectFit: aboutPageContent.aboutPhotosObjectFit || "cover",
        aboutPhotosOrientation: aboutPageContent.aboutPhotosOrientation || "landscape",
        mission: aboutPageContent.mission,
        stats: aboutPageContent.stats,
        services: aboutPageContent.services,
        contactEmail: aboutPageContent.contactEmail,
        contactPhone: aboutPageContent.contactPhone,
        contactAddress: aboutPageContent.contactAddress,
      });
      
      // Initialize display options from existing content
      setAboutImageOptions({ 
        objectFit: aboutPageContent.aboutImageObjectFit || "cover", 
        orientation: aboutPageContent.aboutImageOrientation || "landscape" 
      });
      setCeoImageOptions({ 
        objectFit: aboutPageContent.ceoImageObjectFit || "cover", 
        orientation: aboutPageContent.ceoImageOrientation || "landscape" 
      });
      setAboutPhotosOptions({ 
        objectFit: aboutPageContent.aboutPhotosObjectFit || "cover", 
        orientation: aboutPageContent.aboutPhotosOrientation || "landscape" 
      });
      
      // Initialize layout options
      setAboutLayout(aboutPageContent.aboutLayout || "side-by-side");
      setCeoLayout(aboutPageContent.ceoLayout || "side-by-side");
    } else {
      // Initialize with empty/default values when no content exists
      setFormData(createEmptyAboutPageContent());
    }
  }, [aboutPageContent]);

  const handleSave = () => {
    if (formData) {
      // Include all display options in the saved data
      const dataToSave = {
        ...formData,
        aboutImageObjectFit: aboutImageOptions.objectFit,
        aboutImageOrientation: aboutImageOptions.orientation,
        aboutLayout: aboutLayout,
        ceoImageObjectFit: ceoImageOptions.objectFit,
        ceoImageOrientation: ceoImageOptions.orientation,
        ceoLayout: ceoLayout,
        aboutPhotosObjectFit: aboutPhotosOptions.objectFit,
        aboutPhotosOrientation: aboutPhotosOptions.orientation,
      };
      updateAboutPageContent(dataToSave);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    if (formData) {
      const newStats = [...formData.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      setFormData({ ...formData, stats: newStats });
    }
  };

  const addStat = () => {
    if (formData) {
      setFormData({
        ...formData,
        stats: [...formData.stats, { label: "", value: "" }],
      });
    }
  };

  const removeStat = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        stats: formData.stats.filter((_, i) => i !== index),
      });
    }
  };

  const updateService = (index: number, field: 'title' | 'description', value: string) => {
    if (formData) {
      const newServices = [...formData.services];
      newServices[index] = { ...newServices[index], [field]: value };
      setFormData({ ...formData, services: newServices });
    }
  };

  const addService = () => {
    if (formData) {
      setFormData({
        ...formData,
        services: [...formData.services, { title: "", description: "" }],
      });
    }
  };

  const removeService = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        services: formData.services.filter((_, i) => i !== index),
      });
    }
  };

  const addAboutPhoto = (url: string) => {
    if (formData && url) {
      setFormData({
        ...formData,
        aboutPhotos: [...formData.aboutPhotos, url],
      });
    }
  };

  const removeAboutPhoto = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        aboutPhotos: formData.aboutPhotos.filter((_, i) => i !== index),
      });
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About Page Content</h2>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="ceo">CEO Section</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="info">Mission, Stats & Services</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card>
            <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>About Title</Label>
                <Input 
                  value={formData.aboutTitle} 
                  onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })} 
                  placeholder="About Us" 
                />
              </div>
              <div className="space-y-2">
                <Label>About Image</Label>
                <ImageUpload 
                  value={formData.aboutImage || ""} 
                  onChange={(url, displayOptions) => {
                    setFormData({ ...formData, aboutImage: url });
                    if (displayOptions) {
                      setAboutImageOptions(displayOptions);
                    }
                  }} 
                  showDisplayOptions
                />
                <p className="text-xs text-muted-foreground">
                  Choose how the image should be displayed: Cover (fills area), Contain (shows full image), or set orientation (Landscape, Portrait, Square)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Layout</Label>
                <Select 
                  value={aboutLayout} 
                  onValueChange={(value: ImageLayout) => setAboutLayout(value)}
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
                <Label>About Content</Label>
                <Textarea 
                  value={formData.aboutContent} 
                  onChange={(e) => setFormData({ ...formData, aboutContent: e.target.value })} 
                  placeholder="Tell us about your company..." 
                  rows={8} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ceo">
          <Card>
            <CardHeader><CardTitle>CEO/Founder Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CEO Name</Label>
                  <Input 
                    value={formData.ceoName} 
                    onChange={(e) => setFormData({ ...formData, ceoName: e.target.value })} 
                    placeholder="Fitsum Beza" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>CEO Title</Label>
                  <Input 
                    value={formData.ceoTitle} 
                    onChange={(e) => setFormData({ ...formData, ceoTitle: e.target.value })} 
                    placeholder="Founder & CEO" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>CEO Image</Label>
                <ImageUpload 
                  value={formData.ceoImage || ""} 
                  onChange={(url, displayOptions) => {
                    setFormData({ ...formData, ceoImage: url });
                    if (displayOptions) {
                      setCeoImageOptions(displayOptions);
                    }
                  }} 
                  showDisplayOptions
                />
                <p className="text-xs text-muted-foreground">
                  Choose how the image should be displayed: Cover (fills area), Contain (shows full image), or set orientation (Landscape, Portrait, Square)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Layout</Label>
                <Select 
                  value={ceoLayout} 
                  onValueChange={(value: ImageLayout) => setCeoLayout(value)}
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
                <Label>CEO Bio/Content</Label>
                <Textarea 
                  value={formData.ceoContent} 
                  onChange={(e) => setFormData({ ...formData, ceoContent: e.target.value })} 
                  placeholder="Tell us about the founder..." 
                  rows={8} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader><CardTitle>About Photos Gallery</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Gallery Display Options</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Choose how all photos in the gallery should be displayed
                </p>
              </div>
              <div className="space-y-2">
                <Label>Add New Photo</Label>
                <div className="flex gap-2">
                  <ImageUpload 
                    value="" 
                    onChange={(url) => {
                      if (url) addAboutPhoto(url);
                    }} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.aboutPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img src={photo} alt={`About photo ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeAboutPhoto(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {formData.aboutPhotos.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No photos added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info">
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={formData.mission} 
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })} 
                placeholder="Your mission statement..." 
                rows={3} 
              />
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Stats</CardTitle>
              <Button size="sm" onClick={addStat}><Plus className="w-4 h-4 mr-2" />Add Stat</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.stats.map((stat, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input 
                    value={stat.label} 
                    onChange={(e) => updateStat(index, 'label', e.target.value)} 
                    placeholder="Label (e.g., Projects Completed)" 
                    className="flex-1" 
                  />
                  <Input 
                    value={stat.value} 
                    onChange={(e) => updateStat(index, 'value', e.target.value)} 
                    placeholder="Value (e.g., 50+)" 
                    className="w-32" 
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeStat(index)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {formData.stats.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No stats added yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Services</CardTitle>
              <Button size="sm" onClick={addService}><Plus className="w-4 h-4 mr-2" />Add Service</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Service {index + 1}</h4>
                    <Button variant="ghost" size="icon" onClick={() => removeService(index)} className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input 
                    value={service.title} 
                    onChange={(e) => updateService(index, 'title', e.target.value)} 
                    placeholder="Service title (e.g., Feature Films)" 
                  />
                  <Textarea 
                    value={service.description} 
                    onChange={(e) => updateService(index, 'description', e.target.value)} 
                    placeholder="Service description..." 
                    rows={2} 
                  />
                </div>
              ))}
              {formData.services.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No services added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  value={formData.contactEmail} 
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} 
                  placeholder="rubypictures.ethiopia@gmail.com" 
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input 
                  value={formData.contactPhone} 
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} 
                  placeholder="+251 912 345 678" 
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input 
                  value={formData.contactAddress} 
                  onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })} 
                  placeholder="Goro, Addis Ababa, Ethiopia" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutPageManager;
