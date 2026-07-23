'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAuth } from '@/features/auth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/atoms/ui/avatar';
import { getApiAssetUrl } from '@/shared/utils/getApiAssetUrl';
import { Dropdown, Separator } from '@heroui/react';
import { LogOut, User as UserIcon } from 'lucide-react';

import LogoutDailog from '../../molecules/landing/dialogs/LogoutDailog';

const MENU_ITEM_CLASS =
  'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[hovered]:bg-[#06B6D40F] data-[hovered]:text-[#06B6D4] data-[focused]:bg-[#06B6D40F] data-[focused]:text-[#06B6D4] data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

function getDisplayName(user: {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}): string {
  if (user.name) return user.name;
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  return fullName || user.email || '';
}

export default function TenantAvatarMenu() {
  const t = useTranslations('sidebar');
  const { user, handleLogout, logoutLoading } = useAuth();
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const displayName = user ? getDisplayName(user) : '';
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger
          aria-label={t('myAccount')}
          className="cursor-pointer rounded-full outline-none"
        >
          <Avatar>
            <AvatarImage
              src={getApiAssetUrl(user?.logoUrl ?? user?.avatar)}
              alt={displayName}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {initial}
            </AvatarFallback>
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown.Popover
          placement="bottom end"
          className="bg-popover text-popover-foreground z-50 min-w-48 overflow-hidden rounded-md border p-1 shadow-md"
        >
          <Dropdown.Menu aria-label={t('myAccount')} className="outline-none">
            <Dropdown.Item
              id="account-info"
              isDisabled
              className="flex flex-col items-start gap-0.5 rounded-sm px-2 py-1.5 text-sm data-disabled:opacity-100"
            >
              <span className="truncate font-medium">{displayName}</span>
              {user?.email && (
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              )}
            </Dropdown.Item>

            <Separator className="bg-border -mx-1 my-1 h-px" />

            <Dropdown.Item
              id="my-account"
              href="/dashboard/settings"
              className={MENU_ITEM_CLASS}
            >
              <UserIcon className="size-4" />
              {t('myAccount')}
            </Dropdown.Item>

            <Dropdown.Item
              id="logout"
              className={`${MENU_ITEM_CLASS} text-destructive`}
              onAction={() => setLogoutDialogOpen(true)}
            >
              <LogOut className="size-4" />
              {t('logout')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <LogoutDailog
        open={isLogoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
    </>
  );
}
