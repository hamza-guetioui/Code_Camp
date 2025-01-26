export const roles = [
    {
      id: "1",
      role: "Admin",
      permissions: ["create", "edit", "delete", "view", "approve", "publish", "manage"],
      accessLevel: "Global",
    },
    {
      role: "Manager",
      permissions: ["create", "edit", "view", "approve"],
      accessLevel: "Organization-Specific",
    },
    {
      role: "Editor",
      permissions: ["create", "edit", "view"],
      accessLevel: "Restricted",
    },
    {
      role: "User",
      permissions: ["view"],
      accessLevel: "Restricted",
    },
    {
      role: "Support",
      permissions: ["view", "edit", "delete"],
      accessLevel: "Organization-Specific",
    }
  ];
  