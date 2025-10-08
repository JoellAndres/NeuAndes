<?php
session_start();
include "C://xampp/htdocs/Paginaweb/Usuario/db_conn.php";

if (isset($_POST['Nombre']) && isset($_POST['Clave'])) {
    $Nombre = trim($_POST['Nombre']);
    $Clave = trim($_POST['Clave']);

    if (empty($Nombre)) {
        header("Location: index.php?error=El nombre es requerido");
        exit();
    } elseif (empty($Clave)) {
        header("Location: index.php?error=La contraseña es requerida");
        exit();
    } else {
        $sql = "SELECT * FROM users WHERE Nombre = ? AND Clave = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $Nombre, $Clave);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $_SESSION['Nombre'] = $row['Nombre'];
            $_SESSION['id'] = $row['id'];
            header("Location: http://localhost/Paginaweb/Usuario/home.php");
            exit();
        } else {
            header("Location: index.php?error=Nombre o contraseña incorrectos");
            exit();
        }
    }
} else {
    header("Location: index.php");
    exit();
}
?>
