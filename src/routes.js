import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";

import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import DataTable from "views/DataTables/DataTable.js";
import Users from "views/Users/Users.js";
import Inventory from "views/Inventory/Inventory.js";
import Customer from "views/Customer/Customer.js";
import AddCustomer from './views/Customer/AddCustomer';
import AddUsers from './views/Users/AddUsers';
import AddInventory from './views/Inventory/AddInventory';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    sidebar:true
  },
  {
    path: "/profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    sidebar:true

  },
  {
    path: "/Users",
    name: "Users",
    icon: Person,
    component: Users,
    layout: "/admin",
    sidebar:true
  },
  {
    path: "/Inventory",
    name: "Inventory",
    icon: Notifications,
    component: Inventory,
    layout: "/admin",
    sidebar:true
  },
  {
    path: "/Customer",
    name: "Customers",
    icon: Notifications,
    component: Customer,
    layout: "/admin",
    sidebar:true
  },
  {
    path: "/AddCustomer",
    name: "AddCustomer",
    icon: Notifications,
    component: AddCustomer,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/user/:id",
    name: "User",
    icon: Notifications,
    component: AddUsers,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/AddInventory",
    name: "Add/Edit Inventory",
    icon: Notifications,
    component: AddInventory,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/DataTable",
    name: "Orders",
    icon: Notifications,
    component: DataTable,
    layout: "/admin",
    sidebar:true
  },

  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
    sidebar:true
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
 
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
