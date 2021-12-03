require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  test('se a função fetchProducts é uma função', () => {
    const actual = typeof fetchProducts;
    const expected = 'function';
    expect(actual).toBe(expected);
  });

  test('se a função fetchProducts com parametro computador chama o fetch', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('se a função fetchProducts com argumento computador chama o fetch com o parametro', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('se o retorno da função com o argumento retorna o esperado', async () => {
    const actual = await fetchProducts('computador');
    expect(actual).toEqual(computadorSearch)
  })

  test('se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const actual = await fetchProducts();
    const expected = new Error('You must provide an url');
    expect(actual).toEqual(expected);
  })
});
