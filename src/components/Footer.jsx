import { Github, Facebook, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Umar Muhammad</h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Full Stack Developer crafting premium digital experiences and solving real-world problems.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/UMARSANDA324" },
              { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087472893474" },
              { icon: Mail, href: "mailto:um218194@gmail.com" },
              { icon: Linkedin, href: "https://linkedin.com" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Umar Muhammad. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
