const ListaUL = document.querySelector("#cards-container")
const navDrop = document.querySelector("#menu-gene")
const inputDeBusqueda = document.getElementById("inputBusqueda")
const myModal = document.querySelector('#modal-body')
let array = []


async function Pokedex() {
  try {
    const url = '/pokemons.json'
    const response =  await fetch(url)
    let data =  await response.json()
    if (response.status === 404) {
      throw new Error("Error 404 Pagina " + response.statusText)
    }
    return data
  } catch (error) {
    console.log(error.message)
    console.log(error.cause.code)
    return  "Error lectura de archivo: "+error.cause.input + " es una: "+ error.cause.code
  }
}
function FiltroRepe(lista) {
    let Vista = {}
    let poke = lista.filter(function(pokemon) {
        if(!Vista[pokemon.name]) {
            Vista[pokemon.name] = true
            return true
        }
        return false
    })
    array = poke
    return poke
}
function muestraCards(data) {
  // recorre el arreglo para pintar las tarjetas
  data.forEach((item) => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');

      card.innerHTML = `
              <div class="card">
              <img class="card-img-top" src="${item.ThumbnailImage}" alt="${item.ThumbnailAltText}"></img>
                  <div class="card-body">
                      <h5 class="card-title">Nombre: ${item.name}</h5>
                      <p class="card-text">Tipo: ${item.type.join(" - ")}</p>
                      <a href="#" class="btn btn-primary"  data-bs-toggle="modal" 
                          data-bs-target="#exampleModal"
                          data-id="${item.id}-${item.weakness.join("/")}-${item.weight}-${item.height}">
                          Ver más
                      </a>
                  </div>
              </div>
          `

      ListaUL.appendChild(card)
  })
}
ListaUL.addEventListener("click",(event) => {
  if (event.target.dataset.id) {
    const dataTarget = event.target.dataset.id.split('-')
    myModal.innerHTML = `<h3>ID del pokemon: ${dataTarget[0]}</h3><p>Peso: ${dataTarget[2]}</p>
                                <p>Altura: ${dataTarget[3]}</p><p>Debilidades: ${dataTarget[1]}</p>
        `
  }
})
inputDeBusqueda.addEventListener("input", () => {
    const TerminoBusqueda = inputDeBusqueda.value.toLowerCase()
    let filtradas = array.filter((item) => {
      const nombre = item.name.toLowerCase()
      return nombre.includes(TerminoBusqueda)
    })
    ListaUL.innerHTML = "";
    muestraCards(filtradas)
})
navDrop.addEventListener("click", (event) => {
  if (event.target.dataset.id) {
    const dataTarget = event.target.dataset.id
    if (dataTarget == "gen1") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id <= 151
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas)
    } else if (dataTarget == "gen2") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 151 && pokemon.id <= 251
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas)
    } else if (dataTarget == "gen3") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 251 && pokemon.id <= 386
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas)
    } else if (dataTarget == "gen4") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 386 && pokemon.id <= 494
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas)
    } else if (dataTarget == "gen5") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 494 && pokemon.id <= 649
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas)
    } else if (dataTarget == "gen6") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 649 && pokemon.id <= 721
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas)
    } else if (dataTarget == "gen7") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 721 && pokemon.id <= 809
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas) 
    } else if (dataTarget == "gen8") {
      let filtradas = array.filter((pokemon) => {
        let generacion = pokemon.id > 809 && pokemon.id <= 898
        return generacion
      })
      ListaUL.innerHTML = "";
      muestraCards(filtradas) 
    } else if (dataTarget == "todasgen") {
      ListaUL.innerHTML = "";
      muestraCards(array)
    }
  }
})

async function llamada_Api() {
    const DatosPoke = await Pokedex()
    const filtrados = FiltroRepe(DatosPoke)
    muestraCards(filtrados)
    console.log(filtrados)
}
// falta filtrar por generacion
// falta dejar 3 col por un row asi hasta llegar al final de la generacion
llamada_Api()
  