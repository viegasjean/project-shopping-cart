require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('se a função fecthItem é uma função', () => {
    const actual = typeof fetchItem;
    const expected = 'function';
    expect(actual).toBe(expected);
  });

  test('se a função fecthItem com parametro MLB1615760527 chama o fetch', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('se a função fecthItem com argumento MLB1615760527 chama o fetch com o endpoint correto', () => {
    fetchItem('MLB1615760527');
    const expected = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(expected);
  });

  test('se o retorno da função com o argumento retorna o esperado', async () => {
    const actual = await fetchItem('MLB1615760527');
    expect(actual).toEqual(item);
  });

  test('se ao chamar a função fecthItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const actual = await fetchItem();
    const expected = new Error('You must provide an url');
    expect(actual).toEqual(expected);
  });

});
