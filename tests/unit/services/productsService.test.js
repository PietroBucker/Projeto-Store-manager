const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProductsMock } = require('./servicesMock/productsService.mock');

describe('Teste de unidade products services', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todos produtos do banco de dados', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsMock);

    const allProducts = await productsService.findAll();

    expect(allProducts).to.be.equal(allProductsMock)
  });

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    sinon.stub(productsModel, 'findById').resolves(allProductsMock[0]);

    const productById = await productsService.findById(1);
    
    expect(productById).to.be.equal(allProductsMock[0]);
  })
})