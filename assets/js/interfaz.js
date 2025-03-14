//Funciones inputs formulario
const inputPesoEquipaje = document.querySelector("#pesoEquipaje");
const rdoSelecionAsiento = document.getElementsByName("elejirAsientos");
let textoPesoEquipaje = document.querySelector("#textoPesoEquipaje");
const botonCotizarVuelo = document.querySelector("#botonCotizarVuelo");
let textoModalCotizacionVuelo = document.querySelector("#textoModalCotizacionVuelo");
let selecionOrigen = document.querySelector("#selecionOrigen");
let selecionDestino = document.querySelector("#selecionDestino");
let cantidadPasajeros = document.querySelector("#cantiadPasajeros");
let modalMostrarCotizacion = document.querySelector("#modalMostrarCotizacion");

const valoresEquipaje =["5KG-10KG","10KG-20KG","20KG-30KG","30KG-40KG","40KG-50GK","50KG-60KG"]



function funcionAgregarDecimalesValor(valor){
    let valorString = valor.toString();
    if(valorString.length==5){
        
        return `${valorString.substring(0,2)}.${valorString.substring(2,6)}`
        
    }
    else if(valorString.length==6){
        return `${valorString.substring(0,3)}.${valorString.substring(3,7)}`
    }
    else if(valorString.length==7){
        return `${valorString.substring(0,1)}'${valorString.substring(1,4)}.${valorString.substring(4,8)}`
    }
    else{
        return valor;
    }
}

function mostrarPesoEquipajeFormulario(){
    
    
    let pesoEquipajActual =  inputPesoEquipaje.value;
    
    
    textoPesoEquipaje.innerHTML =  `Elije el peso aproximado   Peso: ${valoresEquipaje[pesoEquipajActual]}`;
     
}



function funcionMostrarModalCotizacionVuelo(){
    const botonCerrarModal = document.querySelector("#botonCerrarModal");
    let ciudadOrigen=selecionOrigen.value;
    let ciudadDestino = selecionDestino.value;
    let cantidadViajeros = cantiadPasajeros.value;
    let pesoEquipajActual =  valoresEquipaje[inputPesoEquipaje.value];
    let asientoSeleccionado = null;
    let precioVuelo =0;
    let precioMaletas=0;
    let precioAsiento=0;

    //Traer el radio clikeado
    rdoSelecionAsiento.forEach(asientoClikeado => {
        if(asientoClikeado.checked){
             asientoSeleccionado = asientoClikeado.value;
        }
    });
  
    if(cantidadViajeros<0 || cantidadViajeros>50){
    setTimeout(()=>{
         botonCerrarModal.click();

    },100)
    
    }
    //calcualr precio vuelo
    if (ciudadDestino=="Medellin"){
        precioVuelo=80000*cantidadViajeros;
    }
   else if(ciudadDestino=="Pereira"){
        precioVuelo=70000*cantidadViajeros;
    }
    else if (ciudadDestino=="Cartagena" || ciudadDestino=="San Andres"){
        precioVuelo=150000*cantidadViajeros;
    }
    else{
        precioVuelo==100000*cantidadViajeros;
    }
    //Calcular precio maletas
    if(pesoEquipajActual=="50KG-60KG"){
        
         precioMaletas = 15000;
    }
    //Calcular Precio Asiento
    if(asientoSeleccionado=="Asiento Ejecutivo"){
        precioAsiento=20000*cantidadViajeros;
        

    }
    else if(asientoSeleccionado=="Asiento Vip"){
        precioAsiento=40000*cantidadViajeros;
    }
    else{
        precioAsiento=0;
    }
    let totalPagar=(precioVuelo+precioMaletas+precioAsiento);
    //ReAsigno  las variables para agregarle el precio con la denominacion
    let precioVueloMarcado = funcionAgregarDecimalesValor(precioVuelo);
    let precioAsientoMarcado = funcionAgregarDecimalesValor(precioAsiento);
    let precioMaletasMarcado = funcionAgregarDecimalesValor(precioMaletas);
    let precioTotalMarcado = funcionAgregarDecimalesValor(totalPagar);
   
     textoModalCotizacionVuelo.innerHTML=`
     <h4><span class="txtTituloModal">Origen <i class="fa-solid fa-location-dot"></i>:</span> </h4> ${ciudadOrigen} <hr> 
     <h4><span class="txtTituloModal">Destino <i class="fa-solid fa-location-arrow"></i>:</span> </h4> ${ciudadDestino} <br> Precio Boletos: <b> ${precioVueloMarcado} $</b> <hr>
     <h4><span class="txtTituloModal">Cantidad Pasajeros <i class="fa-solid fa-people-group"></i>:</span> </h4> ${cantidadViajeros} <hr>
     <h4><span class="txtTituloModal">Peso Equipaje <i class="fa-solid fa-briefcase"></i>:</span> </h4> ${pesoEquipajActual} <br> Precio Adicional:<b> ${precioMaletasMarcado}$ </b><hr>
     <h4><span class="txtTituloModal">Tipo de asiento <i class="fa-solid fa-sitemap"></i>:</span> </h4> ${asientoSeleccionado} <br> Precio Adicional:<b> ${precioAsientoMarcado}$</b><hr>
     <h4><span class="txtTituloModal">Total <i class="fa-solid fa-money-check-dollar"></i>:</span> </h4> <b> ${precioTotalMarcado}$ </b>
     
     
   


     `;
};

inputPesoEquipaje.addEventListener('change',mostrarPesoEquipajeFormulario);
botonCotizarVuelo.addEventListener('click',funcionMostrarModalCotizacionVuelo);

