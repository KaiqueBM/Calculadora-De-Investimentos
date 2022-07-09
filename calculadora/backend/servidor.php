<?php

//Criar uma classe para o objeto dados
class Produto {
    public $taxa;
    public $valor;
}

//Valores vindos do front-end
$valor_inicial = $_POST["valor"];
$periodo = $_POST["periodo"];
$dados = [];

//Leitura do arquivo data.JSON
$json = file_get_contents(__DIR__ .'/data.json');
$data_archive = json_decode($json);
$data = array_reverse($data_archive);

//Loop para criar o objeto dados
for ($i = ($periodo-1); $i >= 0; $i--) {
    $object = new stdClass();
    $object->mes = $data[$i]->mes;
    $object->produto1 = new Produto();
    $object->produto2 = new Produto();
    $object->produto3 = new Produto();
    $object->produto4 = new Produto();
    $object->produto5 = new Produto();
    $dados[] = $object;
}

//Loop para tratar a taxa de cada produto
for($i=0; $i <= ($periodo-1); $i++){
    $taxaProd1[$i] = $data[$i]->taxas[0];
    $taxaProd2[$i] = $data[$i]->taxas[1];
    $taxaProd3[$i] = $data[$i]->taxas[2];
    $taxaProd4[$i] = $data[$i]->taxas[3];
    $taxaProd5[$i] = $data[$i]->taxas[4];
}

$acumulado = $valor_inicial; //Gerar dados do produto 1
for ($i=0; $i <= ($periodo-1); $i++) {
    $acumulado = calculaJurosComposto($acumulado, $taxaProd1[$i]);
    $dados[$i]->produto1->valor = $acumulado;
    $dados[$i]->produto1->taxa = $taxaProd1[$i];
}
$acumulado = $valor_inicial; //Gerar dados do produto 2
for ($i=0; $i <= ($periodo-1); $i++) {
    $acumulado = calculaJurosComposto($acumulado, $taxaProd2[$i]);
    $dados[$i]->produto2->valor = $acumulado;
    $dados[$i]->produto2->taxa = $taxaProd2[$i];
}
$acumulado = $valor_inicial; //Gerar dados do produto 3
for ($i=0; $i <= ($periodo-1); $i++) {
    $acumulado = calculaJurosComposto($acumulado, $taxaProd3[$i]);
    $dados[$i]->produto3->valor = $acumulado;
    $dados[$i]->produto3->taxa = $taxaProd3[$i];
}
$acumulado = $valor_inicial; //Gerar dados do produto 4
for ($i=0; $i <= ($periodo-1); $i++) {
    $acumulado = calculaJurosComposto($acumulado, $taxaProd4[$i]);
    $dados[$i]->produto4->valor = $acumulado;
    $dados[$i]->produto4->taxa = $taxaProd4[$i];
}
$acumulado = $valor_inicial; //Gerar dados do produto 5
for ($i=0; $i <= ($periodo-1); $i++) {
    $acumulado = calculaJurosComposto($acumulado, $taxaProd5[$i]);
    $dados[$i]->produto5->valor = $acumulado;
    $dados[$i]->produto5->taxa = $taxaProd5[$i];
}

//Gerar um arquivo json e enviar para o front-end
echo json_encode($dados);

//Função para calcular o juros composto
function calculaJurosComposto($acumulado, $taxaCal){
    $juros_compostos = ($acumulado * $taxaCal) / 100;
    $acumulado += $juros_compostos;
    return $acumulado;
}