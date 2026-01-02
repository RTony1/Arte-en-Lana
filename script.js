document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('excelFile');
    const fileInfo = document.getElementById('fileInfo');
    const progress = document.getElementById('progress');
    const progressBar = document.querySelector('.progress-bar');
    const result = document.getElementById('result');

    // ✅ Extensiones permitidas
    const validExtensions = ['.xlsx', '.csv'];

    // --- Validar archivo al seleccionarlo ---
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

            // Verificar extensión
            if (!validExtensions.includes(fileExtension)) {
                fileInfo.innerHTML = `<span style="color: red;">⚠️ Por favor, seleccione un archivo válido (.xlsx o .csv)</span>`;
                fileInput.value = '';
                return;
            }

            // Mostrar información del archivo
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            const typeName = fileExtension === '.csv' ? 'CSV' : 'Excel';
            fileInfo.innerHTML = `
                <strong>Archivo seleccionado:</strong> ${file.name}<br>
                <strong>Tipo:</strong> ${typeName}<br>
                <strong>Tamaño:</strong> ${fileSize} MB
            `;
        }
    });

    // --- Manejar envío del formulario ---
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const file = fileInput.files[0];

        if (!file) {
            result.innerHTML = `<div class="error">⚠️ Por favor, seleccione un archivo Excel o CSV antes de importar.</div>`;
            return;
        }

        // Mostrar barra de progreso
        progress.style.display = 'block';
        progressBar.style.width = '0%';
        result.innerHTML = '';

        const formData = new FormData();
        formData.append('excelFile', file);

        // Simular progreso
        let progressValue = 0;
        const progressInterval = setInterval(() => {
            progressValue += 3;
            if (progressValue <= 90) {
                progressBar.style.width = `${progressValue}%`;
            }
        }, 100);

        // --- Enviar archivo ---
        fetch('import.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            clearInterval(progressInterval);
            progressBar.style.width = '100%';

            if (data.success) {
                const detalles = data.detalles || {};
                result.innerHTML = `
                    <div class="success">
                        <h3>✅ Importación completada correctamente</h3>
                        <div class="result-details">
                            <p><strong>Archivo:</strong> ${detalles.Archivo || 'Desconocido'}</p>
                            <p><strong>Tipo:</strong> ${detalles.Tipo || 'N/A'}</p>
                            <p><strong>Filas procesadas:</strong> ${detalles['Filas procesadas'] ?? 0}</p>
                            <p><strong>Registros exitosos:</strong> <span class="success-count">${detalles['Registros exitosos'] ?? 0}</span></p>
                            <p><strong>Errores:</strong> <span class="error-count">${detalles.Errores ?? 0}</span></p>
                        </div>
                    </div>`;
            } else {
                result.innerHTML = `
                    <div class="error">
                        <h3>❌ Error en la importación</h3>
                        <p>${data.message}</p>
                    </div>`;
            }
        })
        .catch(error => {
            clearInterval(progressInterval);
            result.innerHTML = `
                <div class="error">
                    <h3>❌ Error en el proceso</h3>
                    <p>Ocurrió un problema al procesar el archivo: ${error.message}</p>
                </div>`;
        });
    });
});
