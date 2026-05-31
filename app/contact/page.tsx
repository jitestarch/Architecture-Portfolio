'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-16"
        >
          <div>
            <h1 className="text-6xl md:text-[84px] leading-[0.85] font-light tracking-tighter mb-6 uppercase">
              Contact
            </h1>
            <p className="text-xl text-gray-600 font-light">
              For new project inquiries or commissions.
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Studio</h4>
              <p className="text-lg font-light">123 Architecture Blvd<br/>New York, NY 10001</p>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Inquiries</h4>
              <a href="mailto:hello@studio.com" className="text-lg font-light hover:text-[#2563EB] transition-colors">hello@studio.com</a><br />
              <a href="tel:+12125550199" className="text-lg font-light hover:text-[#2563EB] transition-colors">+1 (212) 555-0199</a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 bg-[#FAFAFA] p-8 md:p-12"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-24">
              <h3 className="text-2xl font-light tracking-tighter">Message received.</h3>
              <p className="text-gray-600 font-light">We'll get back to you within 24 hours.</p>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8">
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  required 
                  className="w-full bg-transparent border-b border-[#111111]/20 py-3 focus:outline-none focus:border-[#111111] transition-colors rounded-none placeholder:text-[#111111]/30"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  required 
                  className="w-full bg-transparent border-b border-[#111111]/20 py-3 focus:outline-none focus:border-[#111111] transition-colors rounded-none placeholder:text-[#111111]/30"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  required 
                  rows={4}
                  className="w-full bg-transparent border-b border-[#111111]/20 py-3 focus:outline-none focus:border-[#111111] transition-colors rounded-none resize-none placeholder:text-[#111111]/30"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
