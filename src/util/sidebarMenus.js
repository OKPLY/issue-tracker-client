import {
  AdminPanelSettings,
  BookOnlineSharp,
  Bookmark,
  Check,
  CheckBox,
  ConfirmationNumber,
  Create,
  Dashboard,
  DataArray,
  FactCheck,
  Handshake,
  List,
  ListAlt,
  Newspaper,
  Pages,
  Pageview,
  People,
  Person,
  Settings,
  TableBar,
  TableChart,
  TableRows,
  Tag,
  TypeSpecimen,
  ViewKanban,
} from "@mui/icons-material";
import { PERMISSION } from "./constants";
export default function (user) {
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) ?? false;
  };

  const menus = [
    {
      to: "/",
      label: "Dashboard",
      permission: true,
      icon: <Dashboard />,
    },
    {
      label: "Issues",
      icon: <ConfirmationNumber />,
      children: [
        {
          to: "/issues/new",
          label: "Create Issue",
          permission: hasPermission(PERMISSION.CreateIssue),
          icon: <Newspaper />,
        },
        {
          to: "/issues/review",
          label: "Review Issues",
          permission: hasPermission(PERMISSION.AssignIssue),
          icon: <Pageview />,
        },
        {
          to: "/issues/resolve",
          label: "Resolve Issues",
          permission: hasPermission(PERMISSION.ResolveIssue),
          icon: <FactCheck />,
        },
        {
          to: "/issues/list",
          label: "Issue List",
          permission: hasPermission(PERMISSION.ReadIssue),
          icon: <ListAlt />,
        },
        {
          to: "/issues/board",
          label: "Issue Board",
          permission: hasPermission(PERMISSION.ReadIssue),
          icon: <ViewKanban />,
        },
      ],
    },
    {
      label: "Settings",
      icon: <Settings />,
      children: [
        {
          to: "/settings/types",
          label: "Types",
          permission: hasPermission(PERMISSION.ReadType),
          icon: <TypeSpecimen />,
        },
        {
          to: "/settings/tags",
          label: "Tags",
          permission: hasPermission(PERMISSION.ReadTag),
          icon: <Tag />,
        },
      ],
    },

    {
      label: "Admin",
      icon: <AdminPanelSettings />,
      children: [
        {
          to: "/admin/users",
          label: "Users",
          permission: true,
          icon: <People />,
        },
        {
          to: "/admin/roles",
          label: "Roles",
          permission: hasPermission(PERMISSION.ReadRole),
          icon: <CheckBox />,
        },
        {
          to: "/admin/logs",
          label: "Logs",
          permission: hasPermission(PERMISSION.ReadLog),
          icon: <TableRows />,
        },
      ],
    },
  ];

  return menus.map((obj) =>
    obj.children ? handleMultipleMenu(obj) : handleSingleMenu(obj)
  );
}

const handleSingleMenu = (obj) => {
  return obj.selected
    ? { ...obj, selected: [...obj.selected, obj.to] }
    : { ...obj, selected: [obj.to] };
};

const handleMultipleMenu = (obj) => {
  var menu = { ...obj };

  menu.permission = menu.children.reduce(
    (prev, current) => prev || current.permission,
    false
  );
  menu.hasChildren = true;
  menu.children = menu.children.map((child) => handleSingleMenu(child));

  return menu;
};
