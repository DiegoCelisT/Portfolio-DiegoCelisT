//REPOSITORIOS GitHub

Repositorios_Diego = "https://api.github.com/users/DiegoCelisT/repos"
let Alldata
let TESTE
fetch (Repositorios_Diego)
    .then (resposta => resposta.json())
    .then (data =>{
        
        Alldata = data; //Aqui vou guardar toda a info

        let Lista_de_repositorios = [] //Lista de repositorios por data

        for (let i=0; i<Alldata.length; i++){
            
            function Ingressar_Repositorio () {
                
                //Eu quero modificar a lista dos repositorios, pois ela por default vêm em orden alfabetico e eu quero por ordem do mais recente ao mais velho, vou resolver esse desafio assim:    
                let Repository = {}
                Repository_Date = Alldata [i].created_at
                
                Ano = Number(Repository_Date.substring(0,4)) // Com isso vou pegar só um pedacinho da string
                Mes = Number(Repository_Date.substring (5,7))-1 // Os meses vão de zero a 11, zero=janeiro, por isso teve que substrair 1
                Dia = Number(Repository_Date.substring (8,10))
                Formatted_Date = new Date(Ano, Mes, Dia) // Correta representação de uma Data em JS
                
                //Vou usar Date.parse(), seguindo a documentação, isso transforma uma string que representa uma data e retorna o número de milissegundos desde 1º de janeiro de 1970, hora local 00:00:00. Dessa maneira vou puder ordenar depois 
                Data_em_milisegundos = Date.parse (Formatted_Date)  
                
                Name = Alldata [i].name
                Repository.Name = Name.replace(/[_-]/g, " ");
                Repository.Date = Data_em_milisegundos
                Repository.Description = Alldata [i].description
                Repository.Link = Alldata [i].html_url
                Repository.Demo = `https://diegocelist.github.io/${Name}/`
                Repository.has_pages = Alldata [i].has_pages
                
                return Repository
            }
            Lista_de_repositorios.push (Ingressar_Repositorio ())
            
        }
        
    //Agora vou ordenar meu objeto com o uso da função sort (), ordenamento em relação ao parâmetro "Date"
        
    Lista_Ordenada= Lista_de_repositorios.sort(((a, b) => b.Date - a.Date))
    console.table (Lista_Ordenada)
    
    //Agora que eu tenho a info que queria em um objeto só, vou passar isso para minha página

    function createCard (name, description, link, demo, has_pages){ //Inclui um 5to parametro (has_pages) para que quando o repositorio não tenha demo, então não mostre nenhum botão :D

    //Vamos criar os elementos de um novo card:
    
    let card_el = document.createElement ("article")
    let card_name_el = document.createElement ("h4")
    let card_body_el = document.createElement ("div")
    let card_description_el = document.createElement ("p")
    let card_nav_el =document.createElement ("nav")
    let card_link_el = document.createElement ("a")
    let card_demo_el = document.createElement ("a")

    
    //Agora vamos a relocalizar esses elementos:
    
    //dentro do article (card_el) têm o título (title_el) e um div (card_body_el):
    card_el.appendChild (card_name_el)
    card_el.appendChild (card_body_el)
    
    //dentro do div (card_body_el) têm uma descrição (card_description_el), e um nav:
    card_body_el.appendChild (card_description_el)
    card_body_el.appendChild (card_nav_el)

    //Dentro do nav tem um link e um demo
    card_nav_el.appendChild (card_link_el)
    card_nav_el.appendChild (card_demo_el)
    
    
    //Esses items estão vazios, agora vamos preenchê-los:
    card_name_el.textContent = name
    card_description_el.textContent = description

    card_link_el.textContent = "REPOSITÓRIO"
    card_link_el.href = link
    card_link_el.target = "_blank"
    card_link_el.valor="noopener"

    card_demo_el.textContent = "VER DEMO"
    card_demo_el.href = demo
    card_demo_el.target = "_blank"
    card_demo_el.valor="noopener"

    if(!has_pages){
        card_nav_el.removeChild(card_demo_el)
    }
    return card_el
    }

for (let i=0; i<Alldata.length; i++){

let Repositorios = document.getElementById ("Repositorios")
Repositorios.appendChild(createCard (Lista_Ordenada[i].Name, Lista_Ordenada[i].Description, Lista_Ordenada[i].Link, Lista_Ordenada[i].Demo, Lista_Ordenada[i].has_pages))

}

})
    

