import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { OrderRepair } from '../model/order-repair';

class OrderRepairDao {
  async getOrder(id) {
    const order = await OrderRepair.findOne({
      where: {
        id,
      },
    });
    return order;
  }

  async getOrderByKeyword(q) {
    const order = await OrderRepair.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`,
        },
      },
    });
    return order;
  }

  async getOrders() {
    const orders = await OrderRepair.findAll();
    return orders;
  }

  async createOrder(v, ctx) {
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
    ord.creater = curUser.username;
    ord.creater_id = curUser.id;

    await ord.save();
  }

  async updateOrder(v, id) {
    const order = await OrderRepair.findByPk(id);
    if (!order) {
      throw new NotFound({
        code: 10022,
      });
    }
    order.title = v.get('body.title');
    order.author = v.get('body.author');
    order.summary = v.get('body.summary');
    order.image = v.get('body.image');
    await order.save();
  }

  async deleteBook(id) {
    const order = await OrderRepair.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new NotFound({
        code: 10022,
      });
    }
    order.destroy();
  }
}

export { OrderRepairDao };
