import { userdb } from "@repo/auth-db";
export const getAllUserService = async () => {
  try {
    const users = await userdb.user.findMany();
    return users;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
