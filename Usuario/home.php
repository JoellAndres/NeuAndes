<?php  
session_start();
$id = $_SESSION['id'];
setcookie("id", $id, time() + 7200, '/');

if (isset($_SESSION['id']) && isset($_SESSION['Nombre'])) {
    
    header("Location: http://localhost/Paginaweb/indexcantcompras.html");
    exit(); 
} else {
    
    header("Location: http://localhost/Paginaweb/Usuario/index.php");
    exit();
}
?>

<?php 
session_start();

if (!isset($_SESSION['Nombre'])) {
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
</head>
<body>
    <h1>Bienvenido, <?php echo htmlspecialchars($_SESSION['Nombre']); ?>!</h1>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>
