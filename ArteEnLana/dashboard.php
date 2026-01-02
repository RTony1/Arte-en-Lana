<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard | Electro Puno</title>

    <!-- Iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <style>
        
        :root {
            --primary: #2563eb;
            --secondary: #1e293b;
            --bg: #f1f5f9;
            --card-bg: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Segoe UI", Roboto, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--text);
        }

        /* ================= HEADER ================= */
        header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 30px 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        header h1 {
            margin: 0;
            font-size: 32px;
        }

        header p {
            margin-top: 8px;
            font-size: 16px;
            opacity: 0.9;
        }

        /* ================= CONTENEDOR ================= */
        .container {
            max-width: 1100px;
            margin: 40px auto;
            padding: 0 20px;
        }

        .section-title {
            font-size: 22px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--secondary);
        }

        /* ================= GRID ================= */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 25px;
        }

        /* ================= TARJETAS ================= */
        .card {
            background-color: var(--card-bg);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 6px;
            width: 100%;
            background: var(--primary);
        }

        .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        .card i {
            font-size: 40px;
            color: var(--primary);
            margin-bottom: 15px;
        }

        .card h3 {
            margin: 0 0 10px;
            font-size: 20px;
        }

        .card p {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.5;
        }

        /* ================= FOOTER ================= */
        footer {
            text-align: center;
            padding: 20px;
            margin-top: 60px;
            font-size: 14px;
            color: var(--muted);
        }

        footer span {
            color: var(--primary);
            font-weight: 600;
        }
    </style>
</head>
<body>

    <!-- ================= HEADER ================= -->
    <header>
        <body>
            <img src="imagenes/imagen Electro Puno.png" alt="ElectroPuno" class="logo">
        </body>
        <h1>📊 Dashboard Electro Puno</h1>
        <p>Sistema de análisis y pronóstico de consumo eléctrico</p>
    </header>

    <!-- ================= CONTENIDO ================= -->
    <div class="container">

        <div class="section-title">
            <i class="fa-solid fa-layer-group"></i>
            <span>Módulos disponibles</span>
        </div>

        <div class="grid">

            <!-- SARIMA -->
            <div class="card" onclick="window.location.href='grafico_sarima.php'">
                <i class="fa-solid fa-chart-line"></i>
                <h3>Pronóstico SARIMA</h3>
                <p>
                    Visualiza el comportamiento histórico y el pronóstico
                    del consumo eléctrico mensual usando modelos SARIMA.
                </p>
            </div>

            <!-- Estadísticas -->
            <div class="card" onclick="window.open('estadisticas.php', '_blank')">
                <i class="fa-solid fa-chart-pie"></i>
                <h3>Estadísticas</h3>
                <p>
                    Análisis descriptivo de consumo, importes y distribución
                    por zonas y tarifas.
                </p>
            </div>

            <!-- Futuro -->
            <div class="card" onclick="window.open('index.php', '_blank')">
                <i class="fa-solid fa-database"></i>
                <h3>Gestión de Datos</h3>
                <p>
                    Importación y administración de archivos Excel y CSV
                    (próximamente).
                </p>
            </div>

        </div>
    </div>

    <!-- ================= FOOTER ================= -->
    <footer>
        © 2025 <span>Electro Puno</span> · Proyecto SARIMA · Ingeniería de Software y Sistemas
    </footer>

</body>
</html>