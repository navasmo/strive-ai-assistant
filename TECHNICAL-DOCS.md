# Strive AI Chatbot - Technical Documentation

## Technology Stack

Strive is built using a modern, robust technology stack designed for performance, scalability, and developer experience:

### Frontend
- **Next.js 15.3+**: React framework for server-rendered and static web applications
- **TypeScript**: Typed JavaScript for enhanced code quality and maintainability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Animation library for creating fluid, interactive UI components
- **Radix UI**: Unstyled, accessible UI components for building high-quality interfaces
- **Lucide React**: Beautifully crafted open-source icons
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation

### Backend & Data
- **Supabase**: Open-source Firebase alternative with:
  - PostgreSQL database
  - Authentication
  - Serverless functions
  - Real-time capabilities
- **OpenAI API**: Powers conversational AI features and content generation

### DevOps & Tooling
- **ESLint**: Code quality and linting
- **Prettier**: Consistent code formatting
- **sync-env.sh**: Environment variable distribution script
- **Next.js App Router**: For efficient routing and navigation

## Architecture Overview

Strive follows a monorepo architecture with clear separation of concerns:

```
strive-ai-chatbot/
├── web/
│   ├── strive-web/         # Next.js application
│   │   ├── src/
│   │   │   ├── app/        # App Router pages and layouts
│   │   │   ├── components/ # UI and feature components
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── lib/        # Utilities and libraries
│   │   │   ├── services/   # API and external service integrations
│   │   │   └── types/      # TypeScript type definitions
│   │   ├── public/         # Static assets
│   │   └── tailwind.config.js # Tailwind configuration
│   │
│   └── shared-types/       # Cross-project type definitions
│
├── supabase/              # Supabase configuration and migrations
└── etl/                   # Data processing utilities
```

## Key Components & Patterns

### 1. App Directory Structure
The Next.js app uses route groups with:
- `(protected)`: Routes requiring authentication
- `(public)`: Publicly accessible routes

### 2. Component Architecture
Components follow a consistent pattern:
- **UI Components**: Reusable, framework-agnostic components in `@/components/ui`
- **Feature Components**: Domain-specific components in `@/components/[feature-name]`
- **Layout Components**: Page layouts with shared navigation in `@/components/ui/layout.tsx`

Each component is structured as:
1. Imports (React core, then types, then components, then hooks)
2. Type definitions (interfaces, types)
3. Default state/constants
4. Helper functions
5. Main component
6. Subcomponents

### 3. State Management
- **React Context**: Global state (DashboardContext, Auth)
- **Component State**: Local UI state with useState/useReducer
- **Form State**: Managed with React Hook Form
- **API State**: Handled with React Query for data fetching and caching

### 4. Authentication Flow
1. User signs in via Supabase Auth
2. JWT tokens are stored and managed securely
3. Route protection is handled by Next.js middleware
4. Protected routes are grouped in the `(protected)` directory

### 5. Styling Approach
- **Tailwind CSS**: Primary styling method with consistent class naming
- **CSS Variables**: For theming with light/dark mode support
- **Component Encapsulation**: UI components that wrap styling concerns
- **Responsive Design**: Mobile-first approach using Tailwind breakpoints

## Feature Implementation Guide

### Adding a New Feature

1. **Type Definitions**: Add relevant interfaces/types in `/src/types`
2. **UI Components**: Create components in `/src/components/[feature-name]`
3. **API Integration**: Add service files in `/src/services`
4. **State Management**: Implement state using appropriate patterns
5. **Route Integration**: Add to navigation and create relevant pages

### Resource Implementation
Resources feature is implemented as:
- Two-tab layout with "Career Resources" and "Wellbeing Resources"
- Interactive tool cards for Career Assessment and Breathing Exercise
- Resource cards for job platforms and wellbeing applications
- External link cards for NHS and career resources

### Chatbot Implementation
The chatbot is implemented with:
- Real-time typing effect
- Message history persistence
- Context-aware responses
- Integration with resource recommendations
- Markdown rendering for rich responses

## API Integration

### External APIs
- **Reed API**: UK job listings with London as default location
- **Eventbrite API**: Event listings and management
- **OpenAI API**: Powers the AI chatbot capabilities

### Supabase Integration
- **Auth**: User authentication and session management
- **Database**: Stores user profiles, preferences, and interaction history
- **Serverless Functions**: Background processing and API proxies

## Performance Optimizations

- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Dynamic imports for larger components
- **API Response Caching**: Efficient data caching strategies
- **Component Memoization**: Using React.memo and useCallback

## Accessibility Features

- **Color Contrast**: Ensuring WCAG compliance for all color combinations
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Visible focus states and logical tab order

## Environment Configuration

The application uses a root `.env` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
REED_API_KEY=your-reed-api-key
EVENTBRITE_API_KEY=your-eventbrite-api-key
```

These variables are distributed to subprojects using the `sync-env.sh` script.

## Testing Strategy

- **Jest**: Unit testing for business logic
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing for critical user flows
- **Mock Data**: Test fixtures in `__mocks__` directory

## Deployment

The application is configured for deployment to:
- **Vercel**: Primary deployment platform
- **Netlify**: Alternative deployment option
- **Self-hosted**: Docker containerization available

## Future Development

- **PWA Support**: Progressive web app capabilities
- **Offline Mode**: Cached responses and offline functionality
- **Voice Interface**: Speech recognition and synthesis
- **Enhanced Analytics**: User interaction tracking and insights
- **Multi-language Support**: Internationalization and localization
