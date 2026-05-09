import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import secondImg from '../images/second.jpg';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

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
                { icon: WhatsAppIcon, text: '09039133907', label: 'WhatsApp' },
                { icon: Phone, text: '09048166185', label: 'Phone' }
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
