import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useCMS } from "@/contexts/CMSContext";

const logoUrl = "https://res.cloudinary.com/dhb7y3wk3/image/upload/v1770913043/ruby_black-01_auqws2.png";

const Footer = () => {
  const { theme } = useTheme();
  const { aboutProfile, aboutPageContent, getClients } = useCMS();
  const clientsData = getClients();
  
  // Get social links from about profile
  const socialLinks = aboutProfile?.socialLinks || [];
  const emailLink = socialLinks.find(l => l.platform.toLowerCase().includes('email'))?.url || aboutPageContent?.contactEmail || 'fitsumbeza1@gmail.com';
  const instagramLink = socialLinks.find(l => l.platform.toLowerCase().includes('instagram'))?.url || 'https://instagram.com/fitsum_beza';
  const telegramLink = socialLinks.find(l => l.platform.toLowerCase().includes('telegram'))?.url || 'https://t.me/iboy12';
  const whatsappLink = socialLinks.find(l => l.platform.toLowerCase().includes('whatsapp'))?.url || 'https://wa.me/251921938039';
  const contactAddress = aboutPageContent?.contactAddress || 'Goro, Addis Ababa, Ethiopia';

  return (
    <footer className="border-t border-border">
      {/* Clients Section */}
      {clientsData.length > 0 && (
        <div className="px-6 md:px-12 py-20 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Trusted By</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter mb-12">Our Clients</h2>
            <div className="flex flex-wrap gap-10 items-center">
              {clientsData.map((client, i) => (
                <motion.a
                  key={client._id}
                  href={client.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex flex-col items-center gap-3"
                >
                  {client.logo ? (
                    <div className={`w-32 h-20 flex items-center justify-center overflow-hidden rounded-lg p-3 ${client.name === 'Cadceed Studio' ? 'bg-black' : 'bg-secondary/30'}`}>
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  ) : (
                    <span className="font-display text-xl font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                      {client.name}
                    </span>
                  )}
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                    {client.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src={logoUrl} 
                alt="Ruby Pictures Logo" 
                className={`h-10 ${theme === 'dark' ? 'invert brightness-0 brightness-200' : ''}`} 
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Shine Your Own Light. Crafting visual stories that move people. Based in Addis Ababa, working worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Work", path: "/work" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors line-reveal w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${emailLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors line-reveal w-fit"
              >
                Email
              </a>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors line-reveal w-fit"
              >
                Instagram
              </a>
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors line-reveal w-fit"
              >
                Telegram
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors line-reveal w-fit"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground font-mono">
              © 2024 Ruby Pictures. All rights reserved.
            </p>
            <Link 
              to="/admin" 
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground font-mono transition-colors"
            >
              Admin
            </Link>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            {contactAddress}
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
