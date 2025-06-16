const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'Aguardando Contato':
                return 'bg-yellow-200 text-yellow-800';
            case 'Coletada':
                return 'bg-blue-200 text-blue-800';
            case 'Entregue':
                return 'bg-green-200 text-green-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor()}`}>
      {status}
    </span>
    );
};

export default StatusBadge;