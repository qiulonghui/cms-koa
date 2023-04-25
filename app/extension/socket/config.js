'use strict';

module.exports = {
  socket: {
    path: '/ws/message',
    enable: true, // 是否开启 websocket 模块
    intercept: true // 是否开启 websocket 的鉴权拦截器
  }
};
