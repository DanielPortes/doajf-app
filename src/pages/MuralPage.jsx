import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {

            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const MuralPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    author: profiles (email)
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Erro ao buscar posts:', error);
            } else {
                setPosts(data);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return <Spinner />;

    if (posts.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <h1 className="text-4xl font-extrabold text-center mb-4">Mural da Solidariedade</h1>
                <p>Ainda não há nenhuma publicação no mural. Volte em breve!</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100">Mural da Solidariedade</h1>

            {}
            <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {posts.map(post => (

                    <motion.div
                        key={post.id}
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                        {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />}
                        <div className="p-6 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{post.title}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Publicado em {new Date(post.created_at).toLocaleDateString('pt-BR')}
                                {post.author && ` por ${post.author.email}`}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 flex-grow">{post.content}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MuralPage;