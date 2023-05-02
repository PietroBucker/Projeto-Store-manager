const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSalesMockReturn, allSalesMockReturnBD, ByIdSalesMockReturnBD, ByIdSalesMockReturn } = require('./modelsMocks/salesModels.Mock');

describe('Teste de unidade sales model', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todas as vendas do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesMockReturnBD]);

    const result = await salesModel.findAll();
    
    expect(result).to.be.deep.equal(allSalesMockReturn);
  });

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([ByIdSalesMockReturn]);

    const result = await salesModel.findById(1);
  
    expect(result).to.be.deep.equal(ByIdSalesMockReturnBD);
  })

  it('testa se deleta corretamente um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);

    const result = await salesModel.insert( [{
    "productId": 1,
    "quantity": 1
  }]);
  
    expect(result).to.equal(4);
  })

  // it('testa se cadastra corretamente um produto', async function () {
  //   sinon.stub(connection, 'execute').resolves([]);

  //   const result = await salesModel.salesDelete(33);
  
  //   expect(result).to.equal();
  // })
})