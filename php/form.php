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
        echo json_encode('Llena todos los campos');
    }else{
        mail($destinatario, $asunto, $mensajeCompleto, $header);
        echo json_encode('Correcto');
    }
?>
