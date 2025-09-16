# AI Profile Builder Demo

A frontend demonstration of an AI-powered profile extraction system. This project showcases modern web development techniques and UI/UX design patterns for professional profile analysis tools.

## Features

- **Single URL Analysis**: Extract profile data from individual URLs
- **Multi-Source Analysis**: Combine data from multiple professional platforms  
- **Batch Processing**: Process multiple profiles simultaneously
- **Analytics Dashboard**: View processing metrics and insights
- **Export Options**: Multiple output formats for profile data
- **Responsive Design**: Works seamlessly across all device sizes

## Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React** - Component-based UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI component library
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd persona-forge-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── ProfileBuilder.tsx
│   ├── EnhancedProfileBuilder.tsx
│   ├── MultiUrlProcessor.tsx
│   ├── BatchProcessor.tsx
│   ├── AnalyticsDashboard.tsx
│   └── ExportOptions.tsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # CSS and styling

```

## Demo Features

This is a **frontend-only demonstration** that simulates:

- AI-powered profile extraction
- Multi-source data analysis  
- Batch processing capabilities
- Real-time progress tracking
- Export functionality
- Analytics and insights

In a production environment, these features would connect to:
- Web scraping APIs
- AI/ML processing services
- Database systems
- File storage solutions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes only.