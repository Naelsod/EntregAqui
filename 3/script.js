document.addEventListener('DOMContentLoaded', () => {

    // SELECIONA OS ELEMENTOS INICIAIS
    const destinationButtons = document.querySelectorAll('.destination-btn');
    const rideDetailsCard = document.getElementById('ride-details');
    const priceDisplay = document.getElementById('price-display');
    const distanceDisplay = document.getElementById('distance-display');
    const requestRideBtn = document.getElementById('request-ride-btn');
    const searchingOverlay = document.getElementById('searching-overlay');
    
    // O elemento da aba do entregador não é mais selecionado aqui, pois ele não existe ainda.

    let selectedPrice = null;

    // Listener para os botões de destino (continua o mesmo)
    destinationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const distance = button.dataset.distance;
            const price = button.dataset.price;
            selectedPrice = price;
            
            distanceDisplay.textContent = distance;
            priceDisplay.textContent = `R$ ${price}`;
            rideDetailsCard.classList.add('visible');
            
            destinationButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // ==========================================================
    // NOVA FUNÇÃO PARA CRIAR A ABA DO ENTREGADOR DINAMICAMENTE
    // ==========================================================
    function createAndShowRideModal() {
        // 1. Cria o elemento principal da aba (uma div)
        const modal = document.createElement('div');
        modal.id = 'ride-found-modal';
        modal.className = 'bottom-sheet'; // Começa escondido por causa do 'transform' no CSS

        // 2. Adiciona todo o conteúdo HTML interno da aba
        modal.innerHTML = `
            <img src="img/gus.jpeg" alt="Foto do Entregador" class="driver-photo">
            <h2>Entregador a caminho!</h2>
            <p class="driver-eta">Chega em 3 minutos</p>
            <div class="driver-details">
                <div class="driver-info">
                    <strong>Carlos Silva</strong>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i> 4.9
                    </div>
                </div>
                <div class="vehicle-info">
                    <span>Honda CG 160</span>
                    <span class="plate">BRA2E19</span>
                </div>
            </div>
            <button class="cancel-btn">Dispensar</button>
        `;

        // 3. Adiciona a funcionalidade de fechar/remover a aba
        const cancelButton = modal.querySelector('.cancel-btn');
        cancelButton.addEventListener('click', () => {
            // Remove a classe 'visible' para a animação de descida
            modal.classList.remove('visible');
            // Espera a animação terminar para remover o elemento do HTML
            setTimeout(() => {
                modal.remove();
            }, 400); // 400ms = tempo da transição no CSS
        });

        // 4. Adiciona a aba criada ao corpo da tela do app
        document.querySelector('.app-screen').appendChild(modal);

        // 5. TRUQUE PARA A ANIMAÇÃO FUNCIONAR:
        // Espera um instante mínimo para o navegador "perceber" o novo elemento
        // antes de adicionar a classe que inicia a animação.
        setTimeout(() => {
            modal.classList.add('visible');
        }, 50); // 50ms é suficiente
    }


    // LÓGICA PRINCIPAL - O QUE ACONTECE AO CLICAR EM "BUSCAR ENTREGADOR"
    requestRideBtn.addEventListener('click', () => {
        if (!selectedPrice) {
            alert('Por favor, selecione um destino primeiro.');
            return;
        }

        searchingOverlay.style.display = 'flex';

        setTimeout(() => {
            searchingOverlay.style.display = 'none';

            // EM VEZ DE MOSTRAR UM ELEMENTO EXISTENTE,
            // AGORA CHAMAMOS A FUNÇÃO PARA CRIAR E MOSTRAR UM NOVO
            createAndShowRideModal();

        }, 3500);
    });

});