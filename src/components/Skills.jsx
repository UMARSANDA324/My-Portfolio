import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  GitBranch, 
  Zap, 
  LayoutTemplate, 
  Server, 
  Cpu, 
  Workflow, 
  Brain, 
  Sparkles, 
  Globe, 
  Mail, 
  Key, 
  Terminal, 
  Layers, 
  Lock, 
  Clock, 
  Compass, 
  Laptop, 
  Smartphone,
  Braces,
  FileJson,
  FileText
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('ai');

  const tabs = [
    { id: 'ai', name: 'AI / Scripting', icon: Cpu },
    { id: 'languages', name: 'Languages', icon: Code2 },
    { id: 'backend', name: 'Backend', icon: Server },
    { id: 'frontend', name: 'Frontend', icon: LayoutTemplate }
  ];

  const skillsData = {
    ai: [
      { name: 'AI Integration', icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { name: 'Prompt Engineering', icon: Brain, color: 'text-pink-400', bg: 'bg-pink-400/10' },
      { name: 'Automation', icon: Workflow, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
      { name: 'Gemini API Integration', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-400/10' },
      { name: 'REST APIs', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { name: 'Email Automation', icon: Mail, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
      { name: 'OTP Workflow Systems', icon: Key, color: 'text-orange-400', bg: 'bg-orange-400/10' },
      { name: 'Node.js Scripting', icon: Terminal, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
      { name: 'API Integration', icon: Layers, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
      { name: 'Git & GitHub', icon: GitBranch, color: 'text-rose-400', bg: 'bg-rose-400/10' }
    ],
    languages: [
      { name: 'JavaScript', icon: Code2, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
      { name: 'HTML5', icon: Code2, color: 'text-orange-400', bg: 'bg-orange-400/10' },
      { name: 'CSS3', icon: LayoutTemplate, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { name: 'JSON', icon: FileJson, color: 'text-green-400', bg: 'bg-green-400/10' },
      { name: 'YAML', icon: FileText, color: 'text-pink-400', bg: 'bg-pink-400/10' }
    ],
    backend: [
      { name: 'Node.js', icon: Server, color: 'text-green-500', bg: 'bg-green-500/10' },
      { name: 'Express.js', icon: Zap, color: 'text-gray-400', bg: 'bg-gray-400/10' },
      { name: 'MongoDB', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
      { name: 'Firebase', icon: Sparkles, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
      { name: 'JWT Authentication', icon: Lock, color: 'text-red-400', bg: 'bg-red-400/10' },
      { name: 'Mongoose', icon: Database, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
      { name: 'Nodemailer', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { name: 'bcrypt', icon: Lock, color: 'text-teal-400', bg: 'bg-teal-400/10' },
      { name: 'dotenv', icon: Key, color: 'text-lime-400', bg: 'bg-lime-400/10' },
      { name: 'node-cron', icon: Clock, color: 'text-violet-400', bg: 'bg-violet-400/10' },
      { name: 'REST API Development', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-400/10' }
    ],
    frontend: [
      { name: 'React.js', icon: LayoutTemplate, color: 'text-blue-400', bg: 'bg-blue-400/10' },
      { name: 'Vite', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10' },
      { name: 'TailwindCSS', icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
      { name: 'shadcn/ui', icon: Layers, color: 'text-teal-400', bg: 'bg-teal-400/10' },
      { name: 'Zustand', icon: Database, color: 'text-amber-400', bg: 'bg-amber-400/10' },
      { name: 'React Router', icon: Compass, color: 'text-red-400', bg: 'bg-red-400/10' },
      { name: 'Framer Motion', icon: Sparkles, color: 'text-pink-400', bg: 'bg-pink-400/10' },
      { name: 'Responsive Design', icon: Laptop, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
      { name: 'Modern UI/UX', icon: Sparkles, color: 'text-amber-300', bg: 'bg-amber-300/10' },
      { name: 'Glassmorphism', icon: Layers, color: 'text-blue-300', bg: 'bg-blue-300/10' },
      { name: 'Mobile-first Design', icon: Smartphone, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
    ]
  };

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 text-sm bg-primary/5 tracking-wider font-semibold">
            EXPERTISE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Skills</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            A comprehensive, categorized overview of my technical capabilities spanning AI, frontend, backend, and core languages.
          </p>
        </motion.div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/50 border border-white/5 shadow-sm backdrop-blur-md flex-wrap justify-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 select-none ${
                    isActive 
                      ? 'text-white font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-xl z-0"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"} />
                    {tab.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Cards Grid with transition animation */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {skillsData[activeTab].map((skill, idx) => {
                const SkillIcon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                  >
                    <Card className="p-4 sm:p-6 bg-slate-800/80 hover:bg-slate-800/90 border border-white/5 hover:border-primary/50 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/20 flex items-center gap-3 sm:gap-4 overflow-hidden">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${skill.bg} ${skill.color}`}>
                        <SkillIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-gray-200 group-hover:text-white transition-colors duration-300 break-words whitespace-normal flex-1 leading-tight">
                        {skill.name}
                      </span>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
