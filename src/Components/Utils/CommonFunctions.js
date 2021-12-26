import { message } from 'antd';

const success = (msg) => {
    message.success(msg);
    //alert(msg);
};
  
const error = (msg) => {
    message.error(msg);
    //alert(msg);
};
  
const warning = (msg) => {
    message.warning(msg);
    //alert(msg)
};

const debounce = (func, delay) => {
    let debounceTimer
    return function() {
        const context = this
        const args = arguments
            clearTimeout(debounceTimer)
                debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

export { success,error,warning,debounce };