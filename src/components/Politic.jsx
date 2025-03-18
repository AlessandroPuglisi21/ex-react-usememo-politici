import { useState, useEffect } from "react";

function ListaPolitici() {
    const [politico, setPolitico] = useState([]);
    const [filteredPolitico, setFilteredPolitico] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Errore HTTP');
                }
                return response.json();
            })
            .then((data) => {
                setPolitico(data);
                setFilteredPolitico(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);

        const filtered = politico.filter((item) =>
            item.name.toLowerCase().includes(value)
            || item.position.toLowerCase().includes(value)
            || item.biography.toLowerCase().includes(value)
        );
        setFilteredPolitico(filtered);
    };

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error.message}</p>;

    return (
        <>
            <div>
                <input
                    type="text"
                    className="bg-white text-black rounded-sm"
                    placeholder="Cerca info..."
                    value={search}
                    onChange={handleChange}
                />
            </div>
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Lista Politici</h1>
                <div className="grid md:grid-cols-4 gap-6">
                    {filteredPolitico.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-70 object-center" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-blue-600 dark:text-sky-400">{item.name}</h2>
                                <h3 className="text-gray-700 dark:text-gray-300">{item.position}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{item.biography}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ListaPolitici;
