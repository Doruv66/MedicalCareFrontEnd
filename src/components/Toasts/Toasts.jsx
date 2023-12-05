import { toast } from 'react-toastify';

const Toasts = {
    success(msg) {
        return  toast.success(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressStyle: {background: "transparent", border: "0.01px groove rgba(255, 255, 255, .5)",
                    borderRadius: "5px",
                    backdropFilter: "blur(50px)",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .5)"},
                    theme: "dark",
                });
    },
    warn(msg) {
        return  toast.warn(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressStyle: {background: "transparent", border: "0.01px groove rgba(255, 255, 255, .5)",
                    borderRadius: "5px",
                    backdropFilter: "blur(50px)",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .5)"},
                    theme: "dark",
                });
    },
    info(msg) {
        return  toast.info(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressStyle: {background: "transparent", border: "0.01px groove rgba(255, 255, 255, .5)",
                    borderRadius: "5px",
                    backdropFilter: "blur(50px)",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .5)"},
                    theme: "dark",
                });
    },
    error(msg) {
        return  toast.error(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressStyle: {background: "transparent", border: "0.01px groove rgba(255, 255, 255, .5)",
                    borderRadius: "5px",
                    backdropFilter: "blur(50px)",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .5)"},
                    theme: "dark",
                });
    }
}
export default Toasts;