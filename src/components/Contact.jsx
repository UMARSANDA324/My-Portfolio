import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

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
        { publicKey: 'QbmMbjomx6fc_Fz1W' }
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
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1 text-sm bg-primary/5">Get In Touch</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
            Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">solutions</span> together
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
              <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
              <div className="space-y-8">
                {[
                  { icon: Mail, title: 'Email', text: 'um218194@gmail.com', link: 'mailto:um218194@gmail.com' },
                  { icon: Phone, title: 'Phone', text: '09039133907', link: 'tel:09039133907' },
                  { icon: MapPin, title: 'Location', text: 'Kano State, Nigeria', link: null }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">{item.title}</h4>
                      {item.link ? (
                        <a href={item.link} className="text-lg text-white hover:text-primary transition-colors font-medium">
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-lg text-white font-medium">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-800/80 backdrop-blur-sm border-white/5 shadow-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold mb-8 text-white">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitSuccess && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                    <CheckCircle2 size={20} />
                    <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                    <X size={20} />
                    <span className="font-medium">Failed to send message. Please try again.</span>
                  </motion.div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500 h-14" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500 h-14" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell me about your project..." className="bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500 min-h-[160px] text-base p-4" />
                </div>

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
