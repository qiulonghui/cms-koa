import { NotFound } from 'lin-mizar';
import Sequelize from 'sequelize';
import { OrderRepair } from '../model/order-repair';

class OrderRepairDao {
  async getOrder (id) {
    const order = await OrderRepair.findOne({
      where: {
        id
      }
    });
    return order;
  }

  async getOrderByKeyword (q) {
    const order = await OrderRepair.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return order;
  }

  async getOrders (page, count1) {
    const { rows, count } = await OrderRepair.findAndCountAll({
      // where: {
      //   username: {
      //     [Op.ne]: 'root'
      //   }
      // },
      offset: (page - 1) * count1,
      limit: count1,
      order: [
        ['create_time', 'DESC']
      ]
    });
    return { orders: rows, total: count };
  }

  async createOrder (v, ctx) {
    // const order = await OrderRepair.findOne({
    //   where: {
    //     title: v.get('body.title')
    //   }
    // });
    // if (order) {
    //   throw new Forbidden({
    //     code: 10240,
    //   });
    // }
    const curUser = ctx.currentUser;
    const ord = new OrderRepair();
    ord.name = v.get('body.name');
    ord.phone = v.get('body.phone');
    ord.depart = v.get('body.depart');
    ord.address = v.get('body.address');
    ord.desc = v.get('body.desc');
    ord.creater = curUser.username || '微信小程序用户';
    ord.creater_id = curUser.id;
    ord.state = 'pending';

    await ord.save();
  }

  async updateOrder (v, id, ctx) {
    // const curUser = ctx.currentUser;
    const order = await OrderRepair.findByPk(id);
    if (!order) {
      throw new NotFound({
        code: 10022
      });
    }
    order.name = v.get('body.name');
    order.phone = v.get('body.phone');
    order.depart = v.get('body.depart');
    order.address = v.get('body.address');
    order.desc = v.get('body.desc');
    // order.creater = curUser.username;
    // order.creater_id = curUser.id;
    await order.save();
  }

  async deleteOrder (id) {
    const order = await OrderRepair.findOne({
      where: {
        id
      }
    });
    if (!order) {
      throw new NotFound({
        code: 10022
      });
    }
    order.destroy();
  }

  async updateOrderState (v, id) {
    const order = await OrderRepair.findOne({
      where: {
        id
      }
    });
    if (!order) {
      throw new NotFound({
        code: 10022
      });
    }
    order.state = v.get('body.state');
    await order.save();
  }
}

export { OrderRepairDao };
