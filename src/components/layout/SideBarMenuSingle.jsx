import { useLocation } from "react-router-dom";
import ListItemLink from "./ListItemLink";

export default function SideBarMenuSingle({ menu }) {
  const { pathname } = useLocation();

  if (!menu.permission) return <></>;

  return (
    <ListItemLink
      to={menu.to}
      primary={menu.label}
      bgColor={menu.selected?.includes(pathname) ? "#FFFFFF" : "#2d3e83"}
      textColor={menu.selected?.includes(pathname) ? "#2d3e83" : "#FFFFFF"}
      icon={
        <div
          style={{
            color: menu.selected?.includes(pathname) ? "#2d3e83" : "#FFFFFF",
          }}
        >
          {menu.icon}
        </div>
      }
    />
  );
}
