import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, User, Building2, Star } from 'lucide-react';

interface ExampleUrlsProps {
  onUrlSelect: (url: string) => void;
}

const exampleUrls = [
  {
    url: 'https://www.imdb.com/name/nm0000982/',
    label: 'Jack Nicholson',
    subtitle: 'Academy Award Winner',
    category: 'Celebrity',
    icon: Star,
    color: 'bg-amber-500/10 text-amber-600 border-amber-200'
  },
  {
    url: 'https://www.linkedin.com/in/satyanadella/',
    label: 'Satya Nadella',
    subtitle: 'CEO of Microsoft',
    category: 'Executive',
    icon: Building2,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200'
  },
  {
    url: 'https://www.imdb.com/name/nm0000138/',
    label: 'Leonardo DiCaprio',
    subtitle: 'Environmental Activist',
    category: 'Actor',
    icon: Play,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200'
  },
  {
    url: 'https://www.linkedin.com/in/jeffweiner08/',
    label: 'Jeff Weiner',
    subtitle: 'Former LinkedIn CEO',
    category: 'Leader',
    icon: User,
    color: 'bg-green-500/10 text-green-600 border-green-200'
  }
];

export const ExampleUrls: React.FC<ExampleUrlsProps> = ({ onUrlSelect }) => {
  return (
    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2 text-foreground">Try These Premium Examples</h3>
        <p className="text-sm text-muted-foreground">Click any profile to see AI extraction in action</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exampleUrls.map((example, index) => {
          const IconComponent = example.icon;
          return (
            <button
              key={index}
              onClick={() => onUrlSelect(example.url)}
              className="group relative p-5 rounded-xl border border-border bg-card hover:bg-accent/30 transition-all duration-300 hover-lift hover-glow text-left overflow-hidden"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className={`p-3 rounded-lg ${example.color} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {example.label}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      {example.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {example.subtitle}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-primary/70 group-hover:text-primary transition-colors duration-300">
                    <span className="font-medium">Extract Profile</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary-hover scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Or paste any LinkedIn, IMDB, or professional profile URL above
        </p>
      </div>
    </div>
  );
};