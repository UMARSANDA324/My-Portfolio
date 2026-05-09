import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import secondImg from '../images/second.jpg';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 text-sm bg-primary/5">Who I Am</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-600 rounded-2xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
            <Card className="relative rounded-2xl overflow-hidden border-white/10 shadow-2xl p-2 bg-slate-800">
              <img 
                src={secondImg} 
                alt="About Umar" 
                className="w-full h-auto object-cover rounded-xl"
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white leading-tight">
              Passionate Developer & <br/> Problem Solver
            </h3>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-10">
              <p>
                I am a passionate tech enthusiast and full stack developer focused on building real-world solutions. 
                I developed a platform called <span className="text-primary font-bold">PowerSense</span> that helps users track electricity availability, report faults, and receive updates in real time.
              </p>
              <p>
                My goal is to become a problem solver through software, inspired by innovators who create meaningful change. I believe in creating technology that makes a genuine impact on people's lives and empowering businesses like <span className="text-primary font-bold">AHASAS Construction</span> to thrive digitally.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, text: 'Kano State, Nigeria', label: 'Location' },
                { icon: Mail, text: 'um218194@gmail.com', label: 'Email' },
                { icon: Phone, text: '09039133907', label: 'Phone' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">{item.label}</p>
                    <p className="text-gray-200 font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
