# Coming Soon Application

## Overview

This is a full-stack TypeScript application featuring a premium "Coming Soon" landing page with email subscription functionality. The application uses a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration via Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with fallback support for PostgreSQL sessions
- **API Design**: RESTful endpoints with centralized error handling

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database
- **ORM**: Drizzle ORM with schema-first approach
- **Migration Strategy**: Drizzle Kit for database migrations
- **Development Fallback**: In-memory storage for development environments

## Key Components

### Database Schema
- **Users Table**: Basic user authentication schema (id, username, password)
- **Email Subscriptions Table**: Newsletter subscription tracking (id, email, subscribedAt)
- **Schema Validation**: Zod schemas generated from Drizzle table definitions

### API Endpoints
- `POST /api/subscribe` - Email subscription with duplicate prevention
- `GET /api/subscribers/count` - Retrieve total subscriber count for display

### Frontend Components
- **Home Page**: Premium landing page with hero section and email signup
- **Email Signup Form**: Form with validation, success states, and error handling
- **UI Components**: Comprehensive shadcn/ui component library (40+ components)

### External Dependencies
- **Typography**: Google Fonts (Playfair Display, Inter)
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth transitions
- **Form Validation**: Zod with React Hook Form integration

## Data Flow

1. **User Email Submission**: Form validation → API request → Database check → Insert/Return response
2. **Subscriber Count Display**: Component mount → Query API → Cache response → Display count
3. **Error Handling**: Client validation → Server validation → User feedback via toast notifications
4. **State Management**: React Query handles caching, background updates, and error states

## External Dependencies

### Production Dependencies
- **Database**: @neondatabase/serverless, drizzle-orm, connect-pg-simple
- **UI Framework**: React ecosystem with @radix-ui components
- **Validation**: zod, @hookform/resolvers
- **Utilities**: date-fns, clsx, class-variance-authority
- **Development Tools**: tsx, esbuild, vite

### Development Tools
- **Build System**: Vite with React plugin and Replit integration
- **Type Checking**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: tsx for TypeScript execution, Vite dev server with HMR
- **Production**: Node.js serves built Express application with static file serving
- **Database**: Environment variable `DATABASE_URL` required for PostgreSQL connection

### Deployment Architecture
- **Frontend**: Static files served by Express in production
- **Backend**: Express server with API routes and error handling
- **Database**: PostgreSQL hosted on Neon Database platform
- **Asset Delivery**: Google Fonts CDN for typography assets

## Changelog
```
Changelog:
- June 29, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```