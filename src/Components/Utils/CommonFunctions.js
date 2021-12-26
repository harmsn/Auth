import { message } from 'antd';

const success = (msg) => {
    message.success(msg);
};
  
const error = (msg) => {
    message.error(msg);
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

export { success,error,debounce };