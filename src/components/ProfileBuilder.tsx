import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  MapPin, 
  Building2, 
  Globe, 
  Star, 
  ExternalLink, 
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Loader2,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LoadingSteps } from './LoadingSteps';

interface ProfileData {
  name: string;
  description: string;
  jobTitle: string;
  company: string;
  location: string;
  image: string;
  skills: string[];
  projects: Array<{ name: string; role?: string; year?: string }>;
  experience: Array<{ company: string; position: string; duration?: string }>;
  generatedAt: string;
  sourceUrl: string;
  url: string;
  confidence: number;
}

const ProfileBuilder = () => {
  const [url, setUrl] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const generateMockProfile = (sourceUrl: string): ProfileData => {
    const mockProfiles = [
      {
        name: "Sarah Johnson",
        description: "Experienced software engineer with a passion for building scalable web applications and mentoring junior developers. Specialized in React, Node.js, and cloud architecture.",
        jobTitle: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL", "Python", "MongoDB"],
        projects: [
          { name: "E-commerce Platform", role: "Lead Developer", year: "2023" },
          { name: "Mobile Banking App", role: "Frontend Lead", year: "2022" },
          { name: "Analytics Dashboard", role: "Full Stack Developer", year: "2021" }
        ],
        experience: [
          { company: "TechCorp Inc.", position: "Senior Software Engineer", duration: "2021 - Present" },
          { company: "StartupXYZ", position: "Full Stack Developer", duration: "2019 - 2021" },
          { company: "DevAgency", position: "Junior Developer", duration: "2017 - 2019" }
        ]
      },
      {
        name: "Michael Chen",
        description: "Product manager with 8+ years of experience in B2B SaaS products. Expert in user research, product strategy, and cross-functional team leadership.",
        jobTitle: "Senior Product Manager",
        company: "InnovateLabs",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        skills: ["Product Strategy", "User Research", "Agile", "SQL", "Analytics", "Figma", "Jira", "A/B Testing"],
        projects: [
          { name: "CRM Platform v2.0", role: "Product Lead", year: "2023" },
          { name: "Mobile App Launch", role: "Product Manager", year: "2022" },
          { name: "API Integration Suite", role: "Product Owner", year: "2021" }
        ],
        experience: [
          { company: "InnovateLabs", position: "Senior Product Manager", duration: "2020 - Present" },
          { company: "GrowthCorp", position: "Product Manager", duration: "2018 - 2020" },
          { company: "TechStart", position: "Associate Product Manager", duration: "2016 - 2018" }
        ]
      },
      {
        name: "Emily Rodriguez",
        description: "Creative UI/UX designer focused on creating intuitive and accessible digital experiences. Passionate about design systems and user-centered design principles.",
        jobTitle: "Senior UX Designer",
        company: "DesignStudio Pro",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems", "Sketch", "InVision"],
        projects: [
          { name: "Healthcare App Redesign", role: "Lead Designer", year: "2023" },
          { name: "Design System 2.0", role: "Design Lead", year: "2022" },
          { name: "E-learning Platform", role: "UX Designer", year: "2021" }
        ],
        experience: [
          { company: "DesignStudio Pro", position: "Senior UX Designer", duration: "2021 - Present" },
          { company: "CreativeAgency", position: "UX Designer", duration: "2019 - 2021" },
          { company: "StartupDesign", position: "Junior Designer", duration: "2017 - 2019" }
        ]
      }
    ];

    const selectedProfile = mockProfiles[Math.floor(Math.random() * mockProfiles.length)];
    const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence

    return {
      ...selectedProfile,
      sourceUrl,
      url: sourceUrl,
      generatedAt: new Date().toISOString(),
      confidence
    };
  };

  const handleGenerateProfile = async () => {
    if (!url || !isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProfileData(null);

    try {
      // Simulate processing steps
      setLoadingStep(1);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoadingStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingStep(3);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock profile data
      const mockProfile = generateMockProfile(url);
      setProfileData(mockProfile);

      toast({
        title: 'Profile Generated',
        description: `Successfully extracted profile data with ${Math.round(mockProfile.confidence * 100)}% confidence.`,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate profile');
      toast({
        title: 'Error',
        description: 'Failed to generate profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl overflow-hidden">
        <CardHeader className="gradient-premium text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          <div className="relative z-10">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <User className="h-7 w-7" />
              AI Profile Builder
            </CardTitle>
            <p className="text-white/80 mt-2">
              Extract professional profiles from any URL - Demo Version
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Enter profile URL (LinkedIn, GitHub, Portfolio, etc.)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 h-12 text-lg"
                disabled={isLoading}
              />
              <Button
                onClick={handleGenerateProfile}
                disabled={!url || isLoading}
                className="h-12 px-8 text-lg font-bold gradient-premium hover:gradient-shift"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Profile
                  </div>
                )}
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Demo Notice */}
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">Demo Mode</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This is a frontend demo that generates mock profile data. In the full version, 
              this would extract real data from the provided URL using AI analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Loading Steps */}
      {isLoading && (
        <LoadingSteps currentStep={loadingStep} />
      )}

      {/* Profile Results */}
      {profileData && (
        <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl overflow-hidden">
          <CardHeader className="gradient-premium text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <CheckCircle className="h-6 w-6" />
                Profile Extracted Successfully
              </CardTitle>
              <div className="flex items-center gap-4 mt-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {Math.round(profileData.confidence * 100)}% Confidence
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  Mock Data
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Header */}
              <div className="lg:col-span-3">
                <div className="flex items-start gap-6 mb-8">
                  <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
                    <AvatarImage src={profileData.image} alt={profileData.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{profileData.name}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{profileData.jobTitle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>{profileData.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{profileData.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{profileData.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <Button variant="outline" size="sm" className="mb-2">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      Generated: {new Date(profileData.generatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Key Projects
                  </h3>
                  <div className="space-y-4">
                    {profileData.projects.map((project, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg border hover-lift transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{project.name}</h4>
                          {project.year && (
                            <Badge variant="outline" className="text-xs">
                              {project.year}
                            </Badge>
                          )}
                        </div>
                        {project.role && (
                          <p className="text-sm text-muted-foreground">{project.role}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Professional Experience
                  </h3>
                  <div className="space-y-4">
                    {profileData.experience.map((exp, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg border hover-lift transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{exp.position}</h4>
                          {exp.duration && (
                            <Badge variant="outline" className="text-xs">
                              {exp.duration}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Confidence & Source Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Math.round(profileData.confidence * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Confidence Score</div>
                <Progress value={profileData.confidence * 100} className="mt-2 h-2" />
              </div>
              
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">
                  {profileData.skills.length}
                </div>
                <div className="text-sm text-muted-foreground">Skills Identified</div>
              </div>
              
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning mb-1">
                  {profileData.experience.length}
                </div>
                <div className="text-sm text-muted-foreground">Work Experiences</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileBuilder;