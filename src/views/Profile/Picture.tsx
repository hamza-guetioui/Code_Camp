// import { GET_USER_PICTURE } from "@/actions/Picture";

import React from "react";
import UploadPicture from "./UploadPicture";
import { IUser } from "@/types/user";

type Props = {
  user:IUser;
};

const Picture: React.FC<Props> = async ({ user}: Props) => {
  //   const picture = await GET_USER_PICTURE(id);
  //   const profilePicture = picture?.originalFileName.toString() || null;

  return (
<UploadPicture id={user.id} />
  );
};

export default Picture;
