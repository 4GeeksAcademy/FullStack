import { Tooltip } from "bootstrap";

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
        { id: "belleza", name: "Belleza", icon: "💄" },
        { id: "gastronomia", name: "Gastronomía", icon: "🍴" },
        { id: "viajes", name: "Viajes", icon: "✈️" },
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
      serviciosOfertas: [],
      serviciosTop: [],
      cartItems: [],
      selectedCategory: null,
      ofertasDisponibles: 0, // Agregar este estado para el número de ofertas disponibles
      productDetails: {
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
      user: null, // Aquí almacenaremos los datos del usuario
    },
    actions: {
      // Ejemplo de función para cambiar el color
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      saveCartToLocalStorage: () => {
        const store = getStore();
        localStorage.setItem("cartItems", JSON.stringify(store.cartItems));
      },

      // Cargar el carrito desde localStorage (por si no se inicializó arriba)
      loadCartFromLocalStorage: () => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
          setStore({ cartItems: JSON.parse(storedCart) });
        }
      },

      addToCart: (item) => {
        const store = getStore();
        const existingItem = store.cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        let updatedCart;

        if (existingItem) {
          updatedCart = store.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          updatedCart = [...store.cartItems, { ...item, quantity: 1 }];
        }

        setStore({ cartItems: updatedCart });
        getActions().saveCartToLocalStorage(); // Guardar
      },

      removeItemFromCart: (id) => {
        const store = getStore();
        const updatedCart = store.cartItems.filter((item) => item.id !== id);
        setStore({ cartItems: updatedCart });
        getActions().saveCartToLocalStorage(); // Guardar
      },

      updateQuantity: (id, newQuantity) => {
        if (newQuantity < 1) return;
        const store = getStore();
        const updatedCart = store.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setStore({ cartItems: updatedCart });
        getActions().saveCartToLocalStorage(); // Guardar
      },

      // Puedes llamar esto desde el layout o componente principal al iniciar
      initializeApp: () => {
        getActions().loadCartFromLocalStorage();
        getActions().loadUserFromStorage();
      },
      
      loginUser: async ({ correo, password }) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + '/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, password })
            });
            const data = await resp.json();
            if (!resp.ok) {
                console.error("Login error:", data);
                return false;
            }
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify({
                correo: data.mensaje.split(', ')[1].replace('', ''),
                role: data.role || 'cliente'
            }));
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    },
    registerUser: async ({ correo, password, telefono, direccion, ciudad }) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + '/registro', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo,
                    password,
                    telefono,
                    direccion_line1: direccion,
                    ciudad,
                    role: "cliente"
                })
            });
            const data = await resp.json();
            if (!resp.ok) {
                console.error("Register error:", data);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Register error:", error);
            return false;
        }
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
      
      addProductToCart: async () => {
        
      }
      ,

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

      // Función para setear los datos del usuario en el store
      setUser: (userData) => {
        setStore({ user: userData });
        // Guardar los datos del usuario en el localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      },

      // Función para cargar el usuario desde el localStorage
      loadUserFromStorage: () => {
        const user = localStorage.getItem("user");
        if (user) {
          setStore({ user: JSON.parse(user) });
        }
      },

      // Cargar servicios (viajes, gastronomía, belleza, etc.)
      cargarServiciosViajes: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/viajes");
          const data = await resp.json();
          const viajes = data.viajes || [];
          setStore({ serviciosViajes: viajes });
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
          setStore({ serviciosGastronomia: gastronomia });
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
          setStore({ serviciosBelleza: belleza });
          console.log("SERVICOSSS BELLEZAAAAAAAA", belleza)
          return belleza;
        } catch (e) {
          console.error("Error al cargar belleza:", e);
          return [];
        }
      },

      cargarServiciosTop: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/top");
          const data = await resp.json();
          const top = data.top || [];
          setStore({ serviciosTop: top });
          console.log("SERVICOSSS TOOOOOPPPP", top)
          return top;
        } catch (e) {
          console.error("Error al cargar top:", e);
          return [];
        }
      },


      cargarServiciosOfertas: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/ofertas");
          const data = await resp.json();
          const ofertas = data.ofertas || [];
          setStore({ serviciosOfertas: ofertas });
          return ofertas;
        } catch (e) {
          console.error("Error al cargar ofertas:", e);
          return [];
        }
      },
      loginUser: async ({ correo, password }) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + '/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, password })
            });
            const data = await resp.json();
            if (!resp.ok) {
                console.error("Login error:", data);
                return false;
            }
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify({
                correo: data.mensaje.split(', ')[1].replace('', ''),
                role: data.role || 'cliente'
            }));
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    },
    registerUser: async ({ correo, password, telefono, direccion, ciudad }) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + '/registro', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo,
                    password,
                    telefono,
                    direccion_line1: direccion,
                    ciudad,
                    role: "cliente"
                })
            });
            const data = await resp.json();
            if (!resp.ok) {
                console.error("Register error:", data);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Register error:", error);
            return false;
        }
    },
    },
  };
};

export default getState;
