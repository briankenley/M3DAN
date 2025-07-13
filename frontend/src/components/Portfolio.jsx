import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Model3D from './Model3D';
import { mockModels } from '../data/mockModels';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModel, setSelectedModel] = useState(null);

  const categories = ['All', 'Character', 'Product'];
  
  const filteredModels = selectedCategory === 'All' 
    ? mockModels 
    : mockModels.filter(model => model.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of 3D masterpieces, each crafted with precision and artistic vision
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-2 bg-black/50 p-2 rounded-full border border-yellow-500/20">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "ghost"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                    : 'text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {filteredModels.map((model) => (
            <motion.div key={model.id} variants={item}>
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 overflow-hidden hover:border-yellow-400/40 transition-all duration-300 group">
                <CardContent className="p-0">
                  {/* 3D Model Viewer */}
                  <div className="relative">
                    <Model3D 
                      modelUrl={model.modelUrl}
                      height="300px"
                      showControls={true}
                      autoRotate={false}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {model.featured && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Model Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white">{model.title}</h3>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                        {model.category}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">{model.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {model.animations.slice(0, 3).map((animation, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30"
                        >
                          {animation}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => setSelectedModel(model)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Model Detail Modal */}
        {selectedModel && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedModel(null)}
          >
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <Model3D 
                    modelUrl={selectedModel.modelUrl}
                    height="400px"
                    showControls={true}
                    autoRotate={true}
                    title={selectedModel.title}
                  />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedModel.title}</h3>
                  <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                    {selectedModel.category}
                  </Badge>
                  
                  <p className="text-gray-300 text-lg mb-6">{selectedModel.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-yellow-400 mb-3">Available Animations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.animations.map((animation, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="border-yellow-400 text-yellow-400"
                        >
                          {animation}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedModel(null)}
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;