// ideia a implementar: Da para separar os test de unidade,
// em arquivos separados por EndPoint para facilitar o entendimento
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
    sinon.stub(productsService, 'findAll').resolves({type: null, message: allProductsMock })
    
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
    sinon.stub(productsService, 'findById').resolves({type: null, message: allProductsMock[0]})
    
    await productsController.findById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock[0]);
  });

   it('testa se retorna produtos buscado por query do banco de dados', async function () {
    const res = {};
    const req = {
      query: { q: 'mar' }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findByQuery').resolves({type: null, message: allProductsMock[0]})
    
    await productsController.findByQuery(req, res);
    
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
    sinon.stub(productsService, 'findById').resolves({type: 'PRODUCT_NOT_FOUND', message: 'Product not found'})
    
    await productsController.findById(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  })

  it('testa se retorna erro 404 "nao econtrado" ao buscar por query ', async function () {
   const res = {};
    const req = {
      query: { q: 'teste' }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findByQuery').resolves({type: 'PRODUCT_NOT_FOUND', message: 'Product not found'})
    
    await productsController.findByQuery(req, res);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  })

  it('testa se possivel inserir um produto ', async function () {
   const res = {};
    const req = {
     body: { name: 'ProdutoX' }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'insert').resolves({ type: null, message: 4 })
    
    await productsController.insert(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({id: 4, name: 'ProdutoX'});
  })

  it('testa se e possivel atualizar um produto ', async function () {
   const res = {};
    const req = {
      params: { id: 1},
      body: { name: 'ProdutoX2' }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'upDate').resolves({type: null, message: ''})
    
    await productsController.upDate(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({id: 1, name: 'ProdutoX2'});
  })

  it('testa se nao e possivel atualizar um produto ', async function () {
   const res = {};
    const req = {
      params: { id: 9999},
      body: { name: 'ProdutoX2' }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'upDate').resolves({type: 'PRODUCT_NOT_FOUND', message: 'Product not found'})
    
    await productsController.upDate(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  })

  it('testa se e possivel deletar um produto ', async function () {
   const res = {};
    const req = {
      params: { id: 1},
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'productDelete').resolves({type: null, message: ''})
    
    await productsController.productDelete(req, res);
    
    expect(res.status).to.have.been.calledWith(204);
  })

  it('testa se retorna erro 404 "nao econtrado" ao tentar deletar e nao encontrar produto ', async function () {
   const res = {};
    const req = {
      params: { id: 99999 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'productDelete').resolves({type: 'PRODUCT_NOT_FOUND', message: 'Product not found'})
    
    await productsController.productDelete(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  })
})