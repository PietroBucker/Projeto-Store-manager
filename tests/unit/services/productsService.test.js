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

    expect(allProducts.type).to.be.equal(null)
    expect(allProducts.message).to.be.equal(allProductsMock)
  });

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    sinon.stub(productsModel, 'findById').resolves(allProductsMock[0]);

    const productById = await productsService.findById(1);
    
    expect(productById.type).to.be.equal(null)
    expect(productById.message).to.be.equal(allProductsMock[0])
  })

  it('testa se retorna produtos buscado por query do banco de dados', async function () {
    sinon.stub(productsModel, 'findByQuery').resolves(allProductsMock[0]);

    const productById = await productsService.findByQuery('mar');
    
    expect(productById.type).to.be.equal(null)
    expect(productById.message).to.be.equal(allProductsMock[0])
  })

  it('testa se buscando com query retorna erro Product not found se nao econtrado', async function () {
    sinon.stub(productsModel, 'findByQuery').resolves(0);

    const productById = await productsService.findByQuery(1);
    
    expect(productById.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(productById.message).to.be.equal('Product not found')
  });

  it('testa se retorna erro Product not found se nao econtrado', async function () {
    sinon.stub(productsModel, 'findById').resolves();

    const productById = await productsService.findById(1);
    
    expect(productById.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(productById.message).to.be.equal('Product not found')
  });

  it('testa se cadastra corretamente um produto', async function () {
    sinon.stub(productsModel, 'insert').resolves(4);

    const productById = await productsService.insert(1);
    
    expect(productById.type).to.be.equal(null)
    expect(productById.message).to.equal(4)
  })

  it('testa se atualiza corretamente um produto', async function () {
    sinon.stub(productsModel, 'upDate').resolves(1);

    const productById = await productsService.upDate(1);
    
    expect(productById.type).to.be.equal(null)
    expect(productById.message).to.equal('')
  })

  it('testa se nao consegue atualiza corretamente um produto', async function () {
    sinon.stub(productsModel, 'upDate').resolves(0);

    const productById = await productsService.upDate(1);
    
    expect(productById.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(productById.message).to.equal('Product not found')
  })

  it('testa se consegue deletar um produto', async function () {
    sinon.stub(productsModel, 'productDelete').resolves(1);

    const productById = await productsService.productDelete(1);
    
    expect(productById.type).to.be.equal(null)
    expect(productById.message).to.equal('')
  })

  it('testa se nao consegue deletar um produto', async function () {
    sinon.stub(productsModel, 'productDelete').resolves(0);

    const productById = await productsService.productDelete(1);
    
    expect(productById.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(productById.message).to.equal('Product not found')
  })
})