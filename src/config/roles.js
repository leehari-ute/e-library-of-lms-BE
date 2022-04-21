const allRoles = {
  student: ['getSubjects'],
  teacher: ['getSubjects', 'manageSubjects'],
  leadership: ['getSubjects', 'manageSubjects'],
  admin: ['getUsers', 'manageUsers', 'getSubjects', 'manageSubjects'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
