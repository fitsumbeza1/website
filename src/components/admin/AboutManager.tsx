import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, Linkedin, Github, Twitter, Globe, Mail } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { AboutFormData, Skill, Experience, Education, SocialLink } from "@/types/cms";
import ImageUpload from "./ImageUpload";

const AboutManager = () => {
  const { getAbout, updateAbout } = useCMS();
  const about = getAbout();

  const [formData, setFormData] = useState<AboutFormData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (about) {
      setFormData({
        name: about.name,
        title: about.title,
        bio: about.bio,
        avatar: about.avatar,
        skills: about.skills,
        experience: about.experience.map(({ _id, ...rest }) => rest),
        education: about.education.map(({ _id, ...rest }) => rest),
        socialLinks: about.socialLinks,
      });
    }
  }, [about]);

  const handleSave = () => {
    if (formData) {
      updateAbout(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const addSkill = () => {
    if (formData) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: "", category: "other" }],
      });
    }
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    if (formData) {
      const newSkills = [...formData.skills];
      newSkills[index] = { ...newSkills[index], [field]: value };
      setFormData({ ...formData, skills: newSkills });
    }
  };

  const removeSkill = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        skills: formData.skills.filter((_, i) => i !== index),
      });
    }
  };

  const addExperience = () => {
    if (formData) {
      setFormData({
        ...formData,
        experience: [
          ...formData.experience,
          { company: "", position: "", startDate: "", endDate: "", current: false, description: "" },
        ],
      });
    }
  };

  const updateExperience = (index: number, field: keyof Omit<Experience, "_id">, value: string | boolean) => {
    if (formData) {
      const newExp = [...formData.experience];
      newExp[index] = { ...newExp[index], [field]: value };
      setFormData({ ...formData, experience: newExp });
    }
  };

  const removeExperience = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        experience: formData.experience.filter((_, i) => i !== index),
      });
    }
  };

  const addEducation = () => {
    if (formData) {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          { institution: "", degree: "", field: "", startDate: "", endDate: "" },
        ],
      });
    }
  };

  const updateEducation = (index: number, field: keyof Omit<Education, "_id">, value: string) => {
    if (formData) {
      const newEdu = [...formData.education];
      newEdu[index] = { ...newEdu[index], [field]: value };
      setFormData({ ...formData, education: newEdu });
    }
  };

  const removeEducationEntry = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        education: formData.education.filter((_, i) => i !== index),
      });
    }
  };

  const addSocialLink = () => {
    if (formData) {
      setFormData({
        ...formData,
        socialLinks: [...formData.socialLinks, { platform: "", url: "" }],
      });
    }
  };

  const updateSocialLinkEntry = (index: number, field: keyof SocialLink, value: string) => {
    if (formData) {
      const newLinks = [...formData.socialLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      setFormData({ ...formData, socialLinks: newLinks });
    }
  };

  const removeSocialLinkEntry = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        socialLinks: formData.socialLinks.filter((_, i) => i !== index),
      });
    }
  };

  const getSocialIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes("github")) return <Github className="w-4 h-4" />;
    if (lower.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
    if (lower.includes("twitter") || lower.includes("x")) return <Twitter className="w-4 h-4" />;
    if (lower.includes("email") || lower.includes("mail")) return <Mail className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About & Profile</h2>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Avatar</Label>
                <ImageUpload value={formData.avatar || ""} onChange={(url) => setFormData({ ...formData, avatar: url })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Your professional title" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell us about yourself..." rows={6} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button size="sm" onClick={addSkill}><Plus className="w-4 h-4 mr-2" />Add Skill</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input value={skill.name} onChange={(e) => updateSkill(index, "name", e.target.value)} placeholder="Skill name" className="flex-1" />
                    <Select value={skill.category} onValueChange={(value) => updateSkill(index, "category", value)}>
                      <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="tools">Tools</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => removeSkill(index)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {formData.skills.length === 0 && <p className="text-center text-muted-foreground py-4">No skills added yet.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button size="sm" onClick={addExperience}><Plus className="w-4 h-4 mr-2" />Add Experience</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    <Button variant="ghost" size="icon" onClick={() => removeExperience(index)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} placeholder="Company" />
                    <Input value={exp.position} onChange={(e) => updateExperience(index, "position", e.target.value)} placeholder="Position" />
                    <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} placeholder="Start Date" />
                    <Input type="month" value={exp.endDate || ""} onChange={(e) => updateExperience(index, "endDate", e.target.value)} placeholder="End Date" disabled={exp.current} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(index, "current", e.target.checked)} id={`current-${index}`} />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                  </div>
                  <Textarea value={exp.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} placeholder="Description (optional)" rows={2} />
                </div>
              ))}
              {formData.experience.length === 0 && <p className="text-center text-muted-foreground py-4">No experience added yet.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button size="sm" onClick={addEducation}><Plus className="w-4 h-4 mr-2" />Add Education</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    <Button variant="ghost" size="icon" onClick={() => removeEducationEntry(index)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={edu.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} placeholder="Institution" />
                    <Input value={edu.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} placeholder="Degree" />
                    <Input value={edu.field} onChange={(e) => updateEducation(index, "field", e.target.value)} placeholder="Field of Study" />
                    <Input type="month" value={edu.startDate} onChange={(e) => updateEducation(index, "startDate", e.target.value)} placeholder="Start Date" />
                  </div>
                  <Input type="month" value={edu.endDate || ""} onChange={(e) => updateEducation(index, "endDate", e.target.value)} placeholder="End Date" />
                </div>
              ))}
              {formData.education.length === 0 && <p className="text-center text-muted-foreground py-4">No education added yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Social Links</CardTitle>
              <Button size="sm" onClick={addSocialLink}><Plus className="w-4 h-4 mr-2" />Add Link</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="w-10 flex items-center justify-center text-muted-foreground">{getSocialIcon(link.platform)}</div>
                  <Input value={link.platform} onChange={(e) => updateSocialLinkEntry(index, "platform", e.target.value)} placeholder="Platform (e.g., GitHub)" className="flex-1" />
                  <Input value={link.url} onChange={(e) => updateSocialLinkEntry(index, "url", e.target.value)} placeholder="URL" className="flex-1" />
                  <Button variant="ghost" size="icon" onClick={() => removeSocialLinkEntry(index)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {formData.socialLinks.length === 0 && <p className="text-center text-muted-foreground py-4">No social links added yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutManager;
