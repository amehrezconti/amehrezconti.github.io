class ORM {
  constructor(dataPath) {
    // Usa rutas relativas al sitio
    this.dataPath = window.location.pathname.includes('github.io') 
      ? `${window.location.pathname.split('/')[1]}/${dataPath}`
      : dataPath;
  }

  async getAll() {
    try {
      // Agrega timestamp para evitar caché
      const response = await fetch(`${this.dataPath}?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en ORM.getAll:', error);
      // Devuelve datos de prueba si falla
      return [
        {
          id: 1,
          title: "Proyecto de ejemplo (datos locales)",
          description: "Esto se muestra porque no se pudo cargar el JSON",
          url: "#",
          tags: ["web"]
        }
      ];
    }
  }
  
  // ... resto de tus métodos
}
