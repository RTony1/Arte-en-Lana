<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pronóstico SARIMA – Consumo Eléctrico</title>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        body {
            font-family: "Segoe UI", Arial, sans-serif;
            background: #eef1f5;
            margin: 0;
            padding: 0;
        }

        header {
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: white;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            margin: 0;
            font-size: 26px;
        }

        header p {
            margin: 5px 0 0;
            opacity: 0.9;
        }

        main {
            padding: 30px;
        }

        .chart-container {
            width: 100%;
            max-width: 1300px;
            height: 520px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 14px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        }

        canvas {
            width: 100% !important;
            height: 100% !important;
        }

        .actions {
            margin-top: 25px;
            text-align: center;
        }

        button {
            padding: 12px 28px;
            font-size: 16px;
            border: none;
            border-radius: 10px;
            background: #3498db;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        button:hover {
            background: #2980b9;
            transform: translateY(-1px);
        }

        .loader {
            text-align: center;
            font-size: 18px;
            padding: 40px;
            color: #555;
        }

        footer {
            text-align: center;
            padding: 15px;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>

<header>
    <h1>📈 Pronóstico SARIMA – Consumo Eléctrico</h1>
    <p>Modelo de series temporales (SARIMA)</p>
</header>

<main>

    <div id="loader" class="loader">⏳ Cargando datos y generando gráfico...</div>

    <div class="chart-container" style="display:none;">
        <canvas id="sarimaChart"></canvas>
    </div>

    <div class="actions">
        <button onclick="window.location.href='dashboard.php'">⬅ Volver al Dashboard</button>
    </div>

</main>

<footer>
    Proyecto de Análisis de Series Temporales – SARIMA
</footer>

<script>
fetch('sarima_resultado.json')
    .then(response => response.json())
    .then(data => {

        document.getElementById('loader').style.display = 'none';
        document.querySelector('.chart-container').style.display = 'block';

        // 🔹 Histórico
        const histLabels = data.historico.labels;
        const histValues = data.historico.values;

        // 🔹 Pronóstico
        const forecastLabels = data.forecast.labels;
        const forecastValues = data.forecast.values;

        // 🔹 Unificar eje X
        const allLabels = histLabels.concat(forecastLabels);

        // 🔹 Series alineadas
        const historicoSerie = histValues.concat(
            new Array(forecastValues.length).fill(null)
        );

        const forecastSerie = new Array(histValues.length).fill(null)
            .concat(forecastValues);

        const ctx = document.getElementById('sarimaChart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: allLabels,
                datasets: [
                    {
                        label: 'Histórico',
                        data: historicoSerie,
                        borderColor: '#1f77b4',
                        backgroundColor: 'rgba(31,119,180,0.15)',
                        borderWidth: 3,
                        tension: 0.35,
                        pointRadius: 4
                    },
                    {
                        label: 'Pronóstico SARIMA',
                        data: forecastSerie,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231,76,60,0.15)',
                        borderDash: [8,6],
                        borderWidth: 3,
                        tension: 0.35,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Evolución histórica y pronóstico del consumo eléctrico (kWh)',
                        font: { size: 20 }
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => 
                                `${ctx.dataset.label}: ${ctx.parsed.y?.toLocaleString()} kWh`
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Periodo (Año-Mes)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Consumo (kWh)'
                        },
                        ticks: {
                            callback: value => value.toLocaleString()
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error(error);
        document.getElementById('loader').innerHTML =
            "❌ Error al cargar los datos SARIMA.";
    });
</script>

</body>
</html>