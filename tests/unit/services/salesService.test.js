const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel} = require('../../../src/models');

const { allSalesMockReturn, ByIdSalesMockReturn } = require('./servicesMock/salesService.mock');

describe('Teste de unidade products services', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todos vendas do banco de dados', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesMockReturn);

    const allProducts = await salesService.findAll();

    expect(allProducts.type).to.be.equal(null)
    expect(allProducts.message).to.be.equal(allSalesMockReturn)
  });

  it('testa se retorna vendas buscado por id do banco de dados', async function () {
    sinon.stub(salesModel, 'findById').resolves(ByIdSalesMockReturn);

    const salesById = await salesService.findById(1);
    
    expect(salesById.type).to.be.equal(null)
    expect(salesById.message).to.be.equal(ByIdSalesMockReturn)
  })

  it('testa se retorna erro sale not found se nao econtrado', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const salesById = await salesService.findById(1);
    
    expect(salesById.type).to.be.equal('SALE_NOT_FOUND')
    expect(salesById.message).to.be.equal('Sale not found')
  });

  it('testa se cadastra corretamente um venda', async function () {
    sinon.stub(salesModel, 'insert').resolves(4);

    const salesById = await salesService.insert(1);
    
    expect(salesById.type).to.be.equal(null)
    expect(salesById.message).to.equal(4)
  })

  it('testa se atualiza corretamente um venda', async function () {
    sinon.stub(salesModel, 'upDate').resolves(1);

    const salesById = await salesService.upDate(1);
    
    expect(salesById.type).to.be.equal(null)
    expect(salesById.message).to.equal('')
  })

  it('testa se nao atualiza corretamente um venda', async function () {
    sinon.stub(salesModel, 'upDate').resolves(0);

    const sales = await salesService.upDate(1);
    
    expect(sales.type).to.be.equal('SALE_NOT_FOUND')
    expect(sales.message).to.be.equal('Sale not found')
  })

   it('testa se deleta corretamente um venda', async function () {
    sinon.stub(salesModel, 'salesDelete').resolves(1);

    const sales = await salesService.salesDelete(1);
    
    expect(sales.type).to.be.equal(null)
    expect(sales.message).to.equal('')
   })
  
   it('testa nao deleta corretamente um venda', async function () {
    sinon.stub(salesModel, 'salesDelete').resolves(0);

    const sales = await salesService.salesDelete(9999);
    
    expect(sales.type).to.be.equal('SALE_NOT_FOUND')
    expect(sales.message).to.be.equal('Sale not found')
   })
  
  
})