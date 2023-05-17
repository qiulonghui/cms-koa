import { LinRouter, getTokens, config } from 'lin-mizar';
import {
  RegisterByUsernameValidator,
  LoginByWxcodeValidator,
  LoginByUsernameValidator,
  UpdateInfoValidator,
  ChangePasswordValidator
} from '../../validator/user';

import {
  loginRequired,
  refreshTokenRequiredWithUnifyException
} from '../../middleware/jwt';
import { UserIdentityModel } from '../../model/user';
import { UserDao } from '../../dao/user';
import { generateCaptcha } from '../../lib/captcha';

const user = new LinRouter({
  prefix: '/api/wx'
});

const userDao = new UserDao();

user.get(
  'wxGetToken',
  '/getToken',
  async ctx => {
    const v = await new LoginByWxcodeValidator().validate(ctx);
    const { accessToken, refreshToken } = await userDao.getTokensByOpenid(v);
    ctx.json({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }
);

// user.linPost('userLogin', '/login', async ctx => {
//   const v = await new LoginByUsernameValidator().validate(ctx);
//   const { accessToken, refreshToken } = await userDao.getTokens(v, ctx);
//   ctx.json({
//     access_token: accessToken,
//     refresh_token: refreshToken
//   });
// });

// user.linPost('userCaptcha', '/captcha', async ctx => {
//   let tag = null;
//   let image = null;

//   if (config.getItem('loginCaptchaEnabled', false)) {
//     ({ tag, image } = await generateCaptcha());
//   }

//   ctx.json({
//     tag,
//     image
//   });
// });

// user.linPut(
//   'userUpdate',
//   '/',
//   loginRequired,
//   async ctx => {
//     const v = await new UpdateInfoValidator().validate(ctx);
//     await userDao.updateUser(ctx, v);
//     ctx.success({
//       code: 6
//     });
//   }
// );

// user.linPut(
//   'userUpdatePassword',
//   '/change_password',
//   loginRequired,
//   async ctx => {
//     const user = ctx.currentUser;
//     const v = await new ChangePasswordValidator().validate(ctx);
//     await UserIdentityModel.changePassword(
//       user,
//       v.get('body.old_password'),
//       v.get('body.new_password')
//     );
//     ctx.success({
//       code: 4
//     });
//   }
// );

// user.linGet(
//   'userGetToken',
//   '/refresh',
//   refreshTokenRequiredWithUnifyException,
//   async ctx => {
//     const user = ctx.currentUser;
//     const { accessToken, refreshToken } = getTokens(user);
//     ctx.json({
//       access_token: accessToken,
//       refresh_token: refreshToken
//     });
//   }
// );

// user.linGet(
//   'userGetPermissions',
//   '/permissions',
//   loginRequired,
//   async ctx => {
//     const user = await userDao.getPermissions(ctx);
//     ctx.json(user);
//   }
// );

// user.linGet(
//   'getInformation',
//   '/information',
//   loginRequired,
//   async ctx => {
//     const info = await userDao.getInformation(ctx);
//     ctx.json(info);
//   }
// );

export { user };