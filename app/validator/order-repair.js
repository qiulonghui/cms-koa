import { LinValidator, Rule } from 'lin-mizar';

class OrderRepairSearchValidator extends LinValidator {
  constructor() {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateOrderRepairValidator extends LinValidator {
  constructor() {
    super();
    this.name = new Rule('isNotEmpty', '必须传入报修人姓名');
    this.phone = new Rule('isNotEmpty', '必须传入报修人电话');
    this.depart = new Rule('isNotEmpty', '必须传入保修科室');
    this.address = new Rule('isNotEmpty', '必须维修地点');
    this.desc = new Rule('isLength', '请输入什么备注,长度必须在0~200之间', {
      min: 0,
      max: 200,
    });
  }
}

export { CreateOrUpdateOrderRepairValidator, OrderRepairSearchValidator };
