import React from 'react';
import { motion } from 'framer-motion';
import { studioInfo } from '../data/mockModels';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">M3DAN Studio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {studioInfo.tagline}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Studio Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Our Story</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {studioInfo.description}
                </p>
                
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xl">5+</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Years of Experience</h4>
                      <p className="text-gray-400">Creating stunning 3D content</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xl">100+</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Projects Completed</h4>
                      <p className="text-gray-400">Across various industries</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xl">50+</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Happy Clients</h4>
                      <p className="text-gray-400">From startups to enterprises</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Our Services</h3>
                
                <motion.div 
                  className="space-y-4"
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {studioInfo.services.map((service, index) => (
                    <motion.div 
                      key={index}
                      variants={item}
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-white font-medium text-lg">{service}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="mt-8 p-6 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-lg border border-yellow-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-semibold text-yellow-400 mb-3">Ready to Start Your Project?</h4>
                  <p className="text-gray-300 mb-4">
                    Let's bring your vision to life with cutting-edge 3D animation and modeling.
                  </p>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2">
                    Free Consultation Available
                  </Badge>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;