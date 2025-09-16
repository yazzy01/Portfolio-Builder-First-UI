import React from 'react';
import { Brain, Sparkles, Zap, Target, Database, Cpu, Atom, Layers, GitBranch } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced floating particles with staggered animations */}
      <div className="particle-float absolute top-16 left-8 text-primary/25" style={{ animationDelay: '0s' }}>
        <Brain className="w-10 h-10 float-slow" />
      </div>
      <div className="particle-float absolute top-24 right-16 text-primary/20" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-7 h-7 float-animation" />
      </div>
      <div className="particle-float absolute top-48 left-1/4 text-primary/30" style={{ animationDelay: '4s' }}>
        <Zap className="w-6 h-6 bounce-gentle" />
      </div>
      <div className="particle-float absolute top-32 right-1/3 text-primary/25" style={{ animationDelay: '6s' }}>
        <Target className="w-8 h-8 spin-slow" />
      </div>
      <div className="particle-float absolute top-64 left-1/2 text-primary/20" style={{ animationDelay: '8s' }}>
        <Database className="w-7 h-7 float-slow" />
      </div>
      <div className="particle-float absolute top-80 right-12 text-primary/35" style={{ animationDelay: '10s' }}>
        <Cpu className="w-6 h-6 pulse-primary" />
      </div>
      <div className="particle-float absolute top-96 left-16 text-accent/40" style={{ animationDelay: '12s' }}>
        <Atom className="w-8 h-8 float-animation" />
      </div>
      <div className="particle-float absolute top-40 left-3/4 text-primary/15" style={{ animationDelay: '14s' }}>
        <Layers className="w-6 h-6 bounce-gentle" />
      </div>
      <div className="particle-float absolute top-72 right-1/4 text-primary/25" style={{ animationDelay: '16s' }}>
        <GitBranch className="w-7 h-7 float-slow" />
      </div>
      
      {/* Enhanced morphing gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-56 h-56 bg-primary/8 rounded-full blur-3xl morph opacity-60"></div>
      <div className="absolute top-1/2 -right-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl morph opacity-40" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-accent/15 rounded-full blur-2xl morph opacity-50" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-primary/6 rounded-full blur-3xl morph opacity-35" style={{ animationDelay: '6s' }}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20 pointer-events-none"></div>
    </div>
  );
};