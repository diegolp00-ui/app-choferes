/**
 * SHALOM OPERACIONES - PORTAL DEL CHOFER
 * Motor Ligero 60 FPS • Cero Dependencias Externas Bloqueantes
 */

// ==========================================
// 1. ESTADO GLOBAL Y METADATOS DE CABECERA
// ==========================================
const MODULE_HEADERS = {
  bitacoraRuta: {
    title: "Bitácora de Ruta",
    subtitle: "Reporta incidencias del día a día"
  },
  soporteMonitores: {
    title: "Central y Soporte",
    subtitle: "Monitores de ruta y asistencia 24/7"
  },
  agencias: {
    title: "Agencias & GPS",
    subtitle: "194 sedes, horarios y navegación"
  },
  practicaApp: {
    title: "Simulador App",
    subtitle: "Práctica interactiva de entregas"
  },
  cdTalleres: {
    title: "Combustible & Talleres",
    subtitle: "Taller Central Mosquera y auxilio"
  },
  evaluacionRuta: {
    title: "Control Post-Ruta",
    subtitle: "Odómetro, combustible y entregas"
  },
  manualesPdf: {
    title: "Manuales & Equipo",
    subtitle: "Guías operativas y organigrama"
  }
};

const AppState = {
  activeDriver: {
    name: "Diego Lizarbe",
    dni: "47891234",
    license: "A-IIIc",
    role: "Capacitador / Chofer",
    plate: "B7A-892"
  },
  driversList: [
    { name: "Diego Lizarbe", dni: "47891234", license: "A-IIIc", status: "Habilitado" },
    { name: "Juan Carlos Quispe", dni: "45123987", license: "A-IIb", status: "Habilitado" },
    { name: "Manuel Rojas Huamán", dni: "42987654", license: "A-IIIa", status: "En Capacitación" },
    { name: "Roberto Gómez Ruiz", dni: "48991203", license: "A-IIIb", status: "Habilitado" }
  ],
  monitors: [
    {
      name: "Juan Carlos Morales",
      role: "Monitor Líder de Ruta",
      zone: "huachipa",
      zoneLabel: "CD Huachipa (Central)",
      phone: "987654321",
      schedule: "06:00 - 15:00",
      status: "En Línea"
    },
    {
      name: "Carlos Mendoza",
      role: "Monitor Zonal de Acompañamiento",
      zone: "huachipa",
      zoneLabel: "Ate, Vitarte, Santa Anita, SJL",
      phone: "991234567",
      schedule: "07:00 - 16:00",
      status: "En Ruta"
    },
    {
      name: "Miguel Ángel Quispe",
      role: "Supervisor Zonal de Distribución",
      zone: "norte",
      zoneLabel: "Lima Norte (Comas, Olivos, Carabayllo)",
      phone: "984561230",
      schedule: "06:30 - 16:30",
      status: "En Línea"
    },
    {
      name: "Roberto Campos",
      role: "Monitor Zonal de Acompañamiento",
      zone: "sur",
      zoneLabel: "Lima Sur (Lurín, Chorrillos, VES, VMT)",
      phone: "978123456",
      schedule: "07:00 - 16:00",
      status: "En Línea"
    },
    {
      name: "Víctor Fernández",
      role: "Monitor Zonal de Acompañamiento",
      zone: "callao",
      zoneLabel: "Callao, Bellavista, Ventanilla, Faucett",
      phone: "965412890",
      schedule: "06:00 - 15:00",
      status: "En Línea"
    },
    {
      name: "Lic. Diego Lizarbe",
      role: "Jefe de Capacitación & Escuela de Choferes",
      zone: "capacitacion",
      zoneLabel: "Escuela de Conductores Central",
      phone: "994567812",
      schedule: "08:00 - 18:00",
      status: "Disponible"
    }
  ],
  agencies: window.SHALOM_AGENCIES_DATA || [],
  bitacoraReports: [],
  evaluations: []
};

// ==========================================
// 2. INICIALIZACIÓN RÁPIDA (DOM READY)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadSavedBitacora();
  loadSavedEvaluations();
  updateDriverUI();
  renderMonitors();
  populateDistrictSelect();
  renderAgencies();
  renderBitacoraHistory();
  setupSignatureCanvases();
  updateClock();
  setInterval(updateClock, 30000);

  // Soporte para botón "Atrás" físico del teléfono Android/iOS
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.module) {
      openModule(e.state.module, false);
    } else {
      showDashboard(false);
    }
  });
});

// ==========================================
// 3. NAVEGACIÓN A 60 FPS ENTRE VISTAS
// ==========================================
function openModule(moduleId, pushHistory = true) {
  requestAnimationFrame(() => {
    document.querySelectorAll(".view-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    const targetId = "view" + moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    // Actualizar cabecera roja al modo submódulo (estilo Bitácora de Ruta)
    const homeHeader = document.getElementById("headerHomeContent");
    const modHeader = document.getElementById("headerModuleContent");
    const titleEl = document.getElementById("moduleHeaderTitle");
    const subEl = document.getElementById("moduleHeaderSubtitle");

    const meta = MODULE_HEADERS[moduleId] || { title: "Shalom Operaciones", subtitle: "Portal del Chofer" };
    if (titleEl) titleEl.textContent = meta.title;
    if (subEl) subEl.textContent = meta.subtitle;

    if (homeHeader && modHeader) {
      homeHeader.classList.add("hidden");
      modHeader.classList.remove("hidden");
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    if (pushHistory && history.pushState) {
      history.pushState({ module: moduleId }, "", `#${moduleId}`);
    }

    if (moduleId === "evaluacionRuta") {
      document.getElementById("evalDriverName").value = AppState.activeDriver.name;
      document.getElementById("evalTruckPlate").value = AppState.activeDriver.plate;
      renderEvaluationHistory();
      setTimeout(() => resizeCanvas(evalCanvas, evalCtx), 40);
    } else if (moduleId === "practicaApp") {
      setTimeout(() => resizeCanvas(simCanvas, simCtx), 40);
    } else if (moduleId === "bitacoraRuta") {
      renderBitacoraHistory();
    }
  });
}

function showDashboard(pushHistory = true) {
  requestAnimationFrame(() => {
    document.querySelectorAll(".view-panel").forEach((panel) => {
      panel.classList.remove("active");
    });

    const dash = document.getElementById("viewDashboard");
    if (dash) dash.classList.add("active");

    const homeHeader = document.getElementById("headerHomeContent");
    const modHeader = document.getElementById("headerModuleContent");
    if (homeHeader && modHeader) {
      modHeader.classList.add("hidden");
      homeHeader.classList.remove("hidden");
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    if (pushHistory && history.pushState) {
      history.pushState({ module: null }, "", window.location.pathname);
    }
  });
}

// ==========================================
// 4. TOAST DE NOTIFICACIÓN LIGERO (60 FPS)
// ==========================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("appToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==========================================
// 5. PERFIL DE CHOFER Y AVATAR (DL)
// ==========================================
function getInitials(name) {
  if (!name) return "CH";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function updateDriverUI() {
  const avatarBtn = document.getElementById("headerAvatarBtn");
  if (avatarBtn) {
    avatarBtn.textContent = getInitials(AppState.activeDriver.name);
  }
  const simName = document.getElementById("simDriverName");
  if (simName) simName.textContent = AppState.activeDriver.name;
  const evalDriver = document.getElementById("evalDriverName");
  if (evalDriver) evalDriver.value = AppState.activeDriver.name;
}

function openDniModal() {
  renderDriversList();
  document.getElementById("modalDni").classList.remove("hidden");
}

function closeDniModal() {
  document.getElementById("modalDni").classList.add("hidden");
}

function renderDriversList() {
  const container = document.getElementById("driversListContainer");
  if (!container) return;

  container.innerHTML = AppState.driversList.map((driver) => {
    const isActive = driver.name === AppState.activeDriver.name;
    return `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-radius:14px; margin-bottom:8px; border:1.5px solid ${isActive ? "#ef4444" : "#e2e8f0"}; background:${isActive ? "#fef2f2" : "#ffffff"};">
        <div>
          <div style="font-size:0.84rem; font-weight:800; color:#0f172a;">
            ${driver.name}
          </div>
          <div style="font-size:0.72rem; color:#64748b;">
            DNI: <strong>${driver.dni}</strong> • ${driver.license} • <span style="color:#059669; font-weight:700;">${driver.status}</span>
          </div>
        </div>
        ${!isActive ? `
          <button onclick="selectDriver('${driver.name.replace(/'/g, "\\'")}')" style="background:#0f172a; color:#ffffff; border:none; border-radius:10px; padding:6px 12px; font-size:0.74rem; font-weight:700; cursor:pointer;">
            Activar
          </button>
        ` : `
          <span style="font-size:0.72rem; font-weight:800; color:var(--shalom-red);">Activo</span>
        `}
      </div>
    `;
  }).join("");
}

function selectDriver(name) {
  const found = AppState.driversList.find((d) => d.name === name);
  if (found) {
    AppState.activeDriver = {
      name: found.name,
      dni: found.dni,
      license: found.license,
      role: "Conductor",
      plate: "B7A-892"
    };
    updateDriverUI();
    renderDriversList();
    closeDniModal();
    showToast(`Conductor activo: ${found.name}`);
  }
}

function registerNewDriver() {
  const nameInput = document.getElementById("newDriverName");
  const dniInput = document.getElementById("newDriverDni");
  const name = nameInput.value.trim();
  const dni = dniInput.value.trim();

  if (!name || dni.length < 8) {
    showToast("Ingresa nombre completo y DNI de 8 dígitos");
    return;
  }

  AppState.driversList.push({
    name,
    dni,
    license: "A-IIb",
    status: "En Capacitación"
  });

  nameInput.value = "";
  dniInput.value = "";
  selectDriver(name);
}

// ==========================================
// 6. MÓDULO: BITÁCORA DE RUTA (REPORTE DE RUTAS)
// ==========================================
function loadSavedBitacora() {
  try {
    const saved = localStorage.getItem("shalom_bitacora_reports");
    if (saved) {
      AppState.bitacoraReports = JSON.parse(saved);
    } else {
      AppState.bitacoraReports = [
        {
          id: 101,
          category: "Demora en Agencia / Garita",
          details: "En Agencia Av. Faucett hubo espera de 25 min por descarga de unidad provincial antes de abrir rampa.",
          date: "Hoy, 10:15 AM",
          driverInternal: "Diego Lizarbe",
          status: "Recibido por Capacitación"
        }
      ];
    }
  } catch (e) {
    AppState.bitacoraReports = [];
  }
}

function submitBitacoraReport(e) {
  e.preventDefault();
  const catEl = document.getElementById("bitacoraCategory");
  const detEl = document.getElementById("bitacoraDetails");

  const category = catEl.value;
  const details = detEl.value.trim();

  if (!category || !details) {
    showToast("Completa la categoría y el detalle del recorrido");
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

  const newReport = {
    id: Date.now(),
    category,
    details,
    date: `Hoy, ${timeStr}`,
    driverInternal: AppState.activeDriver.name,
    dniInternal: AppState.activeDriver.dni,
    status: "Enviado a Capacitación y Desarrollo"
  };

  AppState.bitacoraReports.unshift(newReport);
  try {
    localStorage.setItem("shalom_bitacora_reports", JSON.stringify(AppState.bitacoraReports));
  } catch (err) {}

  catEl.selectedIndex = 0;
  detEl.value = "";

  renderBitacoraHistory();
  showToast("✔ Reporte confidencial enviado con éxito");
}

function renderBitacoraHistory() {
  const container = document.getElementById("bitacoraHistoryList");
  if (!container) return;

  if (AppState.bitacoraReports.length === 0) {
    container.innerHTML = `
      <div class="fast-card" style="text-align:center; color:#64748b; font-size:0.82rem;">
        Aún no hay reportes registrados hoy.
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.bitacoraReports.map((r) => `
    <div class="fast-card">
      <div class="flex justify-between items-center mb-2">
        <span style="font-size:0.72rem; font-weight:800; background:#fef2f2; color:var(--shalom-red); padding:3px 9px; border-radius:999px; border:1px solid #fecaca;">
          ${r.category}
        </span>
        <span style="font-size:0.72rem; color:#64748b;">${r.date}</span>
      </div>
      <p style="font-size:0.84rem; color:#1e293b; line-height:1.45; margin-bottom:8px;">
        "${r.details}"
      </p>
      <div class="flex justify-between items-center" style="border-top:1px solid #f1f5f9; padding-top:8px; font-size:0.72rem; color:#64748b;">
        <span>🛡️ Chofer Anónimo (Visible para Capacitación)</span>
        <span style="color:#059669; font-weight:700;">✔ Registrado</span>
      </div>
    </div>
  `).join("");
}

// ==========================================
// 7. MÓDULO: CENTRAL Y SOPORTE (MONITORES)
// ==========================================
function renderMonitors(filteredList = null) {
  const list = filteredList || AppState.monitors;
  const container = document.getElementById("monitorsGrid");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="fast-card" style="text-align:center; color:#64748b; font-size:0.84rem;">
        No se encontraron monitores en esa zona.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((m) => {
    const initials = getInitials(m.name);
    const waMessage = encodeURIComponent(
      `Hola Monitor ${m.name}, soy el chofer ${AppState.activeDriver.name} (Unidad ${AppState.activeDriver.plate}). Solicito asistencia en ruta.`
    );
    const waLink = `https://wa.me/51${m.phone}?text=${waMessage}`;

    return `
      <div class="fast-card">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div style="width:42px; height:42px; border-radius:12px; background:#fef2f2; color:var(--shalom-red); font-weight:800; font-size:0.9rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${initials}
            </div>
            <div>
              <h4 style="font-size:0.94rem; font-weight:800; color:#0f172a; line-height:1.2;">${m.name}</h4>
              <div style="font-size:0.75rem; font-weight:700; color:var(--shalom-red);">${m.role}</div>
            </div>
          </div>
          <span style="font-size:0.7rem; font-weight:800; background:#ecfdf5; color:#047857; padding:3px 8px; border-radius:999px; border:1px solid #a7f3d0;">
            ● ${m.status}
          </span>
        </div>

        <div style="font-size:0.78rem; color:#475569; line-height:1.5; margin-top:6px;">
          <div>📍 <strong>Zona:</strong> ${m.zoneLabel}</div>
          <div>⏰ <strong>Turno:</strong> ${m.schedule} • 📞 +51 ${m.phone}</div>
        </div>

        <div class="action-row">
          <a href="${waLink}" target="_blank" class="btn-wa">
            WhatsApp Directo
          </a>
          <a href="tel:${m.phone}" class="btn-call">
            Llamar
          </a>
        </div>
      </div>
    `;
  }).join("");
}

function filterMonitors() {
  const query = (document.getElementById("monitorSearchInput")?.value || "").toLowerCase().trim();
  const zone = document.getElementById("monitorZoneFilter")?.value || "all";

  const filtered = AppState.monitors.filter((m) => {
    const matchesQuery =
      m.name.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query) ||
      m.zoneLabel.toLowerCase().includes(query);
    const matchesZone = zone === "all" || m.zone === zone;
    return matchesQuery && matchesZone;
  });

  renderMonitors(filtered);
}

// ==========================================
// 8. MÓDULO: AGENCIAS & GPS (60 FPS DEBOUNCED)
// ==========================================
let currentAgencyZone = "todas";
let displayedAgencyLimit = 25;
let filterRafId = null;

function scheduleFilterAgencies() {
  if (filterRafId) cancelAnimationFrame(filterRafId);
  filterRafId = requestAnimationFrame(() => {
    displayedAgencyLimit = 25;
    filterAgencies();
  });
}

function setAgencyZone(zone, btnElement) {
  currentAgencyZone = zone;
  displayedAgencyLimit = 25;
  document.querySelectorAll(".zone-chip").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (btnElement) {
    btnElement.classList.add("active");
  }
  filterAgencies();
}

function clearAgencySearch() {
  const input = document.getElementById("agencySearchInput");
  if (input) input.value = "";
  const select = document.getElementById("agencyDistrictSelect");
  if (select) select.value = "";
  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) clearBtn.classList.add("hidden");
  displayedAgencyLimit = 25;
  filterAgencies();
}

function populateDistrictSelect() {
  const select = document.getElementById("agencyDistrictSelect");
  if (!select || !AppState.agencies) return;

  const districtCounts = {};
  for (let i = 0; i < AppState.agencies.length; i++) {
    const d = AppState.agencies[i].district;
    if (d) districtCounts[d] = (districtCounts[d] || 0) + 1;
  }

  const sortedDistricts = Object.keys(districtCounts).sort();
  select.innerHTML =
    `<option value="">Todos los distritos (${AppState.agencies.length} sedes)</option>` +
    sortedDistricts.map((d) => `<option value="${d}">${d} (${districtCounts[d]})</option>`).join("");
}

function filterAgencies() {
  const searchInput = document.getElementById("agencySearchInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const select = document.getElementById("agencyDistrictSelect");
  const selectedDistrict = select ? select.value : "";
  const clearBtn = document.getElementById("btnClearSearch");

  if (clearBtn) {
    if (query.length > 0) clearBtn.classList.remove("hidden");
    else clearBtn.classList.add("hidden");
  }

  const filtered = AppState.agencies.filter((a) => {
    if (currentAgencyZone === "hubs" && !a.isHub) return false;
    if (currentAgencyZone !== "todas" && currentAgencyZone !== "hubs" && a.zone !== currentAgencyZone) return false;
    if (selectedDistrict && a.district !== selectedDistrict) return false;

    if (query) {
      return (
        (a.name && a.name.toLowerCase().includes(query)) ||
        (a.address && a.address.toLowerCase().includes(query)) ||
        (a.district && a.district.toLowerCase().includes(query)) ||
        (a.reference && a.reference.toLowerCase().includes(query))
      );
    }
    return true;
  });

  renderAgencies(filtered);
}

function loadMoreAgencies() {
  displayedAgencyLimit += 30;
  filterAgencies();
}

function copyAgencyAddress(address) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(address).then(() => {
      showToast("📋 Dirección copiada al portapapeles");
    });
  } else {
    showToast("Dirección lista");
  }
}

function renderAgencies(filteredList = null) {
  const list = filteredList !== null ? filteredList : AppState.agencies;
  const container = document.getElementById("agenciesList");
  const badge = document.getElementById("agencyCountBadge");
  const loadMoreBtn = document.getElementById("agenciesLoadMoreContainer");
  if (!container) return;

  if (badge) {
    badge.textContent = `${list.length} Sede${list.length === 1 ? "" : "s"}`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="fast-card" style="text-align:center; padding:28px 16px;">
        <div style="font-size:0.94rem; font-weight:800; color:#0f172a; margin-bottom:4px;">No se encontraron sedes</div>
        <p style="font-size:0.78rem; color:#64748b; margin-bottom:12px;">Intenta con otro distrito o palabra clave.</p>
        <button onclick="clearAgencySearch()" class="btn-primary-red" style="padding:10px 16px; font-size:0.8rem; width:auto;">
          Ver todas las agencias
        </button>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    return;
  }

  const itemsToShow = list.slice(0, displayedAgencyLimit);

  container.innerHTML = itemsToShow.map((a) => {
    const lat = (a.lat || "").trim();
    const lng = (a.lng || "").trim();
    const hasCoords = lat && lng && lat !== "0" && lng !== "0";

    const mapsUrl = hasCoords
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.address + ", " + (a.district || "Lima") + ", Peru")}`;
    const wazeUrl = hasCoords
      ? `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`
      : `https://waze.com/ul?q=${encodeURIComponent(a.address)}&navigate=yes`;

    const cleanAddr = (a.address || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");

    return `
      <div class="fast-card ${a.isHub ? "hub-highlight" : ""}">
        <div class="flex justify-between items-center mb-2">
          <span style="font-size:0.68rem; font-weight:800; background:${a.isHub ? "#fef2f2" : "#f1f5f9"}; color:${a.isHub ? "var(--shalom-red)" : "#475569"}; padding:3px 8px; border-radius:6px;">
            ${a.isHub ? "⭐ HUB CENTRAL" : a.zone + " • " + a.district}
          </span>
          <button onclick="copyAgencyAddress('${cleanAddr}')" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:3px 8px; font-size:0.7rem; font-weight:700; color:#475569; cursor:pointer;">
            Copiar
          </button>
        </div>

        <h4 style="font-size:0.94rem; font-weight:800; color:#0f172a; line-height:1.25;">${a.name}</h4>

        <div style="font-size:0.78rem; color:#334155; margin-top:6px; background:#f8fafc; padding:8px 10px; border-radius:10px; border:1px solid #f1f5f9;">
          <div>📍 <strong>${a.address}</strong></div>
          ${a.reference ? `<div style="font-size:0.72rem; color:#64748b; margin-top:2px;">Ref: ${a.reference}</div>` : ""}
        </div>

        <div style="font-size:0.73rem; color:#64748b; margin-top:8px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">
          <span>🕒 ${a.gateHours}</span>
          <span>📞 ${a.phone}</span>
        </div>

        <div class="action-row">
          <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-gps btn-gps-maps">
            🗺️ Google Maps
          </a>
          <a href="${wazeUrl}" target="_blank" rel="noopener noreferrer" class="btn-gps btn-gps-waze">
            🚗 Waze GPS
          </a>
        </div>
      </div>
    `;
  }).join("");

  if (loadMoreBtn) {
    if (itemsToShow.length < list.length) {
      loadMoreBtn.classList.remove("hidden");
      loadMoreBtn.querySelector("button").textContent = `Mostrar más (${list.length - itemsToShow.length} restantes)`;
    } else {
      loadMoreBtn.classList.add("hidden");
    }
  }
}

// ==========================================
// 9. SIMULADOR INTERACTIVO DE APP CHOFERES
// ==========================================
let simScannedCount = 0;
let simHasSignature = false;
let simHasPhoto = false;

function switchPracticeTab(tab) {
  const simBtn = document.getElementById("tabBtnSimulator");
  const guidesBtn = document.getElementById("tabBtnGuides");
  const simTab = document.getElementById("practiceTabSimulator");
  const guidesTab = document.getElementById("practiceTabGuides");

  if (tab === "simulator") {
    simBtn.classList.add("active");
    guidesBtn.classList.remove("active");
    simTab.classList.remove("hidden");
    guidesTab.classList.add("hidden");
  } else {
    guidesBtn.classList.add("active");
    simBtn.classList.remove("active");
    guidesTab.classList.remove("hidden");
    simTab.classList.add("hidden");
  }
}

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const clockEl = document.getElementById("phoneClock");
  if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
}

function simGoToStep(stepNumber) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`simStep${i}`);
    if (el) el.classList.add("hidden");
  }
  const currentStep = document.getElementById(`simStep${stepNumber}`);
  if (currentStep) currentStep.classList.remove("hidden");

  if (stepNumber === 1) {
    simScannedCount = 0;
    simHasSignature = false;
    simHasPhoto = false;
  } else if (stepNumber === 2) {
    updateScanStatusUI();
  } else if (stepNumber === 3) {
    setTimeout(() => resizeCanvas(simCanvas, simCtx), 30);
  }
}

function simTriggerScan() {
  if (simScannedCount < 3) {
    simScannedCount++;
    playScannerBeep();
    updateScanStatusUI();
  }
}

function playScannerBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1760, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
}

function updateScanStatusUI() {
  const statusEl = document.getElementById("simScanStatus");
  const toDeliverBtn = document.getElementById("simBtnToDeliver");
  const scanBtn = document.getElementById("simBtnScan");

  if (simScannedCount >= 3) {
    statusEl.innerHTML = `<span style="color:#34d399; font-weight:800;">✔ 3/3 Bultos Validados OK</span>`;
    toDeliverBtn.removeAttribute("disabled");
    toDeliverBtn.style.opacity = "1";
    toDeliverBtn.style.cursor = "pointer";
    scanBtn.textContent = "Escaneo Completado (3/3)";
  } else {
    statusEl.textContent = `Bulto ${simScannedCount + 1}/3: Esperando lectura QR...`;
    toDeliverBtn.setAttribute("disabled", "true");
    toDeliverBtn.style.opacity = "0.45";
    toDeliverBtn.style.cursor = "not-allowed";
    scanBtn.textContent = `Escanear Bulto (${simScannedCount}/3)`;
  }
}

function simTakePhoto() {
  simHasPhoto = true;
  const photoBox = document.getElementById("simPhotoBox");
  if (photoBox) {
    photoBox.innerHTML = `<span style="color:#059669; font-weight:800;">✔ Foto de fachada y guía capturada</span>`;
    photoBox.style.background = "#ecfdf5";
    photoBox.style.borderColor = "#6ee7b7";
  }
  showToast("📷 Evidencia fotográfica registrada");
}

function simCompleteDelivery() {
  if (!simHasSignature && !isCanvasDrawn(simCanvas)) {
    showToast("✍️ Solicita la firma del cliente en la pantalla");
    return;
  }

  const now = new Date();
  document.getElementById("simSummaryTime").textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  simGoToStep(4);
  showToast("✔ Entrega liquidada en simulador");
}

function simTriggerRejection() {
  showToast("Incidencia reportada al Monitor de Ruta");
  simGoToStep(1);
}

// ==========================================
// 10. CANVAS DE FIRMA DIGITAL (60 FPS TOUCH)
// ==========================================
let simCanvas, simCtx, evalCanvas, evalCtx;
let drawing = false;

function setupSignatureCanvases() {
  simCanvas = document.getElementById("simCanvasSignature");
  if (simCanvas) {
    simCtx = simCanvas.getContext("2d");
    attachCanvasEvents(simCanvas, simCtx);
  }

  evalCanvas = document.getElementById("evalCanvasSignature");
  if (evalCanvas) {
    evalCtx = evalCanvas.getContext("2d");
    attachCanvasEvents(evalCanvas, evalCtx);
  }
}

function resizeCanvas(canvas, ctx) {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0f172a";
  }
}

function attachCanvasEvents(canvas, ctx) {
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw() {
    if (drawing) {
      drawing = false;
      ctx.closePath();
    }
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  canvas.addEventListener("touchend", stopDraw);
}

function isCanvasDrawn(canvas) {
  if (!canvas) return false;
  const ctx = canvas.getContext("2d");
  const pixelBuffer = new Uint32Array(
    ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return pixelBuffer.some((color) => color !== 0);
}

function simClearSignature() {
  if (simCtx && simCanvas) {
    simCtx.clearRect(0, 0, simCanvas.width, simCanvas.height);
    simHasSignature = false;
  }
}

function clearEvalSignature() {
  if (evalCtx && evalCanvas) {
    evalCtx.clearRect(0, 0, evalCanvas.width, evalCanvas.height);
  }
}

// ==========================================
// 11. CONTROL DE COMBUSTIBLE & POST-RUTA
// ==========================================
function calculateKmDiff() {
  const start = parseFloat(document.getElementById("evalKmStart")?.value) || 0;
  const end = parseFloat(document.getElementById("evalKmEnd")?.value) || 0;
  const total = end >= start && start > 0 ? (end - start).toFixed(1) : "0";
  const totalEl = document.getElementById("evalKmTotal");
  if (totalEl) totalEl.value = `${total} KM`;
}

function calculateDeliveryRatio() {
  const sched = parseInt(document.getElementById("evalOrdersScheduled")?.value) || 0;
  const comp = parseInt(document.getElementById("evalOrdersCompleted")?.value) || 0;

  if (sched > 0) {
    const pct = ((comp / sched) * 100).toFixed(1);
    const pctEl = document.getElementById("evalEfficiencyPercent");
    if (pctEl) pctEl.value = `${pct}%`;
  }
}

function savePostRouteEvaluation(e) {
  e.preventDefault();
  const driver = document.getElementById("evalDriverName").value;
  const plate = document.getElementById("evalTruckPlate").value.toUpperCase();
  const cd = document.getElementById("evalReturnCd").value;
  const kmTotal = document.getElementById("evalKmTotal").value;
  const fuel = document.querySelector('input[name="fuelLevel"]:checked')?.value || "3/4";
  const scheduled = document.getElementById("evalOrdersScheduled").value;
  const completed = document.getElementById("evalOrdersCompleted").value;
  const efficiency = document.getElementById("evalEfficiencyPercent").value;
  const incidents = document.getElementById("evalIncidents").value.trim() || "Unidad conforme en garita";

  const evalRecord = {
    id: Date.now(),
    date: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
    driver,
    plate,
    cd,
    kmTotal,
    fuel,
    scheduled,
    completed,
    efficiency,
    incidents
  };

  AppState.evaluations.unshift(evalRecord);
  try {
    localStorage.setItem("antigravity_choferes_evals", JSON.stringify(AppState.evaluations));
  } catch (err) {}

  renderEvaluationHistory();
  clearEvalSignature();
  showToast(`✔ Control guardado para unidad ${plate}`);
}

function loadSavedEvaluations() {
  try {
    const raw = localStorage.getItem("antigravity_choferes_evals");
    if (raw) {
      AppState.evaluations = JSON.parse(raw);
    } else {
      AppState.evaluations = [
        {
          id: 1,
          date: "Hoy 17:15",
          driver: "Diego Lizarbe",
          plate: "B7A-892",
          cd: "CD Mosquera",
          kmTotal: "115.0 KM",
          fuel: "3/4",
          completed: "17",
          scheduled: "18",
          efficiency: "94.4%",
          incidents: "Retorno sin novedades a garita Mosquera."
        }
      ];
    }
  } catch (err) {
    AppState.evaluations = [];
  }
}

function renderEvaluationHistory() {
  const container = document.getElementById("evalHistoryContainer");
  if (!container) return;

  container.innerHTML = AppState.evaluations.map((ev) => `
    <div class="fast-card">
      <div class="flex justify-between items-center mb-1">
        <span style="font-size:0.84rem; font-weight:800; color:#0f172a;">🚛 ${ev.plate} • ${ev.cd}</span>
        <span style="font-size:0.72rem; color:#64748b;">${ev.date}</span>
      </div>
      <div style="font-size:0.76rem; color:#475569;">
        ⛽ Combustible: <strong>${ev.fuel}</strong> • 🛣️ <strong>${ev.kmTotal}</strong> • 📦 <strong>${ev.completed}/${ev.scheduled} (${ev.efficiency})</strong>
      </div>
      <div style="font-size:0.74rem; color:#64748b; margin-top:4px; font-style:italic;">
        "${ev.incidents}"
      </div>
    </div>
  `).join("");
}

function shareEvalByWhatsApp() {
  const driver = document.getElementById("evalDriverName").value || AppState.activeDriver.name;
  const plate = document.getElementById("evalTruckPlate").value || "B7A-892";
  const cd = document.getElementById("evalReturnCd").value;
  const kmTotal = document.getElementById("evalKmTotal").value;
  const fuel = document.querySelector('input[name="fuelLevel"]:checked')?.value || "3/4";
  const comp = document.getElementById("evalOrdersCompleted").value;
  const sched = document.getElementById("evalOrdersScheduled").value;
  const eff = document.getElementById("evalEfficiencyPercent").value;
  const incidents = document.getElementById("evalIncidents").value || "Sin observaciones";

  const message = `*REPORTE CONTROL POST-RUTA SHALOM* 🚛
👤 *Conductor:* ${driver}
🏷️ *Placa:* ${plate} (${cd})
🛣️ *Recorrido:* ${kmTotal}
⛽ *Combustible:* ${fuel} Tanque
📦 *Entregas:* ${comp}/${sched} (${eff})
📝 *Detalle:* ${incidents}`;

  window.open(`https://wa.me/51987654321?text=${encodeURIComponent(message)}`, "_blank");
}
