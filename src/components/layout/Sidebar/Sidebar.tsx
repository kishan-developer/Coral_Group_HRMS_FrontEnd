'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';
import { getToken } from '@/lib/auth';
import { getCurrentManagerId, loadManagerPermissions, hasPermission } from '@/lib/permissions';
import { getCurrentUserId, replaceUserIdInNavigation } from '@/lib/navigation';
import { superadminNavigation, hrManagerNavigation, accountsNavigation, supportNavigation, employeeNavigation, type Role, type NavItem, type Permission } from './sidebar.config';
import SidebarGroup from './SidebarGroup';
import SidebarFooter from './SidebarFooter';

function filterNavByPermissions(items: NavItem[], allowed: Permission[]): NavItem[] {
  return items
    .map((item) => {
      if (!hasPermission(allowed, item.permission)) return null;
      const filtered: NavItem = { ...item };
      if (item.children) {
        filtered.children = item.children.filter(() => true);
      }
      return filtered;
    })
    .filter(Boolean) as NavItem[];
}

function addGrantedPages(items: NavItem[], grantedRoutes: string[]): NavItem[] {
  if (!grantedRoutes || grantedRoutes.length === 0) {
    return items;
  }
  return items;
}

export default function Sidebar({ fixedRole }: { fixedRole?: Role } = {}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [internalRole, setInternalRole] = useState<Role>('superadmin');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [userRoutes, setUserRoutes] = useState<string[]>([]);

  const role = fixedRole ?? internalRole;
  const effectiveCollapsed = collapsed && !isHovered;

  useEffect(() => {
    const savedCollapsed = localStorage.getItem(STORAGE_KEYS.COLLAPSED);
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    const savedExpanded = localStorage.getItem(STORAGE_KEYS.EXPANDED);

    if (savedCollapsed) setCollapsed(JSON.parse(savedCollapsed));
    if (savedRole && !fixedRole) setInternalRole(savedRole as Role);
    if (savedExpanded) setExpanded(JSON.parse(savedExpanded));
  }, [fixedRole]);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) return;
        
        const token = getToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/access-control/user-permissions/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        
        const data = await response.json();
        if (data.success) {
          setUserRoutes(data.data.routes || []);
        }
      } catch (error) {
        console.error('Error fetching user permissions:', error);
      }
    };

    fetchUserPermissions();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLAPSED, JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    if (fixedRole) return;
    localStorage.setItem(STORAGE_KEYS.ROLE, internalRole);
  }, [internalRole, fixedRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPANDED, JSON.stringify(expanded));
  }, [expanded]);

  const toggleSection = (name: string) => {
    setExpanded((prev) => {
      const isOpening = !prev[name];
      if (isOpening) {
        return { [name]: true };
      }
      return {};
    });
  };

  const toggleRole = () => {
    if (fixedRole) return;
    setInternalRole((prev) => (prev === 'superadmin' ? 'hr_manager' : 'superadmin'));
  };

  const navigation = useMemo(() => {
    const userId = getCurrentUserId();
    let baseNavigation: NavItem[];
    
    if (role === 'superadmin') {
      baseNavigation = superadminNavigation;
    } else if (role === 'hr_manager') {
      const managerId = getCurrentManagerId();
      const allowed = loadManagerPermissions(managerId);
      baseNavigation = filterNavByPermissions(hrManagerNavigation, allowed);
    } else if (role === 'accounts') {
      baseNavigation = accountsNavigation;
    } else if (role === 'support') {
      baseNavigation = supportNavigation;
    } else if (role === 'employee') {
      baseNavigation = employeeNavigation;
    } else {
      baseNavigation = [];
    }
    
    let filteredNavigation = addGrantedPages(baseNavigation, userRoutes);
    return userId ? replaceUserIdInNavigation(filteredNavigation, userId) : filteredNavigation;
  }, [role, userRoutes]);

  return (
    <aside
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        effectiveCollapsed ? 'w-16' : 'w-64 shadow-2xl'
      } sticky top-0 h-screen flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 ease-in-out shrink-0 z-40`}
    >
      <div className={`flex items-center ${effectiveCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 border-b border-zinc-200 dark:border-zinc-800`}>
        {!effectiveCollapsed && (
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 truncate tracking-tight">
            Coral HRMS
          </h1>
        )}
        <button
          type="button"
          onClick={() => {
            setCollapsed((prev) => !prev);
            setIsHovered(false);
          }}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4 text-[#94cb3d]" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className={`${effectiveCollapsed ? 'px-2' : 'px-3'} flex-1 space-y-1 overflow-y-auto py-3`}>
        {navigation.map((item) => (
          <SidebarGroup
            key={item.name}
            item={item}
            collapsed={effectiveCollapsed}
            expanded={expanded[item.name] || false}
            onToggle={() => toggleSection(item.name)}
          />
        ))}
      </nav>

      <SidebarFooter role={role} collapsed={effectiveCollapsed} onRoleToggle={fixedRole ? undefined : toggleRole} />
    </aside>
  );
}
