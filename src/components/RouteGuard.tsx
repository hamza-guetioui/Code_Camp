"use client";

import React from "react";
import { usePathname } from "next/navigation";

const excludedRoutes = ["/login", "/signup", "/reset"];

type Props = {
  children: React.ReactNode;
};

const RouteGuard: React.FC<Props> = ({ children }) => {
  const pathname = usePathname(); 

  // Check if the current route is excluded
  const isExcludedRoute = excludedRoutes.includes(pathname);
  // Render children directly if it's an excluded route
  return <>{!isExcludedRoute && children}</>;
};

export default RouteGuard;