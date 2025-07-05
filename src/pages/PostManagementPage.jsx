import {useState, useEffect, useCallback} from 'react';
import {supabase} from '../services/supabaseClient';
import {useAuth} from '../hooks/useAuth';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

const PostManagementPage = () => {
    const {user} = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const fetchPosts = useCallback(async () => {
        const {data, error} = await supabase.from('posts').select('*').order('created_at', {ascending: false});
        if (!error) setPosts(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleImageUpload = async () => {
        if (!imageFile) return null;
        const fileName = `${user.id}/${Date.now()}-${imageFile.name}`;
        const {data, error} = await supabase.storage.from('post-images').upload(fileName, imageFile);
        if (error) {
            throw new Error('Erro no upload da imagem.');
        }
        const {data: {publicUrl}} = supabase.storage.from('post-images').getPublicUrl(fileName);
        return publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const imageUrl = await handleImageUpload();
            const {error} = await supabase.from('posts').insert({
                user_id: user.id,
                title,
                content,
                image_url: imageUrl,
            });
            if (error) throw error;
            setTitle('');
            setContent('');
            setImageFile(null);
            fetchPosts();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <Spinner/>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciar Mural</h1>
            {/* Formulário para criar novo post */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                {/* ... inputs para title, content e file ... */}
                <Button type="submit" loading={loading}>Publicar</Button>
            </form>
            {/* Lista de posts existentes com botão de apagar */}
        </div>
    );
};

export default PostManagementPage;