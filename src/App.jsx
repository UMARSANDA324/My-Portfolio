import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ExternalLink, 
  Code2, 
  Database, 
  GitBranch, 
  Zap, 
  CheckCircle2, 
  Send,
  Facebook,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import bestImg from './images/best.jpg';
import secondImg from './images/second.jpg';
import psImg from './images/ps.png';
import powerConfusionImg from './images/power_confusion.png';
import communityFrustrationImg from './images/community_frustration.png';
import powersenseTrackingImg from './images/powersense_tracking.png';
import organizedSystemImg from './images/organized_system.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a 
            href="#home" 
            className="text-xl font-semibold text-white"
            whileHover={{ scale: 1.02 }}
          >
            Umar Muhammad Muhammad
          </motion.a>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

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
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 relative bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* HERO IMAGE TOP AND CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8 relative"
        >
          <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56">
             <img 
               src={bestImg} 
               alt="Umar Muhammad Muhammad" 
               className="w-full h-full object-cover rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] border-4 border-primary/20"
             />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-white/10 mb-6"
          >
            <Zap size={16} className="text-accent" />
            <span className="text-gray-300 text-sm font-medium">Available for hire</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Hi, I'm <span className="text-primary">Umar</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 h-10">
            <span>I'm a </span>
            <span className="text-primary font-semibold">{text}</span>
            <span className="animate-pulse">|</span>
          </div>

          <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed text-lg">
            Building real-world solutions with modern technologies. Passionate about solving problems through software.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              <Code2 size={20} />
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-slate-800 hover:border-primary text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Contact Me
            </motion.a>
          </div>

          <div className="flex items-center gap-6 justify-center">
            <motion.a 
              href="https://github.com/UMARSANDA324" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#3b82f6' }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={28} />
            </motion.a>
            <motion.a 
              href="https://www.facebook.com/profile.php?id=100087472893474" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#3b82f6' }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={28} />
            </motion.a>
            <motion.a 
              href="mailto:um218194@gmail.com"
              whileHover={{ y: -5, color: '#3b82f6' }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={28} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#3b82f6' }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={28} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img 
                  src={secondImg} 
                  alt="About Umar" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                Passionate Developer & Problem Solver
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I am a passionate tech enthusiast and full stack developer focused on building real-world solutions. 
                I developed a platform called <span className="text-primary font-semibold">PowerSense</span> that helps users track electricity availability, report faults, and receive updates in real time.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                My goal is to become a problem solver through software, inspired by innovators who create meaningful change. I believe in creating technology that makes a genuine impact on people's lives.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="text-primary" size={20} />
                  <span>Kano State, Nigeria</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="text-primary" size={20} />
                  <span>um218194@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="text-primary" size={20} />
                  <span>09039133907</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'JavaScript', icon: Code2 },
    { name: 'Node.js', icon: Zap },
    { name: 'React', icon: Code2 },
    { name: 'MongoDB', icon: Database },
    { name: 'Firebase', icon: Zap },
    { name: 'Git', icon: GitBranch }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-slate-800 rounded-2xl p-8 text-center border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                  <skill.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            The <span className="text-primary">PowerSense</span> Story
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic">
            "We understand your daily struggles with electricity uncertainty. PowerSense was built to solve real problems in real communities."
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* BEFORE Section 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 font-semibold mb-4">
                <X size={16} /> The Problem
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Constant Uncertainty</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                People constantly faced confusion about power availability, never knowing when the electricity would return or be cut off, disrupting daily lives and businesses.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <img src={powerConfusionImg} alt="Power Confusion" className="w-full rounded-2xl shadow-2xl border border-white/10" />
            </motion.div>
          </div>

          {/* BEFORE Section 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={communityFrustrationImg} alt="Community Frustration" className="w-full rounded-2xl shadow-2xl border border-white/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 font-semibold mb-4">
                <X size={16} /> The Frustration
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Left in the Dark</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Communities were left feeling frustrated and powerless over the grid. Without reliable updates, planning for simple tasks became an impossible challenge.
              </p>
            </motion.div>
          </div>

          {/* AFTER Section 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold mb-4">
                <CheckCircle2 size={16} /> The Solution
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Real-Time Power Tracking</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                With PowerSense, users now receive instant updates on power status right on their devices. No more guessing—just clear, real-time tracking of the grid.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <img src={powersenseTrackingImg} alt="Real Time Tracking" className="w-full rounded-2xl shadow-2xl border border-white/10" />
            </motion.div>
          </div>

          {/* AFTER Section 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={organizedSystemImg} alt="Organized System" className="w-full rounded-2xl shadow-2xl border border-white/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold mb-4">
                <CheckCircle2 size={16} /> Community Impact
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">An Organized System</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A reliable, organized dashboard empowers communities to stay connected, plan their lives effectively, and bring order back to their daily routines.
              </p>
            </motion.div>
          </div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-background rounded-3xl p-10 border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Experience PowerSense</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            "We are always ready to build solutions that serve people better."
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://powersense-2.onrender.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary/25">
              <ExternalLink size={20} /> Live Demo
            </a>
            <a href="https://github.com/UMARSANDA324" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border-2 border-slate-800 hover:border-primary text-white rounded-lg font-semibold transition-all flex items-center gap-2">
              <Github size={20} /> View Code
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Umar',
        reply_to: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        'service_mrerrnl', 
        'template_lqc1kos', 
        templateParams,
        {
          publicKey: 'QbmMbjomx6fc_Fz1W',
        }
      );

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("FAILED...", error.text || error.message || error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
      setTimeout(() => setSubmitError(false), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Let's build <span className="text-primary">solutions</span> together
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-400">Contact me for collaboration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Email</h4>
                    <a href="mailto:um218194@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                      um218194@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Phone</h4>
                    <p className="text-gray-400">09039133907 / 09048166185</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">Location</h4>
                    <p className="text-gray-400">Kano State, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-semibold mb-4 text-white">Follow me</h4>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/UMARSANDA324"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/profile.php?id=100087472893474"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all"
                  >
                    <Facebook size={24} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all"
                  >
                    <Linkedin size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl p-8 border border-white/10 shadow-xl">
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/30 text-accent flex items-center gap-2"
                  >
                    <CheckCircle2 size={20} />
                    <span>Message sent successfully</span>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2"
                  >
                    <X size={20} />
                    <span>Failed to send message. Please try again.</span>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-white placeholder-gray-500"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 bg-slate-800 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="https://github.com/UMARSANDA324" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100087472893474" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="mailto:um218194@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Umar Muhammad Muhammad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
