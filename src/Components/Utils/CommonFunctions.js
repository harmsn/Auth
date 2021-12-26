import { message } from 'antd';

//show success message
const success = (msg) => {
    message.success(msg);
};
  
//show error message
const error = (msg) => {
    message.error(msg);
};

//limit the function calling 
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