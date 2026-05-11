import { motion } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, X } from 'lucide-react';
import powerConfusionImg from '../images/power_confusion.png';
import communityFrustrationImg from '../images/community_frustration.png';
import powersenseTrackingImg from '../images/powersense_tracking.png';
import organizedSystemImg from '../images/organized_system.png';
import ahasasMockupImg from '../images/ahasas_mockup.png';
import autaTajiriMockupImg from '../images/auta_tajiri_mockup.png';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 text-sm bg-primary/5">Portfolio</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, highlighting problem-solving, modern UI design, and full-stack development.
          </p>
        </motion.div>

        {/* AHASAS CONSTRUCTION VENTURES LIMITED - NEW PREMIUM PROJECT */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-2">Enterprise Client Work</h3>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-white/5 shadow-2xl overflow-hidden group mb-12">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden bg-slate-900 flex items-center justify-center p-8 lg:p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={ahasasMockupImg} 
                  alt="AHASAS Construction Ventures Limited" 
                  className="w-full h-auto rounded-xl shadow-2xl relative z-10 border border-white/10"
                />
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 mb-4 border-blue-500/20">Corporate Construction</Badge>
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">AHASAS Construction Ventures Limited</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    A premium, real-world corporate website engineered for a leading Nigerian construction and infrastructure company. Designed to showcase multi-million dollar projects, attract high-end clients, and build trust through a modern digital presence. Features include a dynamic portfolio, animated sections, and mobile-first architecture.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'EmailJS'].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-700/50 text-slate-300 border-white/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-auto">
                  <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                    <a href="http://ahasasconstructionventureslimited.com.ng" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" /> Live Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* AUTA TAJIRI - REAL ESTATE PROJECT */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-white/5 shadow-2xl overflow-hidden group">
            <div className="grid lg:grid-cols-2 gap-0">
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="mb-6">
                  <Badge className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 mb-4 border-amber-500/20">Real Estate & Property</Badge>
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">Auta Tajiri Real Estate</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    A modern real estate platform designed for Abdulshahid Abdullahi ("Auta Tajiri"). This premium digital identity focuses on high-ticket land sales, house acquisitions, and property rentals in Kano State, Nigeria. Built to build trust and showcase years of industry expertise through a world-class user experience.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-700/50 text-slate-300 border-white/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 bg-amber-600 hover:bg-amber-700 text-white border-none">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-slate-800 border-white/10 hover:bg-slate-700 text-white">
                    <a href="https://github.com/UMARSANDA324" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" /> GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
              <div className="relative overflow-hidden bg-slate-900 flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-50"></div>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={autaTajiriMockupImg} 
                  alt="Auta Tajiri Real Estate" 
                  className="w-full h-auto rounded-xl shadow-2xl relative z-10 border border-white/10"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* POWERSENSE SHOWCASE */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold mb-4 text-white">
              The <span className="text-primary">PowerSense</span> Story
            </h3>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
              "We understand your daily struggles with electricity uncertainty. PowerSense was built to solve real problems in real communities."
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* BEFORE Section 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1"
              >
                <Badge variant="destructive" className="mb-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20">
                  <X size={14} className="mr-1" /> The Problem
                </Badge>
                <h4 className="text-3xl font-bold mb-4 text-white">Constant Uncertainty</h4>
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
                <img src={powerConfusionImg} alt="Power Confusion" className="w-full rounded-2xl shadow-2xl border border-white/10 hover:border-primary/50 transition-colors duration-500" />
              </motion.div>
            </div>

            {/* AFTER Section 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={powersenseTrackingImg} alt="Real Time Tracking" className="w-full rounded-2xl shadow-2xl border border-white/10 hover:border-accent/50 transition-colors duration-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">
                  <CheckCircle2 size={14} className="mr-1" /> The Solution
                </Badge>
                <h4 className="text-3xl font-bold mb-4 text-white">Real-Time Power Tracking</h4>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  With PowerSense, users now receive instant updates on power status right on their devices. No more guessing—just clear, real-time tracking of the grid.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-slate-700/50 text-slate-300 border-white/5">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
                    <a href="https://powersense-2.onrender.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full bg-slate-800 border-white/10 hover:bg-slate-700 text-white">
                    <a href="https://github.com/UMARSANDA324" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Source
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
