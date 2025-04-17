// Este archivo contiene funciones adicionales para el manejo de retenciones

document.addEventListener('DOMContentLoaded', function() {
    console.log('rentasretenciones.js loaded');
    
    // Cuando se complete la descarga de PDFs en la API combinada, actualizar la información local
    window.updateLocalPdfsInfo = function(downloadedFiles) {
        if (!downloadedFiles || !Array.isArray(downloadedFiles) || downloadedFiles.length === 0) {
            console.log('No se recibieron archivos descargados para actualizar');
            return;
        }
        
        console.log(`Actualizando información local de ${downloadedFiles.length} PDFs`);
        
        // Convertir el array de rutas en un objeto mapeado por nombre de archivo
        const pdfMap = {};
        downloadedFiles.forEach(file => {
            // Extraer el nombre del archivo de la ruta completa
            const filename = file.split('\\').pop();
            pdfMap[filename] = file;
        });
        
        // Guardar en localStorage
        try {
            const existing = JSON.parse(localStorage.getItem('downloadedRetentionPdfs') || '{}');
            const merged = { ...existing, ...pdfMap };
            localStorage.setItem('downloadedRetentionPdfs', JSON.stringify(merged));
            console.log(`Información de PDFs actualizada en localStorage (${Object.keys(merged).length} archivos)`);
        } catch (e) {
            console.error("Error guardando PDFs en localStorage", e);
        }
        
        // Actualizar la tabla si está disponible la función
        if (typeof window.rentasFetchData === 'function') {
            console.log('Actualizando tabla de retenciones');
            window.rentasFetchData();
        }
    };
});

function openModal2() {
    const fromDate = document.querySelector('input[name="desde"]').value;
    const toDate = document.querySelector('input[name="hasta"]').value;
    
    document.getElementById('Desde2').value = fromDate;
    document.getElementById('Hasta2').value = toDate;
    
    document.getElementById('statusMessages2').style.display = 'none';
    
    $('#modal-api2').modal('show');
}

function executeAPI2() {
    const progressBar = document.querySelector('#modal-api2 .progress');
    const progressBarFill = document.querySelector('#modal-api2 .progress-bar');
    const executeBtn = document.getElementById('executeBtn2');
    const statusMessages = document.getElementById('statusMessages2');
    
    progressBar.style.display = 'block';
    statusMessages.style.display = 'block';
    statusMessages.innerHTML = '<div class="alert alert-info">Conectando con DGR Online...</div>';
    executeBtn.disabled = true;
    executeBtn.textContent = 'Procesando...';
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = (progress + 5) % 100;
        progressBarFill.style.width = `${progress}%`;
        progressBarFill.setAttribute('aria-valuenow', progress);
    }, 200);

    const desde = document.getElementById('Desde2').value;
    const hasta = document.getElementById('Hasta2').value;
    const usuario = document.getElementById('CUIT2').value;
    const password = document.getElementById('password2').value;
    
    document.querySelector('input[name="desde"]').value = desde;
    document.querySelector('input[name="hasta"]').value = hasta;
    
    const fromParts = desde.split('-');
    const toParts = hasta.split('-');
    const desdeFormatted = `${fromParts[2]}/${fromParts[1]}/${fromParts[0]}`;
    const hastaFormatted = `${toParts[2]}/${toParts[1]}/${toParts[0]}`;

    const params = new URLSearchParams({
        desde: desdeFormatted,
        hasta: hastaFormatted,
        usuario: usuario,
        password: password
    }).toString();

    statusMessages.innerHTML = '<div class="alert alert-info">Iniciando descarga de retenciones...</div>';

    fetch(`http://127.0.0.1:8000/NewRentas?${params}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data from API');
        return response.json();
    })
    .then(data => {
        clearInterval(progressInterval);
        progressBarFill.style.width = '100%';
        
        if (data.success) {
            statusMessages.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            document.querySelector('#step2').classList.add('completed');
            executeBtn.textContent = 'Completado';
            
            setTimeout(() => {
                $('#modal-api2').modal('hide');
                executeBtn.disabled = false;
                executeBtn.textContent = 'Ejecutar';
                progressBar.style.display = 'none';
                statusMessages.style.display = 'none';
            }, 3000);
        } else {
            handleError(statusMessages, executeBtn, progressBar, data.message || 'Error desconocido', data.error);
        }
    })
    .catch(error => handleError(statusMessages, executeBtn, progressBar, error.message));
}

function handleError(statusMessages, executeBtn, progressBar, message, details = '') {
    statusMessages.innerHTML = `<div class="alert alert-danger">
        Error: ${message}<br>
        ${details}
    </div>`;
    executeBtn.disabled = false;
    executeBtn.textContent = 'Reintentar';
    progressBar.style.display = 'none';
}
