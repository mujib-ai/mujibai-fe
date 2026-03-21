# Feature-Based Migration Plan (Full Refactor)

This document provides a complete plan to refactor the project to a **fully feature-based** structure. No business logic or UI behavior changes—only file moves, renames, and import/export updates.

---

## A) Complete Feature List (Inferred from Project)

Features are inferred from:
- **Routes** in `src/app`: `(auth)`, `admin-dashboard/*`, `dashboard/*`, `/`, `not-found`
- **Services**: `auth.service.ts`, `plans.service.ts`, `tenants.service.ts`
- **Hooks**: `useAuth`, `useEnroll`, `usePlans`, `useClient`, `useTenants` (tenants/useTenants), `useDebounce`, `use-mobile`, `useErrorMessage`, `useRealTime`
- **UI**: Page components under `components/pages` and domain-specific molecules/organisms

Resulting **feature list** (19 features):

| # | Feature name        | Routes / scope | Key assets to move |
|---|---------------------|----------------|---------------------|
| 1 | **auth**            | `/login`, `/forget-password`, `/reset-password`, `/password-reset-requested` | `auth.service`, `useAuth`, LoginPage, ForgetPasswordPage, ResetPasswordPage, PasswordResetRequestedPage |
| 2 | **enroll**          | `/enroll` (public) | `useEnroll`, EnrollmentForm organism, EnrollPage |
| 3 | **landing**         | `/` (home)    | LandingPage, HeroSection, PricingSection, AboutUsSection, ContactUsSection, FeaturesSection, TargetedSectorsSection, WhyChooseUs, Navbar, MobileView, Footer, PricingCards, FeatureCard, LogoutDialog |
| 4 | **plans**           | `/admin-dashboard/plans` | `plans.service`, `usePlans`, `plans.types`, `createPlanSchema`, QUERY_KEYS.plans, PlansPage, PlansTable, CreatePlanDialog, UpdatePlanDialog, ViewPlanDialog, PlansSearchAndFiltering, PlanCard, PlanBasicInfoFields, PlanFeaturesField, PlanSubscriptionTypeField, plansColumns, PlansEmptyState, PlansTablePagination, PlansTableSkeleton, __tests__ |
| 5 | **clients**         | `/admin-dashboard/clients` | `tenants.service`, `useTenants`, `useClient`, Client/CreateClientPayload/UpdateClientPayload types, ClientsPage, ClientsTable, CreateClientDialog, ClientsSearchAndFiltering, clientsColumns, ClientsTablePagination, CreateTenantForm, CreateTenantFormFields, tenant-form schema + constants |
| 6 | **subscriptions**   | `/admin-dashboard/subscription` | SubscriptionPage, SubscriptionTable, SubscriptionsSearching |
| 7 | **user-roles**      | `/admin-dashboard/user-roles` | UsersRolesPage, UserRolesTable, CreateUserDialog, UserRolesSearchAndFiltering |
| 8 | **enrollments**     | `/admin-dashboard/enrollment-form` | EnrollmentFormPage, EnrollsTable, EnrollsSearchAndFiltering |
| 9 | **admin-overview**  | `/admin-dashboard` (overview) | AdminDashboardOverviewPage, AdminOverviewTable, AdminOverviewColumns, AdminOverviewToolbar, TableCellViewer, Top5ActiveClients, initialData usage |
| 10 | **admin-analytics** | `/admin-dashboard/analytics` | AdminAnalyticsPage, AnalyticsStatistics, CallsOverTimeAnalytics, TicketVolumeAnalytics, TotalVisitorsAnalytics, AnalyticsStatisticsCard |
| 11 | **admin-settings**  | `/admin-dashboard/settings` | SettingsPage (admin) |
| 12 | **admin-api-keys**  | `/admin-dashboard` api-keys (admin) | ApiKeysPage (admin) |
| 13 | **client-overview**  | `/dashboard` (overview) | ClientDashboardOverviewPage, RecentClientsTable, RecentClientsTablePagination, DataUsageCard |
| 14 | **client-analytics**| `/dashboard/performance-analytics` | PerformanceAnalyticsPage, DailyAICalls, DailyAICallsAnalytics, ConversionsOverview, IntentDetectionAccuracy, ScenarioPerformance, ScenarioPerformanceAnalytics, StatisticsCards, DataUsageCard (if only here; else shared) |
| 15 | **client-calls-tickets** | `/dashboard/calls-tickets` | CallsAndTicketsPage, CallsAndTicketsTable, CallsAndTicketsFiltering, CallsAndTicketsTablePagination |
| 16 | **client-voice-script** | `/dashboard/voice-script` | VoiceScriptPage, CallGreetingVoice, MainConversationScript, MainConversationScriptTab, ConversationScriptDescriptionTab |
| 17 | **client-ai-outbound** | `/dashboard/ai-outbound` | AiOutboundPage |
| 18 | **client-settings**  | `/dashboard/settings` | ClientSettingsPage, AccountSettings, IntegrationSettings, NotificationPreference |
| 19 | **client-api-keys**  | `/dashboard/api-keys` | ApiKeysPage (client) |

**Shared (used by 2+ features):**
- **DashboardHeader** (admin + client pages) → `shared/components/sections`
- **AdminSidebar**, **ClientSidebar** (layout-level; can stay in a single “shell” feature or move to shared—recommended: **admin-shell** / **client-shell** or shared sections)
- **ActionsButtons**, **SessionControls**, **Header** (landing/auth) → shared if used in 2+ features
- **useAuth** (logout in sidebars, auth pages) → feature `auth`; others import from `@/features/auth`
- **useErrorMessage**, **ErrorContentBox** → shared
- All **atoms** (ui/*, PasswordInput, LanguageSwitcher, Logo, ThemeProvider, ThemeSwitcher, DragHandle) → `shared/components/atoms`
- **Form field molecules** (TextFormField, SelectFormField, PasswordFormField, TextareaFormField) → `shared/components/molecules`
- **NotificationController**, **IntegrationCard**, **StatisticsCard**, **ErrorContentBox**, **FeatureCard**, **PricingCard** (if used in 2+ features) → shared
- **axiosInstance**, **lib/utils**, **getFromCookies**, **showErrors**, **generateUUID**, **chart-config** → `shared/utils` or `shared/lib`
- **Types**: `User`, `Item`, `Client`, `EnrollmentFormValues`, `ClientResponse`, `ClientsListResponse`, `schema` (yup) → `shared/types` (or split: auth types in auth, client types in shared/types used by clients + client-dashboard)
- **Constants**: generic app constants → `shared/constants`; plan-specific (e.g. QUERY_KEYS.plans) → `features/plans/constants.ts`
- **Providers** (Providers, ReactQueryProvider) → `providers/` at src root (or under shared)
- **data.json** (admin overview) → `features/admin-overview/data` or `shared/data` if used elsewhere

**Note:** There is no `src/common` folder in the repo. Any “common” modules are currently in `src/types`, `src/constants`, `src/lib`, `src/utils`; these are consolidated into `src/shared` as below.

---

## B) Final Full Folder Tree (All Features)

```
src/
  app/
    (auth)/
      enroll/page.tsx
      forget-password/page.tsx
      login/page.tsx
      password-reset-requested/page.tsx
      reset-password/page.tsx
    admin-dashboard/
      analytics/page.tsx
      clients/page.tsx
      enrollment-form/page.tsx
      layout.tsx
      page.tsx
      plans/page.tsx
      settings/page.tsx
      subscription/page.tsx
      user-roles/page.tsx
    dashboard/
      ai-outbound/page.tsx
      api-keys/page.tsx
      calls-tickets/page.tsx
      layout.tsx
      page.tsx
      performance-analytics/page.tsx
      settings/page.tsx
      voice-script/page.tsx
    layout.tsx
    loading.tsx
    not-found.tsx
    page.tsx
  features/
    auth/
      components/
        LoginPage.tsx
        ForgetPasswordPage.tsx
        ResetPasswordPage.tsx
        PasswordResetRequestedPage.tsx
      hooks/
        useAuth.ts
      services/
        auth.service.ts
      types.ts
      index.ts
    enroll/
      components/
        EnrollPage.tsx
        EnrollmentForm.tsx
      hooks/
        useEnroll.ts
      types.ts
      index.ts
    landing/
      components/
        LandingPage.tsx
        HeroSection.tsx
        PricingSection.tsx
        AboutUsSection.tsx
        ContactUsSection.tsx
        FeaturesSection.tsx
        TargetedSectorsSection.tsx
        WhyChooseUs.tsx
        Navbar.tsx
        MobileView.tsx
        Footer.tsx
        PricingCards.tsx
        LogoutDialog.tsx
      index.ts
    plans/
      components/
        PlansPage.tsx
        PlanCard.tsx
        PlanCardSkeleton.tsx
        PlanBasicInfoFields.tsx
        PlanFeaturesField.tsx
        PlanSubscriptionTypeField.tsx
        PlansEmptyState.tsx
        PlansTablePagination.tsx
        PlansTableSkeleton.tsx
        plansColumns.tsx
        PlansSearchAndFiltering.tsx
        PlansTable.tsx
        CreatePlanDialog.tsx
        UpdatePlanDialog.tsx
        ViewPlanDialog.tsx
      hooks/
        usePlans.ts
      services/
        plans.service.ts
      __tests__/
        CreatePlanDialog.test.tsx
        PlansTable.test.tsx
        UpdatePlanDialog.test.tsx
      types.ts
      constants.ts
      validators.ts
      index.ts
    clients/
      components/
        ClientsPage.tsx
        ClientsTable.tsx
        CreateClientDialog.tsx
        ClientsSearchAndFiltering.tsx
        clientsColumns.tsx
        ClientsTablePagination.tsx
        CreateTenantForm.tsx
        CreateTenantFormFields.tsx
      hooks/
        useTenants.ts
        useClient.ts
      services/
        tenants.service.ts
      types.ts
      validators.ts
      constants.ts
      index.ts
    subscriptions/
      components/
        SubscriptionPage.tsx
        SubscriptionTable.tsx
        SubscriptionsSearching.tsx
      index.ts
    user-roles/
      components/
        UsersRolesPage.tsx
        UserRolesTable.tsx
        CreateUserDialog.tsx
        UserRolesSearchAndFiltering.tsx
      index.ts
    enrollments/
      components/
        EnrollmentFormPage.tsx
        EnrollsTable.tsx
        EnrollsSearchAndFiltering.tsx
      index.ts
    admin-overview/
      components/
        AdminDashboardOverviewPage.tsx
        AdminOverviewTable.tsx
        AdminOverviewColumns.tsx
        AdminOverviewToolbar.tsx
        TableCellViewer.tsx
        Top5ActiveClients.tsx
      data/
        data.json
      index.ts
    admin-analytics/
      components/
        AdminAnalyticsPage.tsx
        AnalyticsStatistics.tsx
        CallsOverTimeAnalytics.tsx
        TicketVolumeAnalytics.tsx
        TotalVisitorsAnalytics.tsx
      index.ts
    admin-settings/
      components/
        SettingsPage.tsx
      index.ts
    admin-api-keys/
      components/
        ApiKeysPage.tsx
      index.ts
    client-overview/
      components/
        ClientDashboardOverviewPage.tsx
        RecentClientsTable.tsx
        RecentClientsTablePagination.tsx
        DataUsageCard.tsx
      index.ts
    client-analytics/
      components/
        PerformanceAnalyticsPage.tsx
        DailyAICalls.tsx
        DailyAICallsAnalytics.tsx
        ConversionsOverview.tsx
        IntentDetectionAccuracy.tsx
        ScenarioPerformance.tsx
        ScenarioPerformanceAnalytics.tsx
        StatisticsCards.tsx
      index.ts
    client-calls-tickets/
      components/
        CallsAndTicketsPage.tsx
        CallsAndTicketsTable.tsx
        CallsAndTicketsFiltering.tsx
        CallsAndTicketsTablePagination.tsx
      index.ts
    client-voice-script/
      components/
        VoiceScriptPage.tsx
        CallGreetingVoice.tsx
        MainConversationScript.tsx
        MainConversationScriptTab.tsx
        ConversationScriptDescriptionTab.tsx
      index.ts
    client-ai-outbound/
      components/
        AiOutboundPage.tsx
      index.ts
    client-settings/
      components/
        ClientSettingsPage.tsx
        AccountSettings.tsx
        IntegrationSettings.tsx
        NotificationPreference.tsx
      index.ts
    client-api-keys/
      components/
        ApiKeysPage.tsx
      index.ts
  shared/
    components/
      atoms/
        DragHandle.tsx
        LanguageSwitcher.tsx
        Logo.tsx
        PasswordInput.tsx
        ThemeProvider.tsx
        ThemeSwitcher.tsx
        ui/
          alert.tsx
          avatar.tsx
          badge.tsx
          button.tsx
          card.tsx
          chart.tsx
          checkbox.tsx
          dialog.tsx
          drawer.tsx
          dropdown-menu.tsx
          input.tsx
          label.tsx
          pagination.tsx
          progress.tsx
          select.tsx
          separator.tsx
          sheet.tsx
          sidebar.tsx
          skeleton.tsx
          sonner.tsx
          switch.tsx
          table.tsx
          tabs.tsx
          textarea.tsx
          tooltip.tsx
      molecules/
        ErrorContentBox.tsx
        FeatureCard.tsx
        IntegrationCard.tsx
        NotificationController.tsx
        PasswordFormField.tsx
        PricingCard.tsx
        SelectFormField.tsx
        StatisticsCard.tsx
        TextareaFormField.tsx
        TextFormField.tsx
      organisms/
        ActionsButtons.tsx
        Header.tsx
        SessionControls.jsx
      sections/
        DashboardHeader.tsx
        AdminSidebar.tsx
        ClientSidebar.tsx
      templates/
        Footer.tsx
    hooks/
      useDebounce.ts
      use-mobile.ts
      useErrorMessage.tsx
      useRealTime.ts
    utils/
      axiosInstance.ts
      chart-config.ts
      generateUUID.ts
      getFromCookies.ts
      showErrors.ts
    types/
      index.ts
      plans.types.ts
    constants/
      index.ts
    lib/
      utils.ts
  i18n/
    config.ts
    request.ts
    messages/
      ar/
        adminDashboard.json
        dashboard.json
        enrollPage.json
        forgetPasswordPage.json
        landingPage.json
        loginPage.json
        passwordResetRequested.json
        resetPasswordPage.json
      en/
        adminDashboard.json
        dashboard.json
        enrollPage.json
        forgetPasswordPage.json
        landingPage.json
        loginPage.json
        passwordResetRequested.json
        resetPasswordPage.json
  providers/
    Providers.tsx
    ReactQueryProvider.tsx
  styles/
    globals.css
```

**Removed after migration:**
- `src/components` (entire tree moved to `features/*/components` or `shared/components`)
- `src/hooks` (moved to `features/*/hooks` or `shared/hooks`)
- `src/services` (moved to `features/*/services`)
- `src/types` (moved to `shared/types` and feature-level `types.ts`)
- `src/constants` (moved to `shared/constants` and feature-level `constants.ts`)
- `src/utils` (moved to `shared/utils` and feature-level if any)
- `src/lib` (moved to `shared/lib`)
- `src/messages` (moved to `src/i18n/messages`)
- `src/data` (moved to `features/admin-overview/data` or `shared/data`)
- Root `i18n/` (use only `src/i18n`)

**Naming:** kebab-case folders (e.g. `client-api-keys`), PascalCase components. No “pages” under components; app router owns pages; feature “screens” live in `features/<name>/components`.

---

## C) Safe Migration Plan (Ordered Steps)

Execute in order to avoid breakage and circular dependencies.

### Phase 1: Create new structure (no moves yet)
1. Create `src/features` and all feature directories: `auth`, `enroll`, `landing`, `plans`, `clients`, `subscriptions`, `user-roles`, `enrollments`, `admin-overview`, `admin-analytics`, `admin-settings`, `admin-api-keys`, `client-overview`, `client-analytics`, `client-calls-tickets`, `client-voice-script`, `client-ai-outbound`, `client-settings`, `client-api-keys`.
2. Under each feature create: `components/`, `hooks/` (if needed), `services/` (if needed), and add `types.ts`, `constants.ts`, `validators.ts`, `index.ts` only where the feature has such modules.
3. Create `src/shared` with: `components/atoms`, `components/molecules`, `components/organisms`, `components/sections`, `components/templates`, `hooks`, `utils`, `types`, `constants`, `lib`.

### Phase 2: Shared first (dependencies of features)
4. Move `src/lib/utils.ts` → `src/shared/lib/utils.ts`. Update imports to `@/shared/lib/utils` or keep `@/*` and add path `@/shared/*` → `./src/shared/*` (see E).
5. Move `src/utils/*` → `src/shared/utils/*` (axiosInstance, chart-config, generateUUID, getFromCookies, showErrors). Do not move `utils/validations/createPlanSchema.ts` yet (belongs to plans).
6. Move all of `src/components/atoms` → `src/shared/components/atoms`. Update every import from `@/components/atoms/*` to `@/shared/components/atoms/*` (or `@/shared/*` if alias is set).
7. Move shared molecules: ErrorContentBox, FeatureCard, IntegrationCard, NotificationController, PasswordFormField, SelectFormField, StatisticsCard, TextFormField, TextareaFormField, PricingCard (if used in 2+ features) → `src/shared/components/molecules`. Update imports.
8. Move DashboardHeader, AdminSidebar, ClientSidebar → `src/shared/components/sections`. Update all imports.
9. Move ActionsButtons, Header, SessionControls → `src/shared/components/organisms`. Update imports.
10. Move `src/types/index.ts` and `src/types/plans.types.ts` → `src/shared/types/`. Keep plans.types in shared until plans feature is moved (then feature can re-export or import from shared). Update imports to `@/shared/types/*`.
11. Move `src/constants/index.ts` → `src/shared/constants/index.ts`. Remove plan-specific keys into `features/plans/constants.ts` when moving plans. Update imports.
12. Move `src/hooks/useDebounce.ts`, `use-mobile.ts`, `useErrorMessage.tsx`, `useRealTime.ts` → `src/shared/hooks`. Update imports.
13. Move `src/providers` → keep at `src/providers` (or move to `src/shared/providers` if you prefer). Update imports if path changes.
14. Move `src/styles` → keep at `src/styles`. No structural change.

### Phase 3: i18n
15. Create `src/i18n/messages/ar` and `src/i18n/messages/en`. Move all `src/messages/en/*.json` → `src/i18n/messages/en/`, all `src/messages/ar/*.json` → `src/i18n/messages/ar/`.
16. Update `src/i18n/request.ts`: change message paths from `../messages/${locale}/*` to `./messages/${locale}/*`. If a root `i18n/request.ts` exists, remove or point next-intl to `src/i18n/request.ts` only.
17. Add `src/i18n/config.ts` if needed (e.g. locale list, default locale). Ensure next.config keeps `createNextIntlPlugin('./src/i18n/request.ts')`.

### Phase 4: Features (order matters to avoid circular deps)
18. **auth**: Move `auth.service.ts` → `features/auth/services/`, `useAuth.ts` → `features/auth/hooks/`. Move LoginPage, ForgetPasswordPage, ResetPasswordPage, PasswordResetRequestedPage → `features/auth/components/`. Add `features/auth/types.ts` (User if only used by auth; else keep in shared). Add `features/auth/index.ts` re-exporting public API. Update all imports (app (auth) pages, ClientSidebar, AdminSidebar, ActionsButtons, MobileView, etc.).
19. **enroll**: Move useEnroll → `features/enroll/hooks/`, EnrollmentForm + EnrollPage → `features/enroll/components/`. Add types.ts if needed. Update app enroll page and any enroll imports.
20. **landing**: Move LandingPage and all landing templates (HeroSection, PricingSection, AboutUsSection, ContactUsSection, FeaturesSection, TargetedSectorsSection, WhyChooseUs), Navbar, MobileView, Footer, PricingCards, LogoutDialog, FeatureCard/PricingCard if not already in shared → `features/landing/components/`. Update app page and layout imports.
21. **plans**: Move `plans.service.ts` → `features/plans/services/`, `usePlans.ts` → `features/plans/hooks/`, `types/plans.types.ts` → `features/plans/types.ts` (and remove from shared or re-export from shared). Move `utils/validations/createPlanSchema.ts` → `features/plans/validators.ts`. Move QUERY_KEYS.plans → `features/plans/constants.ts`. Move all plan-related molecules and organisms (PlansPage, PlansTable, CreatePlanDialog, UpdatePlanDialog, ViewPlanDialog, PlanCard, PlanCardSkeleton, PlanBasicInfoFields, PlanFeaturesField, PlanSubscriptionTypeField, plansColumns, PlansEmptyState, PlansTablePagination, PlansTableSkeleton, PlansSearchAndFiltering) → `features/plans/components/`. Move __tests__ into `features/plans/__tests__/`. Update all imports (app admin-dashboard/plans, CreateTenantForm, tests).
22. **clients**: Move `tenants.service.ts` → `features/clients/services/`, `useTenants.ts` (tenants/) and `useClient.ts` → `features/clients/hooks/`. Move Client, CreateClientPayload, UpdateClientPayload, ClientResponse, ClientsListResponse from types → `features/clients/types.ts` (or keep in shared/types if used by client-dashboard overview). Move ClientsPage, ClientsTable, CreateClientDialog, ClientsSearchAndFiltering, clientsColumns, ClientsTablePagination, CreateTenantForm, CreateTenantFormFields, tenant-form schema/constants → `features/clients/components/` and `features/clients/validators.ts`, `constants.ts`. Update all imports.
23. **subscriptions**: Move SubscriptionPage, SubscriptionTable, SubscriptionsSearching → `features/subscriptions/components/`. Update app admin-dashboard/subscription page.
24. **user-roles**: Move UsersRolesPage, UserRolesTable, CreateUserDialog, UserRolesSearchAndFiltering → `features/user-roles/components/`. Update app admin-dashboard/user-roles page.
25. **enrollments**: Move EnrollmentFormPage, EnrollsTable, EnrollsSearchAndFiltering → `features/enrollments/components/`. Update app admin-dashboard/enrollment-form page.
26. **admin-overview**: Move AdminDashboardOverviewPage, AdminOverviewTable, AdminOverviewColumns, AdminOverviewToolbar, TableCellViewer, Top5ActiveClients → `features/admin-overview/components/`. Move `src/data/data.json` → `features/admin-overview/data/data.json`. Update app admin-dashboard page.
27. **admin-analytics**: Move AdminAnalyticsPage, AnalyticsStatistics, CallsOverTimeAnalytics, TicketVolumeAnalytics, TotalVisitorsAnalytics, AnalyticsStatisticsCard → `features/admin-analytics/components/`. Update app admin-dashboard/analytics page.
28. **admin-settings**: Move admin SettingsPage → `features/admin-settings/components/`. Update app admin-dashboard/settings page.
29. **admin-api-keys**: Move admin ApiKeysPage → `features/admin-api-keys/components/`. Update app admin-dashboard api-keys page.
30. **client-overview**: Move ClientDashboardOverviewPage, RecentClientsTable, RecentClientsTablePagination, DataUsageCard → `features/client-overview/components/`. Update app dashboard page.
31. **client-analytics**: Move PerformanceAnalyticsPage, DailyAICalls, DailyAICallsAnalytics, ConversionsOverview, IntentDetectionAccuracy, ScenarioPerformance, ScenarioPerformanceAnalytics, StatisticsCards → `features/client-analytics/components/`. Update app dashboard/performance-analytics page.
32. **client-calls-tickets**: Move CallsAndTicketsPage, CallsAndTicketsTable, CallsAndTicketsFiltering, CallsAndTicketsTablePagination → `features/client-calls-tickets/components/`. Update app dashboard/calls-tickets and ai-outbound pages if they use pagination.
33. **client-voice-script**: Move VoiceScriptPage, CallGreetingVoice, MainConversationScript, MainConversationScriptTab, ConversationScriptDescriptionTab → `features/client-voice-script/components/`. Update app dashboard/voice-script page.
34. **client-ai-outbound**: Move AiOutboundPage → `features/client-ai-outbound/components/`. Update app dashboard/ai-outbound page.
35. **client-settings**: Move ClientSettingsPage, AccountSettings, IntegrationSettings, NotificationPreference → `features/client-settings/components/`. Update app dashboard/settings page.
36. **client-api-keys**: Move client ApiKeysPage → `features/client-api-keys/components/`. Update app dashboard/api-keys page.

### Phase 5: App and cleanup
37. Update every `src/app` route file to import from `@/features/<featureName>` (or `@/features/<featureName>/components/<Page>`). Example: `import PlansPage from '@/features/plans';` or `import PlansPage from '@/features/plans/components/PlansPage';`.
38. Update `src/app/admin-dashboard/layout.tsx` to import AdminSidebar from `@/shared/components/sections` (or shared path).
39. Update `src/app/dashboard/layout.tsx` to import ClientSidebar from `@/shared/components/sections`.
40. Delete empty or obsolete dirs: `src/components`, `src/hooks`, `src/services`, `src/types`, `src/constants`, `src/utils`, `src/lib`, `src/messages`, `src/data` (after moving data.json). Remove root `i18n/` if redundant.
41. Resolve circular dependencies: if any feature imports another feature, extract shared types/hooks into `src/shared`. Ensure features only depend on `shared` and optionally other features via their public `index.ts`.

---

## D) Verification Checklist

Run after each phase (or after full migration):

- [ ] **TypeScript**: `pnpm exec tsc --noEmit` (or `npm run build`). No type errors.
- [ ] **Lint**: `pnpm run lint` (or `npm run lint`). No new violations.
- [ ] **Tests**: `pnpm test` (or `npm run test`). All tests pass (update test imports if they reference old paths).
- [ ] **Build**: `pnpm run build` (or `npm run build`). Build succeeds.
- [ ] **Routes**: Manually or via Playwright: open `/`, `/login`, `/enroll`, `/forget-password`, `/reset-password`, `/password-reset-requested`, `/admin-dashboard`, `/admin-dashboard/plans`, `/admin-dashboard/clients`, `/admin-dashboard/enrollment-form`, `/admin-dashboard/analytics`, `/admin-dashboard/settings`, `/admin-dashboard/subscription`, `/admin-dashboard/user-roles`, `/dashboard`, `/dashboard/performance-analytics`, `/dashboard/calls-tickets`, `/dashboard/voice-script`, `/dashboard/ai-outbound`, `/dashboard/settings`, `/dashboard/api-keys`. No 404s or runtime errors.
- [ ] **i18n**: Switch locale (e.g. LANG=ar). All moved message files load; no missing key errors in console.
- [ ] **No circular deps**: Use e.g. `madge --circular src/` or ESLint plugin; fix any cycles by moving shared code to `src/shared`.

---

## E) Config Edits (Exact Files and Changes)

### 1. `tsconfig.json`

- **Path alias**: Ensure `@/*` continues to point to `./src/*` so that `@/features/...` and `@/shared/...` resolve.
  - Current: `"paths": { "@/*": ["./src/*"] }` — no change needed if you keep importing as `@/features/...` and `@/shared/...` (they live under `src/`).
  - Optional: add explicit aliases for clarity and IDE resolution:
    - `"@/features/*": ["./src/features/*"]`
    - `"@/shared/*": ["./src/shared/*"]`
  - No other compilerOptions changes required.

### 2. `jest.config.ts`

- **Path alias**: Jest is driven by `next/jest`, which uses Next.js config and typically tsconfig. After adding path aliases in tsconfig, run tests; if Jest fails to resolve `@/features/*` or `@/shared/*`, add in `jest.config.ts`:
  - `moduleNameMapper`: map `^@/features/(.*)$` to `<rootDir>/src/features/$1`, and `^@/shared/(.*)$` to `<rootDir>/src/shared/$1`. Example:

```ts
moduleNameMapper: {
  '^@/features/(.*)$': '<rootDir>/src/features/$1',
  '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
  '^@/(.*)$': '<rootDir>/src/$1',
},
```

- Only add this if tests fail to resolve imports after migration.

### 3. `eslint.config.mjs`

- No change required for path resolution. If you add an import plugin (e.g. eslint-plugin-import) and restrict imports (e.g. features cannot import from other features except via index), add those rules in a later pass. Not required for the migration itself.

### 4. `next.config.ts`

- No change. Already uses `createNextIntlPlugin('./src/i18n/request.ts')`. After moving messages to `src/i18n/messages/`, only `src/i18n/request.ts` import paths change (see Phase 3).

### 5. `src/i18n/request.ts`

- Change every message import from:
  - `../messages/${locale}/...` 
  - to:
  - `./messages/${locale}/...`

### 6. Root `i18n/request.ts` (if present)

- Remove this file or ensure it is not used by next-intl (next.config should point only to `./src/i18n/request.ts`). Avoid duplicate i18n config.

---

**Summary:** Apply the same feature pattern to all 19 features; shared code lives only under `src/shared`; app stays thin and composes feature screens; i18n is unified under `src/i18n`; no `src/common` (none found); renames like `components/pages` → `shared/components/sections` for shared “page-like” components (e.g. DashboardHeader). After migration, run the verification checklist and fix any broken imports or circular deps.
