import { DONATION_STATUS, STATUS_COLORS } from '../constants';

const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case DONATION_STATUS.PENDING:
                return STATUS_COLORS[DONATION_STATUS.PENDING];
            case DONATION_STATUS.COLLECTED:
                return STATUS_COLORS[DONATION_STATUS.COLLECTED];
            case DONATION_STATUS.DELIVERED:
                return STATUS_COLORS[DONATION_STATUS.DELIVERED];
            default:
                return STATUS_COLORS.default;
        }
    };

    return (
        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;