const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { allProductsMock } = require('./controllerMock/productsController.mock');

describe('Teste de unidade products controller', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todos produtos do banco de dados', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAll').resolves(allProductsMock)
    
    const allProducts = await productsController.findAll(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock);
  });

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    const res = {};
    const req = {
      params: { id: 1 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findById').resolves(allProductsMock[0])
    
    await productsController.findById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock[0]);
  });

  it('testa se retorna erro 404 "nao econtrado" ao buscar por id ', async function () {
   const res = {};
    const req = {
      params: { id: 99999 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findById').resolves(allProductsMock[9999])
    
    await productsController.findById(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  })
})