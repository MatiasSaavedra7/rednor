document.addEventListener('DOMContentLoaded', function() {
    console.log('automation.js loaded');
    
    // Initialize status variables
    let isAutomationRunning = false;
    let statusUpdateInterval = null;
    
    // Elements
    const statusBadge = document.getElementById('automationStatusBadge');
    const lastRunEl = document.getElementById('lastRun');
    const nextRunEl = document.getElementById('nextRun');
    const startBtn = document.getElementById('startAutomationBtn');
    const stopBtn = document.getElementById('stopAutomationBtn');
    const runNowBtn = document.getElementById('runNowBtn');
    const logsContainer = document.getElementById('automationLogs');
    const statSuccess = document.getElementById('statSuccess');
    const statFails = document.getElementById('statFails');
    const timelineEl = document.getElementById('automationTimeline');
    
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Load initial status
    updateAutomationStatus();
    
    // Set up event handlers
    startBtn.addEventListener('click', startAutomation);
    stopBtn.addEventListener('click', stopAutomation);
    runNowBtn.addEventListener('click', runAutomationNow);
    
    // Update status periodically if automation is running
    function startStatusUpdates() {
        if (statusUpdateInterval) {
            clearInterval(statusUpdateInterval);
        }
        statusUpdateInterval = setInterval(updateAutomationStatus, 30000); // Update every 30 seconds
    }
    
    function stopStatusUpdates() {
        if (statusUpdateInterval) {
            clearInterval(statusUpdateInterval);
            statusUpdateInterval = null;
        }
    }
    
    // Function to update the status display
    async function updateAutomationStatus() {
        try {
            const response = await fetch('http://127.0.0.1:8000/automation_status', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch automation status');
            }
            
            const data = await response.json();
            console.log('Automation status:', data);
            
            // Update UI with status
            isAutomationRunning = data.running;
            
            // Update status badge
            if (data.running) {
                statusBadge.textContent = 'Active';
                statusBadge.className = 'badge badge-success';
                startBtn.disabled = true;
                stopBtn.disabled = false;
                startStatusUpdates();
            } else {
                statusBadge.textContent = 'Inactive';
                statusBadge.className = 'badge badge-secondary';
                startBtn.disabled = false;
                stopBtn.disabled = true;
                stopStatusUpdates();
            }
            
            // Update times
            lastRunEl.textContent = data.last_run || 'Never';
            nextRunEl.textContent = data.next_run || 'Not scheduled';
            
            // Update stats
            statSuccess.textContent = data.success_count || 0;
            statFails.textContent = data.fail_count || 0;
            
            // Update errors/logs
            if (data.errors && data.errors.length > 0) {
                let errorHtml = '<div class="timeline-item bg-danger">' +
                                '<h3 class="timeline-header">Latest Errors</h3>' +
                                '<div class="timeline-body">';
                
                data.errors.slice(-5).forEach(error => {
                    errorHtml += `<p>${error}</p>`;
                });
                
                errorHtml += '</div></div>';
                
                // Add to timeline
                if (timelineEl) {
                    const errorItem = document.createElement('div');
                    errorItem.className = 'time-label';
                    errorItem.innerHTML = errorHtml;
                    timelineEl.appendChild(errorItem);
                }
            }
            
        } catch (error) {
            console.error('Error updating automation status:', error);
            // Show error in UI
            if (logsContainer) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger';
                errorDiv.textContent = `Error: ${error.message}`;
                logsContainer.appendChild(errorDiv);
            }
        }
    }
    
    // Function to start automation
    async function startAutomation() {
        try {
            // Get configuration values
            const startHour = parseInt(document.getElementById('startHour').value);
            const endHour = parseInt(document.getElementById('endHour').value);
            const intervalMinutes = parseInt(document.getElementById('intervalMinutes').value);
            
            // Validate inputs
            if (isNaN(startHour) || isNaN(endHour) || isNaN(intervalMinutes) || 
                startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23 || 
                intervalMinutes < 1) {
                throw new Error('Invalid configuration values');
            }
            
            // Get API test 1 credentials if needed
            const cuit = document.getElementById('automationCuit').value;
            const password = document.getElementById('automationPassword').value;
            
            // Create config object
            const config = {
                enabled: true,
                start_hour: startHour,
                end_hour: endHour,
                interval_minutes: intervalMinutes,
                api_test_1_params: {
                    usuario: cuit,
                    password: password
                }
            };
            
            // Send request to start automation
            const response = await fetch('http://127.0.0.1:8000/start_automation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(config)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to start automation');
            }
            
            const data = await response.json();
            console.log('Start automation response:', data);
            
            // Show success message
            showAlert('success', `Automatización iniciada: ${data.message}`);
            
            // Update UI
            updateAutomationStatus();
            
        } catch (error) {
            console.error('Error starting automation:', error);
            showAlert('danger', `Error al iniciar la automatización: ${error.message}`);
        }
    }
    
    // Function to stop automation
    async function stopAutomation() {
        try {
            const response = await fetch('http://127.0.0.1:8000/stop_automation', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to stop automation');
            }
            
            const data = await response.json();
            console.log('Stop automation response:', data);
            
            // Show success message
            showAlert('success', `Automatización detenida: ${data.message}`);
            
            // Update UI
            updateAutomationStatus();
            
        } catch (error) {
            console.error('Error stopping automation:', error);
            showAlert('danger', `Error al detener la automatización: ${error.message}`);
        }
    }
    
    // Function to run automation immediately
    async function runAutomationNow() {
        try {
            // Get API test 1 credentials
            const cuit = document.getElementById('automationCuit').value;
            const password = document.getElementById('automationPassword').value;
            
            // Create config object
            const config = {
                enabled: true,
                api_test_1_params: {
                    usuario: cuit,
                    password: password
                }
            };
            
            // Send request to run automation now
            const response = await fetch('http://127.0.0.1:8000/run_automation_now', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(config)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to run automation');
            }
            
            const data = await response.json();
            console.log('Run automation now response:', data);
            
            // Show success message
            showAlert('success', `Automatización iniciada manualmente: ${data.message}`);
            
            // Update status after a short delay
            setTimeout(updateAutomationStatus, 2000);
            
        } catch (error) {
            console.error('Error running automation now:', error);
            showAlert('danger', `Error al ejecutar la automatización: ${error.message}`);
        }
    }
    
    // Function to compare retention files manually
    async function compareRetentionFiles() {
        try {
            // Show loading indicator
            const compareBtn = document.getElementById('compareRetentionsBtn');
            if (compareBtn) {
                compareBtn.disabled = true;
                compareBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Comparando...';
            }
            
            const response = await fetch('http://127.0.0.1:8000/compare_retenciones', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to compare retention files');
            }
            
            const data = await response.json();
            console.log('Compare retentions response:', data);
            
            // Reset button
            if (compareBtn) {
                compareBtn.disabled = false;
                compareBtn.innerHTML = 'Comparar ahora';
            }
            
            // Always display all detected changes
            if (data.changes_count > 0) {
                showAlert('warning', `Se encontraron ${data.changes_count} cambios en las retenciones.`);
                
                // Display changes in timeline
                if (timelineEl) {
                    const changesItem = document.createElement('div');
                    changesItem.className = 'time-label';
                    changesItem.innerHTML = `
                        <span class="bg-warning">
                            ${new Date().toLocaleTimeString()}
                        </span>
                        <div class="timeline-item">
                            <h3 class="timeline-header">Cambios Detectados</h3>
                            <div class="timeline-body">
                                <p>Se encontraron ${data.changes_count} cambios en las retenciones:</p>
                                <pre>${JSON.stringify(data.changes, null, 2)}</pre>
                                ${data.api_test3_triggered ? 
                                   '<p class="text-success mt-2"><i class="fas fa-check-circle"></i> Se ha ejecutado automáticamente la actualización</p>' : 
                                   ''}
                            </div>
                        </div>
                    `;
                    timelineEl.appendChild(changesItem);
                    
                    // Scroll to bottom of timeline to show latest changes
                    timelineEl.scrollTop = timelineEl.scrollHeight;
                }
            } else {
                showAlert('success', 'La verificación ha finalizado. No se encontraron cambios en las retenciones.');
            }
            
        } catch (error) {
            console.error('Error comparing retention files:', error);
            showAlert('danger', `Error al comparar archivos: ${error.message}`);
            
            // Reset button on error
            const compareBtn = document.getElementById('compareRetentionsBtn');
            if (compareBtn) {
                compareBtn.disabled = false;
                compareBtn.innerHTML = 'Comparar ahora';
            }
        }
    }
    
    // Utility function to show alert
    function showAlert(type, message) {
        const alertsContainer = document.getElementById('automationAlerts');
        if (!alertsContainer) return;
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        
        alertsContainer.appendChild(alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 5000);
    }
    
    // Add compare button listener if it exists
    const compareBtn = document.getElementById('compareRetentionsBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', compareRetentionFiles);
    }
    
    // Cargar estado de PDFs descargados desde localStorage
    try {
        const storedFiles = localStorage.getItem('downloadedRetentionPdfs');
        if (storedFiles) {
            downloadedPdfs = JSON.parse(storedFiles);
            console.log('Loaded PDFs from storage:', downloadedPdfs);
            
            // Actualizar las rutas de PDFs para todos los registros
            tableData = tableData.map(item => {
                if (!item) return null;
                
                const compInfo = extractCompAndYearFromURL(item.URL);
                if (compInfo) {
                    const pdfKey = `${compInfo.compNumber}.pdf`;
                    if (downloadedPdfs[pdfKey]) {
                        console.log(`Found local PDF for ${pdfKey}:`, downloadedPdfs[pdfKey]);
                        item.ArchivoPDF = downloadedPdfs[pdfKey];
                    } else {
                        console.log(`No local PDF found for ${pdfKey}`);
                    }
                }
                return item;
            }).filter(item => item !== null);
        }
    } catch (e) {
        console.error("Error loading downloaded PDFs from storage", e);
    }
});
