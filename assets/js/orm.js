class ORM {
  constructor(dataPath) {
    // Detección automática de entorno (local vs GitHub Pages)
    this.isGitHubPages = window.location.host.includes('github.io');
    this.basePath = this.isGitHubPages 
      ? `/${window.location.pathname.split('/')[1]}` 
      : '';
    this.dataPath = `${this.basePath}${dataPath}`;
  }

  async loadData() {
    try {
      // Intento 1: Ruta estándar
      let response = await fetch(this.dataPath);
      
      // Intento 2: Ruta alternativa si falla
      if (!response.ok) {
        response = await fetch(`${this.dataPath}?t=${Date.now()}`);
      }
      
      // Intento 3: Ruta absoluta como último recurso
      if (!response.ok && this.isGitHubPages) {
        const absolutePath = `https://raw.githubusercontent.com/${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}/main${this.dataPath}`;
        response = await fetch(absolutePath);
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error cargando datos:', error);
      // Datos de respaldo
      return [{
        id: 0,
        title: "Proyecto de ejemplo (no se cargó el JSON)",
        description: `Error al cargar datos: ${error.message}`,
        url: "#",
        tags: ["error"]
      }];
    }
  }

  async getAll() {
    return this.loadData();
  }

  async getById(id) {
    const data = await this.loadData();
    return data.find(item => item.id === id) || null;
  }

  async filter(criteria) {
    const data = await this.loadData();
    return data.filter(item => {
      return Object.keys(criteria).every(key => {
        if (Array.isArray(criteria[key])) {
          return criteria[key].some(val => item[key]?.includes(val));
        }
        return item[key] === criteria[key];
      });
    });
  }
}
