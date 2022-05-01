const allRoles = {
  student: ['getSubjects'],
  teacher: ['getSubjects', 'manageSubjects'],
  leadership: ['getSubjects', 'manageSubjects', 'manageFiles', 'getFiles'],
  admin: ['getUsers', 'manageUsers', 'getSubjects', 'manageSubjects', 'manageFiles', 'getFiles'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
