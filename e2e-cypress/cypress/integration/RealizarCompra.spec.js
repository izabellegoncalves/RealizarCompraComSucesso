/// <reference types="Cypress" />

import { telaInicial } from '../pages/telaInicial';

it('Cenario Realizar Compra com Sucesso:', () => {
    cy.log(`
        DADO    
                que estou na pagina inicialn aplicação
                E
                encontro item desejado
        QUANDO  
                preencho os dados do item
                E adiciono ao carrinho
                E crio uma conta 
                E realizo o pagamento via transferência bancária
        ENTAO   
                visualizo a mensagem de sucesso
    `);

    cy.visit('http://automationpractice.com/index.php');
    cy.get(telaInicial.search).click();
    cy.get(telaInicial.search).type('T-shirts > Faded Short Sleeve T-shirts');
    cy.wait(3000);
    cy.get(telaInicial.searchButton).click({ multiple: true, force: true });

    cy.screenshot(); 
 
    cy.get(telaInicial.more).click();
    cy.wait(3000);
    cy.get(telaInicial.qtde).clear().type('5');
    cy.get(telaInicial.size).select('M');
    cy.get(telaInicial.color).click();
    cy.get(telaInicial.add).click();
    cy.wait(3000);

    cy.screenshot();

    cy.contains('Product successfully added to your shopping cart');
    cy.contains('There are 5 items in your cart');
    cy.contains('Faded Short Sleeve T-shirts');
    cy.contains('Blue, M');
    cy.contains('Quantity');
    cy.get(telaInicial.qtdeCheckout).contains(5);
    cy.get(telaInicial.checkout).click();
    cy.wait(3000);

    cy.screenshot(); 

    cy.get(telaInicial.tbody).children().eq(0).contains('Faded Short Sleeve T-shirts');
    cy.get(telaInicial.tbody).children().eq(0).contains('Color : Blue, Size : M');

    cy.get(telaInicial.tbody).children().eq(0).contains('In stock');
    cy.get(telaInicial.tbody).children().eq(0).contains('5');

    cy.screenshot(); 

    cy.get(telaInicial.next).click();

    cy.get(telaInicial.email).click();
    cy.get(telaInicial.email).type('test491@test491.com');
    
    cy.get(telaInicial.createAccount).click();

    cy.request({
        method: 'POST',
        url: 'http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation', 
        form: true, 
        body: {
          email: 'test491@test491.com'
        }
      })

    cy.get(telaInicial.genero).click();
    cy.get(telaInicial.pNome).type('Maria');
    cy.get(telaInicial.sNome).type('Antunes');
    cy.get(telaInicial.senha).type('sdk@123');
    cy.get(telaInicial.dia).select('15');
    cy.get(telaInicial.mes).select('8');
    cy.get(telaInicial.ano).select('1983');
    cy.get(telaInicial.empresa).type('Ace Parking');
    cy.get(telaInicial.endereco).type('AZ 85004');
    cy.get(telaInicial.cidade).type('Phoenix');
    cy.get(telaInicial.estado).select('Arizona');
    cy.get(telaInicial.cep).type('22345');
    cy.get(telaInicial.celular).type('41-988997788');
    cy.get(telaInicial.enderAlternativo).type('Rua da Paz');

    cy.screenshot(); 

    cy.get(telaInicial.cadastrar).click();
    cy.wait(3000);
    
    cy.get(telaInicial.confNome).contains('Maria Antunes');
    cy.get(telaInicial.confEmpresa).contains('Ace Parking');
    cy.get(telaInicial.confEnder).contains('AZ 85004');	
    cy.get(telaInicial.confCidade).contains('Phoenix, Arizona 22345');
    cy.get(telaInicial.confPais).contains('United States');	
    cy.get(telaInicial.confCelular).contains('41-988997788');
    
    cy.screenshot(); 

    cy.get(telaInicial.pCheckout).click();
    cy.get(telaInicial.termos).click();
    
    cy.screenshot(); 

    cy.get(telaInicial.pCheckout).click();
    cy.wait(3000);
    cy.screenshot(); 

    cy.get(telaInicial.fPagamento).click();
    cy.wait(3000);
    cy.contains('You have chosen to pay by bank wire');

    cy.screenshot(); 

    cy.get(telaInicial.pCheckout).click();
    cy.wait(3000);
    cy.contains('Your order on My Store is complete');
    cy.screenshot();
    
});