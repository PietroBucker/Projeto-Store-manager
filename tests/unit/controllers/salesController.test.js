// ideia a implementar: Da para separar os test de unidade,
// em arquivos separados por EndPoint para facilitar o entendimento
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const { allSalesMockReturn, ByIdSalesMockReturn } = require('./controllerMock/salesController.mock');

describe('Teste de unidade products controller', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todas as vendas do banco de dados', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAll').resolves({type: null, message: allSalesMockReturn })
    
    const allProducts = await salesController.findAll(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMockReturn);
  });

  it('testa se retorna vendas buscado por id do banco de dados', async function () {
    const res = {};
    const req = {
      params: { id: 1 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findById').resolves({type: null, message: ByIdSalesMockReturn})
    
    await salesController.findById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(ByIdSalesMockReturn);
  });

  it('testa se retorna erro 404 "nao econtrado" ao buscar por id ', async function () {
   const res = {};
    const req = {
      params: { id: 99999 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findById').resolves({type: 'SALES_NOT_FOUND', message: 'sales not found'})
    
    await salesController.findById(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'sales not found'});
  })

   it('testa se possivel inserir um venda ', async function () {
   const res = {};
    const req = {
     body: [{
      "productId": 1,
      "quantity": 1
    }]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insert').resolves({ type: null, message: 4 })
    
    await salesController.insert(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({id: 4, itemsSold: req.body});
   })
  
  it('testa se atulizar um venda ', async function () {
   const res = {};
    const req = {
     params: { id: 1},
     body: [{
      "productId": 1,
      "quantity": 1
    }]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'upDate').resolves({ type: null, message: 4 })
    
    await salesController.upDate(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: req.params.id, itemsUpdated: req.body });
  })

  it('testa se nao atulizar um venda ', async function () {
   const res = {};
    const req = {
     params: { id: 9999},
     body: [{
      "productId": 1,
      "quantity": 1
    }]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'upDate').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
    
    await salesController.upDate(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  })

  it('testa se deleta uma venda', async function () {
    const res = {};
    const req = {
      params: { id: 1 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'salesDelete').resolves({type: null, message: ByIdSalesMockReturn})
    
    await salesController.salesDelete(req, res);
    
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith('');
  });

  it('testa se nao deleta uma venda', async function () {
    const res = {};
    const req = {
      params: { id: 9999 }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'salesDelete').resolves({type: 'SALE_NOT_FOUND', message: 'Sale not found'})
    
    await salesController.salesDelete(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Sale not found'});
  });
})