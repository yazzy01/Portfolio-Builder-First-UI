import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Award,
  Building,
  ExternalLink,
  Download,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Star,
  Film,
  Users,
  Info
} from 'lucide-react';

interface ProfileData {
  name?: string;
  description?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  url?: string;
  image?: string;
  skills?: string[];
  projects?: Array<{ name: string; role?: string; year?: string }>;
  experience?: Array<{ company: string; position: string; duration?: string }>;
  // Enhanced IMDB-specific fields
  knownFor?: Array<{ title: string; year?: string; role?: string; rating?: string }>;
  filmography?: Array<{ title: string; year?: string; role?: string; type?: string }>;
  awards?: Array<{ name: string; year?: string; category?: string }>;
  personalDetails?: {
    birthYear?: string;
    birthPlace?: string;
    height?: string;
    relatives?: Array<{ name: string; relationship: string }>;
  };
  trivia?: string[];
  biography?: string;
  generatedAt?: string;
  sourceUrl?: string;
  confidence?: number;
}

interface ProfileResultCardProps {
  profileData: ProfileData;
  onTryAnother?: () => void;
  onExport?: () => void;
  isEnhanced?: boolean;
}

export const ProfileResultCard: React.FC<ProfileResultCardProps> = ({ 
  profileData, 
  onTryAnother, 
  onExport,
  isEnhanced = false
}) => {
  const confidenceScore = Math.round((profileData.confidence || 0) * 100);
  const confidenceColor = confidenceScore >= 80 ? 'text-success' : confidenceScore >= 60 ? 'text-warning' : 'text-destructive';

  return (
    <div className="animate-fade-in-up">
      <Card className="shadow-xl-premium border-0 glass-premium overflow-hidden hover-lift">
        {/* Enhanced Header with premium gradient */}
        <CardHeader className="gradient-shift text-white relative overflow-hidden p-8">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Floating success indicator */}
          <div className="absolute top-4 right-4">
            <div className="float-animation">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-white/90 drop-shadow-lg" />
                <div className="absolute inset-0 blur-sm">
                  <Sparkles className="w-8 h-8 text-white/50" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <CheckCircle className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div>
                  <CardTitle className="text-white text-2xl font-bold mb-1">Profile Generated Successfully</CardTitle>
                  <p className="text-white/80 text-sm">AI analysis completed with high accuracy</p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge className="bg-white/25 text-white border-white/40 backdrop-blur-sm px-4 py-2 text-lg font-semibold">
                  {confidenceScore}% confidence
                </Badge>
                <p className="text-white/70 text-xs mt-1">Quality Score</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white/90 font-medium">Data Quality Assessment:</span>
              <div className="flex-1 max-w-48">
                <Progress 
                  value={confidenceScore} 
                  className="h-3 bg-white/20 border border-white/30" 
                />
              </div>
              <span className="text-white/80 text-sm font-medium">
                {confidenceScore >= 80 ? 'Excellent' : confidenceScore >= 60 ? 'Good' : 'Fair'}
              </span>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent"></div>
        </CardHeader>

        <CardContent className="p-10">
          <div className="space-y-12">
            {/* Enhanced Profile Information */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8 animate-slide-in-left">
                {/* Premium Basic Info Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 gradient-premium rounded-xl">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">Extracted profile details</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-5">
                    {profileData.name && (
                      <div className="group p-6 rounded-xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent hover:from-accent/30 hover:via-accent/20 hover:to-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          Full Name
                        </p>
                        <p className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">{profileData.name}</p>
                      </div>
                    )}
                    
                    {profileData.jobTitle && (
                      <div className="group p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 border border-primary/20 hover:border-primary/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          Profession
                        </p>
                        <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">{profileData.jobTitle}</p>
                      </div>
                    )}
                    
                    {profileData.personalDetails?.birthYear && (
                      <div className="group p-6 rounded-xl bg-gradient-to-br from-success/10 via-success/5 to-transparent hover:from-success/20 hover:via-success/10 hover:to-success/5 transition-all duration-300 border border-success/20 hover:border-success/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          Born
                        </p>
                        <p className="font-bold text-lg text-foreground group-hover:text-success transition-colors duration-300">{profileData.personalDetails.birthYear}</p>
                      </div>
                    )}
                    
                    {profileData.personalDetails?.height && (
                      <div className="group p-6 rounded-xl bg-gradient-to-br from-warning/10 via-warning/5 to-transparent hover:from-warning/20 hover:via-warning/10 hover:to-warning/5 transition-all duration-300 border border-warning/20 hover:border-warning/30 hover-lift">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning"></div>
                          Height
                        </p>
                        <p className="font-bold text-lg text-foreground group-hover:text-warning transition-colors duration-300">{profileData.personalDetails.height}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Skills Section */}
                {profileData.skills && profileData.skills.length > 0 && (
                  <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 gradient-premium rounded-xl">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Skills & Expertise</h3>
                        <p className="text-sm text-muted-foreground">Professional capabilities</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {profileData.skills.map((skill, index) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/15 to-primary/10 text-primary hover:from-primary/25 hover:to-primary/20 border border-primary/20 hover:border-primary/30 transition-all duration-300 cursor-default hover-lift"
                          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Description and Personal Details */}
              <div className="space-y-8 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                {/* Premium Description Section */}
                {(profileData.description || profileData.biography) && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 gradient-premium rounded-xl">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Biography</h3>
                        <p className="text-sm text-muted-foreground">Professional overview</p>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-accent/20 to-muted/30 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent rounded-2xl"></div>
                      
                      <div className="relative p-8 border border-accent/30 rounded-2xl backdrop-blur-sm">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground leading-relaxed text-base font-medium">
                            {profileData.biography || profileData.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground/70">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                          <span>Extracted from source</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Family/Relatives */}
                {profileData.personalDetails?.relatives && profileData.personalDetails.relatives.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 gradient-premium rounded-xl">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Family</h3>
                        <p className="text-sm text-muted-foreground">Related individuals</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {profileData.personalDetails.relatives.map((relative, index) => (
                        <div key={index} className="group p-4 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent hover:from-accent/20 hover:via-accent/10 hover:to-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent/30 hover-lift">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground">{relative.name}</span>
                            <Badge variant="outline" className="text-xs">{relative.relationship}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Known For Section */}
            {profileData.knownFor && profileData.knownFor.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-premium rounded-xl">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Known For</h3>
                    <p className="text-sm text-muted-foreground">Most notable works</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileData.knownFor.map((work, index) => (
                    <div key={index} className="group p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 border border-primary/20 hover:border-primary/30 hover-lift">
                      <div className="flex items-start justify-between mb-3">
                        <Film className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        {work.rating && (
                          <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                            ⭐ {work.rating}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2">{work.title}</h4>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{work.year}</span>
                        {work.role && <span className="font-medium">{work.role}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filmography Section */}
            {profileData.filmography && profileData.filmography.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-premium rounded-xl">
                    <Film className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Filmography</h3>
                    <p className="text-sm text-muted-foreground">Complete works ({profileData.filmography.length} entries)</p>
                  </div>
                </div>
                
                <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
                  {profileData.filmography.map((film, index) => (
                    <div key={index} className="group p-4 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent hover:from-accent/20 hover:via-accent/10 hover:to-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent/30 hover-lift">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{film.title}</h4>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            {film.year && <span>{film.year}</span>}
                            {film.role && <span>as {film.role}</span>}
                          </div>
                        </div>
                        {film.type && (
                          <Badge variant="outline" className="text-xs ml-2">{film.type}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trivia Section */}
            {profileData.trivia && profileData.trivia.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-premium rounded-xl">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Trivia</h3>
                    <p className="text-sm text-muted-foreground">Interesting facts</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {profileData.trivia.map((fact, index) => (
                    <div key={index} className="group p-6 rounded-xl bg-gradient-to-br from-warning/10 via-warning/5 to-transparent hover:from-warning/20 hover:via-warning/10 hover:to-warning/5 transition-all duration-300 border border-warning/20 hover:border-warning/30 hover-lift">
                      <p className="text-muted-foreground leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Source Information */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 gradient-premium rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Source Information</h3>
                  <p className="text-sm text-muted-foreground">Analysis metadata</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:from-primary/20 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 border border-primary/20 hover:border-primary/30 hover-lift">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Original URL
                  </p>
                  <a 
                    href={profileData.sourceUrl || profileData.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover font-semibold flex items-center gap-3 group-hover:gap-4 transition-all duration-300 hover-glow rounded-lg p-2 -m-2"
                  >
                    <span className="truncate text-sm">{profileData.sourceUrl || profileData.url}</span>
                    <ExternalLink className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
                
                <div className="group p-6 rounded-xl bg-gradient-to-br from-success/10 via-success/5 to-transparent hover:from-success/20 hover:via-success/10 hover:to-success/5 transition-all duration-300 border border-success/20 hover:border-success/30 hover-lift">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    Generated
                  </p>
                  <p className="font-semibold flex items-center gap-3 text-foreground group-hover:text-success transition-colors duration-300">
                    <Calendar className="h-5 w-5 text-success" />
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Action Buttons */}
            {(onTryAnother || onExport) && (
              <div className="space-y-4 pt-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="grid grid-cols-2 gap-4">
                  {onExport && (
                    <Button 
                      onClick={onExport}
                      className="h-14 text-base font-bold rounded-xl gradient-premium hover:gradient-shift shadow-glow hover:shadow-xl-premium hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5" />
                        <div className="text-left">
                          <div>Export Profile</div>
                          <div className="text-xs opacity-90 font-normal">Download JSON</div>
                        </div>
                      </div>
                    </Button>
                  )}
                  
                  {onTryAnother && (
                    <Button 
                      onClick={onTryAnother}
                      variant="outline"
                      className="h-14 text-base font-semibold rounded-xl hover:bg-accent/50 border-2 border-border hover:border-primary/30 hover-lift transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5" />
                        <div className="text-left">
                          <div>Try Another</div>
                          <div className="text-xs opacity-70 font-normal">New Analysis</div>
                        </div>
                      </div>
                    </Button>
                  )}
                </div>
                
                <p className="text-center text-xs text-muted-foreground/70 px-4">
                  {isEnhanced ? 'Enhanced' : 'Standard'} AI profile analysis • {confidenceScore}% accuracy • Demo Mode
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};