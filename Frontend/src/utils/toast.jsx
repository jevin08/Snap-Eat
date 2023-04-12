import toast from 'react-hot-toast';

const Notify = ({ message, type, handleTimeOut }) => {
    let duration = undefined;
    switch (type) {
        case 'warning':
            duration = 6000;
            toast.custom(message, {
                duration: duration,
                icon: '⚠',
            })
            break;
        case 'success':
            duration = 2000;
            toast.success(message, { duration: duration })
            break;
        case 'info':
            duration = 1000;
            toast(message, {
                duration:duration,
                icon: <span className='px-1 text-center rounded-circle' style={{backgroundColor:"#ffc107", width:"20px"}}>ℹ</span>,
            });
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message);
            break;
    }
    return duration;
}
export default Notify;