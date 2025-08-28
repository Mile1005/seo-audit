# Visual Assets & Components

This directory contains all visual components and image assets for the aiseoturbo.com homepage.

## Components

### HeroMockup
Responsive hero mockup container with desktop and mobile device frames.

**Features:**
- Next/Image optimization with responsive sizing
- Animation placeholders for device frames
- Accessibility support with proper alt text
- CLS-safe aspect ratios
- Priority loading for above-the-fold content

**Usage:**
```tsx
import { HeroMockup } from '@/components/visuals'

<HeroMockup 
  className="w-full max-w-4xl mx-auto"
  priority={true}
/>
```

### FeatureMockups
Interactive feature showcase with lightbox and thumbnail grid.

**Features:**
- Responsive grid layout (1-4 columns based on screen size)
- Lightbox modal with keyboard navigation (ESC to close)
- Touch/swipe support for mobile devices
- Category badges and icons
- Download functionality placeholder
- Accessible ARIA labels and focus management

**Usage:**
```tsx
import { FeatureMockups } from '@/components/visuals'

const customMockups = [
  {
    id: 'custom-feature',
    title: 'Custom Feature',
    description: 'Feature description',
    imageSrc: '/images/features/custom-feature.webp',
    imageAlt: 'Custom feature screenshot',
    category: 'desktop'
  }
]

<FeatureMockups 
  mockups={customMockups}
  className="my-12"
/>
```

## Image Requirements

All images should be:
- **Format**: WebP for optimal compression
- **Sizes**: Multiple breakpoints for responsive loading
- **Alt Text**: Descriptive and accessible
- **Optimization**: Compressed for web delivery

### Folder Structure

```
public/images/
├── hero/                     # Hero section visuals
│   ├── hero-laptop-dashboard.webp
│   └── hero-mobile-preview.webp
├── features/                 # Feature mockups
│   ├── competitor-analysis-desktop.webp
│   ├── pdf-report-generation.webp
│   ├── ai-chat-interface.webp
│   └── team-collaboration-dashboard.webp
└── mockups/                  # General mockups
    ├── mobile-audit-interface.webp
    └── dashboard-overview.webp
```

### Image Specifications

#### Hero Images
- **hero-laptop-dashboard.webp**: 1600x1000px, showing main dashboard
- **hero-mobile-preview.webp**: 400x800px, mobile interface

#### Feature Images
- **Desktop mockups**: 1400x875px (16:10 aspect ratio)
- **Mobile mockups**: 375x812px (iPhone 13 dimensions)
- **Report mockups**: 800x1035px (A4-like proportions)

## Accessibility

All visual components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management in lightbox
- High contrast mode support

## Performance

- Next/Image with responsive `sizes` attributes
- Priority loading for hero images
- Lazy loading for feature mockups
- WebP format with fallbacks
- Optimized blur placeholders

## TODO: Replace Placeholders

Current placeholder files need to be replaced with final assets:

### Hero Section
- [ ] `hero-laptop-dashboard.webp` - Main dashboard on laptop screen
- [ ] `mobile-audit-interface.webp` - Mobile SEO audit interface

### Feature Mockups
- [ ] `competitor-analysis-desktop.webp` - Competitor comparison dashboard
- [ ] `pdf-report-generation.webp` - Professional PDF report preview
- [ ] `ai-chat-interface.webp` - AI assistant chat interface
- [ ] `team-collaboration-dashboard.webp` - Team workspace and collaboration tools

## Best Practices

1. **Always provide width/height** to prevent CLS
2. **Use appropriate sizes** for responsive images
3. **Include descriptive alt text** for accessibility
4. **Optimize for web** before uploading
5. **Test on multiple devices** and screen sizes
6. **Consider dark/light themes** in mockup designs
