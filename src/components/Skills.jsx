import { motion } from 'framer-motion';
import { Code2, Database, GitBranch, Zap, LayoutTemplate, Server } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const Skills = () => {
  const skills = [
    { name: 'JavaScript', icon: Code2, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { name: 'React & Vite', icon: LayoutTemplate, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Node.js', icon: Server, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'MongoDB', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Tailwind CSS', icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { name: 'Git & GitHub', icon: GitBranch, color: 'text-orange-500', bg: 'bg-orange-500/10' }
  ];

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
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 text-sm bg-primary/5">Expertise</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Tech Stack</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies I use to build scalable, high-performance applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 text-center bg-slate-800/80 backdrop-blur-sm border-white/5 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${skill.bg} ${skill.color}`}>
                  <skill.icon size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
