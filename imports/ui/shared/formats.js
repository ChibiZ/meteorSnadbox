export const getFullName = (user) => {
  const name = user.name ?? user.username;

  return `${user.surname ?? ''} ${name} `;
};
