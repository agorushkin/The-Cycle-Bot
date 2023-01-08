export const fetchUserData = async <T = unknown>(endpoint: string, token: string): Promise<T> => {
  const response = await fetch(`https://discord.com/api/${ endpoint }`, { headers: { authorization: `Bearer ${ token }` } });
  return await response.json();
};