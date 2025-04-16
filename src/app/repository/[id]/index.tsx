import { useRouter } from 'next/router';

const RepositoryPage = () => {
    const { query } = useRouter();
    const { id } = query;  // Получаем id репозитория из URL

    // Это данные репозитория, которые ты можешь получать из API
    const repository = {
        id: id,
        name: `Repo ${id}`,
        description: `Detailed description of repo ${id}`,
        stars: 100,
        forks: 50,
    };

    return (
        <div>
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
            <p>Stars: {repository.stars}</p>
            <p>Forks: {repository.forks}</p>
        </div>
    );
};

export default RepositoryPage;