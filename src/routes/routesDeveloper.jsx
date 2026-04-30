import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Children from "../pages/developer/children/Children";
import Donor from "../pages/developer/donor/Donor";
import Category from "../pages/developer/settings/category/Category";
import Designation from "../pages/developer/settings/designation/Designation";
import Notification from "../pages/developer/settings/notification/Notification";
import Users from "../pages/developer/settings/users/Users";
import Roles from "../pages/developer/settings/users/roles/Roles";
import SystemUser from "../pages/developer/settings/users/system-user/SystemUser";

export const routesDeveloper = [
  {
    path: `${devNavUrl}/${urlDeveloper}/donorList`,
    element: (
      <>
        <Donor />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/childrenlist`,
    element: (
      <>
        <Children />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users`,
    element: (
      <>
        <Users />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users/role`,
    element: (
      <>
        <Roles />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users/system-user`,
    element: (
      <>
        <SystemUser />
      </>
    )
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/category`,
    element: (
      <>
        <Category />
      </>
    )
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/designation`,
    element: (
      <>
        <Designation />
      </>
    )
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
    element: (
      <>
        <Notification />
      </>
    )
  },
  // {
  //   path: `${devNavUrl}/${urlDeveloper}/childrenList`,
  //   element: (
  //     <>
  //       <Children />
  //     </>
  //   ),
  // },
  // {
  //   path: `${devNavUrl}/${urlDeveloper}/dashboard`,
  //   element: (
  //     <>
  //       <Dashboard />
  //     </>
  //   ),
  // },
  // {
  //   path: `${devNavUrl}/${urlDeveloper}/employees`,
  //   element: (
  //     <>
  //       <Employees />
  //     </>
  //   ),
  // },
  // {
  //   path: `${devNavUrl}/${urlDeveloper}/memo`,
  //   element: (
  //     <>
  //       <Memo />
  //     </>
  //   ),
  // },
  // {
  //   path: `${devNavUrl}/${urlDeveloper}/settings/department`,
  //   element: (
  //     <>
  //       <Department />
  //     </>
  //   ),
  // },
  // {
  //   path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
  //   element: (
  //     <>
  //       <NotificationUsers />
  //     </>
  //   ),
  // },
];
