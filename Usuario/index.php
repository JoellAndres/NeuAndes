<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ingreso</title>
    <link rel="stylesheet" href="estilopaginadeingreso.css">
</head>
<body>
    <div class="container">
        <h2>Ingreso</h2>
        <h3>¿Tenés una cuenta?</h3>
        <form action="login.php" method="post">
            <!-- Mostrar errores si existen -->
            <?php if (isset($_GET['error'])): ?>
                <p class="error"><?php echo htmlspecialchars($_GET['error']); ?></p>
            <?php endif; ?>

            <!-- Campo para el nombre de usuario -->
            <input type="text" name="Nombre" placeholder="Nombre" required>

            <!-- Campo para la contraseña -->
            <input type="password" name="Clave" placeholder="Contraseña" required>

            <!-- Botón de envío -->
            <button type="submit">Ingresar</button>

            <!-- Link para registrarse -->
            <div class="link">
                <a href="http://localhost/Paginaweb/Usuario/Registro.php">Registrarse</a>
            </div>
        </form>
    </div>
</body>
</html>
