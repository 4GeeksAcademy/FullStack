import simpleRestProvider from 'ra-data-simple-rest';

const rawBaseUrl = process.env.BACKEND_URL || '';
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : rawBaseUrl + '/';

const baseProvider = simpleRestProvider(baseUrl);

const customRoutes = {
    users: {
        list: 'usuariospag',
        one: 'usuario',
        update: 'usuario',
        delete: 'usuario',
        create: 'usuario'
    },
    oferta: {
        list: 'ofertaspag',
        one: 'oferta',
        update: 'oferta',
        delete: 'oferta',
        create: 'oferta'
    },
    viajes: {
        list: 'viajespag',
        one: 'viajes',
        update: 'viajes',
        delete: 'viajes',
        create: 'viajes'
    },
    tops: {
        list: 'toppag',
        one: 'top',
        update: 'top',
        delete: 'top',
        create: 'top'
    },
    bellezas: {
        list: 'bellezapag',
        one: 'belleza',
        update: 'belleza',
        delete: 'belleza',
        create: 'belleza'
    },
    gastronomias: {
        list: 'gastronomiapag',
        one: 'gastronomia',
        update: 'gastronomia',
        delete: 'gastronomia',
        create: 'gastronomia'
    }
};

const getEndpoint = (resource, operation) =>
    customRoutes[resource]?.[operation] || resource;

const dataProvider = {
    ...baseProvider,

    getList: async (resource, params) => {
        if (customRoutes[resource]) {
            const endpoint = getEndpoint(resource, 'list');
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;

            const queryParams = new URLSearchParams({
                _sort: field,
                _order: order,
                _start: (page - 1) * perPage,
                _end: page * perPage
            });

            const url = `${baseUrl}${endpoint}?${queryParams.toString()}`;
            const response = await fetch(url);
            const json = await response.json();

            return {
                data: json.data,
                total: json.total || parseInt(response.headers.get('X-Total-Count'), 10)
            };
        }

        return baseProvider.getList(resource, params);
    },

    getOne: async (resource, params) => {
        const endpoint = getEndpoint(resource, 'one');
        const url = `${baseUrl}${endpoint}/${params.id}`;
        const response = await fetch(url);
        const data = await response.json();
        return { data };
    },

    update: async (resource, params) => {
        const endpoint = getEndpoint(resource, 'update');
        const response = await fetch(`${baseUrl}${endpoint}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return { data };
    },

    delete: async (resource, params) => {
        const endpoint = getEndpoint(resource, 'delete');
        const response = await fetch(`${baseUrl}${endpoint}/${params.id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return { data };
    },

    updateMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                fetch(`${baseUrl}${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => res.json())
            )
        );
        return { data: responses.map(r => r.id) };
    },

    deleteMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                fetch(`${baseUrl}${resource}/${id}`, {
                    method: 'DELETE'
                }).then(res => res.json())
            )
        );
        return { data: responses.map(r => r.id) };
    },

    create: async (resource, params) => {
        const endpoint = getEndpoint(resource, 'create');
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return { data };
    }
};

export default dataProvider;
