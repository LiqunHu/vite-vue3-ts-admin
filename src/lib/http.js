import axios from "axios";
import common from "./common";
import { ElMessage } from "element-plus";

const instance = axios.create({ timeout: 1000 * 12 });
//拦截request
instance.interceptors.request.use(
  (config) => {
    const token = common.getStoreData("token");
    token && (config.headers["Authorization"] = token);
    return config;
  },
  (error) => Promise.error(error)
);

//拦截response
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    if (res.data.errno !== "0") {
      ElMessage.error({
        showClose: true,
        message: res.data.message
      });
    }
    return res;
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.msg);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  }
);

const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    case 401:
      ElMessage.error({
        showClose: true,
        message: msg || `请先登录`
      });
      break;
    case 403:
      ElMessage.error({
        showClose: true,
        message: `登录过期，请重新登录`
      });
      break;
    case 404:
      ElMessage.error({
        showClose: true,
        message: `请求的资源不存在`
      });
      break;
    case 500:
      ElMessage.error({
        showClose: true,
        message: `服务器内部错误`
      });
      break;
    case 700:
      ElMessage.error({
        showClose: true,
        message: msg || "未知错误,请刷新重试"
      });
      break;
    default:
      ElMessage.error({
        showClose: true,
        message: `未知错误`
      });
  }
};

export default {
  POST(url, params = {}) {
    return instance.post(url, params);
  }
};
