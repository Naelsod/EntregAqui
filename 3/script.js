document.addEventListener('DOMContentLoaded', () => {

    // SELECIONA OS ELEMENTOS INICIAIS
    const appScreen = document.querySelector('.app-screen'); // <-- NOVA LINHA: Seleciona a tela principal
    const destinationButtons = document.querySelectorAll('.destination-btn');
    const rideDetailsCard = document.getElementById('ride-details');
    const priceDisplay = document.getElementById('price-display');
    const distanceDisplay = document.getElementById('distance-display');
    const requestRideBtn = document.getElementById('request-ride-btn');
    const searchingOverlay = document.getElementById('searching-overlay');
    
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

    // Função para criar a aba do entregador (com uma pequena adição)
    function createAndShowRideModal() {
        const modal = document.createElement('div');
        modal.id = 'ride-found-modal';
        modal.className = 'bottom-sheet';

        modal.innerHTML = `
            <img src="../img/gus.jpeg" alt="Foto do Entregador" class="driver-photo">
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

        // Adiciona a funcionalidade de fechar/remover a aba
        const cancelButton = modal.querySelector('.cancel-btn');
        cancelButton.addEventListener('click', () => {
            appScreen.classList.remove('rolagem-travada'); // <-- NOVA LINHA: Libera a rolagem
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.remove();
            }, 400);
        });

        // Adiciona a aba criada à tela do app
        appScreen.appendChild(modal);

        // Truque para a animação funcionar
        setTimeout(() => {
            modal.classList.add('visible');
        }, 50);
    }


    // LÓGICA PRINCIPAL - O QUE ACONTECE AO CLICAR EM "BUSCAR ENTREGADOR"
    requestRideBtn.addEventListener('click', () => {
        if (!selectedPrice) {
            alert('Por favor, selecione um destino primeiro.');
            return;
        }

        appScreen.classList.add('rolagem-travada'); // <-- NOVA LINHA: Trava a rolagem aqui!
        searchingOverlay.style.display = 'flex';

        setTimeout(() => {
            searchingOverlay.style.display = 'none';
            createAndShowRideModal();
        }, 3500);
    });

});
