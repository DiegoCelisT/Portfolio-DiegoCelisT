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