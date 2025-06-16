import DonationForm from '../components/DonationForm';
import { GiftIcon } from '@heroicons/react/24/solid';

const PublicPage = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <GiftIcon className="h-16 w-16 mx-auto text-primary-600 mb-4" />

            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
                Ajude a transformar vidas.
            </h1>
            <p className="max-w-2xl text-lg text-text-secondary mb-10">
                Cada cesta básica é um gesto de esperança. Faça parte desta corrente de solidariedade em Juiz de Fora.
            </p>
            <DonationForm />
        </div>
    );
};

export default PublicPage;