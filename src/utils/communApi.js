


let checkPhone = (rule, value, callback) => {
  let re = /^1[3|4|5|7|8|9]\d{9}$/;
  if (value === '') {
    callback(new Error('请输入手机'));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error('请输入正确手机号码'));
    }
  }
};

//可以输入0或者0.00
let  checkNumber0 =(rule, value, callback,name='价格') => {
  let re = /^0{1}([.]([1-9][0-9]?)|[.][0-9][0-9])$|^[0-9]\d*([.]{1}[0-9]{1,2})?$/;
  if (value === '') {
    callback(new Error(`请输入${name}`));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error(`${name}格式错误`));
    }
  }
};

let  checkNumber =(rule, value, callback,name='价格') => {
  let re = /^0{1}([.]([1-9][0-9]?)|[.][0-9][1-9])$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
  if (value === '') {
    callback(new Error(`请输入${name}`));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error(`${name}格式错误`));
    }
  }
};

let checkTime = (rule, value, callback) => {
  let re = /^0{1}([.][1-9])$|^[1-9]\d*([.]{1}[0-9]{1})?$/;
  if (value === '') {
    callback(new Error('请输入时间'));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error('时间格式错误'));
    }
  }
};

let checkOrder = (rule, value, callback,name1,name2) =>{
  let re = /^([0-9])+$/g;
  if (value === '') {
    callback(new Error(name1));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error(name2));
    }
  }
};

let checkPositiveInteger = (rule, value, callback,name1,name2) =>{
  let re = /^[1-9][0-9]*$/g;
  if (value === '') {
    callback(new Error(name1));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error(name2));
    }
  }
};

let checkNumberOfTime = (rule, value, callback,name='次数') =>{
  let re = /^[1-9][0-9]*$/g;
  if (value === '') {
    callback(new Error(`请输入${name}`));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error(`${name}格式错误`));
    }
  }
};

let checkPercent = (rule, value, callback) =>{
  let re = /^[1-9][0-9]*[0-9]*$/g;
  if (value === '') {
    callback(new Error('请输入百分比'));
  }else {
    if(re.test(value)){
      if(value*1>99){
        callback(new Error('百分比最高为99'));
      }else {
        callback()
      }
    }else {
      callback(new Error('百分比格式错误'));
    }
  }
};

let checkTel = (rule, value, callback,name1,name2) => {
  let re = /^([0-9]|[-])+$/g;
  if (value === '') {
    callback(new Error(name1));
  }else {
    if(re.test(value)){
      callback()
    }else {
      callback(new Error(name2));
    }
  }
};

export {checkTel,checkPhone,checkNumber0,checkNumber,checkTime,checkNumberOfTime,checkPercent,checkOrder,checkPositiveInteger}
