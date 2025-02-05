# React Application Documentation

## Overview
This document provides a comprehensive overview of the application's architecture, focusing on component structure and state management implementation.

## Table of Contents
- [Component Structure](#component-structure)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Key Features](#key-features)

## Component Structure

### Core Components
1. **App.tsx** (Root Component)
   - Implements the main layout using Chakra UI's Grid system
   - Manages animations using react-spring
   - Houses four main feature components

2. **Feature Components**
   - `Counter`: Simple counter implementation
   - `RichTextEditor`: Text editing functionality
   - `UserData`: User information management
   - `ContactDetails`: Contact information handling

3. **UI Components**
   - Uses Chakra UI for consistent styling
   - Implements responsive grid layout
   - Features animated transitions using react-spring

### Component Hierarchy
```
App
├── Counter
├── RichTextEditor
├── UserData
└── ContactDetails
```

## State Management

### Redux Implementation
The application uses Redux Toolkit for state management, organized into three main slices:

1. **User Slice** (`userSlice.ts`)
   - Manages user data and form state
   - Features:
     - Form validation
     - Local storage persistence
     - Unsaved changes tracking
   - Key state properties:
     - `data`: User information
     - `formData`: Current form state
     - `hasUnsavedChanges`: Edit tracking
     - `errors`: Validation errors

2. **Editor Slice** (`editorSlice.ts`)
   - Handles rich text editor state
   - Features:
     - Content persistence
     - Unsaved changes tracking
   - Key state properties:
     - `content`: Editor content
     - `hasUnsavedChanges`: Edit tracking

3. **Counter Slice** (`counterSlice.ts`)
   - Manages counter functionality
   - Features:
     - Increment/decrement operations
     - Direct value setting
   - Key state properties:
     - `value`: Current counter value

### Store Configuration
- Centralized store setup in `store.ts`
- Combines reducers from all slices
- Provides TypeScript type definitions:
  - `RootState`
  - `AppDispatch`

## Data Flow

### State Updates
1. Components dispatch actions using Redux hooks
2. Slices process actions and update state
3. Components receive updates through selectors
4. Persistence layer (localStorage) maintains data between sessions

### Data Persistence
- User data stored in localStorage under `userData` key
- Editor content stored under `editorContent` key
- Automatic saving mechanisms with unsaved changes tracking

## Key Features

### Form Management
- Comprehensive form validation
- Real-time error tracking
- Unsaved changes detection

### Rich Text Editing
- Persistent content storage
- Change tracking
- Autosave functionality

### Animation
- Smooth transitions using react-spring
- Animated component mounting
- Grid-based layout animations

## Technical Stack
- React
- Redux Toolkit
- Chakra UI
- react-spring
- TypeScript

## Best Practices
- Strong TypeScript integration
- Modular state management
- Component-based architecture
- Persistent storage handling
- Form validation patterns 