const MountType = {
  Mount: 1, // 挂载
  Unmount: 0
};

const IdentityType = {
  Password: 'USERNAME_PASSWORD',
  OpenID: 'WX_OPENID'
};

const GroupLevel = {
  Root: 1,
  BuiltIn: 2,
  User: 3
};

export { MountType, IdentityType, GroupLevel };
