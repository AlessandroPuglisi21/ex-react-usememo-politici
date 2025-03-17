
import { useState, useEffect } from "react";

function ListaPolitici() {

    const [politico, setPolitico] = useState([])
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
                console.log(data)
                setPolitico(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <>
            <h1>Lista Politici</h1>
            <div>
                {politico.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2>{item.name}</h2>
                            <p>{item.biography}</p>
                            <h3>{item.position}</h3>
                            <img src={item.image} alt="" />
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default ListaPolitici;