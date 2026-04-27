import { FaCogs, FaUsers, FaFileAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaHandHoldingHeart, FaCog } from "react-icons/fa";
import { FaChildren, FaList } from "react-icons/fa6";

import { devNavUrl, urlDeveloper } from "../../functions/functions-general";

export const navList = [
  {
    label: "DONOR LIST",
    icon: <FaHandHoldingHeart />,
    menu: "donorList",
    path: `${devNavUrl}/${urlDeveloper}/donorList`,
    submenu: "",
  },
  {
    label: "CHILDREN LIST",
    icon: <FaChildren />,
    menu: "childrenList",
    path: `${devNavUrl}/${urlDeveloper}/childrenList`,
    submenu: "",
  },
  {
    label: "REPORTS",
    icon: <FaList />,
    menu: "reports",
    submenu: "",
    subNavList: [
      {
        label: "Users",
        path: `${devNavUrl}/${urlDeveloper}/reports/users`,
      },
      {
        label: "Category",
        path: `${devNavUrl}/${urlDeveloper}/reports/category`,
      },
      {
        label: "Designation",
        path: `${devNavUrl}/${urlDeveloper}/reports/designation`,
      },
      {
        label: "Notification",
        path: `${devNavUrl}/${urlDeveloper}/reports/notification`,
      },
      {
        label: "Maintenance",
        path: `${devNavUrl}/${urlDeveloper}/reports/maintenance`,
      },
    ],
  },
  {
    label: "SETTINGS",
    icon: <FaCog />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Users",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
      {
        label: "Category",
        path: `${devNavUrl}/${urlDeveloper}/settings/category`,
      },
      {
        label: "Designation",
        path: `${devNavUrl}/${urlDeveloper}/settings/designation`,
      },
      {
        label: "Notification",
        path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
      },
      {
        label: "Maintenance",
        path: `${devNavUrl}/${urlDeveloper}/settings/maintenance`,
      },
    ],
  },
];
