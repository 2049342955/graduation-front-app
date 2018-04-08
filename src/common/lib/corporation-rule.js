import Moment from 'moment';

export default function (dateFiledName) {
  const that = this;
  return {
    name: [
      {required: true, message: '请输入社团名称', trigger: 'blur'},
      {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
    ],
    createdby:[
      {required: true, message: '请输入社团创始人', trigger: 'blur'},
      {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
    ],
    aim:[
      {required: true, message: '请输入主旨', trigger: 'blur'},
      {min:0,max:50,message:'长度在 1 到 50 个字符', trigger: 'blur'},
    ],
    description:[
      {required: true, message: '请输入描述', trigger: 'blur'},
      {min:0,max:100,message:'长度在 1 到 200 个字符', trigger: 'blur'},
    ],
  };
};
