import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    description: [
      {required: true, message: '请输入活动不足之处', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 100 个字符', trigger: 'blur'}
    ],
  };
};
