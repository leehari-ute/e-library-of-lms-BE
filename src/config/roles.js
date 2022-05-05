const allRoles = {
  student: ['getSubjects', 'getTopics'],
  teacher: [
    'getSubjects',
    'manageSubjects',
    'manageFiles',
    'getFiles',
    'getTopics',
    'manageTopics',
    'getBanks',
    'manageBanks',
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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
