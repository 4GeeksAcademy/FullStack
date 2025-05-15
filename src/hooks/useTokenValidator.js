// src/hooks/useTokenValidator.js
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import * as bootstrap from "bootstrap";

export function useTokenValidator() {
  const navigate    = useNavigate();
  const mobileRef   = useRef(null);
  const desktopRef  = useRef(null);
  const mobileInst  = useRef(null);
  const desktopInst = useRef(null);

  function isTokenValid() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }

  // Inicializa las instancias de dropdown
  function initInstances() {
    if (mobileRef.current && !mobileInst.current) {
      mobileInst.current = new bootstrap.Dropdown(mobileRef.current);
    }
    if (desktopRef.current && !desktopInst.current) {
      desktopInst.current = new bootstrap.Dropdown(desktopRef.current);
    }
  }

  // Devuelve un handler que abre/oculta según validez del token
  function handleDropdownClick(context) {
    return (e) => {
      e.preventDefault();
      const inst = (context === "mobile" ? mobileInst.current : desktopInst.current);
      if (!inst) return;
      if (!isTokenValid()) {
        inst.hide();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        inst.toggle();
      }
    };
  }

  return {
    mobileRef,
    desktopRef,
    initInstances,
    handleDropdownClick
  };
}

