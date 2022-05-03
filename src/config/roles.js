const allRoles = {
  student: ['getSubjects', 'getTopics'],
  teacher: ['getSubjects', 'manageSubjects', 'manageFiles', 'getFiles', 'getTopics', 'manageTopics'],
  leadership: [
    'getUsers',
    'manageUsers',
    'getSubjects',
    'manageSubjects',
    'manageFiles',
    'getFiles',
    'getTopics',
    'manageTopics',
  ],
  admin: [
    'getUsers',
    'manageUsers',
    'getSubjects',
    'manageSubjects',
    'manageFiles',
    'getFiles',
    'getTopics',
    'manageTopics',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
