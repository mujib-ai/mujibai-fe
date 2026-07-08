# 🚀 Next.js Multilingual Starter

This project is a **complete starter template** for building a production-ready Next.js application.
It includes multilingual support, testing setup, modern UI components, and a clean architecture optimized for scaling.

## ✨ Features

- Multilingual support (i18n)
- Jest + React Testing Library setup
- TailwindCSS + shadcn/ui
- lucide-react icons
- React Query + Zustand + Axios
- ESLint + Prettier
- Clean folder structure
- Client Management (Create, List, Search, Pagination)

## 📝 Recent Updates (Tenants Feature)

### Backend Integration

- Created `TenantsService` API layer (`/src/services/tenants.service.ts`)
- Implemented React Query hooks in `useTenants.ts` for data fetching and mutations
- Added TypeScript interfaces: `CreateClientPayload`, `ClientResponse`, `ClientsListResponse`

### UI Components (Atomic Design)

- **Atoms**:
  - Reused existing UI components (Button, Dialog, Input, Select, Textarea, Label)
  - `FormField` - Wrapper for consistent field layout with label and error
  - `FormError` - Error message display component
  - `PasswordInput` - Secure password entry
- **Molecules**:
  - `TextFormField` - Text input with integrated label and error handling
  - `PasswordFormField` - Password input with integrated label and error handling
  - `SelectFormField` - Select dropdown with integrated label and error handling
  - `TextareaFormField` - Textarea with integrated label and error handling
- **Organisms**:
  - `CreateTenantFormFields` - All form fields grouped and organized
  - `CreateTenantForm` - Complete form with validation and submission logic
  - `CreateTenantDialog` - Modal wrapper for the form
  - `TenantListTable` - Data table with actions dropdown
- **Templates**: `TenantsPageTemplate` - Complete page orchestration with search & pagination

### Features Implemented

- ✅ Create Client dialog with Zod validation
- ✅ Client list table with status badges
- ✅ Search functionality with debouncing (500ms)
- ✅ Pagination controls
- ✅ Loading states and error handling
- ✅ Success/error messages from backend API (i18n-ready)
- ✅ Automatic table refresh after creation

## 🛠️ Installation

```bash
npm install
npm run dev
```
