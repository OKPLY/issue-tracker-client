import {
  AdminPanelSettings,
  ConfirmationNumber,
  Dashboard,
  FactCheck,
  Handshake,
  Settings,
} from "@mui/icons-material";
export default function (user) {
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
          permission: true,
          icon: <FactCheck />,
        },
        {
          to: "/issues/review",
          label: "Review Issues",
          permission: true,
          icon: <Handshake />,
        },
        {
          to: "/issues/resolve",
          label: "Resolve Issues",
          permission: true,
          icon: <Handshake />,
        },
        {
          to: "/issues/closed",
          label: "Closed Issues",
          permission: true,
          icon: <Handshake />,
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
          permission: true,
          icon: <Handshake />,
        },
        {
          to: "/settings/tags",
          label: "Tags",
          permission: true,
          icon: <Handshake />,
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
          icon: <FactCheck />,
        },
        {
          to: "/admin/roles",
          label: "Roles",
          permission: true,
          icon: <Handshake />,
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