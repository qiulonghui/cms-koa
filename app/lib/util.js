import { toSafeInteger, get, isInteger } from 'lodash';
import { ParametersException, Failed, config } from 'lin-mizar';

const axios = require('axios');

function getSafeParamId (ctx) {
  const id = toSafeInteger(get(ctx.params, 'id'));
  if (!isInteger(id)) {
    throw new ParametersException({
      code: 10030
    });
  }
  return id;
}

function isOptional (val) {
  // undefined , null , ""  , "    ", 皆通过
  if (val === undefined) {
    return true;
  }
  if (val === null) {
    return true;
  }
  if (typeof val === 'string') {
    return val === '' || val.trim() === '';
  }
  return false;
}

async function getWxOpenId (code) {
  const wx = config.getItem('wx');
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wx.appId}&secret=${wx.appSecret}&js_code=${code}&grant_type=authorization_code`;
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Failed({
      code: 11001,
      message: 'openid获取失败'
    });
  }
  const errcode = response.data.errcode;
  const errmsg = response.data.errmsg;
  if (errcode) {
    throw new Failed({
      code: 11001,
      message: 'openid获取失败:' + errmsg
    });
  }
  return response.data.openid;
}

export { getSafeParamId, isOptional, getWxOpenId };
