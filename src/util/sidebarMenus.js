import {
  AdminPanelSettings,
  BookOnlineSharp,
  Bookmark,
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
          icon: <Newspaper />,
        },
        {
          to: "/issues/review",
          label: "Review Issues",
          permission: true,
          icon: <Pageview />,
        },
        {
          to: "/issues/resolve",
          label: "Resolve Issues",
          permission: true,
          icon: <FactCheck />,
        },
        {
          to: "/issues/list",
          label: "Issue List",
          permission: true,
          icon: <ListAlt />,
        },
        {
          to: "/issues/board",
          label: "Issue Board",
          permission: true,
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
          permission: true,
          icon: <TypeSpecimen />,
        },
        {
          to: "/settings/tags",
          label: "Tags",
          permission: true,
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
          permission: true,
          icon: <DataArray />,
        },
        {
          to: "/admin/logs",
          label: "Logs",
          permission: true,
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
