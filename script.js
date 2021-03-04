const d = document;

//Ao recarregar a página se ativam as funcões:
d.addEventListener("DOMContentLoaded", (e) => {
    contactFormValidations ()
})

//Variaveis do DOM vão ficar com o prefixo $ (boas práticas de programação)
function contactFormValidations (){
    const $form = d.querySelector (".contact-form"),
    $inputs = d.querySelectorAll (".contact-form [required]");

    $inputs.forEach (input => {
        const $span = d.createElement ("span");
        $span.id = input.name;
        $span.textContent = input.title; //Vai trazer aquele mensagem que botamos nos titles de HTMLS
        $span.classList.add("contact-form-error", "none")
        input.insertAdjacentElement("afterend",$span)
    })

    //Mostrar a mensagem quando o usuario escrever e o formulario não esteja bem preenchido
    d.addEventListener("keyup", e=> {
        if(e.target.matches(".contact-form [required]")){
            let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;
            //se faz um cortocircuito para o caso do textarea que não tem um pattern nativo
            if(pattern && $input.value !==""){ //Adiciono aquele segundo parâmetro para a mensagem não aparecer quando o usuario ainda não escreveu nada
                
                let regex = new RegExp (pattern);
                return !regex.exec ($input.value)
                ? d.getElementById ($input.name).classList.add ("is-active")
                : d.getElementById ($input.name).classList.remove ("is-active")
            }
            //Aqui para o assunto que não tem um pattern definido
            if(!pattern){
                
                return $input.value === ""
                ? d.getElementById ($input.name).classList.add ("is-active")
                : d.getElementById ($input.name).classList.remove ("is-active")
            }
        }
        
    })

}


//Aqui estou implementando os pre-loaders do formulario, tipo para quando a página demorar em enviar o formulario aparecer uma imagem que faça saber ao usuario que se está carregando:        

d.addEventListener ("submit", (e) => {
    //e.preventDefault (); //Depois dos testes já tirei isso aqui para que agora sim se processe o formulario
    //alert ("Muito obrigado pela mensagem! Pode continuar olhando a página se quiser")

    const $form = d.querySelector (".contact-form")
    const $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

    $loader.classList.remove ("none")

    //vou simular um Loading de 3s XD:

    setTimeout(()=>{
        $loader.classList.add("none");
        $response.classList.remove ("none");
        $form.reset()

        setTimeout(()=>$response.classList.add ("none"),2000);
    }, 2000);
})
           

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
                
                Repository.Name = Alldata [i].name
                Repository.Date = Data_em_milisegundos
                Repository.Description = Alldata [i].description
                Repository.Demo_url = Alldata [i].html_url
                Repository.Link = `https://diegocelist.github.io/${Repository.Name}/`
                
                return Repository
            }
            Lista_de_repositorios.push (Ingressar_Repositorio ())
            
        }
        
       
        
       //Agora vou ordenar meu objeto com o uso da função sort (), ordenamento em relação ao parâmetro "Date"
        
        Lista_Ordenada= Lista_de_repositorios.sort(((a, b) => a.Date - b.Date))
        console.table (Lista_Ordenada)

        //TESTE = Alldata [20]
        //console.log (TESTE.name) //Nome do repositorio
        //console.log (TESTE.svn_url) //Link direto ao repositorio
        //console.log (TESTE.description) //Descrição no Readme
        //console.log (TESTE.html_url) //Link ao DEMO
    })
    