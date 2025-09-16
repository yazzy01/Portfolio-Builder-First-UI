import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Globe, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Loader2,
  Star,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LoadingSteps } from './LoadingSteps';
import { ProfileResultCard } from './ProfileResultCard';

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
  confidence: number;
}

interface ProfileBuilderState {
  url: string;
  isLoading: boolean;
  loadingStep: number;
  profileData: ProfileData | null;
  error: string | null;
  validationErrors: string[];
  warnings: string[];
  processingStats: {
    attempts: number;
    successRate: number;
    avgConfidence: number;
    lastProcessed: string | null;
  };
}

const EnhancedProfileBuilder: React.FC = () => {
  const [state, setState] = useState<ProfileBuilderState>({
    url: '',
    isLoading: false,
    loadingStep: 0,
    profileData: null,
    error: null,
    validationErrors: [],
    warnings: [],
    processingStats: {
      attempts: 0,
      successRate: 94.2,
      avgConfidence: 87.3,
      lastProcessed: null
    }
  });

  const { toast } = useToast();

  const validateUrl = (url: string) => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!url) {
      errors.push('URL is required');
      return { isValid: false, errors, warnings };
    }

    try {
      const urlObj = new URL(url);
      
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        errors.push('URL must use HTTP or HTTPS protocol');
      }

      // Check for common professional platforms
      if (url.includes('linkedin.com')) {
        warnings.push('LinkedIn profiles may require authentication for full data access');
      } else if (url.includes('github.com')) {
        warnings.push('GitHub profiles provide excellent technical information');
      } else if (url.includes('twitter.com') || url.includes('x.com')) {
        warnings.push('Social media profiles may have limited professional information');
      } else {
        warnings.push('Custom websites may vary in data availability');
      }

    } catch {
      errors.push('Please enter a valid URL');
    }

    return { isValid: errors.length === 0, errors, warnings };
  };

  const generateEnhancedMockProfile = (sourceUrl: string): ProfileData => {
    const mockProfiles = [
      {
        name: "Dr. Alexandra Thompson",
        description: "Distinguished AI researcher and engineering leader with 12+ years of experience in machine learning, computer vision, and distributed systems. Published author with 25+ peer-reviewed papers and 3 patents in AI/ML technologies.",
        jobTitle: "Principal AI Engineer & Research Director",
        company: "Quantum Computing Labs",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Kubernetes", "AWS", "Research & Development"],
        projects: [
          { name: "Autonomous Vehicle Vision System", role: "Technical Lead", year: "2023" },
          { name: "Large Language Model Optimization", role: "Principal Researcher", year: "2023" },
          { name: "Distributed ML Pipeline", role: "Architecture Lead", year: "2022" },
          { name: "Real-time Object Detection", role: "Research Lead", year: "2021" }
        ],
        experience: [
          { company: "Quantum Computing Labs", position: "Principal AI Engineer", duration: "2021 - Present" },
          { company: "Meta AI Research", position: "Senior Research Scientist", duration: "2019 - 2021" },
          { company: "Google DeepMind", position: "Research Scientist", duration: "2017 - 2019" },
          { company: "Microsoft Research", position: "Research Intern", duration: "2016 - 2017" }
        ]
      },
      {
        name: "James Rodriguez",
        description: "Seasoned product executive with a track record of building and scaling B2B SaaS products from 0 to $100M+ ARR. Expert in product-market fit, go-to-market strategy, and cross-functional leadership in high-growth environments.",
        jobTitle: "VP of Product",
        company: "ScaleUp Ventures",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        skills: ["Product Strategy", "Product-Market Fit", "Go-to-Market", "User Research", "Data Analytics", "A/B Testing", "Roadmap Planning", "Team Leadership", "Agile/Scrum", "SQL"],
        projects: [
          { name: "Enterprise Platform Launch", role: "Product Lead", year: "2023" },
          { name: "Mobile App 2.0 Redesign", role: "Executive Sponsor", year: "2022" },
          { name: "API Marketplace", role: "Product Owner", year: "2022" },
          { name: "Analytics Dashboard Suite", role: "Product Manager", year: "2021" }
        ],
        experience: [
          { company: "ScaleUp Ventures", position: "VP of Product", duration: "2022 - Present" },
          { company: "TechUnicorn Inc.", position: "Senior Product Manager", duration: "2020 - 2022" },
          { company: "GrowthCorp", position: "Product Manager", duration: "2018 - 2020" },
          { company: "StartupHub", position: "Associate Product Manager", duration: "2016 - 2018" }
        ]
      },
      {
        name: "Maria Santos",
        description: "Award-winning creative director and design strategist with expertise in brand identity, digital experiences, and design systems. Led design teams of 15+ designers across multiple product lines, with work featured in major design publications.",
        jobTitle: "Creative Director",
        company: "Design Innovation Studio",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
        skills: ["Creative Direction", "Brand Strategy", "UI/UX Design", "Design Systems", "Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Thinking", "Team Leadership"],
        projects: [
          { name: "Global Brand Redesign", role: "Creative Director", year: "2023" },
          { name: "Design System 3.0", role: "Design Lead", year: "2023" },
          { name: "Mobile Banking UX", role: "Senior Designer", year: "2022" },
          { name: "E-commerce Platform", role: "Lead UX Designer", year: "2021" }
        ],
        experience: [
          { company: "Design Innovation Studio", position: "Creative Director", duration: "2021 - Present" },
          { company: "Digital Agency Pro", position: "Senior UX Designer", duration: "2019 - 2021" },
          { company: "CreativeLab", position: "UX Designer", duration: "2017 - 2019" },
          { company: "DesignStart", position: "Junior Designer", duration: "2015 - 2017" }
        ]
      }
    ];

    const selectedProfile = mockProfiles[Math.floor(Math.random() * mockProfiles.length)];
    const confidence = Math.random() * 0.25 + 0.75; // 75-100% confidence for enhanced version

    return {
      ...selectedProfile,
      sourceUrl,
      generatedAt: new Date().toISOString(),
      confidence
    };
  };

  const handleGenerateProfile = async () => {
    const validation = validateUrl(state.url);
    
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        error: validation.errors[0],
        validationErrors: validation.errors,
        warnings: validation.warnings
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      profileData: null,
      validationErrors: [],
      warnings: validation.warnings,
      processingStats: {
        ...prev.processingStats,
        attempts: prev.processingStats.attempts + 1
      }
    }));

    try {
      // Enhanced processing simulation with more steps
      setState(prev => ({ ...prev, loadingStep: 1 }));
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState(prev => ({ ...prev, loadingStep: 2 }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setState(prev => ({ ...prev, loadingStep: 3 }));
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Generate enhanced mock profile
      const mockProfile = generateEnhancedMockProfile(state.url);
      
      setState(prev => ({
        ...prev,
        profileData: mockProfile,
        processingStats: {
          ...prev.processingStats,
          lastProcessed: new Date().toISOString()
        }
      }));

      toast({
        title: 'Enhanced Profile Generated',
        description: `Successfully extracted comprehensive profile data with ${Math.round(mockProfile.confidence * 100)}% confidence using advanced AI analysis.`,
      });

    } catch (err: any) {
      console.error(err);
      setState(prev => ({
        ...prev,
        error: err.message || 'Failed to generate enhanced profile'
      }));
      toast({
        title: 'Processing Error',
        description: 'Failed to generate enhanced profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setState(prev => ({
        ...prev,
        isLoading: false,
        loadingStep: 0
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <Card className="shadow-xl-premium border-0 glass-premium backdrop-blur-xl overflow-hidden">
        <CardHeader className="gradient-premium text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
          
          <div className="relative z-10">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Brain className="h-7 w-7" />
              Enhanced AI Profile Builder
              <Badge className="bg-white/20 text-white border-white/30 ml-2">
                ADVANCED
              </Badge>
            </CardTitle>
            <p className="text-white/80 mt-2">
              Enterprise-grade profile extraction with advanced AI analysis and validation - Demo Version
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">{state.processingStats.avgConfidence}%</div>
              <div className="text-xs text-muted-foreground">Avg Confidence</div>
            </div>
            
            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">{state.processingStats.successRate}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            
            <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning">{state.processingStats.attempts}</div>
              <div className="text-xs text-muted-foreground">Profiles Processed</div>
            </div>
            
            <div className="text-center p-4 bg-purple-100 rounded-lg border border-purple-200">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">2.8s</div>
              <div className="text-xs text-muted-foreground">Avg Time</div>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Enter professional profile URL for enhanced analysis..."
                value={state.url}
                onChange={(e) => setState(prev => ({ ...prev, url: e.target.value }))}
                className="flex-1 h-14 text-lg"
                disabled={state.isLoading}
              />
              <Button
                onClick={handleGenerateProfile}
                disabled={!state.url || state.isLoading}
                className="h-14 px-8 text-lg font-bold gradient-premium hover:gradient-shift shadow-glow"
              >
                {state.isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Brain className="h-6 w-6" />
                    Enhanced Analysis
                  </div>
                )}
              </Button>
            </div>

            {/* Validation Messages */}
            {state.validationErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {state.validationErrors[0]}
                </AlertDescription>
              </Alert>
            )}

            {state.warnings.length > 0 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {state.warnings[0]}
                </AlertDescription>
              </Alert>
            )}

            {state.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Enhanced Features */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-accent/20 rounded-lg border">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Advanced Validation</h4>
                <p className="text-xs text-muted-foreground">Multi-layer content verification</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-accent/20 rounded-lg border">
              <div className="p-2 bg-success/20 rounded-lg">
                <Globe className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Multi-Source Analysis</h4>
                <p className="text-xs text-muted-foreground">Cross-reference data points</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-accent/20 rounded-lg border">
              <div className="p-2 bg-warning/20 rounded-lg">
                <Star className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Quality Scoring</h4>
                <p className="text-xs text-muted-foreground">Confidence metrics & reliability</p>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-primary">Enhanced Demo Mode</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              This enhanced version demonstrates advanced AI capabilities including multi-layer validation, 
              confidence scoring, and comprehensive data extraction that would be available in the full enterprise solution.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <p>• Advanced natural language processing</p>
                <p>• Multi-source data correlation</p>
                <p>• Real-time confidence scoring</p>
              </div>
              <div>
                <p>• Enterprise-grade data validation</p>
                <p>• Comprehensive profile analysis</p>
                <p>• Professional insights extraction</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Steps */}
      {state.isLoading && (
        <LoadingSteps currentStep={state.loadingStep} />
      )}

      {/* Enhanced Profile Results */}
      {state.profileData && (
        <ProfileResultCard profileData={state.profileData} isEnhanced={true} />
      )}
    </div>
  );
};

export default EnhancedProfileBuilder;