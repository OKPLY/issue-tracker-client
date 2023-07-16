import { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function ListItemLink(props) {
  const { icon, primary, to, isPaddingLeft } = props;
  const { pathname } = useLocation();

  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <div
      style={{
        backgroundColor: "#2d3e83",
      }}
    >
      <div
        className="flex-1"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {props.bgColor === "#FFFFFF" && (
          <div
            style={{
              height: "10px",
              borderBottomRightRadius: "10px",
              backgroundColor: "#2d3e83",
            }}
          ></div>
        )}
      </div>

      <div className="pl-3 ">
        <li
          style={{
            backgroundColor: props.bgColor,
            borderBottomLeftRadius: 19,
            borderTopLeftRadius: 19,
            margin: "0",
          }}
        >
          <ListItem
            button
            component={renderLink}
            sx={{ pl: isPaddingLeft && 4 }}
          >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} sx={{ color: props.textColor }} />
          </ListItem>
        </li>
      </div>

      <div
        className="flex-1"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        {props.bgColor === "#FFFFFF" && (
          <div
            style={{
              height: "10px",
              borderTopRightRadius: "10px",
              background: "#2d3e83",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
