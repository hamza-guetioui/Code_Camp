import { IUser } from "@/types/user";
import React from "react";

type Props = {
  user: IUser;
};

const User = ({ user }: Props) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      <td className="py-4 px-6 border-b text-sm text-gray-700">
        {user.fullName}
      </td>
      <td className="py-4 px-6 border-b text-sm text-gray-700">
        {user.username}
      </td>
    </tr>
  );
};

export default User;
