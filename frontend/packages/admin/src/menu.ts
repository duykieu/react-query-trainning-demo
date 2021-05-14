import React from "react";
import { Home, ChevronRight } from "react-feather";
import { ISidebarMenu } from "@dontloop/admin-ui/src/components/Sidebar";
import {
  CATEGORY_INDEX_ROUTE,
  PAGE_INDEX_ROUTE,
  POST_INDEX_ROUTE,
} from "./config";

const menuData: ISidebarMenu[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    label: "Category Index",
    path: CATEGORY_INDEX_ROUTE,
    icon: ChevronRight,
  },
  {
    label: "Post Index",
    path: POST_INDEX_ROUTE,
    icon: ChevronRight,
  },
  {
    label: "Page Index",
    path: PAGE_INDEX_ROUTE,
    icon: ChevronRight,
  },
];

export const findTopIndex = (pathname) => {};

export default menuData;
