import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    actionName: [
      {required: true, message: '请输入活动名称', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
    ],
    address:[
      {required: true, message: '请输入活动地址', trigger: 'blur'},
      {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
      ],
    summary:[
      {required: true, message: '请输入邮箱', trigger: 'blur'},
      {min:0,max:50,message:'请输入0-50位密码', trigger: 'blur'},
    ],
    content:[
      {required: true, message: '请输入密码', trigger: 'blur'},
      {min:0,max:100,message:'请输入0-100位密码', trigger: 'blur'},
    ],
  };
};
