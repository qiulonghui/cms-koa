import { LinRouter, NotFound } from 'lin-mizar';
import { groupRequired, loginRequired } from '../../middleware/jwt';
import {
  OrderRepairSearchValidator,
  CreateOrUpdateOrderRepairValidator,
  UpdateOrderRepairStateValidator
} from '../../validator/order-repair';
import { PositiveIdValidator, PaginateValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { BookNotFound } from '../../lib/exception';
import { OrderRepairDao } from '../../dao/order-repair';

// orderRepair 的实例
const orderRepairApi = new LinRouter({
  prefix: '/v1/orderRepair',
  module: '维修工单'
});

// orderRepair 的dao 数据库访问层实例
const orderRepairDao = new OrderRepairDao();

orderRepairApi.get('/:id', loginRequired, async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const order = await orderRepairDao.getOrder(id);
  if (!order) {
    throw new NotFound({
      code: 10022
    });
  }
  ctx.json(order);
});

orderRepairApi.get('/', loginRequired, async (ctx) => {
  const v = await new PaginateValidator().validate(ctx);

  const { orders, total } = await orderRepairDao.getOrders(
    v.get('query.page'),
    v.get('query.count')
  );

  ctx.json({
    items: orders,
    total,
    count: v.get('query.count'),
    page: v.get('query.page')
  });
});

orderRepairApi.get('/search/one', loginRequired, async (ctx) => {
  const v = await new OrderRepairSearchValidator().validate(ctx);
  const order = await orderRepairDao.getOrderByKeyword(v.get('query.q'));
  if (!order) {
    throw new BookNotFound();
  }
  ctx.json(order);
});

orderRepairApi.post('/', loginRequired, async (ctx) => {
  const v = await new CreateOrUpdateOrderRepairValidator().validate(ctx);
  await orderRepairDao.createOrder(v, ctx);
  ctx.success({
    code: 12
  });
});

orderRepairApi.put('/:id', loginRequired, async (ctx) => {
  const v = await new CreateOrUpdateOrderRepairValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await orderRepairDao.updateOrder(v, id, ctx);
  ctx.success({
    code: 13
  });
});

orderRepairApi.put(
  'updateOrderState',
  '/:id/state', loginRequired, async (ctx) => {
    const v = await new UpdateOrderRepairStateValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await orderRepairDao.updateOrderState(v, id);
    ctx.success({
      code: 2
    });
  });

orderRepairApi.linDelete(
  'deleteOrder',
  '/:id',
  orderRepairApi.permission('删除维修工单'),
  loginRequired,
  groupRequired,
  async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await orderRepairDao.del(id);
    ctx.success({
      code: 14
    });
  }
);

module.exports = { orderRepairApi };
