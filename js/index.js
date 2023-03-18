var limiteParticipantes = 0;

function validarForm() {
  // Código de validação aqui

  if(validaDataEvento() && validaDataNascimento()){
    alert ("Validação oK")
    cadastro()
  }else{
    alert("Você não esta autorizado")
  }

}


function cadastro() {
  limiteParticipantes++
  if(limiteParticipantes <= 100){


  let participantes = [];

  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("fone").value;
  let cpf = document.getElementById("cpf").value;
  let palestra = document.getElementById("nome_evento").value;
  let dataNacimento = document.getElementById("data_nascimento").value;
  let data_brasileira = dataNacimento .split('-').reverse().join('/');
  let dataEvento = document.getElementById("data_evento").value;
  let data_brasileira_Evento =dataEvento .split('-').reverse().join('/');

  if (sessionStorage.getItem("vetor_Participantes")) {
    participantes = JSON.parse(sessionStorage.getItem("vetor_Participantes"));
  };




  let registro = {}
  registro = {
    nome: nome,
    telefone: telefone,
    cpf: cpf,
    dataNascimento: data_brasileira,
    dataEvento: data_brasileira_Evento,
    Palestra: palestra

  }
  participantes.push(registro);
  sessionStorage.setItem("vetor_Participantes", JSON.stringify(participantes));

  return true;

}else{
  alert("Vagas esgotadas")
}

};


function listar() {
  let dados = document.getElementById("colunas");
  let registros = document.getElementsByTagName("tbody")[0];
  let participantes = JSON.parse(sessionStorage.getItem("vetor_Participantes"));

  for (let i = 0; i < participantes.length; i++) {

    let novaLinha = document.createElement("tr");

    registros.appendChild(novaLinha);

    novaLinha.innerHTML = dados.innerHTML;

    for (let indice in novaLinha.childNodes) {

      let celula = novaLinha.childNodes[indice];

      if (celula.nodeName == "TD") {

        switch (celula.dataset.column) {
          case "Nome":
            celula.innerHTML = participantes[i]["nome"];
            break;
          case "Telefone":
            celula.innerHTML = participantes[i]["telefone"];
            break;
          case "Cpf":
            celula.innerHTML = participantes[i]["cpf"]
            break;
          case "Data_de_nascimento":
            celula.innerHTML = participantes[i]["dataNascimento"];
            break;
          case "Data_do_evento":
            celula.innerHTML = participantes[i]["dataEvento"];
            break;
          case "Nome_do_evento":
            celula.innerHTML = participantes[i]["Palestra"];
            break;
        };
      };
    };
  };
  ;

}





function validaDataEvento() {
  let hoje = new Date(); //peda a data e hora atual
  //pega a data do formulário com o id data-evento
  let dataEvento = document.getElementById("data_evento").value;

  // Converte a string "dataEvento" em um objeto Date
  let data = new Date(Date.parse(dataEvento));
  /* o if abaixo compara a data atual com a data do evento
  com a função .getTime() que retorna os milissegundos da data atual
  retire os comentários de console.log abaixo e veja o resultado
  de como o if compara as datas */
  //console.log(data.getTime());
  //console.log(hoje.getTime());
  if (data.getTime() > hoje.getTime()) {
    console.log(`A data ${dataEvento} é maior que a data atual`);
    return true
  } else {
    console.log(`A data ${dataEvento} não é maior que a data atual`);
    return false
  }

}

function validaDataNascimento() {
  let hoje = new Date();
  //pega a data do formulário com o id data-nascimento
  //converte a string "dataNascimento" em um objeto Date
  let dataNascimento = new Date(document.getElementById("data_nascimento").value);
  //pega a data de hoje em milissegundos e subtrai o data de nascimento em milissegundos
  let idadeEmMilissegundos = hoje.getTime() - dataNascimento.getTime();
  //converte a idadeEmMilissegundos em anos
  let idadeEmAnos = idadeEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
  //compara a idadeEmAnos com a idade do usuário
  if (idadeEmAnos >= 18) {
    console.log("A pessoa é maior de idade");
    return true
  } else {
    console.log("A pessoa é menor de idade");
    return false
  }
}

