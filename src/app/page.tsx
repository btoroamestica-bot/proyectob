"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  // Navigation states
  const [scrolled, setScrolled] = useState(false);

  // ROI Calculator states
  const [dbSize, setDbSize] = useState(1000); // in GB
  const [devHours, setDevHours] = useState(60); // hours per month
  const [savingCLP, setSavingCLP] = useState(0);
  const [savedHours, setSavedHours] = useState(0);

  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "FinTech",
    challenge: "",
  });

  // Handle scroll class for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update ROI Calculation
  useEffect(() => {
    // 40% reduction in hours
    const hoursSaved = Math.round(devHours * 0.4);
    setSavedHours(hoursSaved);

    // Chilean Peso (CLP) rate estimate: $35.000 CLP per hour saved + cloud infra savings of $50 CLP per GB
    const clpSaved = (hoursSaved * 35000) + (dbSize * 70);
    setSavingCLP(clpSaved);
  }, [dbSize, devHours]);

  // Fade-in animation on scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", company: "", industry: "FinTech", challenge: "" });
      } else {
        setFormError(data.error || "Ocurrió un error. Por favor inténtalo de nuevo.");
      }
    } catch (err) {
      setFormError("No pudimos conectar con el servidor. Inténtalo más tarde.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      {/* Auroras de fondo decorativas */}
      <div className="aurora-bg">
        <div className="aurora-1"></div>
        <div className="aurora-2"></div>
        <div className="aurora-3"></div>
      </div>

      {/* Header / Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: 100,
          background: scrolled ? "rgba(8, 11, 17, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-glass)" : "none",
          transition: "var(--transition-smooth)",
          padding: "1.25rem 0",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L30 10V22L16 30L2 22V10L16 2Z" stroke="url(#logoGrad)" strokeWidth="3" strokeLinejoin="round" />
              <path d="M16 8L24 13V19L16 24L8 19V13L16 8Z" fill="url(#logoGrad)" opacity="0.8" />
              <defs>
                <linearGradient id="logoGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="0.5" stopColor="#6366f1" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-title)", letterSpacing: "-0.5px" }}>
              TORO<span style={{ color: "var(--accent)" }}>DATA</span>
            </span>
          </div>

          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="nav-links">
            <a href="#servicios" className="nav-link" style={{ fontSize: "0.95rem", color: "var(--text-gray)", fontWeight: 500 }}>Servicios</a>
            <a href="#hibrido" className="nav-link" style={{ fontSize: "0.95rem", color: "var(--text-gray)", fontWeight: 500 }}>Modelo Híbrido</a>
            <a href="#calculadora" className="nav-link" style={{ fontSize: "0.95rem", color: "var(--text-gray)", fontWeight: 500 }}>Calculadora ROI</a>
            <a href="#registro" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>Postular</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: "7rem 0 5rem 0", textAlign: "center" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              padding: "0.5rem 1rem",
              borderRadius: "50px",
              color: "var(--text-white)",
              fontSize: "0.85rem",
              fontWeight: 500,
              fontFamily: "var(--font-title)",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }}></span>
            Lanzamiento Oficial Toro Data SpA - Santiago, Chile
          </div>

          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", lineHeight: "1.1" }}>
            El Poder de los Datos a Escala <span className="gradient-text">Empresarial</span>, Potenciado por <span className="gradient-text-accent">IA Híbrida</span>
          </h1>

          <p style={{ fontSize: "1.2rem", color: "var(--text-gray)", maxWidth: "700px", lineHeight: "1.6" }}>
            Aceleramos tu negocio con consultoría especializada en optimización de bases de datos, analítica predictiva y pipelines inteligentes. Unimos arquitectos humanos con agentes de IA autónomos.
          </p>

          <div style={{ display: "flex", gap: "1.25rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#registro" className="btn-primary">
              Iniciar Proyecto
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#hibrido" className="btn-secondary">Saber más</a>
          </div>

          <div style={{ width: "100%", maxWidth: "900px", marginTop: "3rem", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border-glass)", boxShadow: "0 20px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ background: "rgba(15, 22, 36, 0.9)", padding: "0.75rem 1rem", display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-glass)" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }}></div>
              <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>torodata-agent-console</div>
            </div>
            <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.95)", fontFamily: "monospace", textAlign: "left", fontSize: "0.9rem", color: "#38bdf8", overflowX: "auto" }}>
              <p style={{ color: "#64748b" }}># Inicializando conexión del Agente Optimizador de Queries en base PostgreSQL de Producción...</p>
              <p style={{ color: "#22c55e" }}>[OK] Conectado exitosamente en modo lectura. Escaneando planes de ejecución lentos...</p>
              <p style={{ color: "#eab308" }}>[ALERTA] Query en tabla &apos;ventas_retail&apos; demora 1450ms. Plan: escaneo secuencial.</p>
              <p style={{ color: "#38bdf8" }}>[PROPUESTA IA] Sugiriendo índice compuesto: CREATE INDEX idx_ventas_tienda_fecha ON ventas_retail (tienda_id, fecha_venta DESC);</p>
              <p style={{ color: "#a855f7" }}>[HUMANO (DBA)] Aprobado por Consultor DBA. Ejecutando simulación en Sandbox...</p>
              <p style={{ color: "#22c55e" }}>[ÉXITO] Rendimiento mejorado en 96%. Latencia reducida a 58ms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Estrella */}
      <section id="servicios" className="fade-in-section" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Servicios de Alta Especialización</h2>
            <p style={{ color: "var(--text-gray)", fontSize: "1.1rem" }}>Soluciones modernas diseñadas a medida para el ecosistema tecnológico de tu empresa.</p>
          </div>

          <div className="grid-2">
            {/* Servicio 1 */}
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyItems: "center", color: "var(--primary)", paddingLeft: "13px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.4rem" }}>Migración Inteligente de Bases de Datos</h3>
              <p style={{ color: "var(--text-gray)", lineHeight: "1.6" }}>
                Migramos tus sistemas legacy e infraestructura on-premise a la nube (Snowflake, BigQuery, PostgreSQL) reduciendo la interrupción operacional. Usamos IA para mapear y reescribir esquemas óptimos de forma automática.
              </p>
            </div>

            {/* Servicio 2 */}
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyItems: "center", color: "var(--secondary)", paddingLeft: "13px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.4rem" }}>Automatización de ETLs con IA</h3>
              <p style={{ color: "var(--text-gray)", lineHeight: "1.6" }}>
                Construimos pipelines de datos robustos y adaptativos. Nuestros agentes monitorean la ingesta en tiempo real, limpian inconsistencias y auto-reparan fallos menores ante cambios de esquema, protegiendo tus almacenes de datos.
              </p>
            </div>

            {/* Servicio 3 */}
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyItems: "center", color: "var(--accent)", paddingLeft: "13px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.4rem" }}>Analítica Predictiva Corporativa</h3>
              <p style={{ color: "var(--text-gray)", lineHeight: "1.6" }}>
                Desarrollamos modelos de forecasting e inteligencia empresarial. No solo creamos tableros clásicos, sino que proveemos dashboards dinámicos enriquecidos con modelos predictivos de comportamiento de compra, inventarios y finanzas.
              </p>
            </div>

            {/* Servicio 4 */}
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyItems: "center", color: "#ef4444", paddingLeft: "13px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: "1.4rem" }}>Auditoría de Rendimiento y Seguridad</h3>
              <p style={{ color: "var(--text-gray)", lineHeight: "1.6" }}>
                Analizamos de punta a cabo la seguridad y el performance de tus bases de datos. Reducimos el consumo de hardware mediante optimizaciones inteligentes de consultas y aseguramos el compliance normativo nacional e internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modelo Híbrido (Organigrama/Estructura del Proyecto) */}
      <section id="hibrido" className="fade-in-section" style={{ padding: "6rem 0", background: "rgba(15, 23, 42, 0.3)", borderTop: "1px solid var(--border-glass)", borderBottom: "1px solid var(--border-glass)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>La Fuerza de la Colaboración Humano-IA</h2>
            <p style={{ color: "var(--text-gray)", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto" }}>
              Nuestro modelo híbrido combina el discernimiento estratégico, la empatía y la experiencia de nuestro equipo en Chile con la velocidad y escalabilidad de nuestros Agentes de IA autónomos.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <div>
              <h3 style={{ fontSize: "1.6rem", color: "var(--primary)", marginBottom: "1.5rem", borderBottom: "2px solid rgba(59, 130, 246, 0.2)", paddingBottom: "0.5rem" }}>
                Roles Humanos (Liderazgo Estratégico)
              </h3>
              <div className="grid-4">
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)" }}>Arquitecto de Datos</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Lidera la concepción lógica, diseña arquitecturas multinube y valida los modelos estructurales.</p>
                </div>
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)" }}>Consultor DBA</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Garantiza velocidad y seguridad operacional de base de datos en producción.</p>
                </div>
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)" }}>Ingeniero de IA</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Construye y calibra la lógica de los agentes de lenguaje y modelos de forecasting.</p>
                </div>
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)" }}>Analista de Negocio</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Traduce datos y proyecciones en valor comercial y KPIs reales para la toma de decisión.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "1.6rem", color: "var(--accent)", marginBottom: "1.5rem", borderBottom: "2px solid rgba(16, 185, 129, 0.2)", paddingBottom: "0.5rem" }}>
                Agentes de IA (Automatización y Escala)
              </h3>
              <div className="grid-3">
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)", position: "relative" }}>
                  <span style={{ position: "absolute", right: "1rem", top: "1rem", background: "rgba(16, 185, 129, 0.15)", color: "var(--accent)", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "50px", fontWeight: "bold" }}>Autónomo</span>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)", paddingRight: "5rem" }}>Optimizador de Queries</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Escaner activo de latencia que simula en sandbox y sugiere índices de optimización automáticos.</p>
                </div>
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)", position: "relative" }}>
                  <span style={{ position: "absolute", right: "1rem", top: "1rem", background: "rgba(16, 185, 129, 0.15)", color: "var(--accent)", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "50px", fontWeight: "bold" }}>Autónomo</span>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)", paddingRight: "5rem" }}>Extracción y Limpieza</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Mapeador que traduce dialectos legados, normaliza estructuras y valida calidad de datos.</p>
                </div>
                <div style={{ padding: "1.5rem", background: "rgba(8, 12, 21, 0.5)", borderRadius: "12px", border: "1px solid var(--border-glass)", position: "relative" }}>
                  <span style={{ position: "absolute", right: "1rem", top: "1rem", background: "rgba(16, 185, 129, 0.15)", color: "var(--accent)", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "50px", fontWeight: "bold" }}>Autónomo</span>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-white)", paddingRight: "5rem" }}>Reportería Automática</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>Motor Text-to-SQL que extrae proyecciones y redacta pre-informes en segundos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora ROI Interactiva */}
      <section id="calculadora" className="fade-in-section" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "4rem" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>¿Cuánto puedes optimizar con nuestro modelo?</h2>
              <p style={{ color: "var(--text-gray)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                El modelo híbrido de Toro Data disminuye drásticamente el tiempo de desarrollo de flujos y el consumo ineficiente en nubes de base de datos.
              </p>
              <p style={{ color: "var(--text-gray)", lineHeight: "1.6", marginBottom: "2rem" }}>
                Ajusta las variables de tu infraestructura y equipo para calcular tu ahorro proyectado mensual con la incorporación de agentes inteligentes.
              </p>

              <div style={{ borderLeft: "4px solid var(--primary)", paddingLeft: "1.5rem", background: "rgba(59, 130, 246, 0.05)", padding: "1rem 1.5rem", borderRadius: "0 8px 8px 0" }}>
                <h4 style={{ color: "var(--text-white)", marginBottom: "0.25rem" }}>Realidad del Mercado Chileno</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-gray)", lineHeight: "1.4" }}>
                  Calculamos en base al costo hora promedio de ingeniería de datos calificada en Chile y costos típicos de almacenamiento/cómputo Cloud.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ background: "rgba(15, 22, 36, 0.85)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between" }}>
                <span>Calculadora de ROI</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-gray)", fontWeight: "normal" }}>Toro Data SpA</span>
              </h3>

              {/* Slider 1 */}
              <div className="slider-container">
                <div className="slider-header">
                  <span className="form-label">Tamaño de Bases de Datos</span>
                  <span className="slider-val">{dbSize >= 1000 ? `${(dbSize / 1000).toFixed(1)} TB` : `${dbSize} GB`}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={dbSize}
                  onChange={(e) => setDbSize(parseInt(e.target.value))}
                  className="range-input"
                />
              </div>

              {/* Slider 2 */}
              <div className="slider-container">
                <div className="slider-header">
                  <span className="form-label">Horas/mes dedicadas a datos</span>
                  <span className="slider-val">{devHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={devHours}
                  onChange={(e) => setDevHours(parseInt(e.target.value))}
                  className="range-input"
                />
              </div>

              <div style={{ height: "1px", background: "var(--border-glass)", margin: "2rem 0" }}></div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-gray)" }}>Horas Liberadas / Mes</span>
                  <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--text-white)" }}>{savedHours} hrs</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-gray)" }}>Reducción Latencia Queries</span>
                  <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "var(--accent)" }}>Hasta 90%</span>
                </div>

                <div style={{ padding: "1.25rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)", marginTop: "0.5rem" }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-gray)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Ahorro Proyectado Mensual</div>
                  <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent)", marginTop: "0.25rem" }}>
                    ${savingCLP.toLocaleString("es-CL")} <span style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--text-white)" }}>CLP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores de Impacto */}
      <section className="fade-in-section" style={{ padding: "6rem 0", background: "rgba(15, 23, 42, 0.2)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Enfoque en Industrias Clave</h2>
            <p style={{ color: "var(--text-gray)", fontSize: "1.1rem" }}>Solucionamos problemas específicos de datos donde el impacto es inmediato.</p>
          </div>

          <div className="grid-4">
            <div className="glass-card" style={{ padding: "2rem 1.5rem" }}>
              <div style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.25rem", marginBottom: "0.75rem" }}>FinTech</div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-gray)", lineHeight: "1.5" }}>
                Rendimiento de queries financieras críticas y encriptación robusta bajo normativas de seguridad bancaria chilena.
              </p>
            </div>
            <div className="glass-card" style={{ padding: "2rem 1.5rem" }}>
              <div style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.25rem", marginBottom: "0.75rem" }}>Retail</div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-gray)", lineHeight: "1.5" }}>
                Unificación de canales físicos y e-commerce con modelos automáticos de previsión de stock de inventario.
              </p>
            </div>
            <div className="glass-card" style={{ padding: "2rem 1.5rem" }}>
              <div style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.25rem", marginBottom: "0.75rem" }}>Salud</div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-gray)", lineHeight: "1.5" }}>
                Limpieza profunda de registros clínicos fragmentados, garantizando la anonimización de datos de pacientes (PII).
              </p>
            </div>
            <div className="glass-card" style={{ padding: "2rem 1.5rem" }}>
              <div style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.25rem", marginBottom: "0.75rem" }}>Startups</div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-gray)", lineHeight: "1.5" }}>
                Infraestructura y data lakes escalables desde las etapas iniciales de crecimiento para evitar deuda técnica acumulada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Registro */}
      <section id="registro" className="fade-in-section" style={{ padding: "6rem 0 8rem 0" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <div className="glass-card" style={{ padding: "3rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Postula a nuestro programa Beta</h2>
              <p style={{ color: "var(--text-gray)", fontSize: "1rem" }}>
                Seleccionamos un número limitado de empresas en Chile para optimizar sus infraestructuras sin costo inicial.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>¡Postulación Enviada!</h3>
                <p style={{ color: "var(--text-gray)", lineHeight: "1.6" }}>
                  Hemos recibido tu inscripción para Toro Data SpA. Un miembro de nuestro equipo te contactará dentro de las próximas 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {formError && (
                  <div style={{ padding: "1rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", color: "#f87171", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                    {formError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nombre Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Correo Electrónico Corporativo *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Ej. jperez@empresa.cl"
                  />
                </div>

                <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="form-label" htmlFor="company">Empresa *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nombre empresa"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="industry">Industria *</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="FinTech">FinTech</option>
                      <option value="Retail">Retail</option>
                      <option value="Salud">Salud</option>
                      <option value="Startups">Startups</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="challenge">¿Cuál es tu principal desafío de datos actualmente?</label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={4}
                    value={formData.challenge}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Ej. Consultas lentas en BD producción, migración de legacy a la nube, o estructuración de reportes predictivos..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: "1rem", padding: "1rem" }}
                >
                  {formLoading ? "Enviando postulación..." : "Postular Ahora"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-glass)", padding: "3rem 0", background: "#06090e" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L30 10V22L16 30L2 22V10L16 2Z" stroke="#3b82f6" strokeWidth="3" strokeLinejoin="round" />
                <path d="M16 8L24 13V19L16 24L8 19V13L16 8Z" fill="#3b82f6" opacity="0.8" />
              </svg>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, fontFamily: "var(--font-title)", letterSpacing: "-0.5px" }}>
                TORO<span style={{ color: "var(--accent)" }}>DATA</span>
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} Toro Data SpA. Santiago, Chile. Todos los derechos reservados.
            </p>
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="file:///Users/benjamin/Desktop/Carpeta%20de%20inicio/UAI/Ramos/Magister/B6/Page/agents.md" target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", transition: "var(--transition-smooth)" }} className="footer-link">
              Ver bases operativas (agents.md)
            </a>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Contacto: contacto@torodata.cl
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
