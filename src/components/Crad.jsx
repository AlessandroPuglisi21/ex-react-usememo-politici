import React from "react";

const PoliticoCard = React.memo(({ item }) => {
    console.log("Rendering:", item.name);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-70 object-center" />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-600 dark:text-sky-400">{item.name}</h2>
                <h3 className="text-gray-700 dark:text-gray-300">{item.position}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{item.biography}</p>
            </div>
        </div>
    );
});

export default PoliticoCard;
