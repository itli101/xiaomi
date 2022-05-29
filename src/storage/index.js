/**
 * Storage封装
 */
const  STORAGE_KEY = 'mall';
export default{
  // 存储值
  setItem(key,value,module_name){
    // 如果模块名称存在
    if (module_name){
      // 获得模块名称的值
      let val = this.getItem(module_name);
      // 添加模块值的key值
      val[key] = value;
      // 模块值改变了，重新向模块属性赋值
      this.setItem(module_name, val);
    }else{
      // 获取storage所有信息
      let val = this.getStorage();
      // 为所有信息的key属性赋值
      val[key] = value;
      // 把更改后的所有信息的值变成json格式赋值给所有信息的key
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  // 获取某一个模块下面的属性user下面的userName
  getItem(key,module_name){
    // 如果模块存在
    if (module_name){
      // 获得模块的值
      let val = this.getItem(module_name);
      // 如果模块的值存在，返回key的值
      if(val) return val[key];
    }
    // 如果模块不存在，返回storage所有信息的key属性的值
    return this.getStorage()[key];
  },
  getStorage(){
    // 得到总的key的值
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  clear(key, module_name){
    // 获得整个的信息
    let val = this.getStorage();
    // 如果模块存在
    if (module_name){
      // 如果模块的值存在
      if (!val[module_name])return;
      // 删除Key值
      delete val[module_name][key];
    }else{
    // 如果模块不存在,直接删除key值
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}