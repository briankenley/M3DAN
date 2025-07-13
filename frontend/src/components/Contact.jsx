import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { studioInfo } from '../data/mockModels';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: studioInfo.contact.email,
      href: `mailto:${studioInfo.contact.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: studioInfo.contact.phone,
      href: `tel:${studioInfo.contact.phone}`
    },
    {
      icon: MapPin,
      label: 'Address',
      value: studioInfo.contact.address,
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next 3D project and create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Start Your Project</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-400"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Company</label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-black/50 border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-400"
                      placeholder="Your company name (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Project Details *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-black/50 border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-400 resize-none"
                      placeholder="Tell us about your project, timeline, and vision..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-300 group block"
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{info.label}</h4>
                        <p className="text-gray-300">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-300 mb-6">
                    We offer free consultations to discuss your project requirements and provide expert guidance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 px-6 py-3"
                      onClick={() => window.open(`mailto:${studioInfo.contact.email}`)}
                    >
                      Schedule Consultation
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3"
                      onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      View More Work
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;