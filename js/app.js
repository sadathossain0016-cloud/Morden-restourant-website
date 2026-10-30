/* ========================================================
   L'Étoile Bistro - Modern Fine Dining Interactive Engine
   ======================================================== */

// --- MENU DATASET ---
const MENU_ITEMS = [
  {
    id: "tagliatelle",
    name: "Hand-Crafted Truffle Tagliatelle",
    category: "mains",
    tags: ["signature", "vegetarian"],
    price: 38,
    image: "images/tagliatelle.png",
    course: "House-Rolled Pasta",
    origin: "Umbria, Italy & Normandy",
    pairing: "2020 Meursault Blanc",
    sommelierNote: "The creamy emulsion and earthy truffles find an exact counterpoint in the hazelnut richness and vibrant acidity of Meursault.",
    description: "Fresh heritage egg dough ribbons extruded daily and folded with shaved Umbrian black winter truffles, cultured Isigny butter, and 24-month Parmigiano-Reggiano emulsion.",
    allergens: "Contains Gluten, Dairy, Eggs."
  },
  {
    id: "duck-breast",
    name: "Crispy Skin Magret Duck Breast",
    category: "mains",
    tags: ["signature", "gluten-free"],
    price: 46,
    image: "images/duck-breast.png",
    course: "Land & Orchard",
    origin: "Sonoma County Heritage Farm",
    pairing: "2018 Vosne-Romanée",
    sommelierNote: "The gamey savor of dry-aged magret duck and sweet pomegranate glaze is elevated by the silken tannins and dark cherry notes of Côte de Nuits Pinot Noir.",
    description: "Dry-aged duck breast pan-seared to medium-rare, glazed in spiced pomegranate jus, accompanied by honey-caramelized baby parsnips and velvet parmentier purée with wild sorrel.",
    allergens: "Gluten-Free. Contains Dairy."
  },
  {
    id: "cocktail-oldfashioned",
    name: "Smoked Bergamot Old Fashioned",
    category: "cocktails",
    tags: ["signature"],
    price: 22,
    image: "images/cocktail.png",
    course: "Apothecary Mixology",
    origin: "Kentucky Rye & Calabria",
    pairing: "Enjoy as Apertif or Digestif",
    sommelierNote: "Torched rosemary delivers aromatic woodsmoke before opening up to caramel oak and bright Mediterranean bergamot citrus.",
    description: "Small-batch rye whiskey infused with torch-charred rosemary, amber bitters, torched blood orange crisp, and hand-carved crystal ice diamond.",
    allergens: "Gluten-Free, Vegan."
  },
  {
    id: "souffle",
    name: "Valrhona Grand Cru Soufflé",
    category: "desserts",
    tags: ["signature", "vegetarian"],
    price: 19,
    image: "images/chocolate-souffle.png",
    course: "Pâtisserie",
    origin: "Tain-l'Hermitage & Tahiti",
    pairing: "20 Year Tawny Port",
    sommelierNote: "Rich dried figs, toasted walnuts, and aged spirit from Portugal provide warm depth against the bittersweet molten chocolate.",
    description: "70% Guanaja dark chocolate molten heart baked à la minute, served with warm Tahitian bourbon vanilla bean crème anglaise and fleur de sel caramel crunch.",
    allergens: "Contains Dairy, Eggs, Gluten."
  },
  {
    id: "scallops",
    name: "Pan-Seared Hokkaido Scallops",
    category: "starters",
    tags: ["signature", "gluten-free"],
    price: 34,
    image: "images/duck-breast.png", // fallback culinary asset
    course: "Coastal & Sea",
    origin: "Hokkaido, Japan & Pacific Coast",
    pairing: "2021 Chablis Premier Cru",
    sommelierNote: "Flinty minerality and saline crispness cut through the luxurious brown butter hazelnut emulsion.",
    description: "Caramelized U-10 sea scallops resting on a bed of roasted sunchoke velouté, brown butter hazelnut caper glaze, sea beans, and Meyer lemon pearls.",
    allergens: "Contains Shellfish, Tree Nuts (Hazelnuts), Dairy."
  },
  {
    id: "escargots",
    name: "Wild Burgundy Escargots en Croûte",
    category: "starters",
    tags: ["signature"],
    price: 26,
    image: "images/tagliatelle.png", // fallback culinary asset
    course: "Heritage French",
    origin: "Burgundy, France",
    pairing: "2022 Pouilly-Fuissé",
    sommelierNote: "Bright green apple and limestone tension harmonize with rich parsley and garlic herb clarified butter.",
    description: "Plump wild Burgundy snails simmered in clarified garlic-herb butter and Pernod reduction, crowned with an airy puff pastry dome and micro chervil.",
    allergens: "Contains Mollusks, Gluten, Dairy."
  },
  {
    id: "cotedeboeuf",
    name: "Côte de Boeuf for Two",
    category: "mains",
    tags: ["signature", "gluten-free"],
    price: 115,
    image: "images/duck-breast.png", // fallback culinary asset
    course: "Charcoal Hearth",
    origin: "Snake River Farms",
    pairing: "2017 Château Margaux",
    sommelierNote: "Stately cedar, graphite, and concentrated cassis frame this magnificent marbled cut.",
    description: "32oz bone-in prime ribeye grilled over white oak embers, served with roasted bone marrow bordelaise, truffle pommes frites, and charred shallot compote.",
    allergens: "Gluten-Free. Contains Dairy."
  },
  {
    id: "cremebrulee",
    name: "Lavender Honey Crème Brûlée",
    category: "desserts",
    tags: ["vegetarian", "gluten-free"],
    price: 18,
    image: "images/chocolate-souffle.png", // fallback culinary asset
    course: "Pâtisserie",
    origin: "Provence Lavender & Sonoma Honey",
    pairing: "2018 Château d'Yquem Sauternes",
    sommelierNote: "Honeyed apricot and honeysuckle notes echo the floral botanicals of organic Provencal lavender.",
    description: "Rich custard infused with organic Provence lavender blossoms and wild wildflower honey, finished with a glass-like caramelized sugar crust and macerated blackberries.",
    allergens: "Contains Dairy, Eggs. Gluten-Free."
  }
];

// --- APP STATE ---
let currentCategory = 'all';
let currentTag = 'all';
let tastingWishlist = JSON.parse(localStorage.getItem('letoile_wishlist') || '[]');
let savedReservations = JSON.parse(localStorage.getItem('letoile_reservations') || '[]');
let userReviews = JSON.parse(localStorage.getItem('letoile_user_reviews') || '[]');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  updateLiveHoursStatus();
  initDatePicker();
  renderMenu();
  updateWishlistUI();
  updateReservationsBadge();
  initScrollSpy();
  renderUserReviews();
});

// --- OPERATING HOURS STATUS ---
function updateLiveHoursStatus() {
  const statusEl = document.getElementById('live-status-pill');
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTimeVal = hour + minute / 60;

  // Schedule:
  // Mon: Closed for Mise en Place
  // Tue-Fri: 17:30 - 23:00
  // Sat-Sun: 10:30 - 14:30 (Brunch), 17:30 - 23:00 (Dinner)

  if (day === 1) {
    statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-outline"></span> Closed Today • Mise en Place`;
    statusEl.className = "hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider";
    return;
  }

  let isOpen = false;
  let statusText = "Open Today 17:30 – 23:00";

  if (day === 0 || day === 6) {
    // Weekend
    if (currentTimeVal >= 10.5 && currentTimeVal < 14.5) {
      isOpen = true;
      statusText = "Open Now • Weekend Brunch";
    } else if (currentTimeVal >= 17.5 && currentTimeVal < 23) {
      isOpen = true;
      statusText = "Open Now • Dinner Service";
    } else if (currentTimeVal < 10.5) {
      statusText = "Opens 10:30 • Weekend Brunch";
    } else {
      statusText = "Opens 17:30 • Dinner Service";
    }
  } else {
    // Weekday (Tue - Fri)
    if (currentTimeVal >= 17.5 && currentTimeVal < 23) {
      isOpen = true;
      statusText = "Open Now • Dinner Service";
    } else {
      statusText = "Open Today 17:30 – 23:00";
    }
  }

  if (isOpen) {
    statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-green-500 pulse-indicator"></span> ${statusText}`;
    statusEl.className = "hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-950/20 text-emerald-700 font-label-sm text-label-sm uppercase tracking-wider border border-emerald-600/30";
  } else {
    statusEl.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-culinary-gold-muted"></span> ${statusText}`;
    statusEl.className = "hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-terracotta-soft text-terracotta-rich font-label-sm text-label-sm uppercase tracking-wider";
  }
}

// --- DATE PICKER INITIALIZATION ---
function initDatePicker() {
  const dateInput = document.getElementById('reservation-date');
  if (!dateInput) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  dateInput.min = todayStr;
  if (!dateInput.value) {
    dateInput.value = todayStr;
  }
}

// --- MENU RENDERING & FILTERING ---
function renderMenu() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  const searchQuery = (document.getElementById('menu-search')?.value || '').toLowerCase().trim();

  const filtered = MENU_ITEMS.filter(item => {
    // Category match
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    // Tag match
    const matchesTag = currentTag === 'all' || item.tags.includes(currentTag);
    // Search match
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.course.toLowerCase().includes(searchQuery) ||
      item.pairing.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesTag && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center flex flex-col items-center justify-center">
        <span class="material-symbols-outlined text-[48px] text-outline mb-2">restaurant_menu</span>
        <h4 class="font-headline-md text-headline-md text-on-surface">No culinary selections match your criteria</h4>
        <p class="font-body-md text-body-md text-on-surface-variant max-w-md mt-1">Please try choosing another category or clearing your search keywords.</p>
        <button onclick="resetMenuFilters()" class="mt-4 px-6 py-2 rounded-lg bg-culinary-gold-muted text-charcoal-pure font-label-md text-label-md uppercase tracking-wider hover:bg-culinary-gold-bright transition-colors">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isWishlisted = tastingWishlist.some(w => w.id === item.id);
    const tagBadge = item.tags.includes('signature')
      ? `<span class="px-2.5 py-1 rounded bg-terracotta-soft text-terracotta-rich font-label-sm text-label-sm uppercase tracking-wider font-semibold">Chef's Signature</span>`
      : item.tags.includes('vegetarian')
      ? `<span class="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">Vegetarian</span>`
      : `<span class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold">Seasonal</span>`;

    return `
      <div class="menu-card flex flex-col rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-hairline-subtle">
        <div class="relative h-64 overflow-hidden bg-surface-container cursor-pointer" onclick="openDishModal('${item.id}')">
          <img alt="${item.name}" class="dish-card-img w-full h-full object-cover" src="${item.image}"/>
          <div class="absolute top-3 left-3 flex flex-wrap gap-1">
            ${tagBadge}
          </div>
          <span class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-charcoal-pure/85 backdrop-blur-md text-culinary-gold-bright font-headline-sm text-headline-sm">$${item.price}</span>
        </div>
        <div class="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
          <div class="flex flex-col gap-space-xs">
            <div class="flex items-center justify-between">
              <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">${item.course}</span>
              <span class="font-label-sm text-label-sm text-outline">${item.tags.includes('gluten-free') ? 'Gluten-Free' : item.tags.includes('vegetarian') ? 'Vegetarian' : 'Epicurean'}</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors cursor-pointer" onclick="openDishModal('${item.id}')">
              ${item.name}
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
              ${item.description}
            </p>
          </div>
          <div class="pt-space-xs flex flex-col gap-2 border-t border-hairline-subtle">
            <div class="flex items-center justify-between text-outline text-[13px]">
              <span class="font-body-sm text-body-sm italic truncate mr-2">Pairing: ${item.pairing}</span>
              <span class="material-symbols-outlined text-[18px] text-culinary-gold-muted shrink-0">wine_bar</span>
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button onclick="openDishModal('${item.id}')" class="flex-1 py-2 px-3 rounded text-center bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider text-on-surface transition-colors">
                Details & Origin
              </button>
              <button onclick="toggleWishlistItem('${item.id}')" class="p-2 rounded bg-surface-container-low hover:bg-culinary-gold-muted/20 text-culinary-gold-muted transition-colors ${isWishlisted ? 'text-terracotta-rich bg-terracotta-soft/30' : ''}" title="${isWishlisted ? 'Remove from Tasting Wishlist' : 'Add to Tasting Wishlist'}">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' ${isWishlisted ? 1 : 0};">bookmark</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterMenu(category, btn) {
  currentCategory = category;
  const tabs = document.querySelectorAll('.menu-tab-btn');
  tabs.forEach(t => {
    t.classList.remove('bg-primary', 'text-on-primary');
    t.classList.add('text-on-surface-variant');
  });
  if (btn) {
    btn.classList.add('bg-primary', 'text-on-primary');
    btn.classList.remove('text-on-surface-variant');
  }
  renderMenu();
}

function filterByTag(tag, btn) {
  currentTag = tag;
  const tagBtns = document.querySelectorAll('.tag-filter-btn');
  tagBtns.forEach(b => {
    b.classList.remove('bg-secondary', 'text-white');
    b.classList.add('bg-surface-container', 'text-on-surface-variant');
  });
  if (btn) {
    btn.classList.add('bg-secondary', 'text-white');
    btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
  }
  renderMenu();
}

function resetMenuFilters() {
  currentCategory = 'all';
  currentTag = 'all';
  const searchInput = document.getElementById('menu-search');
  if (searchInput) searchInput.value = '';

  const firstTab = document.querySelector('.menu-tab-btn');
  if (firstTab) filterMenu('all', firstTab);

  const firstTag = document.querySelector('.tag-filter-btn');
  if (firstTag) filterByTag('all', firstTag);

  renderMenu();
}

// --- DISH DETAILS MODAL ---
function openDishModal(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  const modal = document.getElementById('dish-modal');
  const body = document.getElementById('dish-modal-body');
  if (!modal || !body) return;

  const isWishlisted = tastingWishlist.some(w => w.id === dish.id);

  body.innerHTML = `
    <div class="relative w-full h-72 sm:h-96 overflow-hidden rounded-t-2xl bg-charcoal-pure">
      <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover"/>
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-pure via-transparent to-transparent"></div>
      <button onclick="closeModal('dish-modal')" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal-pure/70 backdrop-blur-md text-parchment-cream hover:bg-charcoal-pure flex items-center justify-center transition-colors">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
      <div class="absolute bottom-4 left-6 right-6 flex items-end justify-between">
        <div>
          <span class="px-2.5 py-1 rounded bg-culinary-gold-bright text-charcoal-pure font-label-sm text-label-sm uppercase tracking-wider font-semibold">${dish.course}</span>
          <h2 class="font-display-lg text-2xl sm:text-3xl text-parchment-cream mt-2 leading-tight">${dish.name}</h2>
        </div>
        <span class="font-headline-lg text-2xl sm:text-3xl text-culinary-gold-bright">$${dish.price}</span>
      </div>
    </div>
    <div class="p-6 sm:p-8 flex flex-col gap-6 bg-surface">
      <div>
        <h4 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-1">Culinary Composition</h4>
        <p class="font-body-lg text-body-lg text-on-surface leading-relaxed">${dish.description}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container-low border border-hairline-subtle">
        <div>
          <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Provenance & Terroir</span>
          <p class="font-headline-sm text-[16px] text-on-surface flex items-center gap-1.5">
            <span class="material-symbols-outlined text-secondary text-[18px]">nature</span>
            ${dish.origin}
          </p>
        </div>
        <div>
          <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1">Dietary Guidance</span>
          <p class="font-headline-sm text-[16px] text-on-surface flex items-center gap-1.5">
            <span class="material-symbols-outlined text-terracotta-rich text-[18px]">info</span>
            ${dish.allergens}
          </p>
        </div>
      </div>

      <div class="p-5 rounded-xl bg-charcoal-pure text-parchment-cream border border-gold-hairline">
        <div class="flex items-center gap-2 mb-2 text-culinary-gold-bright">
          <span class="material-symbols-outlined text-[20px]">wine_bar</span>
          <h4 class="font-headline-sm text-headline-sm">Head Sommelier Pairing Note</h4>
        </div>
        <p class="font-headline-sm text-[15px] italic text-culinary-gold-muted mb-1.5">${dish.pairing}</p>
        <p class="font-body-sm text-body-sm text-surface-variant leading-relaxed">${dish.sommelierNote}</p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button onclick="toggleWishlistItem('${dish.id}'); closeModal('dish-modal');" class="flex-1 py-3 px-6 rounded-lg ${isWishlisted ? 'bg-terracotta-soft text-terracotta-rich' : 'bg-primary text-on-primary'} font-label-lg text-label-lg uppercase tracking-wider hover:bg-charcoal-elevated transition-colors flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[20px]">${isWishlisted ? 'bookmark_remove' : 'bookmark_add'}</span>
          <span>${isWishlisted ? 'Remove from Tasting Wishlist' : 'Add to Tasting Wishlist'}</span>
        </button>
        <a href="#reservation" onclick="closeModal('dish-modal');" class="py-3 px-6 rounded-lg bg-culinary-gold-muted text-charcoal-pure font-label-lg text-label-lg uppercase tracking-wider hover:bg-culinary-gold-bright transition-colors">
          Book Table
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// --- TASTING WISHLIST MANAGEMENT ---
function toggleWishlistItem(dishId) {
  const dish = MENU_ITEMS.find(d => d.id === dishId);
  if (!dish) return;

  const existingIndex = tastingWishlist.findIndex(w => w.id === dishId);
  if (existingIndex > -1) {
    tastingWishlist.splice(existingIndex, 1);
    showToast(`Removed "${dish.name}" from your tasting wishlist`, 'info');
  } else {
    tastingWishlist.push(dish);
    showToast(`Added "${dish.name}" to your tasting wishlist!`, 'success');
  }

  localStorage.setItem('letoile_wishlist', JSON.stringify(tastingWishlist));
  updateWishlistUI();
  renderMenu();
}

function updateWishlistUI() {
  const countEls = document.querySelectorAll('.wishlist-counter');
  countEls.forEach(el => {
    el.textContent = tastingWishlist.length;
    el.style.display = tastingWishlist.length > 0 ? 'inline-flex' : 'none';
  });

  const listContainer = document.getElementById('wishlist-items-container');
  const totalContainer = document.getElementById('wishlist-total-price');

  if (listContainer) {
    if (tastingWishlist.length === 0) {
      listContainer.innerHTML = `
        <div class="py-12 text-center text-on-surface-variant flex flex-col items-center">
          <span class="material-symbols-outlined text-[44px] text-outline mb-2">dinner_dining</span>
          <p class="font-headline-sm text-headline-sm text-on-surface">Your tasting list is currently empty</p>
          <p class="font-body-sm text-body-sm max-w-xs mt-1">Browse our Specialties Menu to bookmark your personal courses for the evening.</p>
        </div>
      `;
    } else {
      listContainer.innerHTML = tastingWishlist.map(item => `
        <div class="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 border border-hairline-subtle">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover shrink-0"/>
          <div class="flex-1 min-w-0">
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">${item.course}</span>
            <h4 class="font-headline-sm text-[15px] text-on-surface truncate">${item.name}</h4>
            <span class="font-body-sm text-body-sm text-culinary-gold-muted font-semibold">$${item.price}</span>
          </div>
          <button onclick="toggleWishlistItem('${item.id}')" class="text-outline hover:text-terracotta-rich p-1.5 transition-colors" title="Remove">
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      `).join('');
    }
  }

  if (totalContainer) {
    const total = tastingWishlist.reduce((sum, item) => sum + item.price, 0);
    totalContainer.textContent = `$${total}`;
  }
}

function toggleWishlistDrawer(show) {
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('wishlist-backdrop');
  if (!drawer) return;

  const isOpen = show !== undefined ? show : !drawer.classList.contains('active');
  if (isOpen) {
    drawer.classList.add('active');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function attachWishlistToReservation() {
  if (tastingWishlist.length === 0) {
    showToast("Your tasting list is empty. Add a few dishes first!", "info");
    return;
  }

  const notesInput = document.getElementById('reservation-notes');
  if (notesInput) {
    const itemNames = tastingWishlist.map(i => i.name).join(', ');
    const notePrefix = notesInput.value ? notesInput.value + " | " : "";
    notesInput.value = `${notePrefix}Pre-selected Tasting Wishlist: ${itemNames}`;
    toggleWishlistDrawer(false);
    showToast("Tasting courses attached to your reservation notes!", "success");

    // Smooth scroll to reservation
    const resSection = document.getElementById('reservation');
    resSection?.scrollIntoView({ behavior: 'smooth' });
  }
}

function clearWishlist() {
  tastingWishlist = [];
  localStorage.removeItem('letoile_wishlist');
  updateWishlistUI();
  renderMenu();
  showToast("Tasting wishlist cleared", "info");
}

// --- TABLE RESERVATION SYSTEM ---
let selectedTimeSlot = "17:30 Service";
let currentGuests = 2;

function adjustGuests(delta) {
  currentGuests = Math.max(1, Math.min(12, currentGuests + delta));
  const display = document.getElementById('guest-count-display');
  if (display) display.textContent = currentGuests;

  const warningEl = document.getElementById('large-party-notice');
  if (warningEl) {
    if (currentGuests >= 8) {
      warningEl.classList.remove('hidden');
    } else {
      warningEl.classList.add('hidden');
    }
  }
}

function selectTime(button) {
  const slotButtons = document.querySelectorAll('.time-slot-btn');
  slotButtons.forEach(btn => {
    btn.classList.remove('bg-culinary-gold-muted', 'text-charcoal-pure');
    btn.classList.add('bg-charcoal-pure', 'text-parchment-cream');
  });
  button.classList.add('bg-culinary-gold-muted', 'text-charcoal-pure');
  button.classList.remove('bg-charcoal-pure', 'text-parchment-cream');
  selectedTimeSlot = button.dataset.time || button.textContent.trim();
}

function bookChefCounter() {
  const ambienceSelect = document.getElementById('reservation-ambience');
  if (ambienceSelect) {
    ambienceSelect.value = "counter";
  }
  const resSection = document.getElementById('reservation');
  resSection?.scrollIntoView({ behavior: 'smooth' });
  showToast("Selected Chef's Open Counter (L'Atelier) in reservation", "info");
}

function submitReservation(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('guest-name');
  const phoneInput = document.getElementById('guest-phone');
  const emailInput = document.getElementById('guest-email');
  const dateInput = document.getElementById('reservation-date');
  const ambienceInput = document.getElementById('reservation-ambience');
  const notesInput = document.getElementById('reservation-notes');

  const name = nameInput?.value.trim();
  const phone = phoneInput?.value.trim();
  const email = emailInput?.value.trim();
  const date = dateInput?.value || new Date().toISOString().split('T')[0];
  const ambience = ambienceInput?.options[ambienceInput.selectedIndex]?.text || "Main Dining Salon";
  const notes = notesInput?.value.trim() || "No specific dietary restrictions requested.";

  if (!name || name.length < 2) {
    showToast("Please enter your full name for the booking reservation.", "error");
    nameInput?.focus();
    return;
  }
  if (!phone || phone.length < 7) {
    showToast("Please provide a contact phone number for SMS confirmation.", "error");
    phoneInput?.focus();
    return;
  }
  if (!email || !email.includes('@')) {
    showToast("Please provide a valid email address for confirmation receipt.", "error");
    emailInput?.focus();
    return;
  }

  // Generate Booking Reference
  const bookingCode = `ETOILE-${Math.floor(1000 + Math.random() * 9000)}`;

  const booking = {
    id: bookingCode,
    name,
    phone,
    email,
    date,
    time: selectedTimeSlot,
    guests: currentGuests,
    ambience,
    notes,
    createdAt: new Date().toISOString()
  };

  savedReservations.unshift(booking);
  localStorage.setItem('letoile_reservations', JSON.stringify(savedReservations));
  updateReservationsBadge();

  // Show Confirmation Receipt Modal
  openConfirmationModal(booking);

  // Clear inputs
  if (nameInput) nameInput.value = '';
  if (phoneInput) phoneInput.value = '';
  if (emailInput) emailInput.value = '';
  if (notesInput) notesInput.value = '';

  showToast(`Table confirmed! Reference: ${bookingCode}`, 'success');
}

function openConfirmationModal(booking) {
  const modal = document.getElementById('confirmation-modal');
  const body = document.getElementById('confirmation-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="p-8 bg-charcoal-pure text-parchment-cream rounded-2xl border border-gold-hairline shadow-2xl flex flex-col gap-6">
      <div class="text-center flex flex-col items-center">
        <div class="w-16 h-16 rounded-full bg-culinary-gold-muted/20 text-culinary-gold-bright flex items-center justify-center mb-3">
          <span class="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <span class="font-label-sm text-label-sm uppercase tracking-widest text-culinary-gold-muted">Gastronomic Experience Confirmed</span>
        <h2 class="font-display-lg text-3xl text-parchment-cream mt-1">We Await Your Arrival, ${booking.name}</h2>
        <div class="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-elevated border border-gold-hairline text-culinary-gold-bright font-mono text-sm tracking-wider">
          <span>Confirmation:</span>
          <strong>${booking.id}</strong>
        </div>
      </div>

      <!-- Receipt Card -->
      <div class="p-6 rounded-xl bg-charcoal-elevated border border-hairline-dark flex flex-col gap-4 text-sm">
        <div class="grid grid-cols-2 gap-4 pb-4 border-b border-hairline-dark">
          <div>
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block">Date & Time</span>
            <span class="font-headline-sm text-[16px] text-parchment-cream">${booking.date} at ${booking.time}</span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block">Party Size</span>
            <span class="font-headline-sm text-[16px] text-parchment-cream">${booking.guests} Guests</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 pb-4 border-b border-hairline-dark">
          <div>
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block">Dining Ambience</span>
            <span class="font-headline-sm text-[16px] text-parchment-cream">${booking.ambience}</span>
          </div>
          <div>
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block">Direct Contact</span>
            <span class="font-body-sm text-body-sm text-parchment-cream">${booking.phone}</span>
          </div>
        </div>

        <div>
          <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant block">Special Requests</span>
          <p class="font-body-sm text-body-sm text-surface-variant italic mt-0.5">${booking.notes}</p>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-culinary-gold-muted/10 border border-gold-hairline flex items-start gap-3">
        <span class="material-symbols-outlined text-culinary-gold-bright text-[20px] shrink-0 mt-0.5">location_on</span>
        <div class="text-xs text-surface-variant leading-relaxed">
          <strong class="text-parchment-cream">L'Étoile Bistro</strong> • 428 Rue de la Paix, Presidio Heights, San Francisco, CA.<br/>
          Complimentary valet is stationed at our main entrance from 17:00 nightly.
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button onclick="downloadCalendarEvent('${booking.id}')" class="w-full sm:flex-1 py-3 px-4 rounded-lg bg-culinary-gold-muted text-charcoal-pure font-label-md text-label-md uppercase tracking-wider hover:bg-culinary-gold-bright transition-colors flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[18px]">calendar_add_on</span>
          <span>Add to Calendar</span>
        </button>
        <button onclick="window.print()" class="w-full sm:flex-1 py-3 px-4 rounded-lg bg-charcoal-elevated text-parchment-cream border border-gold-hairline font-label-md text-label-md uppercase tracking-wider hover:bg-surface-variant/20 transition-colors flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[18px]">print</span>
          <span>Print Receipt</span>
        </button>
        <button onclick="closeModal('confirmation-modal')" class="w-full sm:w-auto py-3 px-5 rounded-lg bg-surface-container-highest/20 text-parchment-cream font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-highest/40 transition-colors">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateReservationsBadge() {
  const badge = document.getElementById('my-bookings-btn');
  if (badge) {
    if (savedReservations.length > 0) {
      badge.classList.remove('hidden');
      badge.querySelector('.booking-count').textContent = savedReservations.length;
    } else {
      badge.classList.add('hidden');
    }
  }
}

function openMyBookingsModal() {
  const modal = document.getElementById('my-bookings-modal');
  const body = document.getElementById('my-bookings-body');
  if (!modal || !body) return;

  if (savedReservations.length === 0) {
    body.innerHTML = `
      <div class="py-12 text-center text-on-surface-variant">
        <span class="material-symbols-outlined text-[44px] text-outline mb-2">calendar_month</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">No Active Reservations</h3>
        <p class="font-body-sm text-body-sm mt-1">You have no upcoming table bookings stored.</p>
      </div>
    `;
  } else {
    body.innerHTML = savedReservations.map(booking => `
      <div class="p-5 rounded-xl bg-surface-container-low border border-hairline-subtle flex flex-col gap-3">
        <div class="flex items-start justify-between">
          <div>
            <span class="font-mono text-xs text-secondary font-bold tracking-wider">${booking.id}</span>
            <h4 class="font-headline-sm text-headline-sm text-on-surface">${booking.ambience}</h4>
            <span class="font-body-sm text-body-sm text-on-surface-variant">${booking.date} at ${booking.time} • ${booking.guests} Guests</span>
          </div>
          <button onclick="cancelReservation('${booking.id}')" class="px-3 py-1.5 rounded text-xs font-label-sm uppercase tracking-wider text-terracotta-rich bg-terracotta-soft/40 hover:bg-terracotta-soft transition-colors">
            Cancel Booking
          </button>
        </div>
        <div class="text-xs text-outline flex items-center justify-between pt-2 border-t border-hairline-subtle">
          <span>Guest: ${booking.name} (${booking.phone})</span>
          <button onclick="downloadCalendarEvent('${booking.id}')" class="text-secondary hover:underline flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">calendar_month</span> Add to Calendar
          </button>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cancelReservation(bookingId) {
  if (confirm("Are you sure you wish to cancel this reservation?")) {
    savedReservations = savedReservations.filter(b => b.id !== bookingId);
    localStorage.setItem('letoile_reservations', JSON.stringify(savedReservations));
    updateReservationsBadge();
    openMyBookingsModal();
    showToast("Reservation cancelled successfully.", "info");
  }
}

// iCalendar (.ics) generator for easy calendar integration
function downloadCalendarEvent(bookingId) {
  const booking = savedReservations.find(b => b.id === bookingId);
  if (!booking) return;

  const dateParts = booking.date.split('-');
  const timeMatch = booking.time.match(/(\d+):(\d+)/);
  const hour = timeMatch ? timeMatch[1] : "18";
  const minute = timeMatch ? timeMatch[2] : "00";

  const dtStart = `${dateParts[0]}${dateParts[1]}${dateParts[2]}T${hour}${minute}00`;
  const dtEnd = `${dateParts[0]}${dateParts[1]}${dateParts[2]}T${parseInt(hour)+2}${minute}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//L\'Étoile Bistro//Dinner Reservation//EN',
    'BEGIN:VEVENT',
    `UID:${booking.id}@letoilebistro.com`,
    `DTSTAMP:${dtStart}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Dinner at L'Étoile Bistro (${booking.guests} Guests)`,
    `DESCRIPTION:Reservation Code: ${booking.id}\\nAmbience: ${booking.ambience}\\nGuest: ${booking.name}\\nPhone: ${booking.phone}`,
    'LOCATION:428 Rue de la Paix, Presidio Heights, San Francisco, CA 94118',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `letoile-reservation-${booking.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Calendar event downloaded (.ics)", "success");
}

// --- SOMMELIER CELLAR PAIRING SELECTOR ---
const PAIRING_PROFILES = {
  seafood: {
    title: "Coastal Catch & Raw Bar",
    wine: "2021 Domaine François Raveneau Chablis Grand Cru",
    notes: "Flint, crushed oyster shell, citrus zest, and electric limestone vitality designed for pan-seared scallops and fresh sea harvests.",
    badge: "Burgundy White"
  },
  poultry: {
    title: "Magret Duck & Roasted Game",
    wine: "2018 Domaine Dujac Vosne-Romanée Premier Cru",
    notes: "Silky ripe black cherries, sous-bois, dried violet florals, and seamless French oak tannins complementing spiced pomegranate reductions.",
    badge: "Burgundy Red"
  },
  truffles: {
    title: "Black Truffle & Heritage Pastas",
    wine: "2019 Domaine des Comtes Lafon Meursault",
    notes: "Decadent toasted brioche, browned butter, baked golden apples, and nutty complexity holding hands with rich Parmigiano emulsions.",
    badge: "Côte de Beaune"
  },
  hearth: {
    title: "Oak-Grilled Côte de Boeuf",
    wine: "2016 Château Pontet-Canet Pauillac Grand Cru",
    notes: "Concentrated cassis, graphite, cigar box, and profound structured minerality that effortlessly slices through dense marbling.",
    badge: "Bordeaux Left Bank"
  }
};

function selectPairingVibe(vibeKey, btn) {
  const vibe = PAIRING_PROFILES[vibeKey];
  if (!vibe) return;

  const buttons = document.querySelectorAll('.pairing-vibe-btn');
  buttons.forEach(b => {
    b.classList.remove('bg-culinary-gold-muted', 'text-charcoal-pure');
    b.classList.add('bg-charcoal-pure', 'text-parchment-cream');
  });
  btn.classList.add('bg-culinary-gold-muted', 'text-charcoal-pure');
  btn.classList.remove('bg-charcoal-pure', 'text-parchment-cream');

  const card = document.getElementById('sommelier-pairing-card');
  if (card) {
    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="px-2.5 py-1 rounded bg-culinary-gold-bright text-charcoal-pure font-label-sm text-label-sm uppercase tracking-wider font-semibold">${vibe.badge}</span>
        <span class="font-label-sm text-label-sm text-culinary-gold-muted uppercase tracking-wider">${vibe.title}</span>
      </div>
      <h3 class="font-headline-md text-headline-md text-parchment-cream mb-2">${vibe.wine}</h3>
      <p class="font-body-md text-body-md text-surface-variant leading-relaxed">${vibe.notes}</p>
      <div class="mt-4 pt-3 border-t border-hairline-dark flex items-center justify-between text-xs text-outline-variant">
        <span>Curated by Head Sommelier Éléonore Laurent</span>
        <span class="material-symbols-outlined text-[18px] text-culinary-gold-bright">verified</span>
      </div>
    `;
  }
}

// --- REVIEWS & ACMAIM SYSTEM ---
function renderUserReviews() {
  const container = document.getElementById('user-reviews-container');
  if (!container) return;

  if (userReviews.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="col-span-full mb-2">
      <h3 class="font-headline-sm text-headline-sm text-secondary">Recent Diners' Impressions</h3>
    </div>
    ${userReviews.map(rev => `
      <div class="p-space-lg rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-hairline-subtle">
        <div class="flex flex-col gap-space-sm">
          <div class="flex items-center justify-between">
            <div class="flex text-culinary-gold-bright">
              ${Array.from({ length: rev.rating }).map(() => `<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>`).join('')}
            </div>
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">${rev.visitType || 'Verified Diner'}</span>
          </div>
          <p class="font-headline-sm text-headline-sm italic text-on-surface">"${rev.comment}"</p>
        </div>
        <div class="pt-space-md mt-space-sm flex items-center gap-space-sm">
          <div class="w-10 h-10 rounded-full bg-culinary-gold-muted/20 flex items-center justify-center font-headline-sm text-secondary">
            ${rev.name.charAt(0).toUpperCase()}
          </div>
          <div class="flex flex-col">
            <span class="font-label-md text-label-md text-on-surface font-semibold">${rev.name}</span>
            <span class="font-body-sm text-body-sm text-outline">${rev.date}</span>
          </div>
        </div>
      </div>
    `).join('')}
  `;
}

let activeReviewRating = 5;
function setReviewRating(starCount) {
  activeReviewRating = starCount;
  const stars = document.querySelectorAll('.review-star-btn');
  stars.forEach((star, idx) => {
    if (idx < starCount) {
      star.classList.add('text-culinary-gold-bright');
      star.classList.remove('text-outline');
    } else {
      star.classList.remove('text-culinary-gold-bright');
      star.classList.add('text-outline');
    }
  });
}

function submitUserReview(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('reviewer-name');
  const typeInput = document.getElementById('reviewer-visit-type');
  const commentInput = document.getElementById('reviewer-comment');

  const name = nameInput?.value.trim();
  const comment = commentInput?.value.trim();
  const visitType = typeInput?.value || "Dinner Tasting";

  if (!name || !comment) {
    showToast("Please provide your name and your dining impressions.", "error");
    return;
  }

  const newReview = {
    name,
    visitType,
    rating: activeReviewRating,
    comment,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  userReviews.unshift(newReview);
  localStorage.setItem('letoile_user_reviews', JSON.stringify(userReviews));
  renderUserReviews();
  closeModal('review-modal');

  if (nameInput) nameInput.value = '';
  if (commentInput) commentInput.value = '';

  showToast("Thank you for sharing your experience!", "success");
}

// --- NEWSLETTER SUBSCRIPTION ---
function subscribeGazette(e) {
  if (e) e.preventDefault();

  const input = document.getElementById('gazette-email');
  const email = input?.value.trim();

  if (!email || !email.includes('@')) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  input.value = '';
  showToast("Welcome to The Gazette. Your invitation has been dispatched.", "success");
}

// --- CONCIERGE MODAL & CONTACT ---
function submitConciergeInquiry(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('concierge-name')?.value.trim();
  const email = document.getElementById('concierge-email')?.value.trim();
  const message = document.getElementById('concierge-message')?.value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all inquiry fields.", "error");
    return;
  }

  closeModal('concierge-modal');
  showToast("Your concierge inquiry has been sent to Maître d' Julien.", "success");
}

// --- MOBILE NAVIGATION DRAWER ---
function toggleMobileMenu(show) {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  if (!drawer) return;

  const isOpen = show !== undefined ? show : !drawer.classList.contains('active');
  if (isOpen) {
    drawer.classList.add('active');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// --- SCROLL SPY & NAVBAR STYLING ---
function initScrollSpy() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('shadow-md');
    } else {
      header?.classList.remove('shadow-md');
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-culinary-gold-muted', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-culinary-gold-muted', 'font-semibold');
      }
    });
  });
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 text-sm font-label-md uppercase tracking-wider backdrop-blur-md ${
    type === 'success' ? 'bg-charcoal-pure text-culinary-gold-bright border border-gold-hairline' :
    type === 'error' ? 'bg-red-950 text-red-200 border border-red-700/50' :
    'bg-charcoal-elevated text-parchment-cream border border-hairline-dark'
  }`;

  const iconName = type === 'success' ? 'verified' : type === 'error' ? 'error' : 'info';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] ${type === 'success' ? 'text-culinary-gold-bright' : ''}">${iconName}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

