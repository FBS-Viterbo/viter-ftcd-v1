import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Donor from "../pages/developer/donor/Donor";
import Users from "../pages/developer/settings/users/Users";
import Roles from "../pages/developer/settings/users/roles/Roles";

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
