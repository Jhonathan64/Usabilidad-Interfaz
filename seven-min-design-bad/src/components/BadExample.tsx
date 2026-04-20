import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, X, Skull, Zap } from "lucide-react";
import headphonesImg from "@/assets/headphones.jpg";
import backpackImg from "@/assets/backpack.jpg";
import watchImg from "@/assets/watch.jpg";
import sneakersImg from "@/assets/sneakers.jpg";

type BadView = "products" | "detail" | "cart" | "checkout" | "orders" | "account";

const products = [
  { id: 1, name: "Audífonos Inalámbricos Pro", price: 99.99, priceText: "$99.99 USD", img: headphonesImg },
  { id: 2, name: "Mochila Urbana Premium", price: 149.99, priceText: "$149.99 USD", img: backpackImg },
  { id: 3, name: "Reloj Clásico Elegante", price: 249.99, priceText: "$249.99 USD", img: watchImg },
  { id: 4, name: "Zapatillas Running Lite", price: 119.99, priceText: "$119.99 USD", img: sneakersImg },
];

const usabilityIssues = [
  { icon: "⏱️", title: "Eficacia", desc: "El usuario no puede completar la compra — botones confusos y flujo roto" },
  { icon: "🐌", title: "Eficiencia", desc: "Demasiados pasos, popups, y distracciones para una tarea simple" },
  { icon: "🔓", title: "Seguridad", desc: "Sin HTTPS visible, sin políticas claras, pide datos innecesarios" },
  { icon: "❌", title: "Utilidad", desc: "Información del producto incompleta o contradictoria" },
  { icon: "😵", title: "Aprendizaje", desc: "Navegación inconsistente, iconos sin sentido" },
  { icon: "🤷", title: "Memorabilidad", desc: "Layout caótico, imposible recordar dónde está cada cosa" },
];

const flashColors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00", "#00ffff", "#ff6600"];

interface BadCartItem { id: number; qty: number; }

export function BadExample() {
  const [view, setView] = useState<BadView>("products");
  const [popups, setPopups] = useState([true, true, true]);
  const [bgFlash, setBgFlash] = useState(0);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  //const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number }[]>([]);
  const [cart, setCart] = useState<BadCartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [orders, setOrders] = useState<{ id: string; total: number; items: BadCartItem[] }[]>([]);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setBgFlash((prev) => (prev + 1) % flashColors.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!popups[0]) {
      const timer = setTimeout(() => setShowSecondPopup(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [popups]);

  // useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     setCursorTrail((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY }]);
  //   };
  //   window.addEventListener("mousemove", handler);
  //   return () => window.removeEventListener("mousemove", handler);
  // }, []);

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + Math.floor(Math.random() * 3) + 1 } : c);
      return [...prev, { id, qty: Math.floor(Math.random() * 5) + 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, c) => {
    const p = products.find((pr) => pr.id === c.id);
    return sum + (p ? p.price * c.qty * (1 + Math.random() * 0.5) : 0);
  }, 0);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: `linear-gradient(135deg, ${flashColors[bgFlash]}, ${flashColors[(bgFlash + 3) % flashColors.length]})`, transition: "background 0.3s" }}>
      {/* Cursor trail */}
      {/* {cursorTrail.map((pos, i) => (
        <div key={i} className="fixed pointer-events-none z-[100] rounded-full" style={{ left: pos.x - 8, top: pos.y - 8, width: 16 + i * 3, height: 16 + i * 3, background: flashColors[(bgFlash + i) % flashColors.length], opacity: 0.6 - i * 0.05 }} />
      ))} */}

      {/* Flashing border strips */}
      <div className="fixed top-0 left-0 right-0 h-2 z-40 animate-pulse" style={{ background: `repeating-linear-gradient(90deg, #ff0000, #ffff00 20px, #00ff00 40px, #0000ff 60px, #ff00ff 80px)` }} />
      <div className="fixed bottom-0 left-0 right-0 h-2 z-40 animate-pulse" style={{ background: `repeating-linear-gradient(90deg, #ff00ff, #00ffff 20px, #ffff00 40px, #ff0000 60px, #00ff00 80px)` }} />

      {/* First popup */}
      {popups[0] && (
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <motion.div animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 0.98, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="p-6 rounded-lg max-w-sm text-center shadow-2xl relative" style={{ border: "6px dashed #ff0000", background: `linear-gradient(45deg, #ffff00, #ff6600)` }}>
            <button onClick={() => setPopups([false, popups[1], popups[2]])} className="absolute top-1 right-1 text-[8px] opacity-10 hover:opacity-50" style={{ color: "#ffff00" }}><X size={8} /></button>
            <Skull className="mx-auto mb-2 animate-spin" style={{ color: "#ff0000" }} size={50} />
            <p className="font-bold text-xl" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ff0000", textShadow: "2px 2px #000" }}>¡¡¡SUSCRÍBETE YA O TE ARREPENTIRÁS!!!</p>
            <p className="text-xs mt-1 animate-pulse font-bold" style={{ color: "#000" }}>⚠️ OFERTA EXPIRA EN: -3 días ⚠️</p>
            <input className="w-full mt-3 p-2 border-4 text-sm" placeholder="Tu email, teléfono, dirección, tipo de sangre, ADN..." style={{ borderColor: "#ff0000", background: "#ffcccc" }} />
            <div className="mt-3 flex gap-2">
              <button className="flex-1 py-2 text-black text-sm font-bold rounded animate-bounce" style={{ background: "#00ff00", border: "3px solid #ff0000" }}>🎉 SÍ, QUIERO SPAM 🎉</button>
              <button className="flex-1 py-2 text-[6px] rounded opacity-10" onClick={() => setPopups([false, popups[1], popups[2]])} style={{ background: "#333", color: "#444" }}>no (este botón casi no se ve)</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Second popup */}
      {showSecondPopup && (
        <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-2xl max-w-xs" style={{ background: "#ff0000", border: "4px solid #ffff00" }}>
          <button onClick={() => setShowSecondPopup(false)} className="absolute top-0 right-0 text-[6px] opacity-10" style={{ color: "#ff0000" }}><X size={6} /></button>
          <p className="text-white font-bold text-sm animate-pulse" style={{ fontFamily: "Comic Sans MS, cursive" }}>🚨 ¡¡ESPERA!! ¿Seguro que no quieres SPAM? 🚨</p>
        </motion.div>
      )}

      {/* Marquees */}
      <div className="overflow-hidden py-2 text-xs font-bold" style={{ background: "#ff0000", color: "#ffff00" }}>
        <motion.div animate={{ x: [600, -2500] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="whitespace-nowrap">
          🔥🔥🔥 OFERTA INCREÍBLE!!! COMPRA AHORA!!! ENVÍO A MARTE GRATIS!!! DESCUENTO DEL 99%!!! 💀💀💀
        </motion.div>
      </div>

      {/* Chaotic navbar */}
      <nav className="flex flex-wrap items-center gap-1 p-2 text-xs border-b-4" style={{ background: `repeating-linear-gradient(45deg, #ff0000, #ff7700 10%, #ffff00 20%, #00ff00 30%, #0000ff 40%, #8b00ff 50%)`, borderColor: "#ff0000" }}>
        <motion.span animate={{ scale: [1, 1.1, 1], color: ["#ff0000", "#00ff00", "#0000ff", "#ff0000"] }} transition={{ duration: 2, repeat: Infinity }} className="font-bold text-2xl mr-2" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "3px 3px 0 #000, -1px -1px 0 #fff" }}>
          TiEnDa_OnLiNe
        </motion.span>
        {[
          { label: "INICIO", target: "products" as BadView },
          { label: "PRODCUTOS", target: "products" as BadView },
          { label: "CARRITO??", target: "cart" as BadView },
          { label: "PEDIDOS TAL VEZ", target: "orders" as BadView },
          { label: "MI CUENTA LOL", target: "account" as BadView },
          { label: "FAQ??? (roto)", target: "products" as BadView },
          { label: "NO TOCAR", target: "cart" as BadView },
        ].map((item, i) => (
          <motion.button key={item.label} onClick={() => { setView(item.target); setSelectedProduct(null); }} animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }} className="px-2 py-1 border-2 rounded text-xs font-bold" style={{ fontFamily: "Comic Sans MS, cursive", background: flashColors[i % flashColors.length], borderColor: flashColors[(i + 3) % flashColors.length], color: "#fff", textShadow: "1px 1px 0 #000" }}>
            {item.label}
          </motion.button>
        ))}
        <motion.button onClick={() => setView("cart")} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.3, repeat: Infinity }} className="ml-auto text-sm font-bold" style={{ color: "#ffff00", textShadow: "2px 2px 0 #ff0000" }}>
          🛒 ({cart.reduce((s, c) => s + c.qty, 0)})
        </motion.button>
      </nav>

      {/* Virus warning */}
      <motion.div animate={{ opacity: [1, 0.5, 1], scale: [1, 1.02, 1] }} transition={{ duration: 0.6, repeat: Infinity }} className="mx-4 p-3 rounded text-center my-2 border-4" style={{ background: "#ffff00", borderColor: "#ff0000" }}>
        <Zap className="inline mr-2" style={{ color: "#ff0000" }} size={20} />
        <span className="font-bold text-sm" style={{ color: "#ff0000", fontFamily: "Comic Sans MS, cursive" }}>⚠️ ¡¡TU COMPUTADORA TIENE 47 VIRUS!! ⚠️</span>
      </motion.div>

      {/* VIEWS */}
      {view === "products" && !selectedProduct && <BadProducts products={products} bgFlash={bgFlash} addToCart={addToCart} onSelect={(id: number) => { setSelectedProduct(id); setView("detail"); }} />}
      {view === "detail" && selectedProduct && <BadDetail product={products.find((p) => p.id === selectedProduct)!} bgFlash={bgFlash} addToCart={addToCart} onBack={() => { setView("products"); setSelectedProduct(null); }} />}
      {view === "cart" && <BadCart cart={cart} products={products} setCart={setCart} total={cartTotal} onCheckout={() => { setView("checkout"); setCheckoutError(""); }} onBack={() => setView("products")} />}
      {view === "checkout" && <BadCheckout cart={cart} total={cartTotal} error={checkoutError} setError={setCheckoutError} onPlaceOrder={() => { setOrders((prev) => [{ id: `#${Math.floor(Math.random() * 99999)}`, total: cartTotal * (1 + Math.random()), items: [...cart] }, ...prev]); setCart([]); setView("orders"); }} onBack={() => setView("cart")} />}
      {view === "orders" && <BadOrders orders={orders} products={products} onBack={() => setView("products")} />}
      {view === "account" && <BadAccount onBack={() => setView("products")} />}

      {/* Chat widget */}
      <motion.div animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 1, repeat: Infinity }} className="fixed bottom-6 left-4 z-40 p-3 rounded-full shadow-lg cursor-pointer" style={{ background: "#ff0000", border: "3px solid #ffff00" }}>
        <span className="text-2xl">💬</span>
        <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute -top-2 -right-2 text-white text-[10px] px-2 rounded-full font-bold" style={{ background: "#00ff00" }}>99+</motion.span>
      </motion.div>

      {/* Usability issues panel */}
      <div className="max-w-4xl mx-auto px-4 pb-12 mt-8">
        <div className="p-6 rounded-xl border-4 border-dashed" style={{ borderColor: "var(--bad-accent)", background: "rgba(255,255,255,0.9)" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle style={{ color: "var(--bad-accent)" }} size={24} />
            <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--bad-accent)" }}>Problemas de Usabilidad Identificados</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {usabilityIssues.map((issue) => (
              <div key={issue.title} className="flex gap-3 p-3 rounded-lg border" style={{ background: "#fff", borderColor: "#ddd" }}>
                <span className="text-2xl">{issue.icon}</span>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--bad-accent)" }}>{issue.title}</p>
                  <p className="text-xs" style={{ color: "#666" }}>{issue.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== BAD SUB-VIEWS ===== */

function BadProducts({ products, bgFlash, addToCart, onSelect }: any) {
  return (
    <div className="px-4 pb-8">
      <motion.h2 animate={{ color: ["#ff0000", "#00ff00", "#0000ff", "#ff00ff"], rotate: [0, 1, -1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-center text-4xl font-bold mb-6" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "3px 3px 0 #000" }}>
        ★★★ NUESTROS PRODCUTOS ★★★
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {products.map((product: any, i: number) => (
          <motion.div key={product.id} animate={{ rotate: [0, i % 2 === 0 ? 3 : -3, 0], scale: [1, 1.03, 0.97, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="border-4 p-3 relative cursor-pointer" onClick={() => onSelect(product.id)} style={{ background: `linear-gradient(${45 + i * 30}deg, ${flashColors[i % flashColors.length]}33, ${flashColors[(i + 2) % flashColors.length]}33)`, transform: `rotate(${(i - 1.5) * 4}deg)` }}>
            <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute -top-3 -right-3 text-white text-xs px-3 py-1 rounded-full font-bold z-10" style={{ background: "#ff0000", border: "2px solid #ffff00" }}>-99%</motion.div>
            <img src={product.img} alt="" className="w-full h-40 object-cover" style={{ filter: "saturate(3) contrast(2) hue-rotate(45deg)" }} />
            <p className="mt-2 font-bold text-xs leading-tight" style={{ fontFamily: "Comic Sans MS, cursive", color: flashColors[i % flashColors.length] }}>{product.name}</p>
            <div className="mt-1"><span className="line-through text-[9px]" style={{ color: "#999" }}>$999,999.99</span> <motion.span animate={{ color: ["#ff0000", "#00ff00", "#0000ff"] }} transition={{ duration: 1, repeat: Infinity }} className="text-sm font-bold">{product.priceText}</motion.span></div>
            <div className="mt-2">
  <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); addToCart(product.id); }} className="w-full py-3 text-white text-sm font-bold rounded" style={{ background: "#333", color: "#fff" }}>
    + Agregar al carrito
  </button>
</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BadDetail({ product, bgFlash, addToCart, onBack }: any) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={onBack} className="text-xs font-bold mb-4 animate-pulse" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "2px 2px #000" }}>← VOLVER (o no, haz lo que quieras)</button>
      <div className="border-4 p-4" style={{ background: "rgba(255,255,255,0.3)", borderColor: flashColors[bgFlash] }}>
        <img src={product.img} alt="" className="w-full h-64 object-cover" style={{ filter: "saturate(4) contrast(3) hue-rotate(90deg)" }} />
        <motion.h1 animate={{ color: ["#ff0000", "#00ff00", "#ff00ff"] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl font-bold mt-4" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "2px 2px #000" }}>{product.name}</motion.h1>
        <p className="text-sm mt-2" style={{ fontFamily: "Comic Sans MS, cursive", color: "#fff" }}>Descripción: No tenemos descripción. Confía en nosotros. Es bueno. Tal vez. No sabemos. Cómpralo y descúbrelo.</p>
        <motion.p animate={{ fontSize: ["20px", "30px", "20px"] }} transition={{ duration: 1, repeat: Infinity }} className="font-bold mt-4" style={{ color: "#ffff00", textShadow: "2px 2px #ff0000" }}>{product.priceText}</motion.p>
        <p className="text-[8px] mt-1" style={{ color: "#ccc" }}>*Precio cambia cada vez que recargas. No es un bug, es una "feature".</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <motion.button onClick={() => addToCart(product.id)} animate={{ background: ["#ff0000", "#00ff00"] }} transition={{ duration: 0.3, repeat: Infinity }} className="py-3 text-white font-bold text-sm" style={{ textShadow: "1px 1px #000" }}>🛒 AGREGAR (¿cuántos? sorpresa!)</motion.button>
          <button onClick={() => addToCart(product.id)} className="py-3 font-bold text-xs" style={{ background: "#ff00ff", color: "#ffff00" }}>COMPRAR SIN PENSAR</button>
          <button className="py-3 text-xs" style={{ background: "#000", color: "#00ff00" }}>AGREGAR A FAVORITOS (no funciona)</button>
          <button onClick={onBack} className="py-3 text-[8px]" style={{ background: "#333", color: "#555" }}>salir de aquí (casi invisible)</button>
        </div>
        <p className="text-[7px] mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>Términos: Al ver este producto aceptas que recopilemos todos tus datos. No hay devoluciones. No hay garantía. No hay producto. Todo es una ilusión.</p>
      </div>
    </div>
  );
}

function BadCart({ cart, products, setCart, total, onCheckout, onBack }: any) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <motion.p animate={{ rotate: [0, 10, -10, 0], color: ["#ff0000", "#ffff00", "#00ff00"] }} transition={{ duration: 1, repeat: Infinity }} className="text-3xl font-bold" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "3px 3px #000" }}>
          🛒 TU CARRITO ESTÁ VACÍO... O NO... QUIÉN SABE 🤷
        </motion.p>
        <button onClick={onBack} className="mt-4 px-4 py-2 text-xs animate-bounce" style={{ background: "#ff0000", color: "#ffff00", fontFamily: "Comic Sans MS, cursive" }}>VOLVER A COMPRAR COSAS QUE NO NECESITAS</button>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.h1 animate={{ color: ["#ff0000", "#00ff00", "#0000ff"], scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "2px 2px #000" }}>
        🛒 TU CARRITO DE COMPRAS 🛒
      </motion.h1>
      <div className="space-y-3">
        {cart.map((item: BadCartItem) => {
          const p = products.find((pr: any) => pr.id === item.id);
          if (!p) return null;
          return (
            <motion.div key={item.id} animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="flex gap-3 p-3 border-4" style={{ background: "rgba(255,255,255,0.3)", borderColor: flashColors[item.id % flashColors.length] }}>
              <img src={p.img} alt="" className="w-16 h-16 object-cover" style={{ filter: "saturate(3) hue-rotate(60deg)" }} />
              <div className="flex-1">
                <p className="font-bold text-xs" style={{ fontFamily: "Comic Sans MS, cursive", color: "#fff", textShadow: "1px 1px #000" }}>{p.name}</p>
                <p className="text-sm font-bold" style={{ color: "#ffff00" }}>Cantidad: {item.qty} (no puedes cambiarla jaja)</p>
                <p className="text-xs" style={{ color: "#ff0000" }}>Precio: ${(p.price * item.qty * (1 + Math.random() * 0.5)).toFixed(2)} (cambia cada vez)</p>
              </div>
              <button onClick={() => setCart((prev: BadCartItem[]) => prev.filter((c: BadCartItem) => c.id !== item.id))} className="text-xs px-2 py-1 h-fit animate-spin" style={{ background: "#ff0000", color: "#fff" }}>🗑️</button>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 p-4 border-4 border-dashed" style={{ background: "rgba(0,0,0,0.5)", borderColor: "#ffff00" }}>
        <p className="text-xs" style={{ color: "#fff", fontFamily: "Comic Sans MS, cursive" }}>Subtotal: ${total.toFixed(2)}</p>
        <p className="text-xs" style={{ color: "#fff" }}>Envío: $???.?? (te enterarás después)</p>
        <p className="text-xs" style={{ color: "#fff" }}>Impuestos: Sí</p>
        <p className="text-xs" style={{ color: "#fff" }}>Cargo por existir: $4.99</p>
        <motion.p animate={{ fontSize: ["16px", "24px", "16px"] }} transition={{ duration: 1, repeat: Infinity }} className="font-bold mt-2" style={{ color: "#ffff00", textShadow: "2px 2px #ff0000" }}>TOTAL: ${(total * 1.47 + 4.99).toFixed(2)} (aprox, tal vez, quién sabe)</motion.p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <motion.button onClick={onCheckout} animate={{ background: ["#ff0000", "#00ff00", "#0000ff"] }} transition={{ duration: 0.5, repeat: Infinity }} className="py-3 text-white font-bold text-sm" style={{ textShadow: "1px 1px #000" }}>💳 PAGAR AHORA!!!</motion.button>
        <button onClick={onBack} className="py-3 text-[8px]" style={{ background: "#333", color: "#444" }}>seguir comprando (casi no se ve)</button>
      </div>
    </div>
  );
}

function BadCheckout({ cart, total, error, setError, onPlaceOrder, onBack }: any) {
  const [step, setStep] = useState(0);
  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <motion.h1 animate={{ color: ["#ff0000", "#ffff00", "#00ff00"], rotate: [0, 2, -2, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl font-bold text-center mb-4" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "2px 2px #000" }}>
        💳 CHECKOUT (buena suerte) 💳
      </motion.h1>
      
      {/* No step indicator - confusing */}
      {step === 0 && (
        <div className="space-y-3 p-4 border-4" style={{ background: "rgba(255,255,255,0.2)", borderColor: "#ff0000" }}>
          <p className="text-sm font-bold" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "1px 1px #000" }}>PASO ¿?: Tus datos personales (todos)</p>
          <input className="w-full p-2 border-4 text-sm" placeholder="Nombre completo y de tu mascota" style={{ borderColor: "#ff00ff", background: "#ffccff" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="Email (te enviaremos 500 correos/día)" style={{ borderColor: "#00ff00", background: "#ccffcc" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="Teléfono, fax, pager, paloma mensajera" style={{ borderColor: "#0000ff", background: "#ccccff" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="Dirección (sé muy específico)" style={{ borderColor: "#ffff00", background: "#ffffcc" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="Color favorito (es obligatorio)" style={{ borderColor: "#ff6600", background: "#ffddcc" }} />
          <motion.button onClick={() => setStep(1)} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3, repeat: Infinity }} className="w-full py-3 text-white font-bold" style={{ background: "#ff0000" }}>SIGUIENTE →→→→→</motion.button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3 p-4 border-4" style={{ background: "rgba(255,255,255,0.2)", borderColor: "#00ff00" }}>
          <p className="text-sm font-bold" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "1px 1px #000" }}>PASO ¿?: Información de pago (confía en nosotros)</p>
          <p className="text-[8px] animate-pulse" style={{ color: "#ff0000" }}>🔓 Conexión: HTTP (sin la S, es más rápido)</p>
          <input className="w-full p-2 border-4 text-sm" placeholder="Número de tarjeta (ponlo completo)" style={{ borderColor: "#ff0000", background: "#ffcccc" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="CVV (esos 3 números secretos)" style={{ borderColor: "#ff00ff", background: "#ffccff" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="PIN del cajero (por si acaso)" style={{ borderColor: "#ffff00", background: "#ffffcc" }} />
          <input className="w-full p-2 border-4 text-sm" placeholder="Contraseña del banco (la necesitamos)" style={{ borderColor: "#00ff00", background: "#ccffcc" }} />
          {error && <motion.p animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3, repeat: Infinity }} className="text-sm font-bold text-center p-2" style={{ background: "#ff0000", color: "#fff" }}>{error}</motion.p>}
          <div className="grid grid-cols-2 gap-2">
            <motion.button onClick={() => { if (Math.random() > 0.5) { onPlaceOrder(); } else { setError("ERROR: " + ["Pago rechazado por la luna llena", "Tu tarjeta lloró", "Servidor en huelga", "Intenta mañana o pasado o nunca"][Math.floor(Math.random() * 4)]); }}} animate={{ background: ["#00ff00", "#ff0000", "#0000ff"] }} transition={{ duration: 0.4, repeat: Infinity }} className="py-3 text-white font-bold text-sm" style={{ textShadow: "1px 1px #000" }}>PAGAR (50% chance)</motion.button>
            <button onClick={onBack} className="py-3 text-[7px]" style={{ background: "#111", color: "#222" }}>volver</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BadOrders({ orders, products, onBack }: any) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={onBack} className="text-xs font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "1px 1px #000" }}>← VOLVER</button>
      <motion.h1 animate={{ color: ["#ff0000", "#ffff00", "#00ff00"] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl font-bold text-center mb-4" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "2px 2px #000" }}>
        📦 TUS PEDIDOS (si es que existen) 📦
      </motion.h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg font-bold animate-pulse" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "2px 2px #ff0000" }}>No tienes pedidos... todavía 😈</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any, i: number) => (
            <motion.div key={i} animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="p-4 border-4" style={{ background: "rgba(255,255,255,0.2)", borderColor: flashColors[i % flashColors.length] }}>
              <p className="font-bold text-sm" style={{ color: "#ffff00", fontFamily: "Comic Sans MS, cursive" }}>Pedido {order.id}</p>
              <p className="text-xs" style={{ color: "#fff" }}>Total: ${order.total.toFixed(2)} (puede variar... probablemente subirá)</p>
              <p className="text-xs" style={{ color: "#00ff00" }}>Estado: {["Procesando (tal vez)", "Perdido en el espacio", "El repartidor se lo quedó", "En una dimensión paralela"][i % 4]}</p>
              <p className="text-xs" style={{ color: "#ff0000" }}>Entrega estimada: {["Nunca", "Ayer (ya pasó)", "En 3-47 años", "Cuando los cerdos vuelen"][i % 4]}</p>
              <div className="flex gap-2 mt-2">
                {order.items.map((item: BadCartItem) => {
                  const p = products.find((pr: any) => pr.id === item.id);
                  return p ? <img key={item.id} src={p.img} alt="" className="w-10 h-10 object-cover" style={{ filter: "saturate(3) hue-rotate(90deg)" }} /> : null;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function BadAccount({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <button onClick={onBack} className="text-xs font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "1px 1px #000" }}>← VOLVER</button>
      <motion.h1 animate={{ color: ["#ff0000", "#ffff00", "#00ff00"] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl font-bold text-center mb-4" style={{ fontFamily: "Comic Sans MS, cursive", textShadow: "2px 2px #000" }}>
        👤 MI CUENTA (¿tienes una?) 👤
      </motion.h1>
      <div className="space-y-3 p-4 border-4" style={{ background: "rgba(255,255,255,0.2)", borderColor: "#ff00ff" }}>
        <div className="flex items-center gap-3">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full flex items-center justify-center text-2xl" style={{ background: "#ff0000", border: "3px solid #ffff00" }}>🤡</motion.div>
          <div>
            <p className="font-bold" style={{ fontFamily: "Comic Sans MS, cursive", color: "#ffff00", textShadow: "1px 1px #000" }}>Usuario_Random_2024</p>
            <p className="text-[8px]" style={{ color: "#ccc" }}>email@noexiste.fake</p>
          </div>
        </div>
        {[
          "Editar perfil (no funciona)",
          "Cambiar contraseña (olvidamos cómo)",
          "Mis direcciones (las perdimos)",
          "Métodos de pago (no son seguros)",
          "Eliminar cuenta (JA! como si fuera posible)",
          "Contactar soporte (estamos dormidos)",
        ].map((item, i) => (
          <motion.button key={item} animate={{ x: [0, i % 2 === 0 ? 5 : -5, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-full p-3 border-2 text-left text-xs font-bold" style={{ fontFamily: "Comic Sans MS, cursive", background: flashColors[i % flashColors.length] + "33", borderColor: flashColors[(i + 2) % flashColors.length], color: "#fff", textShadow: "1px 1px #000" }}>
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
