import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsDown, ThumbsUp, ArrowRight } from "lucide-react";
import { BadExample } from "@/components/BadExample";
import { GoodExample } from "@/components/GoodExample";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mal Ejemplo UX E-Commerce" },
      { name: "description", content: "Ejemplo de mala usabilidad en comercio electrónico - Problemas comunes UX" },
    ],
  }),
});

function Index() {
  return (
    <div>
      <BadExample />
    </div>
  );
}

function StickyBar({ current, onNavigate }: { current: "bad" | "good"; onNavigate: (v: View) => void }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 backdrop-blur-md border-b" style={{ background: "rgba(255,255,255,0.95)", borderColor: "var(--border)" }}>
      <button
        onClick={() => onNavigate("landing")}
        className="text-sm font-semibold hover:opacity-70 transition-opacity"
        style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
      >
        ← Volver
      </button>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium px-3 py-1 rounded-full" style={{
          background: current === "bad" ? "oklch(0.92 0.05 25)" : "oklch(0.92 0.04 160)",
          color: current === "bad" ? "var(--bad-accent)" : "var(--good-accent)",
        }}>
          {current === "bad" ? "❌ Mal Ejemplo" : "✅ Buen Ejemplo"}
        </span>
      </div>
      <button
        onClick={() => onNavigate(current === "bad" ? "good" : "bad")}
        className="text-sm font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
        style={{ color: current === "bad" ? "var(--good-accent)" : "var(--bad-accent)" }}
      >
        Ver {current === "bad" ? "buen" : "mal"} ejemplo <ArrowRight size={14} />
      </button>
    </div>
  );
}

function LandingPage({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: "var(--background)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: "oklch(0.95 0.02 260)", color: "var(--primary)" }}>
          Arquitectura de Información & Usabilidad
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-6 leading-tight" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
          E-Commerce UX:<br />
          <span style={{ color: "var(--primary)" }}>Mal vs Buen Ejemplo</span>
        </h1>
        <p className="mt-4 text-lg" style={{ color: "var(--muted-foreground)" }}>
          Comparación interactiva de principios de usabilidad aplicados al diseño de una tienda en línea.
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Eficaz · Eficiente · Seguro · Útil · Fácil de aprender · Fácil de recordar
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full"
      >
        <button
          onClick={() => onNavigate("bad")}
          className="group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          style={{ borderColor: "var(--bad-accent)", background: "var(--bad-bg)" }}
        >
          <ThumbsDown size={40} style={{ color: "var(--bad-accent)" }} />
          <h2 className="text-xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)", color: "var(--bad-accent)" }}>
            Mal Ejemplo
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--bad-muted)" }}>
            Popups, caos visual, navegación rota, información confusa
          </p>
          <ArrowRight className="mt-4 group-hover:translate-x-1 transition-transform" style={{ color: "var(--bad-accent)" }} size={20} />
        </button>

        <button
          onClick={() => onNavigate("good")}
          className="group relative overflow-hidden rounded-2xl border-2 p-8 text-left transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          style={{ borderColor: "var(--good-accent)", background: "var(--good-bg)" }}
        >
          <ThumbsUp size={40} style={{ color: "var(--good-accent)" }} />
          <h2 className="text-xl font-bold mt-4" style={{ fontFamily: "var(--font-heading)", color: "var(--good-accent)" }}>
            Buen Ejemplo
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--good-muted)" }}>
            Limpio, intuitivo, seguro, eficiente y memorable
          </p>
          <ArrowRight className="mt-4 group-hover:translate-x-1 transition-transform" style={{ color: "var(--good-accent)" }} size={20} />
        </button>
      </motion.div>
    </div>
  );
}
