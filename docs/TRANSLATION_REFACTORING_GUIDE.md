# Admin Dashboard Translation Refactoring Guide

## Overview

The admin dashboard translations have been refactored from a flat, feature-based structure to a more maintainable, grouped structure.

## New Translation Structure

### Top-Level Groups

- `sidebar` - Sidebar navigation items
- `navbar` - Navbar elements
- `common` - Common UI elements (buttons, actions, statuses)
- `tables` - Table-related translations
  - `tables.columns` - Column headers
  - `tables.pagination` - Pagination controls
- `placeholders` - Input placeholders
- `actions` - Action buttons and labels
- `dialogs` - Dialog/modal content
  - `dialogs.createClient`
  - `dialogs.createUser`
  - `dialogs.createPlan`
- `states` - UI states
  - `states.empty`
  - `states.error`
  - `states.loading`
  - `states.status`
- Feature-specific sections:
  - `clients`
  - `plans`
  - `subscriptions`
  - `userRoles`
  - `enrollmentForms`
  - `analytics`
  - `overview`
  - `settings`

## Migration Patterns

### Pattern 1: Sidebar

**Old:**

```tsx
const t = useTranslations('adminSidebar');
t('dashboard');
```

**New:**

```tsx
const t = useTranslations('sidebar');
t('dashboard');
```

### Pattern 2: Table Columns

**Old:**

```tsx
const t = useTranslations('adminClients.clientsTable');
buildColumns(t);
```

**New:**

```tsx
const tColumns = useTranslations('tables.columns');
const tCommon = useTranslations('common');
buildColumns({ tColumns, tCommon });
```

### Pattern 3: Search Placeholders

**Old:**

```tsx
const t = useTranslations('adminClients.ClientsSearchAndFiltering');
placeholder={t('searchPlaceholder')}
```

**New:**

```tsx
const tPlaceholders = useTranslations('placeholders');
placeholder={tPlaceholders('searchByNameEmailSector')}
```

### Pattern 4: Actions/Buttons

**Old:**

```tsx
const t = useTranslations('adminClients.CreateClientDialog');
{
  t('createClientButton');
}
```

**New:**

```tsx
const tActions = useTranslations('actions');
{
  tActions('createClient');
}
```

### Pattern 5: Dialog Fields

**Old:**

```tsx
const t = useTranslations('adminClients.CreateClientDialog.fields');
label={t('clientName.label')}
```

**New:**

```tsx
const tDialog = useTranslations('dialogs.createClient.fields');
const tPlaceholders = useTranslations('placeholders');
label={tDialog('clientName')}
placeholder={tPlaceholders('enterClientName')}
```

### Pattern 6: Empty/Error States

**Old:**

```tsx
const t = useTranslations('adminPlans.plansTable');
{
  t('noResults');
}
```

**New:**

```tsx
const tStates = useTranslations('states.empty');
{
  tStates('noResults');
}
```

### Pattern 7: Pagination

**Old:**

```tsx
<Pagination table={table} t={t} />
```

**New:**

```tsx
<Pagination table={table} />
// Component uses useTranslations('tables.pagination') internally
```

## Component Updates Completed

### ✅ Updated Components

1. `AdminSidebar.tsx` - Uses `sidebar.*`
2. `ClientsSearchAndFiltering.tsx` - Uses `placeholders.*` and `actions.*`
3. `clientsColumns.tsx` - Uses `tables.columns.*` and `common.*`
4. `ClientsTable.tsx` - Uses multiple translation namespaces
5. `ClientsTablePagination.tsx` - Uses `tables.pagination.*`

### 🔄 Components Requiring Updates

The following components still use old translation keys and need to be updated:

#### High Priority

- `CreateClientDialog.tsx` - Update to use `dialogs.createClient.*`
- `ClientsPage.tsx` - Update to use `navbar.welcome`
- `PlansTable.tsx` - Update to use new table structure
- `PlansSearchAndFiltering.tsx` - Update to use `placeholders.*` and `actions.*`
- `CreatePlanDialog.tsx` - Update to use `dialogs.createPlan.*`
- `UserRolesTable.tsx` - Update to use new table structure
- `CreateUserDialog.tsx` - Update to use `dialogs.createUser.*`

#### Medium Priority

- `AdminOverviewTable.tsx`
- `SubscriptionTable.tsx`
- `EnrollsTable.tsx`
- Analytics components

#### Low Priority

- Settings components
- Other page components

## Benefits

1. **No Duplication**: Common keys like "name", "email", "phone" are defined once in `tables.columns`
2. **Consistency**: All tables use the same column translations
3. **Maintainability**: Easier to find and update translations
4. **Scalability**: New features can reuse existing translation groups
5. **Type Safety**: Clearer namespace boundaries
6. **Smaller Bundles**: Better tree-shaking potential

## Key Changes Summary

- Removed nested component-specific translation keys
- Grouped translations by purpose (tables, actions, placeholders, etc.)
- Standardized naming conventions
- Eliminated duplicate keys between English and Arabic
- Fixed duplicate key lint errors ("columns" vs "columnsLabel")

## Next Steps

1. Update remaining high-priority components
2. Test all updated components
3. Remove old translation keys once migration is complete
4. Update any documentation referencing old translation structure
