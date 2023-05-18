import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class OrderRepair extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      name: this.name,
      phone: this.phone,
      depart: this.depart,
      address: this.address,
      desc: this.desc,
      creater_id: this.creater_id,
      creater: this.creater,
      createTime: this.create_time,
      state: this.state
    };
    return origin;
  }
}

OrderRepair.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    depart: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    address: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    desc: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    creater_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    creater: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    state: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '维修工单状态：待处理(pending)|处理中(processing)|已完工(completed)'
    }
  },
  merge(
    {
      sequelize,
      tableName: 'order_repair',
      modelName: 'order_repair'
    },
    InfoCrudMixin.options
  )
);

export { OrderRepair };
