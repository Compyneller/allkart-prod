import { userdb } from "@repo/auth-db";

export const changeUserRoleService = async ({ userId }: { userId: string }) => {
  const data = await userdb.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "seller",
    },
    select: {
      role: true,
    },
  });

  return data;
};
