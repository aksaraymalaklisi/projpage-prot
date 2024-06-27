// Sidebar

const webMain = document.querySelectorAll('header, main, footer')
const sideMain = document.getElementById("odio")
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function navToggle() { // Queria entender if e else no JS. 
                                   //Isso provavelmente seria muito mais fácil ao trocar para uma pseudoclasse que poderia alternar os valores de um para outro.

    webMain.forEach(element => {
        if (element.style.marginRight === "200px") { // Se o elemento da lista (header, main e footer) tiver 200px de margem na direita
            element.style.marginRight = '0'; // então defina a sua margem para 0.
        } else { // Caso contrário
            element.style.marginRight = '200px'; // defina para 200px.
        }
    });

    if (sideMain.style.width === "200px") { // Se o elemento (sidebar, com id = "odio") tiver 200px de largura (width)
        sideMain.style.width = '0'; // então defina a sua largura para 0.
    } else { // Caso contrário
        sideMain.style.width = '200px'; // defina para 200px.
    }
  }

// Acordeão

const acorde = document.getElementsByClassName("accordion") // Ele não puxa um nodelist igual o querySelectorAll.

console.log(acorde) // Não é um nodelist mesmo.

Array.from(acorde).forEach(element => { // ??? Eu não sei como Array.from() funciona. Nodelist funciona, mas HTMLCollection  não deixa eu usar o array.
    element.addEventListener("click", function() { // Início da função. Cada elemento (botão) da array terá essa função atrelada a ele.
        var acordeBox = element.nextElementSibling; // a var acordeText será o próximo parentesco do botão (nextElementSibling), que é uma caixa de texto (div).  Esse código pode ter me salvado de horas de sofrimento, meu Deus.
        if (acordeBox.style.display === "block") { 
            acordeBox.style.display = "none";
        } else {
            acordeBox.style.display = "block";
        }
    }); // Fim da função do elemento da array.
});
