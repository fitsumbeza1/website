import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { aboutProfile, aboutPageContent, createMessage } = useCMS();
  const { toast } = useToast();
  
  // Get social links and contact info from about profile
  const socialLinks = aboutProfile?.socialLinks || [];
  const emailLink = socialLinks.find(l => l.platform.toLowerCase().includes('email'))?.url || aboutPageContent?.contactEmail || 'fitsumbeza1@gmail.com';
  const instagramLink = socialLinks.find(l => l.platform.toLowerCase().includes('instagram'))?.url || 'https://instagram.com/fitsum_beza';
  const telegramLink = socialLinks.find(l => l.platform.toLowerCase().includes('telegram'))?.url || 'https://t.me/iboy12';
  const whatsappLink = socialLinks.find(l => l.platform.toLowerCase().includes('whatsapp'))?.url || 'https://wa.me/251921938039';
  const contactPhone = aboutPageContent?.contactPhone || '+251 921 938 039';
  const contactAddress = aboutPageContent?.contactAddress || 'Goro, Addis Ababa, Ethiopia';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createMessage(formData);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Let's create<br />
            <span className="text-gradient-ruby">together</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "company", label: "Company", type: "text" },
            ].map((field) => (
              <div key={field.id} className="group">
                <label htmlFor={field.id} className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required={field.id !== "company"}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                  className="w-full bg-transparent border-b border-border pb-3 text-foreground focus:outline-none focus:border-ruby transition-colors duration-500 placeholder:text-muted-foreground/50"
                  placeholder={`Your ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
            <div className="group">
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-border pb-3 text-foreground focus:outline-none focus:border-ruby transition-colors duration-500 placeholder:text-muted-foreground/50 resize-none"
                placeholder="Tell us about your project"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-mono text-sm uppercase tracking-widest border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-500 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Email</h4>
              <a href={`mailto:${emailLink}`} className="text-lg hover-color-ruby transition-colors">
                {emailLink}
              </a>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Phone</h4>
              <a href={whatsappLink} className="text-lg hover-color-ruby transition-colors">
                {contactPhone}
              </a>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Studio</h4>
              <p className="text-foreground/80">
                {contactAddress}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Follow</h4>
              <div className="flex gap-6">
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors line-reveal"
                >
                  Instagram
                </a>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors line-reveal"
                >
                  Telegram
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors line-reveal"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
