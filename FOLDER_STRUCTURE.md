# Folder Structure Guidelines

## Current Folder Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── UI/
│   │   └── Loading.jsx
│   ├── ErrorBoundary.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   └── AuthContextDefinition.jsx
├── dashboards/
│   ├── admindashboard/
│   │   └── AdminDashboard.jsx
│   ├── instructordashboard/
│   │   └── InstructorDashboard.jsx
│   └── studentdashboard/
│       ├── StudentDashboard.jsx
│       ├── ActiveDashboard.jsx
│       └── EmptyDashboard.jsx
├── pages/
│   ├── registration/
│   │   ├── accountdetails.jsx
│   │   ├── personalinfo.jsx
│   │   ├── securityandfinalize.jsx
│   │   ├── CreatingAccount.jsx
│   │   └── RegistrationComplete.jsx
│   ├── signin/
│   │   └── signin.jsx
│   ├── studentexams/
│   │   ├── StudentExams.jsx
│   │   ├── ActiveExams.jsx
│   │   └── EmptyExams.jsx
│   ├── ExamTaking.jsx
│   ├── LandingPage.jsx
│   ├── NotFound.jsx
│   ├── RegistrationSuccess.jsx
│   ├── StudentExams.jsx
│   └── TwoFactorAuth.jsx
├── services/
│   ├── authService.js
│   └── examService.js
├── utils/
│   ├── examTokenManager.js
│   ├── storage.js
│   ├── testCredentials.js
│   └── validation.js
├── config/
│   └── api.js
├── constants/
│   └── index.js
├── layout/
│   └── MainLayout.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Key Patterns

### Dashboard Structure
- Each dashboard type has its own folder under `src/dashboards/`
- Main component + Active/Empty state components
- Example: `studentdashboard/` contains `StudentDashboard.jsx`, `ActiveDashboard.jsx`, `EmptyDashboard.jsx`

### Page Structure  
- Complex pages with multiple states get their own folder under `src/pages/`
- Example: `studentexams/` contains `StudentExams.jsx`, `ActiveExams.jsx`, `EmptyExams.jsx`
- Simple pages remain as single files in `src/pages/`

### Component Structure
- Layout components in `src/components/Layout/`
- UI components in `src/components/UI/`
- Utility components directly in `src/components/`

## State Management Pattern
All dashboard and page components follow this pattern:
```jsx
const hasActivity = user?.someProperty > 0 || false;

return (
  <>
    {hasActivity ? (
      <ActiveComponent user={user} />
    ) : (
      <EmptyComponent user={user} />
    )}
  </>
);
```

## Import Patterns
- Use relative imports for local components
- Consistent naming: PascalCase for components, camelCase for utilities
- Group imports: React hooks, external libraries, internal components, utilities

## Notes for Development Branch Alignment
1. Ensure `src/pages/studentexams/` folder exists with all 3 components
2. Update any existing `StudentExams.jsx` to use the new folder structure
3. Follow the Active/Empty state pattern for new features
4. Maintain consistent Header/Sidebar integration across all pages