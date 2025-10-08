<?php
require_once "C://xampp/htdocs/Paginaweb/Usuario/db_conn.php";
$error = false;

if (isset($_POST['signup'])) {
    $Nombre = mysqli_real_escape_string($conn, $_POST['Nombre']);
    $Clave = mysqli_real_escape_string($conn, $_POST['Clave']);
    $Mail = mysqli_real_escape_string($conn, $_POST['Mail']);

    if (!preg_match("/^[a-zA-Z ]+$/", $Nombre)) {
        $Nombre_error = "Ingrese su nombre correctamente";
        $error = true;
    }

    if (!preg_match("/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $Mail)) {
        $Mail_error = "Ingrese un correo electrónico válido";
        $error = true;
    }

    if (strlen($Clave) < 6) {
        $Clave_error = "La contraseña debe tener al menos 6 caracteres";
        $error = true;
    }

    if (!$error) {
        $sql = "INSERT INTO users (Nombre, Clave, Mail) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $Nombre, $Clave, $Mail);

        if ($stmt->execute()) {
            header("Location: http://localhost/Paginaweb/Usuario/index.php");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }
    }
}
?>

<!doctype html>
<html lang="es">
  <head>
    <title>Registro</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="estilosregistro.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <section class="container">
      <div class="form-wrapper">
        <h2>¡Registrate!</h2>
        <p>Tienes que completar estos campos para poder Registrarte </p>
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
          <!-- Campo Nombre -->
          <div class="form-group">
            <label for="Nombre">Nombre</label>
            <input type="text" name="Nombre" id="Nombre" placeholder="Tu nombre completo" required>
            <span><?php if (isset($Nombre_error)) echo $Nombre_error; ?></span>
          </div>

          <!-- Campo Contraseña -->
          <div class="form-group">
            <label for="Clave">Contraseña</label>
            <input type="password" name="Clave" id="Clave" placeholder="Crea una contraseña segura" required>
            <span><?php if (isset($Clave_error)) echo $Clave_error; ?></span>
          </div>

          <!-- Campo Mail -->
          <div class="form-group">
            <label for="Mail">Correo Electrónico</label>
            <input type="email" name="Mail" id="Mail" placeholder="tuemail@ejemplo.com" required>
            <span><?php if (isset($Mail_error)) echo $Mail_error; ?></span>
          </div>

          <!-- Botón de Registro -->
          <button type="submit" name="signup" class="btn-submit">Registrarse</button>

          <!-- Enlace a Login -->
          <p class="login-link">¿Ya tienes una cuenta? <a href="http://localhost/Paginaweb/Usuario/login.php">Inicia sesión aquí</a></p>
        </form>
      </div>
    </section>
  </body>
</html>

