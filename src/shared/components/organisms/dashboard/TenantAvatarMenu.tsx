'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAuth } from '@/features/auth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/atoms/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/atoms/ui/dropdown-menu';
import { getApiAssetUrl } from '@/shared/utils/getApiAssetUrl';
import { LogOut, User as UserIcon } from 'lucide-react';

import LogoutDailog from '../../molecules/landing/dialogs/LogoutDailog';

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
      <DropdownMenu>
        <DropdownMenuTrigger
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuItem
            disabled
            className="flex flex-col items-start gap-0.5 data-disabled:opacity-100"
          >
            <span className="truncate font-medium">{displayName}</span>
            {user?.email && (
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <a href="/dashboard/settings">
              <UserIcon className="size-4" />
              {t('myAccount')}
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setLogoutDialogOpen(true)}
          >
            <LogOut className="size-4" />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutDailog
        open={isLogoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        loading={logoutLoading}
      />
    </>
  );
}
