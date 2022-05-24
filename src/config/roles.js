const allRoles = {
  student: ['getSubjects', 'getTopics', 'getClasses'],
  teacher: [
    'getSubjects',
    'manageSubjects',
    'manageFiles',
    'getFiles',
    'getTopics',
    'manageTopics',
    'getBanks',
    'manageBanks',
    'getClasses',
  ],
  leadership: [
    'getUsers',
    'manageUsers',
    'getSubjects',
    'manageSubjects',
    'manageFiles',
    'getFiles',
    'getTopics',
    'manageTopics',
    'getBanks',
    'manageBanks',
    'manageClasses',
    'getClasses',
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
    'getBanks',
    'manageBanks',
    'manageClasses',
    'getClasses',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
