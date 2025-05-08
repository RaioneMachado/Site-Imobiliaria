// Menu Mobile melhorado com animação e acessibilidade
document.addEventListener('DOMContentLoaded', function() {
    const menuMobile = document.querySelector('.menu-mobile');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Função para alternar o menu
    function toggleMenu() {
        const isExpanded = nav.getAttribute('aria-expanded') === 'true';
        nav.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        menuMobile.setAttribute('aria-expanded', !isExpanded);
        
        // Animar o ícone do hamburguer
        menuMobile.classList.toggle('open');
    }
    
    // Evento de clique no botão mobile
    menuMobile.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Fechar menu ao clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
// Fechar menu ao clicar fora - VERSÃO CORRIGIDA
document.addEventListener('click', function(e) {
    if (nav.classList.contains('active')) { // Faltava este parêntese
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnMenuButton = e.target === menuMobile || menuMobile.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnMenuButton) {
            toggleMenu();
        }
    }
});
    
    // Redirecionamento para detalhes do imóvel
    const imovelCards = document.querySelectorAll('.imovel-card');
    
    imovelCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evita redirecionar se clicar em um link ou ícone dentro do card
            if (!e.target.closest('a') && !e.target.closest('i')) {
                const id = this.getAttribute('data-id');
                window.location.href = `pages/detalhes-imovel.html?id=${id}`;
            }
        });
        
        // Melhoria: adiciona hover via JS para dispositivos com mouse
        card.addEventListener('mouseenter', function() {
            if (window.matchMedia("(hover: hover)").matches) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.matchMedia("(hover: hover)").matches) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Página de detalhes do imóvel
    if (window.location.pathname.includes('detalhes-imovel.html')) {
        loadImovelDetails();
    }
});

// Função para carregar detalhes do imóvel
function loadImovelDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const imovelId = urlParams.get('id');
    
    // Dados mockados - na prática, você buscaria de uma API
    const imoveis = {
        '1': {
            titulo: 'Casa 3 quartos e 3 banheiros',
            tipo: 'Venda',
            preco: 'R$ 600.000',
            localizacao: 'Centro, São Paulo - SP',
            quartos: 2,
            banheiros: 2,
            vagas: 1,
            area: '75m²',
            descricao: 'Excelente apartamento localizado no coração da cidade, próximo a todas as comodidades. Apartamento bem iluminado, com acabamento de primeira linha.',
            imagens: ['imagens/casa1/capa.jpg.jpg', 'imagens/casa1/capa.jpg.jpg', 'imovel-interior2.jpg'],
            caracteristicas: {
                'Andar': '5°',
                'Condomínio': 'R$ 800/mês',
                'IPTU': 'R$ 1.200/ano',
                'Ano de construção': '2015'
            }
        },
        '2': {
            titulo: 'Casa 3 quartos',
            tipo: 'Aluguel',
            preco: 'R$ 2.500/mês',
            localizacao: 'Barra, Rio de Janeiro - RJ',
            quartos: 3,
            banheiros: 2,
            vagas: 2,
            area: '120m²',
            descricao: 'Casa espaçosa com jardim e área de lazer. Localizada em bairro tranquilo e residencial, próximo à praia e comércio.',
            imagens: ['imovel2.jpg', 'casa-interior1.jpg', 'casa-interior2.jpg'],
            caracteristicas: {
                'Área útil': '100m²',
                'Jardim': '20m²',
                'Condomínio': 'Incluso',
                'Mobiliado': 'Parcialmente'
            }
        }
    };
    
    const imovel = imoveis[imovelId];
    const mainContent = document.querySelector('main');
    
    if (!imovel) {
        mainContent.innerHTML = `
            <div class="container">
                <h2>Imóvel não encontrado</h2>
                <p>O imóvel solicitado não está disponível no momento.</p>
                <a href="../index.html" class="btn-voltar">Voltar para a página inicial</a>
            </div>
        `;
        return;
    }
    
    // Preencher os dados básicos
    document.title = `${imovel.titulo} | LK Imóveis`;
    document.querySelector('.imovel-titulo').textContent = imovel.titulo;
    document.querySelector('.imovel-localizacao span').textContent = imovel.localizacao;
    document.querySelector('.imovel-preco').textContent = imovel.preco;
    document.querySelector('.imovel-tipo').textContent = imovel.tipo;
    document.querySelector('.imovel-descricao').textContent = imovel.descricao;
    
    // Adicionar classe específica para aluguel
    if (imovel.tipo === 'Aluguel') {
        document.querySelector('.imovel-tipo').classList.add('aluguel');
    }
    
    // Preencher características principais
    document.querySelector('.quartos span').textContent = imovel.quartos;
    document.querySelector('.banheiros span').textContent = imovel.banheiros;
    document.querySelector('.vagas span').textContent = imovel.vagas;
    document.querySelector('.area span').textContent = imovel.area;
    
    // Carregar imagens
    const imagemPrincipal = document.getElementById('imagem-principal');
    const galeria = document.querySelector('.galeria-imoveis');
    
    if (imovel.imagens.length > 0) {
        imagemPrincipal.src = `../img/${imovel.imagens[0]}`;
        imagemPrincipal.alt = imovel.titulo;
        
        // Limpar galeria antes de adicionar novas imagens
        galeria.innerHTML = '';
        
        // Adicionar imagens secundárias
        imovel.imagens.slice(1).forEach((img, index) => {
            const div = document.createElement('div');
            div.className = 'galeria-item';
            div.innerHTML = `<img src="../img/${img}" alt="${imovel.titulo} - Foto ${index + 2}" tabindex="0">`;
            galeria.appendChild(div);
            
            // Adicionar evento de clique para trocar a imagem principal
            div.addEventListener('click', function() {
                imagemPrincipal.src = `../img/${img}`;
                
                // Adicionar efeito visual de troca
                imagemPrincipal.style.opacity = '0';
                setTimeout(() => {
                    imagemPrincipal.style.opacity = '1';
                }, 100);
            });
        });
    }
    
    // Preencher características adicionais
    const caracteristicasContainer = document.querySelector('.imovel-caracteristicas-adicionais');
    if (imovel.caracteristicas && Object.keys(imovel.caracteristicas).length > 0) {
        caracteristicasContainer.innerHTML = '<h3>Características Adicionais</h3><ul></ul>';
        const lista = caracteristicasContainer.querySelector('ul');
        
        for (const [key, value] of Object.entries(imovel.caracteristicas)) {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${key}:</strong> ${value}`;
            lista.appendChild(item);
        }
    } else {
        caracteristicasContainer.style.display = 'none';
    }
    
    // Adicionar evento ao botão de contato
    const btnContato = document.querySelector('.btn-contato');
    if (btnContato) {
        btnContato.addEventListener('click', function(e) {
            e.preventDefault();
            // Aqui você pode abrir um modal de contato ou redirecionar
            alert('Formulário de contato seria aberto aqui!\nImóvel: ' + imovel.titulo);
        });
    }
}
// Adicione isso dentro do DOMContentLoaded, após o código do menu mobile

// Eventos para os blocos de compra e aluguel
document.querySelectorAll('.bloco').forEach(bloco => {
    // Remove o onclick do HTML e faz via JavaScript
    bloco.removeAttribute('onclick');
    
    bloco.addEventListener('click', function() {
        // Verifica qual bloco foi clicado
        if (this.classList.contains('comprar')) {
            window.location.href = 'comprar.html';
        } else if (this.classList.contains('alugar')) {
            window.location.href = 'alugar.html';
        }
    });
    
    // Melhor acessibilidade - permite ativar com Enter
    bloco.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.click();
        }
    });
    
    // Adiciona tabindex para acessibilidade
    bloco.setAttribute('tabindex', '0');
});
// Função para filtrar imóveis
function filtrarImoveis() {
    const form = document.getElementById('form-busca');
    const imoveis = document.querySelectorAll('.imovel-card');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const filtros = {
            tipo: formData.get('tipo'),
            finalidade: formData.get('finalidade'),
            cidade: formData.get('cidade'),
            bairro: formData.get('bairro')
        };
        
        imoveis.forEach(imovel => {
            const imovelTipo = imovel.getAttribute('data-tipo');
            const imovelFinalidade = imovel.getAttribute('data-finalidade');
            const imovelCidade = imovel.getAttribute('data-cidade');
            const imovelBairro = imovel.getAttribute('data-bairro');
            
            const corresponde =
                (!filtros.tipo || imovelTipo === filtros.tipo) &&
                (!filtros.finalidade || imovelFinalidade === filtros.finalidade) &&
                (!filtros.cidade || imovelCidade === filtros.cidade) &&
                (!filtros.bairro || imovelBairro === filtros.bairro);
            
            imovel.style.display = corresponde ? 'block' : 'none';
        });
    });
}

// Chame a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    filtrarImoveis();
});