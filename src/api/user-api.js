
const Api = {};

const fetch = Fetch.getFetch();


function transform(serverObj) {
  const formObj = {};

  formObj.id = serverObj.id;
  formObj.companyId = serverObj.companyId;
  formObj.companyName = serverObj.companyName;
  formObj.storeId = serverObj.storeId;
  formObj.storeName = serverObj.storeName;
  formObj.number = serverObj.cardNo;
  formObj.typeId = serverObj.cardTypeId;
  if(serverObj.cardTypeCategory =='AC')
    formObj.typeCategory='实体卡';
  if(serverObj.cardTypeCategory =='EC')
    formObj.typeCategory='电子卡';
  formObj.typeName = serverObj.cardTypeName+formObj.typeCategory;
  //formObj.typeCategory = serverObj.cardTypeCategory;
  formObj.allowTransfer = serverObj.isAllowTransferFlag;
  formObj.tradePassword = serverObj.isTradePasswordFlag;
  formObj.assignedStatusCode = serverObj.assignedStatusCode;
  formObj.startDate = serverObj.startDate;
  formObj.endDate = serverObj.endDate;
  formObj.description = serverObj.description;
  return formObj;
}


function transServer(formObj) {
  const serverObj = {};
  serverObj.id = formObj.id;
  serverObj.storeName = formObj.storeName;
  serverObj.storeId = formObj.storeId;
  serverObj.companyId = formObj.companyId;
  serverObj.companyName = formObj.companyName;
  serverObj.cardNo = formObj.number;
  serverObj.cardTypeId = formObj.typeId;
  serverObj.cardTypeName = formObj.typeName;
  serverObj.cardTypeCategory = formObj.typeCategory;
  serverObj.isAllowTransferFlag = formObj.allowTransfer? "Y" : "N";
  serverObj.isTradePasswordFlag = formObj.tradePassword? "Y" : "N";
  serverObj.assignedStatusCode = formObj.assignedStatusCode;
  serverObj.startDate = formObj.startDate;
  serverObj.endDate = formObj.endDate;
  serverObj.description = formObj.description;
  return serverObj;
};




Api.query = async (query, pageNum = 1, pageSize = 10) => {
  const params={};
  if(query){
    if(query.number) params.cardNo = query.number;
    if(query.typeId) params.cardTypeId = query.typeId;
    if(query.assignedStatusCode) params.assignedStatusCode = query.assignedStatusCode;
    if(query.storeId)params.storeId = query.storeId;
  }
  params.pageNum =pageNum;
  params.pageSize = pageSize;
  const rst = await fetch.get("/cardBasicInfo/query",{params});
  const list = (rst.list || []).map(rstItem => {
    return transform(rstItem);
  });
  return {
    list,
    pageTotal: rst.total
  }
};


Api.update = async (formObj) => {
  const rst = await fetch.post("/cardBasicInfo/save", transServer(formObj));
  return transform(rst);
};


Api.add = async (formObj) => {
  formObj.assignedStatusCode ='N';
  const rst = await fetch.post("/cardBasicInfo/save", transServer(formObj));
  return transform(rst);
};

Api.list = async (query) => {
  const params ={};
  if(query){
    if(query.storeId) params.storeId = query.storeId;
  }
  params.assignedStatusCode='N';
  params.pageSize=100;
  const rst = await fetch.get("/cardBasicInfo/query",{params});
  return (rst.list || []).map(item => {
    return {
      id: item.id,
      number: item.cardNo,
      typeName:item.cardTypeName,
      typeCategory:item.cardTypeCategory
    }
  });
};

Api.del = async (cardInfoId) => {
  const rst = await fetch.get("/cardBasicInfo/delete?id="+cardInfoId);
  return rst.result;
};

export default Api;
