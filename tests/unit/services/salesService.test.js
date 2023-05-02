const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel} = require('../../../src/models');

const { allSalesMockReturn, ByIdSalesMockReturn } = require('./servicesMock/salesService.mock');

describe('Teste de unidade products services', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todos produtos do banco de dados', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesMockReturn);

    const allProducts = await salesService.findAll();

    expect(allProducts.type).to.be.equal(null)
    expect(allProducts.message).to.be.equal(allSalesMockReturn)
  });

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    sinon.stub(salesModel, 'findById').resolves(ByIdSalesMockReturn);

    const salesById = await salesService.findById(1);
    
    expect(salesById.type).to.be.equal(null)
    expect(salesById.message).to.be.equal(ByIdSalesMockReturn)
  })

  it('testa se retorna erro Product not found se nao econtrado', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const salesById = await salesService.findById(1);
    
    expect(salesById.type).to.be.equal('SALE_NOT_FOUND')
    expect(salesById.message).to.be.equal('Sale not found')
  });

  it('testa se cadastra corretamente um produto', async function () {
    sinon.stub(salesModel, 'insert').resolves(4);

    const salesById = await salesService.insert(1);
    
    expect(salesById.type).to.be.equal(null)
    expect(salesById.message).to.equal(4)
  })
})