$(function(){
    $('.galeria .contenedor-imagen').on('click',function(){
        
        $('#modal').modal;
        var ruta_imagen=($(this).find('img').attr('src'));
        //alert(ruta_imagen);
        $('#imagen-modal').attr('src',ruta_imagen);
    });
    $('#modal').on('click',function(){
        $('#modal').modal('hide');
    });
    
});