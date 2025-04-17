document.addEventListener('DOMContentLoaded', function () {
    console.log('rentas.js loaded');

    let tableData = [];      // Aquí guardaremos todos los registros
    let filteredData = [];   // Datos filtrados según "Desde" y "Hasta"
    let currentPage = 1;     // Página actual
    const rowsPerPage = 10;  // Cantidad de registros por página
    let downloadedPdfs = {}; // Mapa para almacenar los PDFs descargados por ID

    // Cargar los PDFs descargados en la inicialización
    loadDownloadedPDFs();

    // Función para cargar los PDFs descargados
    async function loadDownloadedPDFs() {
        try {
            // Intentar cargar desde localStorage primero
            const storedFiles = localStorage.getItem('downloadedRetentionPdfs');
            if (storedFiles) {
                downloadedPdfs = JSON.parse(storedFiles);
                console.log('Loaded PDFs from localStorage:', Object.keys(downloadedPdfs).length);
            } else {
                // Si no hay datos en localStorage, intentar cargar desde el archivo JSON
                const response = await fetch('http://192.168.1.36:8000/get_downloaded_pdfs');
                if (response.ok) {
                    const data = await response.json();
                    downloadedPdfs = data.pdfs || {};
                    console.log('Loaded PDFs from server:', Object.keys(downloadedPdfs).length);
                    
                    // Guardar en localStorage para futuros accesos
                    localStorage.setItem('downloadedRetentionPdfs', JSON.stringify(downloadedPdfs));
                }
            }
        } catch (e) {
            console.error("Error loading downloaded PDFs", e);
        }
    }

    // Función para extraer el número de comprobante y año de una URL
    function extractCompAndYearFromURL(url) {
        if (!url) return null;
        
        // Pattern for URLs like: araret_f12003i.aspx?91543,2025,RCmpRetencion_30999164990.pdf
        const urlMatch = url.match(/araret_f12003i.aspx\?(\d+),(\d{4})/);
        if (urlMatch) {
            return {
                compNumber: urlMatch[1],
                year: urlMatch[2]
            };
        }
        return null;
    }

    async function fetchData() {
        // Limpiar datos anteriores
        tableData = [];
        filteredData = [];

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');

        try {
            // Obtener parámetros actuales
            const desde = document.querySelector('input[name="desde"]').value;
            const hasta = document.querySelector('input[name="hasta"]').value;

            if (!desde || !hasta) {
                console.log('No hay fechas definidas');
                renderTable(currentPage); // Renderizar tabla vacía
                renderPaginationControls();
                return;
            }

            // Formatear fechas para la API
            const fromParts = desde.split('-');
            const toParts = hasta.split('-');
            const desdeFormatted = `${fromParts[2]}/${fromParts[1]}/${fromParts[0]}`;
            const hastaFormatted = `${toParts[2]}/${toParts[1]}/${toParts[0]}`;

            // Construir URL con parámetros
            const params = new URLSearchParams({
                desde: desdeFormatted,
                hasta: hastaFormatted
            }).toString();

            const response = await fetch(`http://192.168.1.36:8000/listaretenciones?${params}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from API');
            }

            const data = await response.json();

            // Asegurarse de que data no sea null o undefined
            if (!data) {
                console.log('No se recibieron datos del servidor');
                return;
            }

            // Combinar solo los registros válidos
            for (const file in data) {
                if (Array.isArray(data[file])) {
                    const validRecords = data[file].filter(record => 
                        record && 
                        record.Nº_Comprobante && 
                        record.Fecha && 
                        record.Cuit_Cuil
                    );
                    tableData = tableData.concat(validRecords);
                }
            }

            // Actualizar las rutas de PDFs para todos los registros
            tableData = tableData.map(item => {
                if (!item || !item.Nº_Comprobante) return item;
                
                // Buscar el PDF local usando el número de comprobante
                const pdfKey = `${item.Nº_Comprobante}.pdf`;
                
                if (downloadedPdfs[pdfKey]) {
                    console.log(`Found local PDF for ${pdfKey}:`, downloadedPdfs[pdfKey]);
                    // Asignar la ruta del PDF local al item
                    item.ArchivoPDF = downloadedPdfs[pdfKey];
                    item.TienePDFLocal = true;
                } else {
                    // Alternativa: intentar extraerlo de la URL si está disponible
                    const compInfo = extractCompAndYearFromURL(item.URL);
                    if (compInfo) {
                        const altPdfKey = `${compInfo.compNumber}.pdf`;
                        if (downloadedPdfs[altPdfKey]) {
                            console.log(`Found local PDF via URL extraction for ${altPdfKey}:`, downloadedPdfs[altPdfKey]);
                            item.ArchivoPDF = downloadedPdfs[altPdfKey];
                            item.TienePDFLocal = true;
                        } else {
                            console.log(`No local PDF found for ${pdfKey} or ${altPdfKey}`);
                            item.TienePDFLocal = false;
                        }
                    } else {
                        console.log(`No local PDF found for ${pdfKey}`);
                        item.TienePDFLocal = false;
                    }
                }
                return item;
            });

            // Filtrar por fecha antes de asignar a filteredData
            const fromDate = new Date(desde);
            const toDate = new Date(hasta);
            
            filteredData = tableData.filter(item => {
                const parts = item.Fecha.split('/');
                const itemDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                return itemDate >= fromDate && itemDate <= toDate;
            });

            // Ordenar por fecha descendente (más reciente primero)
            filteredData.sort((a, b) => {
                const dateA = new Date(a.Fecha.split('/').reverse().join('-'));
                const dateB = new Date(b.Fecha.split('/').reverse().join('-'));
                return dateB - dateA;
            });

            currentPage = 1;
            renderTable(currentPage);
            renderPaginationControls();

        } catch (error) {
            console.error('Error in fetch:', error);
            // Limpiar la tabla en caso de error
            tableData = [];
            filteredData = [];
            renderTable(currentPage);
            renderPaginationControls();
        }
    }

    function applyFilters() {
        const desde = document.querySelector('input[name="desde"]').value;
        const hasta = document.querySelector('input[name="hasta"]').value;

        filteredData = tableData.filter(item => {
            // Convert "dd/mm/yyyy" to Date object for comparison
            const dateParts = item.Fecha.split('/');
            const itemDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            
            return (!desde || new Date(desde) <= itemDate) && (!hasta || itemDate <= new Date(hasta));
        });

        // Reinicia a la primera página y renderiza con los datos filtrados
        currentPage = 1;
        renderTable(currentPage);
        renderPaginationControls();
    }

    function renderTable(page) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = ''; // Limpia las filas existentes

        // Calcula el índice de inicio y fin según la página actual
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);

        console.log(`Rendering page ${page}, records ${startIndex} to ${endIndex}`);

        // Genera las filas para los registros actuales
        pageData.forEach(item => {
            const row = document.createElement('tr');
            
            // Determinar si usar PDF local o remoto
            let pdfUrl = '';
            let isLocalFile = false;
            
            if (item.TienePDFLocal && item.ArchivoPDF) {
                pdfUrl = item.ArchivoPDF;
                isLocalFile = true;
            } else {
                pdfUrl = item.URL || '';
            }
            
            // Log para debugging
            console.log(`Record ${item.Nº_Comprobante}:`, {
                hasLocalPath: item.TienePDFLocal,
                localPath: item.ArchivoPDF,
                remoteUrl: item.URL,
                usingLocal: isLocalFile
            });

            row.innerHTML = `
                <td>${item.Nº_Comprobante}</td>
                <td>${formatCuit(item.Cuit_Cuil)}</td>
                <td>${item.Fecha}</td>
                <td>${formatCurrency(item.Neto_Facturado)}</td>
                <td>${formatCurrency(item.Total_Calculado)}</td>
                <td>${formatCurrency(item.Total_Retenido)}</td>
                <td><span class="badge badge-${item.Estado === 'Pendiente' ? 'warning' : item.Estado === 'Anulado' ? 'danger' : 'success'}">${item.Estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-default view-pdf" 
                            data-pdf="${pdfUrl}"
                            data-local="${item.ArchivoPDF || ''}"
                            data-remote="${item.URL || ''}"
                            data-id="${item.Nº_Comprobante || ''}"
                            title="${isLocalFile ? 'Archivo local disponible' : 'Archivo remoto'}">
                        <i class="fas fa-print" style="color: ${isLocalFile ? '#28a745' : '#007bff'}"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Agregar event listeners para los botones
        document.querySelectorAll('.view-pdf').forEach(button => {
            button.addEventListener('click', async function() {
                const localPath = this.getAttribute('data-local');
                const remotePath = this.getAttribute('data-remote');
                const compId = this.getAttribute('data-id');
                
                if (localPath && localPath.includes('Retenciones')) {
                    console.log('Opening local file:', localPath);
                    try {
                        // Request the full path from backend
                        const response = await fetch('http://192.168.1.36:8000/get_full_path', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ 
                                relative_path: localPath
                            })
                        });
                        
                        if (!response.ok) {
                            const error = await response.json();
                            throw new Error(error.detail || 'Error getting full path');
                        }
                        
                        const data = await response.json();
                        console.log('Full path received:', data.full_path);
                        const fileUrl = 'file:///' + data.full_path.replace(/\\/g, '/');
                        console.log('Opening URL:', fileUrl);
                        window.open(fileUrl, '_blank');
                    } catch (error) {
                        console.error('Error opening local PDF:', error);
                        // Fallback to remote URL if available
                        if (remotePath) {
                            console.log('Falling back to remote URL:', remotePath);
                            window.open(remotePath, '_blank');
                        }
                    }
                } else if (remotePath) {
                    console.log('Opening remote URL:', remotePath);
                    window.open(remotePath, '_blank');
                }
            });
        });
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(value);
    }

    function formatCuit(value) {
        if (!value) return '';
        return value.replace(/(\d{2})(\d{8})(\d{1})/, '$1-$2-$3');
    }

    function renderPaginationControls() {
        const paginationContainer = document.getElementById('paginationControls');
        paginationContainer.innerHTML = ''; // Limpia los controles existentes

        // Calcula el número total de páginas
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);

        // Botón "Anterior"
        const prevButton = document.createElement('button');
        prevButton.className = 'btn btn-sm btn-secondary mr-2';
        prevButton.textContent = 'Anterior';
        prevButton.disabled = (currentPage === 1);
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(currentPage);
                renderPaginationControls();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Botones de número de página
        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'btn btn-sm ' + (page === currentPage ? 'btn-primary' : 'btn-light');
            pageButton.textContent = page;
            pageButton.addEventListener('click', () => {
                currentPage = page;
                renderTable(currentPage);
                renderPaginationControls();
            });
            paginationContainer.appendChild(pageButton);
        }

        // Botón "Siguiente"
        const nextButton = document.createElement('button');
        nextButton.className = 'btn btn-sm btn-secondary ml-2';
        nextButton.textContent = 'Siguiente';
        nextButton.disabled = (currentPage === totalPages || totalPages === 0);
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(currentPage);
                renderPaginationControls();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    function sortTable(column, order) {
        filteredData.sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            if (column === 'Fecha') {
                // Convert dd/mm/yyyy to Date objects for comparison
                const partsA = valA.split('/');
                const partsB = valB.split('/');
                valA = new Date(`${partsA[2]}-${partsA[1]}-${partsA[0]}`);
                valB = new Date(`${partsB[2]}-${partsB[1]}-${partsB[0]}`);
            } else if (!isNaN(valA) && !isNaN(valB)) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }

            if (valA < valB) return order === 'asc' ? -1 : 1;
            if (valA > valB) return order === 'asc' ? 1 : -1;
            return 0;
        });

        renderTable(currentPage);
        renderPaginationControls();
    }

    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', () => {
            const column = button.getAttribute('data-column');
            const order = button.getAttribute('data-order');
            sortTable(column, order);
            button.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc');
        });
    });

    // Asocia el evento al botón "Buscar"
    document.getElementById('searchBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Evita el submit del formulario
        fetchData(); // Re-fetch with new dates
    });

    // Evita el envío del formulario al presionar Enter
    document.querySelector('#searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });

    // Set default date range if not already set
    if (!document.querySelector('input[name="desde"]').value) {
        const today = new Date();
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        
        // Format dates for input fields
        document.querySelector('input[name="hasta"]').value = today.toISOString().split('T')[0];
        document.querySelector('input[name="desde"]').value = monthAgo.toISOString().split('T')[0];
    }

    // Add keyboard navigation for pagination
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(event) {
            // Check if Ctrl key is pressed
            if (event.ctrlKey) {
                const totalPages = Math.ceil(filteredData.length / rowsPerPage);
                
                // Left arrow = previous page
                if (event.key === 'ArrowLeft') {
                    if (currentPage > 1) {
                        event.preventDefault();
                        currentPage--;
                        renderTable(currentPage);
                        renderPaginationControls();
                    }
                }
                
                // Right arrow = next page
                else if (event.key === 'ArrowRight') {
                    if (currentPage < totalPages) {
                        event.preventDefault();
                        currentPage++;
                        renderTable(currentPage);
                        renderPaginationControls();
                    }
                }
            }
        });
    }

    // Initialize keyboard navigation
    setupKeyboardNavigation();

    // Expose fetchData to window for external access
    window.rentasFetchData = fetchData;

    // Cargar datos iniciales
    fetchData();

});