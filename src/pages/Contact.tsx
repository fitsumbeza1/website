import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/components/ui/use-toast";

const RECIPIENT_EMAIL = "fitsumbeza1@gmail.com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { aboutProfile, aboutPageContent } = useCMS();
  const { toast } = useToast();

  // Get social links and contact info from about profile
  const socialLinks = aboutProfile?.socialLinks || [];
  const emailLink = socialLinks.find(l => l.platform.toLowerCase().includes('email'))?.url || aboutPageContent?.contactEmail || 'fitsumbeza1@gmail.com';
  const instagramLink = socialLinks.find(l => l.platform.toLowerCase().includes('instagram'))?.url || 'https://instagram.com/fitsum_beza';
  const telegramLink = socialLinks.find(l => l.platform.toLowerCase().includes('telegram'))?.url || 'https://t.me/iboy12';
  const whatsappLink = socialLinks.find(l => l.platform.toLowerCase().includes('whatsapp'))?.url || 'https://wa.me/251921938039';
  const contactPhone = aboutPageContent?.contactPhone || '+251 921 938 039';
  const contactAddress = aboutPageContent?.contactAddress || 'Goro, Addis Ababa, Ethiopia';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `New message from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Opening your email app...",
        description: "Your message is ready to send to fitsumbeza1@gmail.com",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 500);
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

          {/* Contact Info below heading */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
              <a href="https://wa.me/251921938039" className="text-foreground hover:text-ruby transition-colors font-medium">
                +251 921 938 039
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <a href="mailto:fitsumbeza1@gmail.com" className="text-foreground hover:text-ruby transition-colors font-medium">
                fitsumbeza1@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Studio</span>
              <span className="text-foreground font-medium">Goro, Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Instagram</span>
              <a href="https://instagram.com/fitsum_beza" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ruby transition-colors font-medium">
                @fitsum_beza
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Telegram</span>
              <a href="https://t.me/iboy12" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ruby transition-colors font-medium">
                @iboy12
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">YouTube</span>
              <a href="https://www.youtube.com/@Ruby_Pictures" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-ruby transition-colors font-medium">
                @Ruby_Pictures
              </a>
            </div>
          </div>
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
              {isSubmitting ? "Opening Email..." : submitted ? "✓ Ready to Send" : "Send Message"}
            </button>
            {submitted && (
              <p className="font-mono text-xs text-muted-foreground">
                Your email app should have opened. If not, email us directly at{" "}
                <a href="mailto:fitsumbeza1@gmail.com" className="text-ruby underline">fitsumbeza1@gmail.com</a>
              </p>
            )}
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
