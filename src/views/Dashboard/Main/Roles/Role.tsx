import { IRole } from "@/types/role";
import React from "react";

type Props = {
  role: IRole;
};

const Role = ({ role }: Props) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="py-4 px-6 border-b text-sm text-gray-700">{role.role}</td>
      <td className="py-4 px-6 border-b text-sm text-gray-700">
        {role.permissions.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </td>
    </tr>
  );
};

export default Role;
