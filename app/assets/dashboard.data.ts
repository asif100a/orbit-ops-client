import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckSquare,
  Clock3,
  CreditCard,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Puzzle,
  Settings,
  Shield,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";

export const USER_NAVIGATION = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/user",
        icon: LayoutDashboard,
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: Inbox,
        badge: 4,
      },
      {
        label: "Messages",
        href: "/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    label: "Work",
    items: [
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        label: "My Tasks",
        href: "/my-tasks",
        icon: CheckSquare,
      },
    //   {
    //     label: "Calendar",
    //     href: "/calendar",
    //     icon: CalendarDays,
    //   },
      {
        label: "Time Tracking",
        href: "/time-tracking",
        icon: Clock3,
      },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        label: "Team",
        href: "/team",
        icon: Users,
      },
    //   {
    //     label: "Clients",
    //     href: "/clients",
    //     icon: BriefcaseBusiness,
    //   },
    //   {
    //     label: "Files",
    //     href: "/files",
    //     icon: FileText,
    //   },
    ],
  },
//   {
//     label: "Business",
//     items: [
//       {
//         label: "Finance",
//         href: "/finance",
//         icon: Wallet,
//       },
//       {
//         label: "Reports",
//         href: "/reports",
//         icon: BarChart3,
//       },
//     ],
//   },
];

export const ADMIN_NAVIGATION = [
  {
    label: "Administration",
    items: [
      { label: "Overview", href: "/admin", icon: Shield },
      { label: "Members", href: "/admin/members", icon: Users },
      { label: "Roles", href: "/admin/roles", icon: LockKeyhole },
      { label: "Teams", href: "/admin/teams", icon: UsersRound },
      { label: "Billing", href: "/admin/billing", icon: CreditCard },
      { label: "Integrations", href: "/admin/integrations", icon: Puzzle },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: History },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];
