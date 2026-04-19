import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Check, ChevronRight, User, Minus, Plus, X, CreditCard, Package, ArrowLeft } from "lucide-react";
import headphonesImg from "@/assets/headphones.jpg";
import backpackImg from "@/assets/backpack.jpg";
import watchImg from "@/assets/watch.jpg";
import sneakersImg from "@/assets/sneakers.jpg";

type View = "products" | "detail" | "cart" | "checkout" | "orders" | "account";

const products = [
  { id: 1, name: "Audífonos Inalámbricos Pro", price: 99.99, rating: 4.8, reviews: 234, category: "Audio", img: headphonesImg, description: "Sonido Hi-Fi con cancelación de ruido activa. Batería de 30 horas. Conexión Bluetooth 5.3 con codec LDAC." },
  { id: 2, name: "Mochila Urbana Premium", price: 149.99, rating: 4.6, reviews: 189, category: "Accesorios", img: backpackImg, description: "Material impermeable con compartimento acolchado para laptop de 15\". Bolsillos antirrobo y correas ergonómicas." },
  { id: 3, name: "Reloj Clásico Elegante", price: 249.99, rating: 4.9, reviews: 412, category: "Relojes", img: watchImg, description: "Movimiento automático japonés. Cristal de zafiro resistente a rayones. Correa de cuero genuino italiano." },
  { id: 4, name: "Zapatillas Running Lite", price: 119.99, rating: 4.7, reviews: 567, category: "Calzado", img: sneakersImg, description: "Tecnología de amortiguación CloudFoam. Malla transpirable ultraligera. Suela de goma antideslizante." },
];

const usabilityWins = [
  { icon: "✅", title: "Eficacia", desc: "Compra completada en 3 clics: producto → carrito → checkout" },
  { icon: "⚡", title: "Eficiencia", desc: "Búsqueda inteligente, filtros claros, carrito persistente" },
  { icon: "🔒", title: "Seguridad", desc: "HTTPS, candado visible, políticas claras, pago seguro" },
  { icon: "💡", title: "Utilidad", desc: "Info completa: precio, envío, tallas, reviews, disponibilidad" },
  { icon: "🎯", title: "Aprendizaje", desc: "Navegación estándar, iconos reconocibles, feedback inmediato" },
  { icon: "🧠", title: "Memorabilidad", desc: "Layout consistente, patrones familiares, flujo predecible" },
];

interface CartItem {
  id: number;
  qty: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

export function GoodExample() {
  const [view, setView] = useState<View>("products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [addedNotif, setAddedNotif] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);

  const addToCart = (id: number, name: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1 }];
    });
    setAddedNotif(name);
    setTimeout(() => setAddedNotif(null), 2000);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, c) => {
    const p = products.find((pr) => pr.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const placeOrder = () => {
    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items: [...cart],
      total: cartTotal,
      date: new Date().toLocaleDateString("es-MX"),
      status: "Procesando",
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCheckoutStep(3);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--good-bg)" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ background: "rgba(255,255,255,0.9)", borderColor: "oklch(0.9 0.01 160)" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => { setView("products"); setSelectedProduct(null); }} className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-heading)", color: "var(--good-accent)" }}>
            TiendaUX
          </button>
          <div className="flex-1 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setView("products"); }}
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm border focus:outline-none focus:ring-2"
              style={{ borderColor: "oklch(0.85 0.02 160)", background: "var(--good-surface)" }}
              placeholder="Buscar productos..."
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView("orders")} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative" aria-label="Pedidos" title="Mis pedidos">
              <Package size={20} style={{ color: view === "orders" ? "var(--good-accent)" : "var(--good-muted)" }} />
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--good-accent)" }}>
                  {orders.length}
                </span>
              )}
            </button>
            <button onClick={() => setView("cart")} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Carrito" title="Mi carrito">
              <ShoppingCart size={20} style={{ color: view === "cart" ? "var(--good-accent)" : "var(--good-muted)" }} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "var(--good-accent)" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setView("account")} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Mi cuenta" title="Mi cuenta">
              <User size={20} style={{ color: view === "account" ? "var(--good-accent)" : "var(--good-muted)" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart notification */}
      <AnimatePresence>
        {addedNotif && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg"
            style={{ background: "var(--good-success)" }}
          >
            <Check size={16} />
            {addedNotif} agregado al carrito
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust bar */}
      <div className="border-b py-3" style={{ background: "var(--good-surface)", borderColor: "oklch(0.9 0.01 160)" }}>
        <div className="max-w-6xl mx-auto px-4 flex justify-center gap-8 text-xs" style={{ color: "var(--good-muted)" }}>
          <span className="flex items-center gap-1"><Truck size={14} /> Envío gratis +$500</span>
          <span className="flex items-center gap-1"><Shield size={14} /> Pago 100% seguro</span>
          <span className="flex items-center gap-1"><RotateCcw size={14} /> 30 días de devolución</span>
        </div>
      </div>

      {/* VIEWS */}
      {view === "products" && !selectedProduct && <ProductsView products={filteredProducts} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} onSelectProduct={(id: number) => { setSelectedProduct(id); setView("detail"); }} />}
      {view === "detail" && selectedProduct && <ProductDetail product={products.find((p) => p.id === selectedProduct)!} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} onBack={() => { setView("products"); setSelectedProduct(null); }} />}
      {view === "cart" && <CartView cart={cart} products={products} updateQty={updateQty} removeFromCart={removeFromCart} total={cartTotal} onCheckout={() => { setView("checkout"); setCheckoutStep(0); }} onBack={() => setView("products")} />}
      {view === "checkout" && <CheckoutView step={checkoutStep} setStep={setCheckoutStep} total={cartTotal} cartCount={cartCount} onPlaceOrder={placeOrder} onViewOrders={() => setView("orders")} onBack={() => setView("cart")} />}
      {view === "orders" && <OrdersView orders={orders} products={products} onBack={() => setView("products")} />}
      {view === "account" && <AccountView onBack={() => setView("products")} onViewOrders={() => setView("orders")} />}

      {/* Usability wins panel */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="p-6 rounded-2xl border" style={{ borderColor: "var(--good-accent)", background: "var(--good-surface)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Check className="rounded-full p-1 text-white" style={{ background: "var(--good-success)" }} size={24} />
            <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--good-accent)" }}>
              Principios de Usabilidad Aplicados
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {usabilityWins.map((win) => (
              <div key={win.title} className="flex gap-3 p-3 rounded-xl" style={{ background: "var(--good-bg)" }}>
                <span className="text-2xl">{win.icon}</span>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>{win.title}</p>
                  <p className="text-xs" style={{ color: "var(--good-muted)" }}>{win.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== SUB-COMPONENTS ========== */

function BackButton({ onClick, label = "Volver" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-sm font-medium mb-4 hover:opacity-70 transition-opacity" style={{ color: "var(--good-accent)" }}>
      <ArrowLeft size={16} /> {label}
    </button>
  );
}

function ProductsView({ products, wishlist, toggleWishlist, addToCart, onSelectProduct }: any) {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12">
      <div className="py-3 flex items-center gap-1 text-xs" style={{ color: "var(--good-muted)" }}>
        <span>Inicio</span><ChevronRight size={12} /><span className="font-medium" style={{ color: "var(--good-text)" }}>Productos</span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>Nuestros Productos</h1>
        <span className="text-sm" style={{ color: "var(--good-muted)" }}>{products.length} productos</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any, i: number) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden border group hover:shadow-lg transition-shadow cursor-pointer"
            style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}
          >
            <div className="relative overflow-hidden" onClick={() => onSelectProduct(product.id)}>
              <img src={product.img} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
              <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors" aria-label="Favoritos">
                <Heart size={18} fill={wishlist.includes(product.id) ? "var(--good-accent)" : "none"} style={{ color: wishlist.includes(product.id) ? "var(--good-accent)" : "var(--good-muted)" }} />
              </button>
              <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-medium bg-white/80 backdrop-blur-sm" style={{ color: "var(--good-muted)" }}>{product.category}</span>
            </div>
            <div className="p-4">
              <h3 onClick={() => onSelectProduct(product.id)} className="font-semibold text-sm mb-1 hover:underline cursor-pointer" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} size={12} fill={j < Math.floor(product.rating) ? "#facc15" : "none"} stroke="#facc15" />)}</div>
                <span className="text-xs" style={{ color: "var(--good-muted)" }}>{product.rating} ({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>${product.price.toFixed(2)}</span>
                <span className="text-[10px]" style={{ color: "var(--good-success)" }}>IVA incluido</span>
              </div>
              <button onClick={() => addToCart(product.id, product.name)} className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: "var(--good-accent)" }}>
                Agregar al carrito
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium" style={{ color: "var(--good-text)" }}>No se encontraron productos</p>
          <p className="text-sm" style={{ color: "var(--good-muted)" }}>Intenta con otra búsqueda</p>
        </div>
      )}
    </div>
  );
}

function ProductDetail({ product, wishlist, toggleWishlist, addToCart, onBack }: any) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton onClick={onBack} label="Volver a productos" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden">
          <img src={product.img} alt={product.name} className="w-full h-80 object-cover" />
        </div>
        <div>
          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: "oklch(0.92 0.04 160)", color: "var(--good-accent)" }}>{product.category}</span>
          <h1 className="text-3xl font-bold mt-3" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} size={16} fill={j < Math.floor(product.rating) ? "#facc15" : "none"} stroke="#facc15" />)}</div>
            <span className="text-sm" style={{ color: "var(--good-muted)" }}>{product.rating} ({product.reviews} reseñas)</span>
          </div>
          <p className="text-3xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>${product.price.toFixed(2)} <span className="text-sm font-normal" style={{ color: "var(--good-success)" }}>IVA incluido</span></p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--good-muted)" }}>{product.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "var(--good-success)" }}>
            <Check size={14} /> En stock · Envío en 24-48h
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => addToCart(product.id, product.name)} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: "var(--good-accent)" }}>
              Agregar al carrito
            </button>
            <button onClick={() => toggleWishlist(product.id)} className="p-3 rounded-xl border transition-colors hover:bg-gray-50" style={{ borderColor: "oklch(0.9 0.01 160)" }}>
              <Heart size={20} fill={wishlist.includes(product.id) ? "var(--good-accent)" : "none"} style={{ color: wishlist.includes(product.id) ? "var(--good-accent)" : "var(--good-muted)" }} />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[{ icon: <Truck size={16} />, text: "Envío gratis +$500" }, { icon: <Shield size={16} />, text: "Pago seguro" }, { icon: <RotateCcw size={16} />, text: "30 días devolución" }].map((b) => (
              <div key={b.text} className="flex flex-col items-center gap-1 p-2 rounded-lg text-center" style={{ background: "var(--good-bg)" }}>
                <span style={{ color: "var(--good-accent)" }}>{b.icon}</span>
                <span className="text-[10px]" style={{ color: "var(--good-muted)" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartView({ cart, products, updateQty, removeFromCart, total, onCheckout, onBack }: any) {
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto mb-4 opacity-20" />
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>Tu carrito está vacío</h2>
        <p className="text-sm mt-2" style={{ color: "var(--good-muted)" }}>Agrega productos para comenzar</p>
        <button onClick={onBack} className="mt-4 px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--good-accent)" }}>Ver productos</button>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <BackButton onClick={onBack} />
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>Mi Carrito ({cart.length})</h1>
      <div className="space-y-4">
        {cart.map((item: CartItem) => {
          const p = products.find((pr: any) => pr.id === item.id);
          if (!p) return null;
          return (
            <div key={item.id} className="flex gap-4 p-4 rounded-xl border" style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}>
              <img src={p.img} alt={p.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm" style={{ color: "var(--good-text)" }}>{p.name}</h3>
                <p className="text-sm font-bold mt-1" style={{ color: "var(--good-text)" }}>${(p.price * item.qty).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100" style={{ borderColor: "oklch(0.9 0.01 160)" }}><Minus size={14} /></button>
                  <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100" style={{ borderColor: "oklch(0.9 0.01 160)" }}><Plus size={14} /></button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="self-start p-1 hover:bg-gray-100 rounded-full"><X size={18} style={{ color: "var(--good-muted)" }} /></button>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 rounded-xl border" style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}>
        <div className="flex justify-between text-sm" style={{ color: "var(--good-muted)" }}><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm mt-1" style={{ color: "var(--good-muted)" }}><span>Envío</span><span>{total >= 500 ? "Gratis" : "$99.00"}</span></div>
        <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg" style={{ borderColor: "oklch(0.9 0.01 160)", color: "var(--good-text)" }}><span>Total</span><span>${(total + (total >= 500 ? 0 : 99)).toFixed(2)}</span></div>
        <button onClick={onCheckout} className="w-full mt-4 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: "var(--good-accent)" }}>
          Proceder al pago
        </button>
      </div>
    </div>
  );
}

function CheckoutView({ step, setStep, total, cartCount, onPlaceOrder, onViewOrders, onBack }: any) {
  const steps = ["Envío", "Pago", "Confirmar"];
  const finalTotal = total + (total >= 500 ? 0 : 99);

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white" style={{ background: "var(--good-success)" }}>
            <Check size={40} />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold mt-6" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>¡Pedido confirmado!</h2>
        <p className="text-sm mt-2" style={{ color: "var(--good-muted)" }}>Recibirás un email de confirmación. Tu pedido llegará en 2-3 días hábiles.</p>
        <button onClick={onViewOrders} className="mt-6 px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--good-accent)" }}>Ver mis pedidos</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <BackButton onClick={onBack} label="Volver al carrito" />
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>Checkout</h1>
      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: i <= step ? "var(--good-accent)" : "oklch(0.92 0.01 160)", color: i <= step ? "#fff" : "var(--good-muted)" }}>{i + 1}</div>
            <span className="text-xs font-medium" style={{ color: i <= step ? "var(--good-text)" : "var(--good-muted)" }}>{s}</span>
            {i < 2 && <div className="w-8 h-px" style={{ background: "oklch(0.9 0.01 160)" }} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <input className="w-full p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="Nombre completo" />
          <input className="w-full p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="Dirección de envío" />
          <div className="grid grid-cols-2 gap-3">
            <input className="p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="Ciudad" />
            <input className="p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="C.P." />
          </div>
          <button onClick={() => setStep(1)} className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--good-accent)" }}>Continuar al pago</button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="flex items-center gap-2 mb-2"><CreditCard size={18} style={{ color: "var(--good-accent)" }} /><span className="text-sm font-medium" style={{ color: "var(--good-text)" }}>Tarjeta de crédito/débito</span></div>
          <input className="w-full p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="Número de tarjeta" />
          <div className="grid grid-cols-2 gap-3">
            <input className="p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="MM/AA" />
            <input className="p-3 rounded-xl border text-sm" style={{ borderColor: "oklch(0.9 0.01 160)", background: "var(--good-surface)" }} placeholder="CVV" />
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--good-success)" }}><Shield size={14} /> Pago encriptado y seguro</div>
          <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--good-accent)" }}>Revisar pedido</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="p-4 rounded-xl border" style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--good-text)" }}>Resumen del pedido</p>
            <div className="flex justify-between mt-2 text-sm" style={{ color: "var(--good-muted)" }}><span>{cartCount} artículo(s)</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between mt-1 text-sm" style={{ color: "var(--good-muted)" }}><span>Envío</span><span>{total >= 500 ? "Gratis" : "$99.00"}</span></div>
            <div className="border-t mt-2 pt-2 flex justify-between font-bold" style={{ borderColor: "oklch(0.9 0.01 160)", color: "var(--good-text)" }}><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
          </div>
          <button onClick={onPlaceOrder} className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "var(--good-accent)" }}>Confirmar pedido</button>
        </motion.div>
      )}
    </div>
  );
}

function OrdersView({ orders, products, onBack }: any) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <BackButton onClick={onBack} />
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium" style={{ color: "var(--good-text)" }}>No tienes pedidos aún</p>
          <p className="text-sm" style={{ color: "var(--good-muted)" }}>¡Haz tu primera compra!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <div key={order.id} className="p-4 rounded-xl border" style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--good-text)" }}>{order.id}</p>
                  <p className="text-xs" style={{ color: "var(--good-muted)" }}>{order.date}</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "oklch(0.92 0.04 160)", color: "var(--good-accent)" }}>{order.status}</span>
              </div>
              <div className="flex gap-2">
                {order.items.map((item: CartItem) => {
                  const p = products.find((pr: any) => pr.id === item.id);
                  return p ? <img key={item.id} src={p.img} alt={p.name} className="w-12 h-12 rounded-lg object-cover" /> : null;
                })}
              </div>
              <p className="text-sm font-bold mt-2" style={{ color: "var(--good-text)" }}>Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountView({ onBack, onViewOrders }: { onBack: () => void; onViewOrders: () => void }) {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <BackButton onClick={onBack} />
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--good-text)" }}>Mi Cuenta</h1>
      <div className="p-4 rounded-xl border mb-4" style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "var(--good-accent)" }}>JD</div>
          <div>
            <p className="font-bold text-sm" style={{ color: "var(--good-text)" }}>Juan Demo</p>
            <p className="text-xs" style={{ color: "var(--good-muted)" }}>juan@demo.com</p>
          </div>
        </div>
      </div>
      {[{ label: "Mis Pedidos", action: onViewOrders }, { label: "Direcciones guardadas" }, { label: "Métodos de pago" }, { label: "Configuración" }].map((item) => (
        <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between p-4 rounded-xl border mb-2 hover:bg-gray-50 transition-colors text-left" style={{ background: "var(--good-surface)", borderColor: "oklch(0.92 0.01 160)" }}>
          <span className="text-sm font-medium" style={{ color: "var(--good-text)" }}>{item.label}</span>
          <ChevronRight size={16} style={{ color: "var(--good-muted)" }} />
        </button>
      ))}
    </div>
  );
}
