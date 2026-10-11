'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, CheckCircle2, Loader2, Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { FEATURED_PROJECTS } from '@/data/projects';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
}

function EnquiryDialogContent({
  onClose,
  preselectedProject,
}: {
  onClose: () => void;
  preselectedProject?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyInterest: preselectedProject || FEATURED_PROJECTS[0]?.name || '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      const ref = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(ref);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      propertyInterest: FEATURED_PROJECTS[0]?.name || '',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.96, y: 25 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-neutral-100"
      >
        <button
          onClick={onClose}
          aria-label="Close enquiry modal"
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-3xl sm:text-4xl text-white font-light">
                Enquiry Received
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light max-w-md mx-auto">
                Thank you, {formData.fullName}. Our Senior Development Director will contact you within 24 hours to coordinate private viewing details.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 inline-block text-xs font-mono text-neutral-400">
              Reference: <span className="text-white font-medium">{referenceId}</span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full text-xs tracking-[0.2em] font-medium bg-white text-neutral-950 hover:bg-neutral-200 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                PRIVATE CONSULTATION
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-white mt-1.5 font-light">
                Property Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
                Direct confidential correspondence regarding residence acquisitions and bespoke builds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono tracking-[0.15em] text-neutral-300 uppercase mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="e.g. Lord & Lady Sterling"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-[0.15em] text-neutral-300 uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-[0.15em] text-neutral-300 uppercase mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Property of Interest */}
              <div>
                <label className="block text-[11px] font-mono tracking-[0.15em] text-neutral-300 uppercase mb-1.5">
                  Property / Residence of Interest
                </label>
                <select
                  value={formData.propertyInterest}
                  onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="General Portfolio Inquiry">General Portfolio Inquiry</option>
                  {FEATURED_PROJECTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                  <option value="Bespoke Commission / Land Development">
                    Bespoke Commission / Land Development
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-mono tracking-[0.15em] text-neutral-300 uppercase mb-1.5">
                  Confidential Message / Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specific requirements, desired viewing dates, or investment inquiries..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-300">
                  An unexpected error occurred while transmitting your request. Please try again or reach our desk directly via phone or WhatsApp.
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-full text-xs tracking-[0.2em] font-medium bg-white text-neutral-950 hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SUBMITTING ENQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT ENQUIRY</span>
                      <Send className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Direct Contact Alternatives */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
              <span className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>+234 (1) 234 5678</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span>concierge@luxurydev.com</span>
              </span>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-neutral-300 hover:text-white"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Private Desk</span>
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function EnquiryModal({ isOpen, onClose, preselectedProject }: EnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <EnquiryDialogContent
      key={preselectedProject || 'general'}
      onClose={onClose}
      preselectedProject={preselectedProject}
    />
  );
}
