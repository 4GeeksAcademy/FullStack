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
      comboCategorias: [],
      serviciosBelleza: [],
      serviciosOfertas: [],
      serviciosTop: [],
      cartItems: [],
      selectedCategory: null,
      usersCombo: [],
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
        try {
          localStorage.setItem("cartItems", JSON.stringify(store.cartItems));
          return true;
        } catch (error) {
          console.error("Error saving cart to localStorage:", error);
          return false;
        }
      },
      loadCartFromLocalStorage: () => {
        try {
          const storedCart = localStorage.getItem("cartItems");
          if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setStore({ cartItems: parsedCart });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error loading cart from localStorage:", error);
          return false;
        }
      },

      saveCartToLocalStorage: () => {
        const store = getStore();
        try {
          localStorage.setItem("cartItems", JSON.stringify(store.cartItems));
          return true;
        } catch (error) {
          console.error("Error saving cart to localStorage:", error);
          return false;
        }
      },

      loadCartFromLocalStorage: () => {
        try {
          const storedCart = localStorage.getItem("cartItems");
          if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setStore({ cartItems: parsedCart });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error loading cart from localStorage:", error);
          return false;
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
        getActions().saveCartToLocalStorage();
        return true;
      },

      removeItemFromCart: (id) => {
        const store = getStore();
        const updatedCart = store.cartItems.filter((item) => item.id !== id);
        setStore({ cartItems: updatedCart });
        getActions().saveCartToLocalStorage();
        return true;
      },

      updateQuantity: (id, newQuantity) => {
        if (newQuantity < 1) return false;
        const store = getStore();
        const updatedCart = store.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setStore({ cartItems: updatedCart });
        getActions().saveCartToLocalStorage();
        return true;
      },

      initializeApp: () => {
        getActions().loadCartFromLocalStorage();
        getActions().loadUserFromStorage();
      },
      
   registerUser: async ({ correo, password, telefono, direccion, ciudad, nombre, apellido }) => {
    try {
        console.log("Datos recibidos en registerUser:");
        console.log("- nombre:", nombre);
        console.log("- apellido:", apellido);
        console.log("- correo:", correo);
        console.log("- password:", password ? "***" : undefined);
        console.log("- telefono:", telefono);
        console.log("- direccion:", direccion);
        console.log("- ciudad:", ciudad);
        
        // Verificar que los datos obligatorios estén presentes
        if (!nombre || !apellido || !correo || !password) {
            console.error("Faltan datos obligatorios");
            throw new Error("Nombre, apellido, correo y contraseña son obligatorios");
        }
        
        // Crear objeto para enviar al backend - AQUÍ ESTÁ EL CAMBIO PRINCIPAL
        const userData = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo.trim(),
            password: password,
            telefono: telefono ? telefono.trim() : "",
            direccion_line1: direccion ? direccion.trim() : "",
            ciudad: ciudad ? ciudad.trim() : "",
            role: "cliente"
        };
        
        console.log("Datos que se enviarán al backend:", {
            ...userData,
            password: "******"
        });
        
        const resp = await fetch(process.env.BACKEND_URL + '/registro', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        const responseText = await resp.text();
        console.log("Respuesta del servidor (texto):", responseText);
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error("Error al parsear la respuesta como JSON:", e);
            throw new Error("Error inesperado en la respuesta del servidor");
        }
        
        if (!resp.ok) {
            console.error("Error de registro:", data);
            throw new Error(data.error || "Error en el registro");
        }
        
        console.log("Registro exitoso, datos del usuario:", data.user);
        return data.user;
        
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
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
     registerUser: async (userData) => {
        console.log("Iniciando registro de usuario con datos:", 
          {...userData, password: "********"});
        
        try {
          // Asegurarse de que todos los campos necesarios estén presentes
          if (!userData.nombre || !userData.apellido) {
            console.error("Error: nombre y apellido son requeridos");
            return false;
          }
          
          const resp = await fetch(process.env.BACKEND_URL + '/registro', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: userData.nombre,
              apellido: userData.apellido,
              correo: userData.correo,
              password: userData.password,
              telefono: userData.telefono,
              direccion_line1: userData.direccion,
              ciudad: userData.ciudad,
              role: "cliente"
            })
          });
          
          if (!resp.ok) {
            const data = await resp.json();
            console.error("Error en registro:", data);
            return false;
          }
          
          const data = await resp.json();
          console.log("Registro exitoso:", data);
          
          // Guardar el correo para autocompletarlo en el login
          localStorage.setItem('correo_registrado', userData.correo);
          
          return true;
        } catch (error) {
          console.error("Error en registerUser:", error);
          return false;
        }
      },
    
    createNewsLetter: async(services) => {
      try {
        const resp = await fetch(process.env.BACKEND_URL + '/newsletteradd', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'services': services
          })
        });
        const data = await resp.json();
        if (!resp.ok) {
          console.error("Error al crear newsletter", data);
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error al crear newsletter", error);
        return false;
      }
    }
    ,
    getCategorias: async() => {
      let categorias = []
      await fetch(`${process.env.BACKEND_URL}categorias`)
              .then(res => res.json())
              .then(data => {
                  // Asegurate de acceder a data.categorias
                  data.categorias.forEach(categoria => {
                      categorias.push({
                          id: categoria.id,
                          nombre: categoria.nombre
                      });
                  });
                  setStore({ comboCategorias: categorias });
              })
              .catch(error => {
                  console.log('Error al obtener categorias', error)
              });
    },
    getUsersCombo: async() => {
      let usuarios = []
      await fetch(`${process.env.BACKEND_URL}usuarios`)
      .then(res => res.json())
      .then(data => {
        data.usuarios.forEach(usuario => {
          usuarios.push(usuario)
        })

        setStore({ usersCombo: usuarios });
      })
      .catch(error => {
        console.log('Error al obtener usuarios para los combos', error);
      })
    },
    updateUserProfile: async (userData) => {
      try {
          const token = localStorage.getItem('token');
          const resp = await fetch(process.env.BACKEND_URL + '/usuarios/me', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                  telefono: userData.telefono,
                  direccion_line1: userData.direccion_line1, // Cambiado a direccion_line1
                  ciudad: userData.ciudad
              }),
          });
  
          if (resp.ok) {
              const data = await resp.json();
              const updatedUser = {
                  ...JSON.parse(localStorage.getItem('user')),
                  telefono: data.user.telefono,
                  direccion_line1: data.user.direccion_line1, // Cambiado a direccion_line1
                  ciudad: data.user.ciudad
              };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              setStore({ user: updatedUser });
              return true;
          }
          return false;
      } catch (error) {
          console.error("Error updating profile:", error);
          return false;
      }
  },
  
  changePassword: async ({ currentPassword, newPassword }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token no disponible");
        return false;
    }

    try {
        const response = await fetch(process.env.BACKEND_URL + "/api/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error al cambiar contraseña:", data.msg);
            return false;
        }

        console.log("Contraseña cambiada correctamente:", data.msg);
        return true;
    } catch (error) {
        console.error("Error en fetch:", error);
        return false;
    }
},
// Función de login corregida
loginUser: async ({ correo, password }) => {
  console.log("Iniciando login con correo:", correo);
  try {
    // 1) Login
    const resp = await fetch(
      `${process.env.BACKEND_URL}/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      }
    );
    const data = await resp.json();

    if (!resp.ok || !data.access_token) {
      console.error("Login fallido. Detalle:", data);
      return false;
    }
    console.log("Login exitoso, token recibido");

    // Guardar token
    localStorage.setItem('token', data.access_token);

    // 2) Obtener datos del usuario
    const userResp = await fetch(
      `${process.env.BACKEND_URL}/usuarios/me`,
      {
        headers: { Authorization: `Bearer ${data.access_token}` }
      }
    );

    let userObj;
    if (userResp.ok) {
      userObj = await userResp.json();
      console.log("Datos de usuario obtenidos:", userObj);
    } else {
      console.warn("No se pudieron obtener los datos del usuario. Se usará rol por defecto.");
      userObj = { correo, role: 'cliente' };
    }

    // 3) Guardar usuario sin pisar el resto del store
    localStorage.setItem('user', JSON.stringify(userObj));
    setStore(prev => ({
      ...prev,
      user: userObj
    }));

    return true;
  } catch (error) {
    console.error("Error en loginUser:", error);
    return false;
  }
},

setCartItems: (items) => {
  setStore({ cartItems: items });
},

    },
  };
};

export default getState;
