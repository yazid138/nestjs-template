import * as bcrypt from 'bcrypt';

export const hash = async (data: any) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const isMatch = async (data: string, hash: string) =>
  bcrypt.compare(data, hash);
