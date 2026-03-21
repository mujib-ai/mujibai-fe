# Full Feature-Based Refactor Plan

This document is the single source of truth for refactoring the entire project to a feature-based structure. It includes: (A) feature list, (B) final folder tree, (C) ordered migration steps, (D) verification checklist, and (E) config edits.

---

## A) Complete Feature List (Inferred from Project)

Inferred from `src/app` routes, `src/services`, `src/hooks`, and UI component usage.

| # | Feature | App routes | Services / API | Hooks | UI (components/pages/templates) |
|---|---------|------------|----------------|-------|----------------------------------|
| 1 | **auth** | `(auth)/login`, `forget-password`, `reset-password`, `password-reset-requested`, `enroll` | auth.service | useAuth, useLoginForm, useForgetPassword, usePasswordResetRequested, useResetPasswordForm | LoginPage, ForgetPasswordPage, ResetPasswordPage, PasswordResetRequestedPage, EnrollPage (auth), ForgetPasswordForm, ForgetPasswordTemplate; molecules: LoginComponents, LoginPasswordField, EmailField, PasswordField, PasswordResetComponents, ResetPasswordComponents |
| 2 | **plans** | `admin-dashboard/plans` | plans.service | usePlans, usePlansFilters, useUpdatePlanDialog | PlansPage, PlansPageTemplate, UpdatePlanDialogTemplate, CreatePlanDialog, UpdatePlanDialog, ViewPlanDialog, PlansTable, PlansSearchAndFiltering, UpdatePlanDialogOrganism, PlansPageOrganism; molecules: plansColumns, PlanCard, PlanCardSkeleton, PlanBasicInfoFields, PlanFeaturesField, PlanSubscriptionTypeField, PlansEmptyState, PlansTablePagination, PlansTableSkeleton; validators: createPlanSchema |
| 3 | **clients** (tenants) | `admin-dashboard/clients` | tenants.service | useTenants | ClientsPage, ClientsTable, ClientsSearchAndFiltering, CreateClientDialog, ClientsTablePagination, clientsColumns; tenant-form: CreateTenantForm, CreateTenantFormFields, schema |
| 4 | **enrollment** | `(auth)/enroll` (form), `admin-dashboard/enrollment-form` (list) | (uses tenants or enroll API) | useEnroll, useEnrollmentForm | EnrollmentForm (organism), EnrollsSearchAndFiltering, EnrollsTable; EnrollPage uses this form |
| 5 | **admin-dashboard** | `admin-dashboard` (layout), `analytics`, `enrollment-form`, `settings`, `subscription`, `user-roles`, root `page` (overview) | — | useSettings | AdminSidebar, AdminAnalyticsPage, AdminDashboardOverviewPage, ApiKeysPage (admin), EnrollmentFormPage, SettingsPage, SubscriptionPage, UsersRolesPage; overview: AdminOverviewTable, TableCellViewer, Top5ActiveClients, AdminOverviewColumns, AdminOverviewPagination, AdminOverviewToolbar, DraggableRow; analytics: AnalyticsStatistics, CallsOverTimeAnalytics, TicketVolumeAnalytics, TotalVisitorsAnalytics; enrolls: EnrollsSearchAndFiltering, EnrollsTable; subscriptions: SubscriptionsSearching, SubscriptionTable; user-roles: CreateUserDialog, UserRolesSearchAndFiltering, UserRolesTable; NotificationSettingsOrganism, ThemeSettingsOrganism, SettingsPageOrganism, PlansPageOrganism, SettingsPageTemplate; molecules: AnalyticsStatisticsCard |
| 6 | **client-dashboard** | `dashboard` (layout), `api-keys`, `calls-tickets`, `performance-analytics`, `settings`, `voice-script`, `ai-outbound`, root `page` | — | useApiKeys, useClientSettings, useClient | ClientSidebar, DashboardHeader (used by both admin + client → shared), ApiKeysPage, ClientSettingsPage, AiOutboundPage, CallsAndTicketsPage, ClientDashboardOverviewPage, PerformanceAnalyticsPage, VoiceScriptPage; ApiKeysHeaderOrganism, ApiKeysPageOrganism, ApiKeysTableOrganism, ClientSettingsPageOrganism, SettingsTabsOrganism; account: AccountSettings, IntegrationSettings, NotificationPreference; analytics: ConversionsOverview, DailyAICalls, DailyAICallsAnalytics, DataUsageCard, IntentDetectionAccuracy, ScenarioPerformance, etc.; calls-tickets: CallsAndTicketsFiltering, CallsAndTicketsTable, CallsAndTicketsTablePagination; chat-flow: CallGreetingVoice, ConversationScriptDescriptionTab, MainConversationScript, MainConversationScriptTab; home: RecentClientsTable, RecentClientsTablePagination; ApiKeysPageTemplate, ClientSettingsPageTemplate |
| 7 | **landing** | `/` (root) | — | — | LandingPage, HeroSection, PricingSection, AboutUsSection, ContactUsSection, TargetedSectorsSection, WhyChooseUs, FeaturesSection, Footer; molecules/landing: Navbar, MobileView, dialogs/LogoutDailog; Header, PricingCards (used only on landing), EnrollmentForm (used on enroll page – can be from enrollment feature) |

**Shared (used by 2+ features or global):**

- **shared/components**: atoms (all UI primitives, DragHandle, LanguageSwitcher, Logo, PasswordInput, ThemeProvider, ThemeSwitcher, all `atoms/ui/*`), molecules used in multiple features (FormField, FormFieldTextarea, FeatureCard, PricingCard, ErrorContentBox, NotificationController, SelectFormField, TextFormField, TextareaFormField, PasswordFormField, StatisticsCard, AnalyticsStatisticsCard, IntegrationCard), organisms: ActionsButtons, SessionControls, Footer; **DashboardHeader** (used by admin + client) → shared.
- **shared/hooks**: use-mobile, useDebounce, useErrorMessage, useRealTime.
- **shared/utils**: axiosInstance, chart-config, generateUUID, getFromCookies, showErrors; validations only if not feature-specific (createPlanSchema → plans feature).
- **shared/lib**: utils.ts (cn, etc.).
- **shared/types**: api-key, client, common, plan, settings, user; add **Item** (admin overview table row type) to shared/types if not present (e.g. `overview.d.ts` or in common).
- **shared/constants**: api-keys, plan, query, settings, index.
- **shared/data**: data.json (used by AdminDashboardOverviewPage).
- **providers**: Providers, ReactQueryProvider (stay at `src/providers`).

**Replace @/common completely:** All current `@/common/types` and `@/common/constants` references point to shared; ensure no `src/common` folder – use `@/shared/types` and `@/shared/constants` only.

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
        ForgetPasswordForm.tsx
        ForgetPasswordTemplate.tsx
        LoginPage.tsx
        ForgetPasswordPage.tsx
        ResetPasswordPage.tsx
        PasswordResetRequestedPage.tsx
        EnrollPage.tsx
      hooks/
        useAuth.ts
        useLoginForm.ts
        useForgetPassword.ts
        usePasswordResetRequested.ts
        useResetPasswordForm.ts
      services/
        auth.service.ts
      types.ts
      constants.ts
      index.ts
    plans/
      components/
        CreatePlanDialog.tsx
        PlansPage.tsx
        PlansPageTemplate.tsx
        PlansSearchAndFiltering.tsx
        PlansTable.tsx
        UpdatePlanDialog.tsx
        UpdatePlanDialogOrganism.tsx
        UpdatePlanDialogTemplate.tsx
        ViewPlanDialog.tsx
        PlansPageOrganism.tsx
        PlanBasicInfoFields.tsx
        PlanCard.tsx
        PlanCardSkeleton.tsx
        PlanFeaturesField.tsx
        PlanSubscriptionTypeField.tsx
        PlansEmptyState.tsx
        PlansTablePagination.tsx
        PlansTableSkeleton.tsx
        plansColumns.tsx
        __tests__/
          CreatePlanDialog.test.tsx
          PlansTable.test.tsx
          UpdatePlanDialog.test.tsx
      hooks/
        usePlans.ts
        usePlansFilters.ts
        useUpdatePlanDialog.ts
      services/
        plans.service.ts
      types.ts
      constants.ts
      validators.ts
      index.ts
    clients/
      components/
        ClientsPage.tsx
        ClientsSearchAndFiltering.tsx
        ClientsTable.tsx
        ClientsTablePagination.tsx
        CreateClientDialog.tsx
        clientsColumns.tsx
        CreateTenantForm.tsx
        CreateTenantFormFields.tsx
        schema.ts
      hooks/
        useTenants.ts
      services/
        tenants.service.ts
      types.ts
      index.ts
    enrollment/
      components/
        EnrollmentForm.tsx
      hooks/
        useEnroll.ts
        useEnrollmentForm.ts
      index.ts
    admin-dashboard/
      components/
        AdminSidebar.tsx
        AdminAnalyticsPage.tsx
        AdminDashboardOverviewPage.tsx
        ApiKeysPage.tsx
        EnrollmentFormPage.tsx
        SettingsPage.tsx
        SubscriptionPage.tsx
        UsersRolesPage.tsx
        SettingsPageTemplate.tsx
        NotificationSettingsOrganism.tsx
        SettingsPageOrganism.tsx
        ThemeSettingsOrganism.tsx
        PlansPageOrganism.tsx
        overview/
          AdminOverviewColumns.tsx
          AdminOverviewPagination.tsx
          AdminOverviewTable.tsx
          AdminOverviewToolbar.tsx
          DraggableRow.tsx
          TableCellViewer.tsx
          Top5ActiveClients.tsx
        analytics/
          AnalyticsStatistics.tsx
          CallsOverTimeAnalytics.tsx
          TicketVolumeAnalytics.tsx
          TotalVisitorsAnalytics.tsx
        enrolls/
          EnrollsSearchAndFiltering.tsx
          EnrollsTable.tsx
        subscriptions/
          SubscriptionsSearching.tsx
          SubscriptionTable.tsx
        user-roles/
          CreateUserDialog.tsx
          UserRolesSearchAndFiltering.tsx
          UserRolesTable.tsx
      hooks/
        useSettings.ts
      index.ts
    client-dashboard/
      components/
        ClientSidebar.tsx
        ApiKeysPage.tsx
        ClientSettingsPage.tsx
        AiOutboundPage.tsx
        CallsAndTicketsPage.tsx
        ClientDashboardOverviewPage.tsx
        PerformanceAnalyticsPage.tsx
        VoiceScriptPage.tsx
        ApiKeysHeaderOrganism.tsx
        ApiKeysPageOrganism.tsx
        ApiKeysTableOrganism.tsx
        ClientSettingsPageOrganism.tsx
        SettingsTabsOrganism.tsx
        ApiKeysPageTemplate.tsx
        ClientSettingsPageTemplate.tsx
        account/
          AccountSettings.tsx
          IntegrationSettings.tsx
          NotificationPreference.tsx
        analytics/
          ConversionsOverview.tsx
          DailyAICalls.tsx
          DailyAICallsAnalytics.tsx
          DataUsageCard.tsx
          IntentDetectionAccuracy.tsx
          ScenarioPerformance.tsx
          ScenarioPerformanceAnalytics.tsx
          StatisticsCards.tsx
        calls-tickets/
          CallsAndTicketsFiltering.tsx
          CallsAndTicketsTable.tsx
          CallsAndTicketsTablePagination.tsx
        chat-flow/
          CallGreetingVoice.tsx
          ConversationScriptDescriptionTab.tsx
          MainConversationScript.tsx
          MainConversationScriptTab.tsx
        home/
          RecentClientsTable.tsx
          RecentClientsTablePagination.tsx
      hooks/
        useApiKeys.ts
        useClient.ts
        useClientSettings.ts
      index.ts
    landing/
      components/
        LandingPage.tsx
        AboutUsSection.tsx
        ContactUsSection.tsx
        FeaturesSection.tsx
        HeroSection.tsx
        PricingSection.tsx
        TargetedSectorsSection.tsx
        WhyChooseUs.tsx
        Navbar.tsx
        MobileView.tsx
        dialogs/
          LogoutDailog.tsx
        Header.tsx
        PricingCards.tsx
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
        EmailField.tsx
        ErrorContentBox.tsx
        FeatureCard.tsx
        FormField.tsx
        FormFieldTextarea.tsx
        IntegrationCard.tsx
        PasswordField.tsx
        PasswordFormField.tsx
        SelectFormField.tsx
        TextareaFormField.tsx
        TextFormField.tsx
        LoginComponents.tsx
        LoginPasswordField.tsx
        PasswordResetComponents.tsx
        ResetPasswordComponents.tsx
        PricingCard.tsx
        StatisticsCard.tsx
        AnalyticsStatisticsCard.tsx
        NotificationController.tsx
      organisms/
        ActionsButtons.tsx
        SessionControls.jsx
        DashboardHeader.tsx
      templates/
        Footer.tsx
      sections/
        (empty or shared screen-level components if any)
    hooks/
      use-mobile.ts
      useDebounce.ts
      useErrorMessage.tsx
      useRealTime.ts
    utils/
      axiosInstance.ts
      chart-config.ts
      generateUUID.ts
      getFromCookies.ts
      showErrors.ts
    lib/
      utils.ts
    types/
      api-key.d.ts
      client.d.ts
      common.d.ts
      index.d.ts
      overview.d.ts
      plan.d.ts
      settings.d.ts
      user.d.ts
    constants/
      api-keys.constants.ts
      index.ts
      plan.constants.ts
      query.constants.ts
      settings.constants.ts
    data/
      data.json
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

**Removed after migration:** `src/components`, `src/hooks`, `src/services`, `src/utils`, `src/lib`, `src/data`, `src/messages`. No `src/common` or `src/types` (use `shared` only).

**Note:** `shared/types/overview.d.ts` should define the `Item` interface used by admin overview table (add if missing). Plan validators: `createPlanSchema` lives in `features/plans/validators.ts` (or validators/createPlanSchema.ts); remove from `shared/utils/validations` after move.

---

## C) Safe Migration Plan (Ordered Steps)

Execute in order. After each phase, run typecheck and build to avoid compound breakage.

### Phase 1 – Shared foundation (no feature moves)

1. **i18n**
   - Create `src/i18n/messages/ar` and `src/i18n/messages/en`.
   - Move `src/messages/ar/*.json` → `src/i18n/messages/ar/`.
   - Move `src/messages/en/*.json` → `src/i18n/messages/en/`.
   - In `src/i18n/request.ts`: change every `../messages/${locale}` to `./messages/${locale}` (and path to each JSON accordingly).
   - Delete `src/messages`.

2. **Replace @/common and @/types**
   - Ensure all types and constants currently referenced as `@/common/*` or `@/types` or `@/types/index` or `@/types/plans.types` exist under `src/shared/types` and `src/shared/constants` (they already do; add `Item` in `shared/types/overview.d.ts` and export from `shared/types/index.d.ts`).
   - Replace every import: `@/common/types` → `@/shared/types`, `@/common/constants` → `@/shared/constants`, `@/types` / `@/types/index` / `@/types/plans.types` → `@/shared/types`.
   - Do not add `@/common` or `@/types` to tsconfig paths.

3. **Move lib and utils into shared**
   - Move `src/lib` → `src/shared/lib` (single file `utils.ts`).
   - Move `src/utils/*` → `src/shared/utils/` (axiosInstance, chart-config, generateUUID, getFromCookies, showErrors). Move `src/utils/validations/createPlanSchema.ts` to `src/features/plans/validators.ts` (or keep in plans, re-export from feature). Do not duplicate axiosInstance; remove from `src/utils` after move.
   - Update all imports: `@/lib/*` → `@/shared/lib/*`, `@/utils/*` → `@/shared/utils/*`. For createPlanSchema, use `@/features/plans` (or relative from within plans feature).

4. **Move data**
   - Move `src/data` → `src/shared/data`. Update `AdminDashboardOverviewPage` (and any other) to import from `@/shared/data/data.json`.

5. **Shared components**
   - Create `src/shared/components/atoms` and move `src/components/atoms/*` (including `ui/`) → `src/shared/components/atoms/`.
   - Create `src/shared/components/molecules` and move all non–feature-specific molecules (list in A) → `src/shared/components/molecules/`.
   - Create `src/shared/components/organisms` and move `ActionsButtons`, `SessionControls`, `DashboardHeader` → `src/shared/components/organisms/`.
   - Create `src/shared/components/templates` and move `Footer` → `src/shared/components/templates/`.
   - Create `src/shared/components/sections` (can stay empty).
   - Update every import from `@/components/atoms/*`, `@/components/molecules/*`, `@/components/organisms/*` (for moved files) to `@/shared/components/atoms/*`, etc.

6. **Shared hooks**
   - Move `use-mobile.ts`, `useDebounce.ts`, `useErrorMessage.tsx`, `useRealTime.ts` from `src/hooks` → `src/shared/hooks/`. Update imports to `@/shared/hooks/*`.

7. **Providers**
   - Keep `src/providers`. Update any import of ThemeProvider from `@/components/atoms/ThemeProvider` to `@/shared/components/atoms/ThemeProvider`.

8. **tsconfig**
   - Ensure paths (see E). No `@/common` or `@/types`.

### Phase 2 – Feature modules

9. **Feature: auth**
   - Ensure `src/features/auth` has services, types, constants, index. Move from `src/components/pages`: LoginPage, ForgetPasswordPage, ResetPasswordPage, PasswordResetRequestedPage, EnrollPage → `features/auth/components/`. Move from `src/components/organisms/auth`: ForgetPasswordForm → `features/auth/components/`. Move from `src/components/templates/auth`: ForgetPasswordTemplate → `features/auth/components/`.
   - Move from `src/hooks`: useAuth, useLoginForm, useForgetPassword, usePasswordResetRequested, useResetPasswordForm → `features/auth/hooks/`. Remove `src/services/auth.service.ts` (use feature’s); ensure single source in `features/auth/services/auth.service.ts`.
   - Update app routes: `(auth)/login`, `forget-password`, `reset-password`, `password-reset-requested`, `enroll` to import page components from `@/features/auth`.
   - Barrel: `features/auth/index.ts` exports components, hooks, services, types, constants.

10. **Feature: plans**
    - Move from `src/components/pages/admin-dashboard/PlansPage.tsx`, `src/components/organisms/admin-dashboard/plans/*`, `src/components/molecules/admin-dashboard/plans/*`, `src/components/templates/admin-dashboard/PlansPageTemplate.tsx`, `UpdatePlanDialogTemplate.tsx` → `features/plans/components/`. Move `src/hooks/usePlans.ts`, `usePlansFilters.ts`, `useUpdatePlanDialog.ts` → `features/plans/hooks/`. Remove `src/services/plans.service.ts` (use feature’s). Keep `createPlanSchema` in `features/plans/validators.ts` and update all imports to `@/features/plans`.
    - Update `app/admin-dashboard/plans/page.tsx` to import from `@/features/plans`.
    - Keep `__tests__` under `features/plans/components/__tests__/` and fix imports.

11. **Feature: clients**
    - Create `features/clients/`. Move `src/services/tenants.service.ts` → `features/clients/services/`. Move `src/hooks/tenants/useTenants.ts` → `features/clients/hooks/`. Add `types.ts` (re-export from shared or define client-related types). Add `index.ts`.
    - Move `src/components/pages/admin-dashboard/ClientsPage.tsx`, `src/components/organisms/admin-dashboard/clients/*`, `src/components/molecules/admin-dashboard/clientsColumns.tsx`, `src/components/molecules/admin-dashboard/ClientsTablePagination.tsx`, `src/components/organisms/admin-dashboard/tenant-form/*` → `features/clients/components/`.
    - Update `app/admin-dashboard/clients/page.tsx` to import from `@/features/clients`. Update tenants.service to use `@/shared/types` and `@/shared/utils/axiosInstance`.

12. **Feature: enrollment**
    - Create `features/enrollment/`. Move `src/components/organisms/EnrollmentForm.tsx` → `features/enrollment/components/`. Move `src/hooks/useEnroll.ts`, `useEnrollmentForm.ts` → `features/enrollment/hooks/`. Add `index.ts`.
    - Auth EnrollPage and admin EnrollmentFormPage import EnrollmentForm (and hooks) from `@/features/enrollment`.

13. **Feature: admin-dashboard**
    - Create `features/admin-dashboard/components/`. Move remaining admin-only pages: AdminAnalyticsPage, AdminDashboardOverviewPage, ApiKeysPage, EnrollmentFormPage, SettingsPage, SubscriptionPage, UsersRolesPage. Move organisms: AdminSidebar, analytics/, overview/, enrolls/, subscriptions/, user-roles/, NotificationSettingsOrganism, SettingsPageOrganism, ThemeSettingsOrganism, PlansPageOrganism. Move SettingsPageTemplate. Move molecules: admin-dashboard/overview/*, AnalyticsStatisticsCard (if not shared). Do not move plans/, clients/, tenant-form/ (already in plans and clients).
    - Move `useSettings` from `src/hooks` → `features/admin-dashboard/hooks/`.
    - Update all `app/admin-dashboard/*` page imports to use `@/features/admin-dashboard` (and `@/features/plans`, `@/features/clients`, `@/features/enrollment` where composed). Update layout to import AdminSidebar from `@/features/admin-dashboard`. Fix internal imports (overview, analytics, etc.) to use `@/shared/*` and feature-relative paths.

14. **Feature: client-dashboard**
    - Create `features/client-dashboard/components/` and move all `src/components/pages/client-dashboard/*`, `src/components/organisms/client-dashboard/*`, `src/components/templates/client-dashboard/*` into it (preserve subfolders: account/, analytics/, calls-tickets/, chat-flow/, home/).
    - Move `useApiKeys`, `useClientSettings`, `useClient` from `src/hooks` → `features/client-dashboard/hooks/`.
    - Update all `app/dashboard/*` page and layout imports to `@/features/client-dashboard` and `@/shared/components/organisms/DashboardHeader`.

15. **Feature: landing**
    - Create `features/landing/components/`. Move `src/components/pages/LandingPage.tsx`, `src/components/templates/landingPage/*`, `src/components/molecules/landing/*`, `Header.tsx`, `PricingCards.tsx` from organisms → `features/landing/components/`.
    - Update `app/page.tsx` to import LandingPage from `@/features/landing`. Use `@/features/enrollment` for EnrollmentForm on enroll page if needed.

### Phase 3 – App layer and cleanup

16. **App pages (thin)**
    - Each `src/app/**/page.tsx` and layout imports only from `@/features/<name>` or `@/shared/*`. No imports from `@/components`, `@/hooks`, `@/services`, `@/utils` for moved code.

17. **Remove empty roots**
    - Delete `src/services` (all moved).
    - Delete `src/hooks` (all moved).
    - Delete `src/components` (all moved).
    - Delete `src/utils`, `src/lib`, `src/data` (moved to shared).
    - Ensure no `src/common` or `src/types` folders.

18. **Circular dependencies**
    - Run a circular dependency check (e.g. `madge --circular src/`). If any cycle appears (e.g. feature A → feature B → feature A), move shared types/hooks to `src/shared` and re-export from there.

19. **Barrel exports**
    - Each feature has `index.ts` exporting the public API. App and other features import only from `@/features/<name>` (or shared), not from deep feature subpaths unless necessary.

---

## D) Verification Checklist

- [ ] **Typecheck**: `npx tsc --noEmit` (or `npm run type-check` if defined) passes.
- [ ] **Build**: `npm run build` succeeds with no errors.
- [ ] **Lint**: `npm run lint` passes; no new path/import violations.
- [ ] **Format**: `npm run format` or `format:check` (if present) passes.
- [ ] **Tests**: `npm run test` passes; test files under `features/plans/components/__tests__/` use `@/features/plans` and `@/shared/*` as needed.
- [ ] **Routes**: Verify in browser or E2E: `/`, `/(auth)/login`, `/(auth)/forget-password`, `/(auth)/reset-password`, `/(auth)/password-reset-requested`, `/(auth)/enroll`, `/admin-dashboard`, `/admin-dashboard/plans`, `/admin-dashboard/clients`, `/admin-dashboard/settings`, `/admin-dashboard/analytics`, `/admin-dashboard/enrollment-form`, `/admin-dashboard/subscription`, `/admin-dashboard/user-roles`, `/dashboard`, `/dashboard/settings`, `/dashboard/api-keys`, `/dashboard/calls-tickets`, etc. load without 404 or runtime errors.
- [ ] **i18n**: Locale switch (ar/en) works; namespaces (dashboard, loginPage, adminDashboard, landingPage, enrollPage, etc.) load; no missing key errors in console. `src/i18n/request.ts` points to `./messages/` under i18n.
- [ ] **Imports**: No remaining `@/common`, `@/types`, `@/components/`, `@/hooks/`, `@/services/`, `@/utils/` for moved code; only `@/shared/*`, `@/features/*`, `@/i18n/*`, `@/providers/*`, `@/app/*`.
- [ ] **Circular deps**: `madge --circular src/` (or equivalent) reports no cycles; resolve by moving shared code to `src/shared`.

---

## E) Config Edits (Exact Files and Changes)

### 1. `tsconfig.json`

- **Path:** `tsconfig.json` (project root).
- **Change:** Under `compilerOptions.paths`, use only these; remove `@/common` or `@/types` if present.

```json
"paths": {
  "@/*": ["./src/*"],
  "@/app/*": ["./src/app/*"],
  "@/features/*": ["./src/features/*"],
  "@/shared/*": ["./src/shared/*"],
  "@/i18n/*": ["./src/i18n/*"]
}
```

- Do not add `@/types` or `@/common`. All type imports use `@/shared/types` or feature-local types.

### 2. `jest.config.ts`

- **Path:** `jest.config.ts` (project root).
- **Change:** Next.js Jest via `next/jest` uses the same tsconfig by default, so path aliases from `tsconfig.json` are usually respected. If tests fail with module not found after migration, add a `moduleNameMapper` that mirrors tsconfig paths, for example:

```ts
moduleNameMapper: {
  '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
  '^@/features/(.*)$': '<rootDir>/src/features/$1',
  '^@/i18n/(.*)$': '<rootDir>/src/i18n/$1',
  '^@/(.*)$': '<rootDir>/src/$1',
},
```

- Only add this if needed after running tests post-migration.

### 3. `eslint.config.mjs`

- **Path:** `eslint.config.mjs` (project root).
- **Change:** No path alias config required for ESLint to parse the new structure. If you have an override that restricts `include`/files to specific dirs, extend it to include `src/features`, `src/shared`, and `src/i18n` (e.g. add these to the list of dirs or patterns). Current snippet does not show such overrides, so this may be a no-op.

### 4. `next.config.ts`

- **Path:** `next.config.ts` (project root).
- **Change:** None. Plugin already points to `./src/i18n/request.ts`. After moving messages under `src/i18n/messages/`, only `src/i18n/request.ts` must import from `./messages/` (see Phase 1 step 1).

### 5. `src/i18n/request.ts`

- **Path:** `src/i18n/request.ts`.
- **Change:** Replace every dynamic import path from `../messages/${locale}/...` to `./messages/${locale}/...` (and adjust JSON filenames to match the new location). Example:

```ts
const dashboard = (await import(`./messages/${locale}/dashboard.json`)).default;
const enrollPage = (await import(`./messages/${locale}/enrollPage.json`)).default;
// ... same for loginPage, forgetPasswordPage, resetPasswordPage, passwordResetRequested, adminDashboard, landingPage
```

### 6. `src/shared/types` (add missing type)

- **Path:** Add `src/shared/types/overview.d.ts` if `Item` is not defined elsewhere.
- **Content (example):** Define the table row type used by admin overview (match the shape used in AdminOverviewColumns/AdminOverviewTable). Export from `src/shared/types/index.d.ts` (add `export * from './overview';`).

---

End of plan. Apply phases in order, run the verification checklist after each phase, and fix any broken imports or circular dependencies before proceeding.
