const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.redunion.archive",
    version: "1.0.0",
    name: "Red Union Archive",
    description: "Addon pessoal com magnets de arquivos físicos",
    catalogs: [
        {
            type: "series",
            id: "redunion-series",
            name: "Red Union Series"
        }
    ],
    resources: ["catalog", "stream"],
    types: ["series"],
    idPrefixes: ["redunion"]
};

const builder = new addonBuilder(manifest);

// Catálogo com 1 item: House
builder.defineCatalogHandler(({ type, id }) => {
    if (id === "redunion-series") {
        return Promise.resolve({
            metas: [
                {
                    id: "redunion:house",
                    type: "series",
                    name: "House M.D.",
                    poster: "https://upload.wikimedia.org/wikipedia/en/2/22/House_MD_season_1.jpg",
                    description: "Dr. House diagnostica doenças difíceis e insulta seus pacientes."
                }
            ]
        });
    }
});

// Link magnet para a série
builder.defineStreamHandler(({ type, id }) => {
    if (id === "redunion:house") {
        return Promise.resolve({
            streams: [
                {
                    title: "Temporada completa (arquivo pessoal)",
                    url: "magnet:?xt=urn:btih:XXXXXXXXXXXXXXXXXXXXXXX", // <-- seu magnet
                    behaviorHints: {
                        bingeGroup: "house"
                    }
                }
            ]
        });
    }

    return Promise.resolve({ streams: [] });
});

module.exports = builder.getInterface();
