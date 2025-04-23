class ORM {
  constructor(dataPath) {
    this.dataPath = dataPath;
  }

  async getAll() {
    try {
      const response = await fetch(this.dataPath);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en ORM.getAll:', error);
      throw error;
    }
  }

  async getById(id) {
    const data = await this.getAll();
    return data.find(item => item.id === id) || null;
  }

  async filter(criteria) {
    const data = await this.getAll();
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

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ORM;
}
