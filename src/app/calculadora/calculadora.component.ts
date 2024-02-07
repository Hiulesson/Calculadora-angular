import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {

  operacaoAnterior: any = '';
  operacaoAtual: any = '';
  primeiroOperador = true;

  adicionarAoVisor(value: any) { // Metodo onde distingui se é um número ou uma operação. 
    if (this.primeiroOperador) {
      if (+value >= 0 || value === ".") {
        this.adicionarDigito(value)
      } else {
        this.processaOperacao(value)
      }
    }else{
      this.operacaoAnterior = "";
      this.operacaoAtual = "";
      this.primeiroOperador = true;
      if(+value >= 0 || value === "."){
        this.adicionarDigito(value);
      } else{
        this.processaOperacao(value);
      }
    }
  }

  adicionarDigito(digito: any) { // Saída dos numero que o usuario vai usar para o operação. De 0 a 9.
    
    if (digito === "." && this.operacaoAtual.includes(".")) {
      return
    }
    this.operacaoAtual += digito;
    this.atualizarVisor(null,null,null,null);
  }

  processaOperacao(operacao: any) { // Aqui onde é escolhido que tipo de operacao será realizadar. Se é +,-,* ou /. 
  
    if (this.operacaoAtual === "" && operacao !== "C") {
      if (this.operacaoAnterior !== "") {
        this.alterarOperacao(operacao);
      }
      return
    }
    let valorOperacao: any;
    let anterior = +this.operacaoAnterior.split(" ")[0];
    let atual = +this.operacaoAtual;

    switch (operacao) {
      case "+":
        valorOperacao = anterior + atual;
        this.atualizarVisor(valorOperacao, operacao, atual, anterior);
        break;
      case "-":
        valorOperacao = anterior - atual;
        this.atualizarVisor(valorOperacao, operacao, atual, anterior);
        break;
      case "X":
        valorOperacao = anterior * atual;
        this.atualizarVisor(valorOperacao, operacao, atual, anterior);
        break;
        case"/":
        valorOperacao = anterior / atual;
        this.atualizarVisor(valorOperacao, operacao, atual, anterior);
        break;
        case"DEL":
        this.processarOperacaoDel()
        break;
        case"CE":
        this.processarOperacaoCe()
        break;
        case"C":
        this.processarOperacaoC()
        break;
        case"=":
        this.processarOperacaoIgual()
        break;
    }
  }

  alterarOperacao(operacao: any) {

    const operacaoMat = ["+","-", "/","*"]
    if(!operacao.includes(operacao)){
      return 
    } 
    this.operacaoAnterior = this.operacaoAnterior.trim().slide(0, -1) + operacao;

  }

  atualizarVisor(
    valorOperacao = null,
    operacao = null,
    atual: any,
    anterio: any
  ) {
    if(valorOperacao !== null){
      if( anterio === 0 ){
        valorOperacao = atual;
      }
      this.operacaoAnterior = `${atual} ${operacao}`
      if(anterio > 0){
        this.operacaoAnterior = `${anterio} ${operacao} ${atual} =` // Processo onde mostrar os numero anteriores. Na tela da calculadora.
        this.operacaoAtual = valorOperacao;
      }else{
        this.operacaoAtual = "";
      }
      
    }

  }

  processarOperacaoDel(){
    this.operacaoAtual = this.operacaoAtual.slide(0, -1);
  }

  processarOperacaoCe(){
    this.operacaoAtual = "";
  }

  processarOperacaoC(){
    this.operacaoAtual = "";
    this.operacaoAnterior = "";
  }

  processarOperacaoIgual(){
    let operacao = this.operacaoAnterior.split(" ")[1];
    this.primeiroOperador = false;
    console.log("aa")
    this.processaOperacao(operacao);

  }
}