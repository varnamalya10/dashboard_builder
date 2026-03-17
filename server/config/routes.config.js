// Routes Configuration
module.exports = {
  // API Routes
  API_ROUTES: {
    // Dashboard routes
    DASHBOARD: {
      GET: '/api/dashboard',
      POST: '/api/dashboard',
      PUT: '/api/dashboard/:id',
      DELETE: '/api/dashboard/:id',
    },
    
    // Order routes
    ORDERS: {
      GET_ALL: '/api/orders',
      GET_BY_ID: '/api/orders/:id',
      CREATE: '/api/orders',
      UPDATE: '/api/orders/:id',
      DELETE: '/api/orders/:id',
    },
    
    // User routes (for future authentication)
    USERS: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile',
    },
    
    // Export routes (future feature)
    EXPORT: {
      PDF: '/api/export/pdf',
      EXCEL: '/api/export/excel',
      JSON: '/api/export/json',
    },
  },

  // Route Metadata
  ROUTE_METADATA: {
    '/api/dashboard': {
      description: 'Dashboard configuration endpoints',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      auth: false,
    },
    '/api/orders': {
      description: 'Order management endpoints',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      auth: false,
    },
    '/api/auth': {
      description: 'Authentication endpoints',
      methods: ['POST'],
      auth: false,
    },
    '/api/export': {
      description: 'Data export endpoints',
      methods: ['GET'],
      auth: true,
    },
  },

  // Route Groups
  ROUTE_GROUPS: {
    PUBLIC: ['/api/dashboard', '/api/orders'],
    AUTHENTICATED: ['/api/auth/profile', '/api/export'],
    ADMIN: ['/api/admin'],
  },

  // Rate Limiting Configuration
  RATE_LIMITS: {
    '/api/dashboard': {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
    '/api/orders': {
      windowMs: 15 * 60 * 1000,
      max: 200,
    },
    '/api/auth': {
      windowMs: 15 * 60 * 1000,
      max: 5, // stricter limit for auth routes
    },
  },

  // Middleware Configuration per Route
  MIDDLEWARE: {
    '/api/dashboard': ['cors', 'json'],
    '/api/orders': ['cors', 'json'],
    '/api/auth': ['cors', 'json'],
    '/api/export': ['cors', 'json', 'auth'],
  },
};
