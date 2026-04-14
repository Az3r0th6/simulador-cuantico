document.addEventListener("DOMContentLoaded", () => {
    const qubit = document.getElementById('qubit');
    const launchBtn = document.getElementById('launch-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDisplay = document.getElementById('result-display');
    const qubitStatus = document.getElementById('qubit-status');
    const loadingDots = document.getElementById('loading-dots');
    const qubitResult = document.getElementById('qubit-result');
    const quote = document.getElementById('quote');
    const qubitFace = qubit.querySelector('.qubit-face');
    
    let isSpinning = false;

    launchBtn.addEventListener('click', launchQubit);

    resetBtn.addEventListener('click', () => {
        // Restaurar estado de la UI
        resultDisplay.classList.add('hidden');
        qubitResult.classList.add('hidden');
        quote.classList.add('hidden');
        loadingDots.classList.remove('hidden');
        qubitStatus.classList.remove('hidden');
        
        qubit.classList.remove('hidden');
        qubit.classList.remove('qubit-spinning');
        qubit.classList.add('qubit-idle');
        
        qubitFace.textContent = 'Q';
        qubit.style.background = 'linear-gradient(135deg, var(--state-1), var(--state-0))';
        
        launchBtn.disabled = false;
        launchBtn.querySelector('.btn-text').textContent = 'Lanzar Qubit (Superposición)';
        resetBtn.classList.add('hidden');
        
        qubitResult.className = '';
    });

    async function launchQubit() {
        if (isSpinning) return;
        
        isSpinning = true;
        launchBtn.disabled = true;
        launchBtn.querySelector('.btn-text').textContent = 'Observando colapso...';
        
        qubit.classList.remove('qubit-idle');
        qubit.classList.add('qubit-spinning');

        // Mostramos el contenedor de resultados durante el "giro" simulado
        qubit.classList.add('hidden');
        resultDisplay.classList.remove('hidden');

        // Esperar simulando interacción de funciones de onda
        await sleep(1500);
        
        // Simulación de colapso
        const opciones = [
            { text: "Cara (0)", class: "result-0" },
            { text: "Cruz (1)", class: "result-1" }
        ];
        
        const resultado = opciones[Math.floor(Math.random() * opciones.length)];
        
        // Ocultar elementos de carga (dots, status)
        loadingDots.classList.add('hidden');
        qubitStatus.classList.add('hidden');
        
        // Mostrar resultado visual principal
        qubitResult.textContent = `✨ ¡Colapso! ${resultado.text}`;
        qubitResult.classList.add(resultado.class);
        qubitResult.classList.remove('hidden');
        
        // Mostrar la frase
        quote.classList.remove('hidden');

        launchBtn.querySelector('.btn-text').textContent = 'Sistema colapsado';
        resetBtn.classList.remove('hidden');
        isSpinning = false;
    }

    // Función sleep nativa en navegador basada en promesas
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});