import {useState, useEffect, useCallback} from 'react';
import {supabase} from '../services/supabaseClient';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {UserPlusIcon, TrashIcon, PencilSquareIcon, ArrowPathIcon} from '@heroicons/react/24/solid';
import Alert from '../components/Alert';

const ConfirmationModal = ({isOpen, onClose, onConfirm, title, message}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} variant="secondary">Cancelar</Button>
                    <Button onClick={onConfirm} variant="danger">Confirmar</Button>
                </div>
            </div>
        </div>
    );
};

const EditRoleModal = ({isOpen, onClose, onConfirm, user}) => {
    const [role, setRole] = useState(user?.user_metadata?.role || 'agente');
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Editar Papel
                    de {user.email}</h3>
                <div className="mb-6">
                    <label htmlFor="role-select"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Papel</label>
                    <select id="role-select" value={role} onChange={e => setRole(e.target.value)}
                            className="w-full mt-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option value="agente">Agente</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} variant="secondary">Cancelar</Button>
                    <Button onClick={() => onConfirm(user.id, role)}>Salvar</Button>
                </div>
            </div>
        </div>
    );
};

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [message, setMessage] = useState({type: '', text: ''});
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 300));
        try {
            const {data, error} = await supabase.functions.invoke('list-users');
            if (error) throw error;
            setUsers(data);
            setMessage({type: '', text: ''});
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage({
                type: 'error',
                text: 'Você não tem permissão para ver os usuários ou houve um erro de conexão.'
            });
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    const handleInvite = async (e) => {
        e.preventDefault();
        setInviteLoading(true);
        setMessage({type: '', text: ''});

        try {
            const {error} = await supabase.functions.invoke('invite-user', {
                body: {email: inviteEmail},
            });
            if (error) throw error;
            setMessage({type: 'success', text: `Convite enviado com sucesso para ${inviteEmail}`});
            setInviteEmail('');
            fetchUsers();
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Erro ao enviar convite. Verifique se o e-mail é válido e se o usuário já não existe.'
            });
        } finally {
            setInviteLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const {error} = await supabase.functions.invoke('delete-user', {body: {userId}});
            if (error) throw error;
            setMessage({type: 'success', text: 'Usuário removido com sucesso.'});
            fetchUsers();
        } catch (error) {
            setMessage({type: 'error', text: 'Erro ao remover usuário.'});
        } finally {
            setUserToDelete(null);
        }
    };

    const handleUpdateRole = async (userId, role) => {
        try {
            const {error} = await supabase.functions.invoke('update-user-role', {body: {userId, role}});
            if (error) throw error;
            setMessage({type: 'success', text: 'Papel do usuário atualizado.'});
            fetchUsers();
        } catch (error) {
            setMessage({type: 'error', text: 'Erro ao atualizar o papel.'});
        } finally {
            setUserToEdit(null);
        }
    };


    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gerenciamento de Agentes</h1>

            {}
            <div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Convidar Novo Agente</h2>
                <form onSubmit={handleInvite} className="flex items-end gap-4">
                    <div className="flex-grow">
                        <label htmlFor="invite-email"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail do
                            Agente</label>
                        <input
                            id="invite-email" type="email" value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="novo.agente@pjf.gov.br"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            required
                        />
                    </div>
                    <Button type="submit" loading={inviteLoading} icon={inviteLoading ? ArrowPathIcon : UserPlusIcon}>
                        {inviteLoading ? 'Enviando...' : 'Convidar'}
                    </Button>
                </form>
                {message.text && <Alert type={message.type} message={message.text}/>}
            </div>

            {}
            {}
            {loading ? (

                <div
                    className="flex justify-center items-center min-h-[40vh] bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                    <Spinner/>
                </div>
            ) : (

                <div
                    className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-slate-100 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">E-mail</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Papel
                                (Role)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Último
                                Acesso
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${user.user_metadata?.role === 'admin' ? 'bg-primary-100 text-primary-800 dark:bg-primary-800/20 dark:text-primary-300' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}>{user.user_metadata?.role || 'agente'}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('pt-BR') : 'Nunca'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setUserToEdit(user)}
                                                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full">
                                            <PencilSquareIcon className="h-5 w-5"/></button>
                                        <button onClick={() => setUserToDelete(user)}
                                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                                            <TrashIcon className="h-5 w-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {}

            {}
            <ConfirmationModal isOpen={!!userToDelete} onClose={() => setUserToDelete(null)}
                               onConfirm={() => handleDeleteUser(userToDelete.id)} title="Confirmar Remoção"
                               message={`Tem certeza que deseja remover o agente ${userToDelete?.email}? Esta ação não pode ser desfeita.`}/>
            <EditRoleModal isOpen={!!userToEdit} onClose={() => setUserToEdit(null)} onConfirm={handleUpdateRole}
                           user={userToEdit}/>
        </div>
    );
};

export default UserManagementPage;