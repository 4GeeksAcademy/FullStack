// import React, { useState } from "react";

// const SearchFilters = ({ onFilter }) => {
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFilter({ minPrice, maxPrice });
//   };

//   // Estilos inline para ocultar las flechas en los inputs type="number"
//   const noSpinnerStyle = {
//     MozAppearance: "textfield",
//     WebkitAppearance: "none",
//     appearance: "textfield",
//   };

//   const noSpinnerClass = `
//     input::-webkit-outer-spin-button,
//     input::-webkit-inner-spin-button {
//       -webkit-appearance: none;
//       margin: 0;
//     }
//   `;

//   return (
//     <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
//       <style>{noSpinnerClass}</style>
//       <form
//         onSubmit={handleSubmit}
//         className="mb-4 p-4 bg-white rounded shadow-sm"
//       >
//         <div className="row g-3 align-items-end">
//           <div className="col-md-4">
//             <label className="form-label">Precio mínimo</label>
//             <div className="input-group">
//               <span className="input-group-text">$</span>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//                 placeholder="0"
//                 style={noSpinnerStyle}
//               />
//             </div>
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Precio máximo</label>
//             <div className="input-group">
//               <span className="input-group-text">$</span>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 placeholder="1000"
//                 style={noSpinnerStyle}
//               />
//             </div>
//           </div>

//           <div className="col-md-4">
//             <button type="submit" className="btn btn-dark w-100">
//               Aplicar filtros
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchFilters;
