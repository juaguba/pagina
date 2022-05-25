<?php
    $destinatario = 'juaguba_25@hotmail.com';
    $nombre =$_POST['nombre'];
    $email =$_POST['email'];
    $celular =$_POST['celular'];
    $asunto =$_POST['asunto'];
    $mensaje =$_POST['mensaje'];

    $header = "Enviado desde la pagina web";
    $mensajeCompleto = $mensaje . "\nAtentamente: " . $nombre
    
    if($nombre === '' || $email === '' || $celular === '' || $asunto === '' || $mensaje === ''){
        mail($destinatario, $asunto, $mensajeCompleto, $header);
    }
?>