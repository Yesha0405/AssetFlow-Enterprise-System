# AssetFlow – Enterprise Asset & Resource Management System

This repository is for Oddo Hackhathon.

## Team Ownership

- Member 1: Authentication + Dashboard + Organization Setup
- Member 2: Asset Management
- Member 3: Asset Allocation + Transfer + Resource Booking
- Member 4: Maintenance + Audit + Reports + Notifications

## Golden Rules for All Team Members

- Work only inside your assigned feature folder.
- Do not edit another member's feature folder.
- Do not modify [frontend/src/App.jsx](frontend/src/App.jsx) or [backend/src/server.js](backend/src/server.js) unless you are the Team Lead.
- Keep shared code inside [frontend/src/shared](frontend/src/shared) and [backend/src/shared](backend/src/shared).
- Use small, modular changes.
- Save your work often and test before finishing.

## File Ownership Guide

### Member 1
Can edit:
- frontend/src/features/auth-dashboard-org/**
- backend/src/features/auth-dashboard-org/**
- frontend/src/context/**
- frontend/src/routes/**

### Member 2
Can edit:
- frontend/src/features/asset-management/**
- backend/src/features/asset-management/**

### Member 3
Can edit:
- frontend/src/features/allocation-booking/**
- backend/src/features/allocation-booking/**

### Member 4
Can edit:
- frontend/src/features/maintenance-audit-reports/**
- backend/src/features/maintenance-audit-reports/**

### Team Lead / Final Integration
Can edit:
- frontend/src/App.jsx
- backend/src/server.js
- frontend/src/shared/**
- backend/src/shared/**
- database/**

## Database Ownership

Member 1
- users
- roles
- departments
- categories

Member 2
- assets
- asset_history

Member 3
- allocations
- transfers
- bookings

Member 4
- maintenance
- audits
- notifications

Only Team Lead edits schema.sql after reviewing everyone's changes.

## API Ownership

Member 1

/auth/*
/users/*
/departments/*
/categories/*

Member 2

/assets/*
/asset-history/*

Member 3

/allocations/*
/transfers/*
/bookings/*

Member 4

/maintenance/*
/audits/*
/reports/*
/notifications/*

## Component Ownership

Member 1

Login.jsx
Signup.jsx
Dashboard.jsx
Department.jsx
Category.jsx
Employee.jsx

Member 2

AssetList.jsx
AssetCard.jsx
AssetForm.jsx
AssetDetails.jsx

Member 3

Allocation.jsx
Transfer.jsx
Booking.jsx

Member 4

Maintenance.jsx
Audit.jsx
Reports.jsx
Notifications.jsx

## Main Structure

- frontend/
  - public/
  - src/
    - App.jsx
    - main.jsx
    - routes/
    - context/
    - features/
      - auth-dashboard-org/
      - asset-management/
      - allocation-booking/
      - maintenance-audit-reports/
    - shared/
      - components/
      - layouts/
      - hooks/
      - utils/
      - api/
      - constants/
      - services/
      - icons/
      - types/
    - styles/
    - assets/
- backend/
  - src/
    - server.js
    - config/
    - features/
      - auth-dashboard-org/
      - asset-management/
      - allocation-booking/
      - maintenance-audit-reports/
    - shared/
      - middleware/
      - utils/
    - uploads/
- database/
  - schema.sql
  - seed.sql
  - assetflow.sql
  - ER_Diagram.png

## Shared Frontend Architecture

### frontend/src/shared/components/
Why it exists:
- Holds reusable UI pieces that should not be duplicated across features.

What goes inside:
- Sidebar, Navbar, Footer, Header, Button, Card, Table, Input, SearchBar, Modal, Loader, Pagination, ConfirmDialog, EmptyState, ErrorState, Badge, StatusChip, Toast, StatCard, DataTable.

Who can use it:
- All team members.

Best practices:
- Keep components small and generic.
- Do not put feature-specific logic inside shared components.

### frontend/src/shared/layouts/
Why it exists:
- Holds page layouts that wrap feature pages consistently.

What goes inside:
- AppLayout, DashboardLayout, AuthLayout, AdminLayout.

Who can use it:
- All team members.

Best practices:
- Layouts should only manage structure, not business logic.

### frontend/src/shared/hooks/
Why it exists:
- Holds reusable logic that multiple features need.

What goes inside:
- useAuth, useFetch, usePagination, useDebounce, useModal, useSearch, useNotification.

Who can use it:
- All team members.

Best practices:
- Hooks should remain generic and reusable.

### frontend/src/shared/utils/
Why it exists:
- Keeps common helper logic in one place.

What goes inside:
- formatDate, formatCurrency, generateAssetTag, validateEmail, validatePhone, bookingConflictChecker, calculateAssetAge, priorityColor, statusColor.

Who can use it:
- All team members.

Best practices:
- Utilities should be pure and easy to test.

### frontend/src/shared/api/
Why it exists:
- Centralizes API access so every feature uses the same client style.

What goes inside:
- apiClient.js, authApi.js, assetApi.js, allocationApi.js, maintenanceApi.js, reportApi.js, notificationApi.js, endpoints.js.

Who can use it:
- All team members.

Best practices:
- Keep API calls consistent and small.
- Feature-specific logic should stay in feature services.

### frontend/src/shared/constants/
Why it exists:
- Stores shared constants such as roles, statuses, routes, and labels.

What goes inside:
- userRoles.js, assetStatuses.js, bookingStatuses.js, routeNames.js, priorityLevels.js.

Who can use it:
- All team members.

Best practices:
- Avoid hardcoding the same values in multiple places.

### frontend/src/shared/services/
Why it exists:
- Holds shared service modules for common business actions.

What goes inside:
- authService.js, uploadService.js, notificationService.js, reportService.js.

Who can use it:
- All team members.

Best practices:
- Services should wrap repeated application logic.

### frontend/src/shared/icons/
Why it exists:
- Keeps icon assets organized and reusable.

What goes inside:
- SVG icon components or icon index files.

Who can use it:
- All team members.

Best practices:
- Avoid adding one-off icons directly into feature folders.

### frontend/src/shared/types/
Why it exists:
- Stores shared type definitions for better consistency.

What goes inside:
- userTypes.js, assetTypes.js, bookingTypes.js, apiResponseTypes.js.

Who can use it:
- All team members.

Best practices:
- Keep types simple and readable.

## Reusable Components to Share

- Sidebar
- Navbar
- Footer
- Header
- Button
- Card
- Table
- Input
- SearchBar
- Modal
- Loader
- Pagination
- ConfirmDialog
- EmptyState
- ErrorState
- Badge
- StatusChip
- NotificationToast
- StatCard
- DataTable

## Reusable Utilities to Share

- formatDate()
- formatCurrency()
- generateAssetTag()
- validateEmail()
- validatePhone()
- bookingConflictChecker()
- calculateAssetAge()
- priorityColor()
- statusColor()

## Reusable Hooks to Share

- useAuth()
- useFetch()
- usePagination()
- useDebounce()
- useModal()
- useSearch()
- useNotification()

## Shared API Structure

- authApi.js
- assetApi.js
- allocationApi.js
- maintenanceApi.js
- reportApi.js
- notificationApi.js
- apiClient.js
- endpoints.js

## Integration Rule

Only the Team Lead should edit the final integration files:
- frontend/src/App.jsx
- backend/src/server.js

## Team Lead Integration Checklist

### Final Hour Plan
1. Confirm every feature folder is complete.
2. Merge all feature folders into the main project structure.
3. Wire routes in App.jsx.
4. Register backend routes in server.js.
5. Verify shared components and utilities are imported correctly.
6. Check authentication flow and protected routes.
7. Test dashboard, asset, booking, maintenance, audit, and report pages.
8. Fix any broken imports or route paths.
9. Ensure database schema and seed data are present.
10. Prepare a short demo flow for the hackathon presentation.

## Notes

- Each member works only inside their own feature folder.
- Shared folders are limited to reusable UI, utilities, and API config.
- Final integration should happen once at the end.
