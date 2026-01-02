<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Conexión DB
$mysqli = new mysqli('localhost', 'root', 'Myserver', 'electro_puno');
$mysqli->set_charset('utf8mb4');

if ($mysqli->connect_error) {
    die('Error de conexión: ' . $mysqli->connect_error);
}

function formatNum($n) {
    return number_format($n, 2, '.', ',');
}

// Total registros
$totalRegistros = $mysqli->query(
    "SELECT COUNT(*) total FROM consumo_electrico"
)->fetch_assoc()['total'];

// Queries
$estadisticasPeriodo = $mysqli->query("
    SELECT periodo, COUNT(*) cantidad,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM consumo_electrico),2) porcentaje
    FROM consumo_electrico
    GROUP BY periodo
    ORDER BY periodo DESC
");

$estadisticasProvincia = $mysqli->query("
    SELECT provincia, COUNT(*) cantidad,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM consumo_electrico),2) porcentaje
    FROM consumo_electrico
    GROUP BY provincia
    ORDER BY cantidad DESC
    LIMIT 5
");

$estadisticasDistrito = $mysqli->query("
    SELECT distrito, COUNT(*) cantidad,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM consumo_electrico),2) porcentaje
    FROM consumo_electrico
    GROUP BY distrito
    ORDER BY cantidad DESC
    LIMIT 5
");

$estadisticasConsumo = $mysqli->query("
    SELECT consumo, COUNT(*) cantidad,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM consumo_electrico),2) porcentaje
    FROM consumo_electrico
    GROUP BY consumo
    ORDER BY consumo DESC
    LIMIT 5
");
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>📊 Estadísticas - Electro Puno</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f4f6f9;
    margin: 0;
}

/* Header */
.header {
    background: #1e3a8a;
    color: white;
    padding: 20px;
    text-align: center;
}

.header h1 {
    margin: 0;
}

/* Layout */
.container {
    padding: 30px;
    max-width: 1200px;
    margin: auto;
}

/* Cards */
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
}

.card h3 {
    margin: 0;
    color: #374151;
}

.card p {
    font-size: 28px;
    margin-top: 10px;
    font-weight: bold;
    color: #1e3a8a;
}

/* Section */
.section {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
}

.section h2 {
    margin-top: 0;
    border-left: 5px solid #1e3a8a;
    padding-left: 10px;
}

/* Table */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

th, td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
}

th {
    background: #f1f5f9;
    text-align: left;
}

tr:hover {
    background: #f9fafb;
}

/* Buttons */
.actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: white;
}

.btn-primary { background: #2563eb; }
.btn-secondary { background: #6b7280; }

.btn:hover { opacity: 0.9; }
</style>
</head>

<body>

<div class="header">
    <h1>📈 Estadísticas Descriptivas</h1>
    <p>Clientes – Electro Puno</p>
</div>

<div class="container">

    <div class="actions">
        <button class="btn btn-secondary" onclick="window.location.href='dashboard.php'">⬅ Volver al Dashboard</button>
        <button class="btn btn-primary" onclick="location.reload()">🔄 Actualizar</button>
    </div>

    <!-- Cards -->
    <div class="cards">
        <div class="card">
            <h3>Total de Registros</h3>
            <p><?= number_format($totalRegistros) ?></p>
        </div>
    </div>

    <!-- Periodo -->
    <div class="section">
        <h2>Distribución por Periodo</h2>
        <table>
            <tr><th>Periodo</th><th>Cantidad</th><th>%</th></tr>
            <?php while($r=$estadisticasPeriodo->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($r['periodo']) ?></td>
                <td><?= number_format($r['cantidad']) ?></td>
                <td><?= formatNum($r['porcentaje']) ?>%</td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>

    <!-- Provincia -->
    <div class="section">
        <h2>Top 5 Provincias</h2>
        <table>
            <tr><th>Provincia</th><th>Cantidad</th><th>%</th></tr>
            <?php while($r=$estadisticasProvincia->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($r['provincia']) ?></td>
                <td><?= number_format($r['cantidad']) ?></td>
                <td><?= formatNum($r['porcentaje']) ?>%</td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>

    <!-- Distrito -->
    <div class="section">
        <h2>Top 5 Distritos</h2>
        <table>
            <tr><th>Distrito</th><th>Cantidad</th><th>%</th></tr>
            <?php while($r=$estadisticasDistrito->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($r['distrito']) ?></td>
                <td><?= number_format($r['cantidad']) ?></td>
                <td><?= formatNum($r['porcentaje']) ?>%</td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>

    <!-- Consumo -->
    <div class="section">
        <h2>Top 5 Consumos</h2>
        <table>
            <tr><th>Consumo (kWh)</th><th>Cantidad</th><th>%</th></tr>
            <?php while($r=$estadisticasConsumo->fetch_assoc()): ?>
            <tr>
                <td><?= number_format($r['consumo']) ?></td>
                <td><?= number_format($r['cantidad']) ?></td>
                <td><?= formatNum($r['porcentaje']) ?>%</td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>

</div>

</body>
</html>