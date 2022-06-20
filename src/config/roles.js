const allRoles = {
  student: ['getSubjects', 'getTopics', 'getClasses', 'manageQAs', 'getQAs'],
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
    'manageQAs',
    'getQAs',
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
    'manageQAs',
    'getQAs',
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
    'manageQAs',
    'getQAs',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
