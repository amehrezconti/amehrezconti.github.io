class ORM {
  constructor(dataPath) {
    this.dataPath = dataPath;
  }

  async getAll() {
    const response = await fetch(this.dataPath);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    return await response.json();
  }

  async getById(id) {
    const data = await this.getAll();
    return data.find(item => item.id === id);
  }

  async filter(criteria) {
    const data = await this.getAll();
    return data.filter(item => {
      return Object.keys(criteria).every(key => {
        return item[key] === criteria[key];
      });
    });
  }
}

// Para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ORM;
}