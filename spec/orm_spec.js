// Para ejecutar en el navegador con test-runner.html
describe('ORM', function() {
  let orm;
  const testData = [
    { id: 1, name: 'Test 1', value: 100 },
    { id: 2, name: 'Test 2', value: 200 }
  ];

  beforeAll(function() {
    // Mock de fetch
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(testData)
      })
    );
    
    orm = new ORM('/test.json');
  });

  it('debería obtener todos los elementos', async function() {
    const data = await orm.getAll();
    expect(data.length).toBe(2);
    expect(data[0].name).toBe('Test 1');
  });

  it('debería obtener un elemento por ID', async function() {
    const item = await orm.getById(2);
    expect(item.name).toBe('Test 2');
  });

  it('debería filtrar elementos', async function() {
    const items = await orm.filter({ value: 200 });
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(2);
  });
});