// Funções para manipular o carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function atualizarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const contador = document.querySelector('.fa-shopping-cart');
    if (contador) {
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        contador.setAttribute('data-count', totalItens || '');
    }
}

// Adicionar ao carrinho
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento aos botões "Adicionar ao Carrinho"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const nome = this.getAttribute('data-nome');
            const preco = parseFloat(this.getAttribute('data-preco'));
            
            // Verificar se o item já está no carrinho
            const itemExistente = carrinho.find(item => item.nome === nome);
            
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({
                    nome: nome,
                    preco: preco,
                    quantidade: 1
                });
            }
            
            atualizarCarrinho();
            alert(`${nome} foi adicionado ao carrinho!`);
        });
    });
    
    // Mostrar itens do carrinho na página do carrinho
    if (document.getElementById('carrinho-lista')) {
        const carrinhoLista = document.getElementById('carrinho-lista');
        const totalPreco = document.getElementById('total-preco');
        
        function renderizarCarrinho() {
            carrinhoLista.innerHTML = '';
            let total = 0;
            
            carrinho.forEach(item => {
                const tr = document.createElement('tr');
                const itemTotal = item.preco * item.quantidade;
                total += itemTotal;
                
                tr.innerHTML = `
                    <td>${item.nome}</td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${itemTotal.toFixed(2)}</td>
                `;
                
                carrinhoLista.appendChild(tr);
            });
            
            totalPreco.textContent = total.toFixed(2);
        }
        
        renderizarCarrinho();
        
        // Finalizar pedido
        document.getElementById('finalizar-pedido').addEventListener('click', function() {
            document.getElementById('mensagem-agradecimento').style.display = 'block';
            carrinho = [];
            atualizarCarrinho();
            renderizarCarrinho();
        });
    }
    
    // Formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            // Simulação de login - em um sistema real, você faria uma requisição ao servidor
            if (email && senha) {
                alert('Login realizado com sucesso!');
                window.location.href = 'index.html';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar senha
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar_senha').value;
            
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            
            // Simulação de cadastro - em um sistema real, você faria uma requisição ao servidor
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            window.location.href = 'login.html';
        });
        
        // Máscaras para CPF, Telefone e CEP
        document.getElementById('cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
        
        document.getElementById('telefone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        });
        
        document.getElementById('cep').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
    
    // Atualizar contador do carrinho ao carregar a página
    atualizarContadorCarrinho();
});

// Simular busca de endereço por CEP (usando a API ViaCEP)
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('logradouro').value = data.logradouro;
                            document.getElementById('bairro').value = data.bairro;
                            document.getElementById('cidade').value = data.localidade;
                            document.getElementById('estado').value = data.uf;
                        } else {
                            alert('CEP não encontrado!');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar CEP:', error);
                    });
            }
        });
    }
});