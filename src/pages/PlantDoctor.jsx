import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Leaf,
  Activity,
  ShieldCheck,
  ChevronRight,
  Zap,
  Search,
  Sparkles,
  Droplets,
  Microscope,
  Info,
  X,
  Plus
} from 'lucide-react';

const PlantDoctor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate Neural Diagnosis
    setTimeout(() => {
      setResult({
        condition: 'Healthy Lifecycle Detected',
        confidence: '98.4%',
        analysis: 'Biological markers indicate optimal nitrogen saturation and hydration levels. No pathogenic sequences identified.',
        recommendations: [
          'Maintain current irrigation protocol',
          'Deploy secondary nutrient flush in 48h',
          'Monitor node temperature baseline'
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 relative overflow-hidden font-body selection:bg-primary/5">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Standard Sizes */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 border-b border-black/[0.03] pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/60 backdrop-blur-2xl rounded-full border border-white shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.5em]">Bio-Intelligence Lab v4.2 — ACTIVE</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-primary uppercase tracking-tighter leading-[0.9]">
              Plant <span className="text-accent italic font-normal">Physician</span> <br />
              <span className="text-primary-light">Neural Diagnostic</span>
            </h1>
          </motion.div>

          <div className="flex bg-white/40 backdrop-blur-2xl p-1.5 rounded-xl border border-white shadow-sm">
            <div className="px-6 py-2 bg-primary text-white rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-lg">Scan Node</div>
            <div className="px-6 py-2 text-text-dim/40 text-[9px] font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">History</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Analysis Interface */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium !p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent pointer-events-none"></div>

              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group cursor-pointer py-24 flex flex-col items-center justify-center text-center space-y-8 border-2 border-dashed border-black/5 rounded-[2.5rem] bg-surface/50 hover:bg-white hover:border-primary-light/20 hover:shadow-2xl transition-all duration-700"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-primary/10 group-hover:text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-lg">
                    <Camera className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-bold text-primary uppercase">Initialize Visual Scan</h3>
                    <p className="text-[10px] font-black text-text-dim/40 uppercase tracking-[0.4em]">Capture or upload a node sequence (JPG/PNG)</p>
                  </div>
                  <button className="btn-outline px-10 py-4 text-[10px] tracking-[0.4em]">SELECT SEQUENCE</button>
                </div>
              ) : (
                <div className="space-y-10">
                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl group">
                    <img src={selectedImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-xl"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    {isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-accent/20 absolute top-1/2 -translate-y-1/2 overflow-hidden">
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-1/3 h-full bg-accent shadow-[0_0_20px_var(--color-accent)]"
                          />
                        </div>
                        <div className="z-10 bg-white/80 backdrop-blur-xl px-10 py-4 rounded-full border border-white shadow-2xl">
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4">
                            <Microscope className="w-4 h-4 animate-spin-slow" /> Neural Processing...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {!result && !isAnalyzing && (
                    <button
                      onClick={handleAnalyze}
                      className="btn-premium w-full !py-6 text-[12px] tracking-[0.6em] flex items-center justify-center gap-6 shadow-2xl"
                    >
                      <Zap className="w-5 h-5 fill-accent" /> INITIATE DIAGNOSTIC HANDSHAKE
                    </button>
                  )}

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-10 rounded-[2.5rem] bg-primary text-white shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                      <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Final Diagnostic</p>
                            <h4 className="text-3xl font-display font-bold uppercase">{result.condition}</h4>
                          </div>
                          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
                            <p className="text-[9px] font-black uppercase tracking-widest text-accent">Conf.</p>
                            <p className="text-2xl font-display font-bold">{result.confidence}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium leading-relaxed opacity-80 border-l-2 border-accent pl-6 py-1">
                          {result.analysis}
                        </p>
                        <div className="space-y-4 pt-4">
                          <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Neural Protocols</p>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {result.recommendations.map((rec, i) => (
                              <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest bg-white/5 p-4 rounded-xl border border-white/5">
                                <ChevronRight className="w-4 h-4 text-accent" /> {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Bio-Data Sidebar */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card-premium !p-10 space-y-10"
            >
              <h3 className="text-2xl font-display font-bold text-primary uppercase tracking-tight pb-6 border-b border-black/[0.03]">Lab Insights</h3>
              <div className="space-y-8">
                {[
                  { label: 'Moisture Flux', value: '64%', icon: Droplets, color: 'text-blue-500' },
                  { label: 'Nutrient Saturation', value: '88%', icon: Zap, color: 'text-amber-500' },
                  { label: 'Thermal Baseline', value: '24°C', icon: Activity, color: 'text-red-500' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-surface rounded-2xl border border-black/[0.03] hover:bg-white hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-black text-text-dim uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-xl font-display font-bold text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4">
                <div className="flex items-center gap-4 text-primary">
                  <Info className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Usage</span>
                </div>
                <p className="text-xs text-text-dim/70 leading-relaxed font-medium">
                  Our bio-intelligence model analyzes color sequences, texture gradients, and morphological patterns to identify over 400+ biological stress factors.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="p-8 rounded-[2.5rem] bg-white border border-white shadow-organic flex items-center gap-8 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-xl group-hover:bg-accent group-hover:text-white transition-all duration-700">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.4em]">Diagnostic Integrity</p>
                <p className="text-xl font-display font-bold text-primary uppercase tracking-tight">Verified by Neural-V</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default PlantDoctor;
