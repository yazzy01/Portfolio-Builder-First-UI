import React, { useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { NetworkStatusIndicator } from '@/components/NetworkStatusIndicator';
import { PremiumNav } from '@/components/PremiumNav';
import EnhancedProfileBuilder from '@/components/EnhancedProfileBuilder';
import { MultiUrlProcessor } from '@/components/MultiUrlProcessor';
import { BatchProcessor } from '@/components/BatchProcessor'; 
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { ExportOptions } from '@/components/ExportOptions';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeView, setActiveView] = useState('single');
  const [exportData, setExportData] = useState(null);

  const handleMultiUrlComplete = (results: any[]) => {
    // Handle multi-URL processing results
    console.log('Multi-URL processing complete:', results);
    setActiveView('export');
    setExportData(results[0]?.data || null);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'single':
        return <EnhancedProfileBuilder />;
      case 'multi':
        return <MultiUrlProcessor onProcessingComplete={handleMultiUrlComplete} />;
      case 'batch':
        return <BatchProcessor />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'export':
        return exportData ? (
          <ExportOptions profileData={exportData} />
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Process a profile first to access export options
            </p>
          </Card>
        );
      default:
        return <EnhancedProfileBuilder />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-hero">
        <NetworkStatusIndicator />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="p-6 shadow-xl-premium border-0 glass-premium backdrop-blur-xl">
                  <PremiumNav 
                    activeView={activeView} 
                    onViewChange={setActiveView} 
                  />
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ErrorBoundary>
                {renderActiveView()}
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
