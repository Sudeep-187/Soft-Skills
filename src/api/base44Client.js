/**
 * Local mock client — replaces @base44/sdk entirely.
 * All data is stored in memory + localStorage for persistence.
 */

const STORAGE_KEY = 'rural_bazaar_data';

// Load persisted data
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
};

const saveToStorage = (stores) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
  } catch {}
};

const stores = loadFromStorage();

const getStore = (entityName) => {
  if (!stores[entityName]) stores[entityName] = [];
  return stores[entityName];
};

const makeEntity = (entityName) => {
  const subscribers = [];

  const notify = () => {
    saveToStorage(stores);
    subscribers.forEach(fn => fn());
  };

  return {
    list: async (sortField, limit) => {
      let data = [...getStore(entityName)];
      if (limit) data = data.slice(0, limit);
      return data;
    },
    filter: async (query) => {
      const data = getStore(entityName);
      return data.filter(item =>
        Object.entries(query).every(([k, v]) => item[k] === v)
      );
    },
    get: async (id) => {
      return getStore(entityName).find(item => item.id === id) || null;
    },
    create: async (payload) => {
      const item = { id: Date.now().toString() + Math.random().toString(36).slice(2, 6), created_date: new Date().toISOString(), ...payload };
      getStore(entityName).push(item);
      notify();
      return item;
    },
    update: async (id, payload) => {
      const store = getStore(entityName);
      const idx = store.findIndex(item => item.id === id);
      if (idx !== -1) {
        store[idx] = { ...store[idx], ...payload };
        notify();
        return store[idx];
      }
      return null;
    },
    delete: async (id) => {
      const store = getStore(entityName);
      const idx = store.findIndex(item => item.id === id);
      if (idx !== -1) {
        store.splice(idx, 1);
        notify();
      }
    },
    subscribe: (callback) => {
      subscribers.push(callback);
      return () => {
        const i = subscribers.indexOf(callback);
        if (i > -1) subscribers.splice(i, 1);
      };
    },
  };
};

export const base44 = {
  auth: {
    me: async () => ({ id: 'local-user', email: 'user@example.com', full_name: 'Local User' }),
    isAuthenticated: async () => false,
    logout: () => { console.log('Logout called (local mode)'); },
    redirectToLogin: () => { alert('Login is disabled in local mode.'); },
  },
  entities: {
    Product: makeEntity('Product'),
    CartItem: makeEntity('CartItem'),
    Wishlist: makeEntity('Wishlist'),
    Order: makeEntity('Order'),
    Address: makeEntity('Address'),
    Review: makeEntity('Review'),
    MelaEvent: makeEntity('MelaEvent'),
    Artisan: makeEntity('Artisan'),
    Subscription: makeEntity('Subscription'),
  },
  appLogs: {
    logUserInApp: async () => { },
  },
};
