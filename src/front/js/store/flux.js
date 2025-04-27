const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      categories: [
        { id: "top", name: "Top Ofertas", icon: "⭐" },
        { id: "beauty", name: "Belleza", icon: "💄" },
        { id: "food", name: "Gastronomía", icon: "🍴" },
        { id: "travel", name: "Viajes", icon: "✈️" },
      ],
      producto: [
        {
          id: 1,
          title: "Spa de Lujo Completo",
          description:
            "Día completo con acceso a todas las instalaciones y 2 tratamientos",
          image:
            "https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          city: "Madrid",
          category: "beauty",
          discountPrice: 89,
          originalPrice: 150,
          rating: 4,
          reviews: 120,
          buyers: 250,
        },
      ],
      serviciosViajes: [],
      serviciosGastronomia: [],
      serviciosBelleza: [],
      cartItems: [], // Aquí se almacenarán los productos en el carrito
      selectedCategory: null,
      ofertasDisponibles: 0, // Agregar este estado para el número de ofertas disponibles
    },
    actions: {
      // Ejemplo de función para cambiar el color
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      // Obtener un mensaje del backend (puedes adaptarlo a tu necesidad)
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      // Cambiar color de un item en el demo
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo: demo });
      },

      // Actualizar las ofertas disponibles en el store
      updateOfertasDisponibles: (nuevasOfertas) => {
        setStore({ ofertasDisponibles: nuevasOfertas });
      },

      // Agregar item al carrito
      addToCart: (item) => {
        const store = getStore();
        // Comprobamos si el item ya está en el carrito
        const existingItem = store.cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          // Si ya existe, solo aumentamos la cantidad
          const updatedCart = store.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          setStore({ cartItems: updatedCart });
        } else {
          // Si no existe, agregamos el item con cantidad 1
          setStore({
            cartItems: [...store.cartItems, { ...item, quantity: 1 }],
          });
        }
      },

      // Eliminar item del carrito
      removeItemFromCart: (id) => {
        const store = getStore();
        setStore({
          cartItems: store.cartItems.filter((item) => item.id !== id),
        });
      },

      // Actualizar cantidad de un item en el carrito
      updateQuantity: (id, newQuantity) => {
        const store = getStore();
        if (newQuantity < 1) return;
        const updatedCart = store.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setStore({ cartItems: updatedCart });
      },

      // Calcular subtotal del carrito
      calculateSubtotal: () => {
        const store = getStore();
        return store.cartItems.reduce(
          (sum, item) => sum + item.discountPrice * item.quantity,
          0
        );
      },
      cargarServiciosViajes: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/viajes");
          const data = await resp.json();
          const viajes = data.viajes || [];
          console.log("Datos de viajes recibidos:", viajes);
          
          // Actualizamos el store directamente
          setStore({ serviciosViajes: viajes });
          
          // Devolvemos los viajes para posible uso en componentes
          return viajes;
        } catch (e) {
          console.error("Error al cargar viajes:", e);
          return [];
        }
      },
      
      cargarServiciosGastronomia: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/gastronomia");
          const data = await resp.json();
          const gastronomia = data.gastronomia || [];
          console.log("Datos de gastronomía recibidos:", gastronomia);
          
          // Actualizamos el store directamente
          setStore({ serviciosGastronomia: gastronomia });
          
          // Devolvemos la gastronomía para posible uso en componentes
          return gastronomia;
        } catch (e) {
          console.error("Error al cargar gastronomía:", e);
          return [];
        }
      },
      
      cargarServiciosBelleza: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/belleza");
          const data = await resp.json();
          const belleza = data.belleza || [];
          console.log("Datos de belleza recibidos:", belleza);
          
          // Actualizamos el store directamente
          setStore({ serviciosBelleza: belleza });
          
          // Devolvemos la belleza para posible uso en componentes
          return belleza;
        } catch (e) {
          console.error("Error al cargar belleza:", e);
          return [];
        }
      },
    },
  };
};

export default getState;