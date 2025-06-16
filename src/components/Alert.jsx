import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const Alert = ({ type, message }) => {
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;

    if (!message) return null;

    return (
        <div className={`p-4 mt-4 rounded-md ${bgColor} flex items-center`}>
            <Icon className={`h-5 w-5 ${textColor} mr-3`} />
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
    );
};

export default Alert;