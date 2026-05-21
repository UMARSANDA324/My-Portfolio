import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Mail, Github, Linkedin, Facebook, Zap } from 'lucide-react';
import bestImg from '../images/best.jpg';
import { Button } from './ui/button';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ['Full Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'PowerSense Creator'];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-background">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/10 blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-10 relative"
        >
          <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 group">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
             <img 
               src={bestImg} 
               alt="Umar Muhammad Muhammad" 
               className="relative w-full h-full object-cover rounded-full border-4 border-slate-800/80 shadow-2xl transition-transform duration-500 group-hover:scale-105"
             />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/10 mb-8 shadow-lg"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            </span>
            <span className="text-gray-200 text-sm font-medium tracking-wide">Available for hire</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Umar</span>
          </h1>
          
          <div className="text-xl md:text-3xl text-gray-300 mb-8 h-10 font-medium">
            <span>I'm a </span>
            <span className="text-white font-bold">{text}</span>
            <span className="animate-pulse text-primary ml-1">|</span>
          </div>

          <p className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed text-lg md:text-xl">
            Building real-world solutions with modern technologies. Passionate about solving problems through scalable software and beautiful interfaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center w-full sm:w-auto">
            <Button size="lg" asChild className="rounded-full shadow-xl shadow-primary/20 text-md px-8">
              <a href="#projects">
                <Code2 className="mr-2 h-5 w-5" />
                View Projects
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full bg-transparent border-white/20 hover:bg-white/5 text-md px-8 text-white">
              <a href="#contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </a>
            </Button>
            <Button size="lg" asChild className="rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white shadow-xl shadow-[#25D366]/20 text-md px-8">
              <a href="https://wa.me/2349039133907?text=Hello%20Umar,%20I%20want%20to%20work%20with%20you" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={20} className="mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-6 justify-center">
            {[
              { icon: Github, href: "https://github.com/UMARSANDA324" },
              { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087472893474" },
              { icon: Mail, href: "mailto:um218194@gmail.com" },
              { icon: Linkedin, href: "https://linkedin.com" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-slate-800/50 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all shadow-lg"
              >
                <social.icon size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
