import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    title: [
      {required: true, message: '请输入公告标题', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 20 个字符', trigger: 'blur'}
    ],
    message:[
      {required: true, message: '请输入公告内容', trigger: 'blur'},
      {min: 1, max: 20, message: '长度在 1 到 100 个字符', trigger: 'blur'}
    ]
  };
};
