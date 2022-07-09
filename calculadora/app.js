const ipServidor = 'localhost';

function calcularValor() {

    const val = document.querySelector('#valor').value;
    const select = document.getElementById("tempo");
    const opcaoValor = select.options[select.selectedIndex].value;
    const mostrar1 = document.getElementById("mostrar1");
    const mostrar2 = document.getElementById("mostrar2");
    const mostrar3 = document.getElementById("mostrar3");
    const mostrar4 = document.getElementById("mostrar4");
    const mostrar5 = document.getElementById("mostrar5");
    const textPeriodo = document.getElementById("text-periodo");

    data = { valor: val, periodo: opcaoValor }

    jQuery.ajax({
        type: "POST",
        url: 'http://' + ipServidor + '/calculadora/backend/servidor.php',
        dataType: 'json',
        data: data,
        success: function(data) {
            console.log(data)
            $(".tabela").show()
            textPeriodo.innerHTML = "Resultado dos últimos " + opcaoValor + " mes(es)"
            mostrar1.innerHTML = data[(opcaoValor - 1)].produto1.valor.toFixed(2)
            mostrar2.innerHTML = data[(opcaoValor - 1)].produto2.valor.toFixed(2)
            mostrar3.innerHTML = data[(opcaoValor - 1)].produto3.valor.toFixed(2)
            mostrar4.innerHTML = data[(opcaoValor - 1)].produto4.valor.toFixed(2)
            mostrar5.innerHTML = data[(opcaoValor - 1)].produto5.valor.toFixed(2)

            google.charts.load('current', { 'packages': ['line'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var grafico = new google.visualization.DataTable();
                grafico.addColumn('string', '');
                grafico.addColumn('number', 'Produto 1');
                grafico.addColumn('number', 'Produto 2');
                grafico.addColumn('number', 'Produto 3');
                grafico.addColumn('number', 'Produto 4');
                grafico.addColumn('number', 'Produto 5');

                for (i = 1; i <= opcaoValor; i++) {
                    grafico.addRows([
                        [
                            data[i - 1].mes,
                            data[i - 1].produto1.valor,
                            data[i - 1].produto2.valor,
                            data[i - 1].produto3.valor,
                            data[i - 1].produto4.valor,
                            data[i - 1].produto5.valor
                        ],
                    ]);
                }
                var options = {
                    chart: {},
                    legend: { position: 'none' },
                    height: 300,
                    backgroundColor: { fill: 'transparent' },
                    chartArea: { backgroundColor: 'none' },
                    titleTextStyle: {
                        color: 'red',
                        fontName: 'Roboto',
                        fontSize: 20,
                        bold: true,
                        italic: false
                    },
                    hAxis: { textStyle: { color: 'white', fontName: 'Roboto', fontSize: 15 } },
                    vAxis: {
                        textStyle: { color: 'white', fontName: 'Roboto', fontSize: 15 },
                        gridlines: { color: '#BCBAD6' }
                    },
                    colors: ['#0CF67E', '#0BD4A6', '#01E1EB', '#0B95D4', '#0C6FF6'],

                };
                var chart = new google.charts.Line(document.getElementById('line_top_x'));
                chart.draw(grafico, google.charts.Line.convertOptions(options));

                jQuery("#mostrar-title").text('Resultado dos últimos ' + opcaoValor + ' mes(es)')
                jQuery("#mostrar1").text('R$ ' + data[(opcaoValor - 1)].produto1.valor.toFixed(2))
                jQuery("#mostrar2").text('R$ ' + data[(opcaoValor - 1)].produto2.valor.toFixed(2))
                jQuery("#mostrar3").text('R$ ' + data[(opcaoValor - 1)].produto3.valor.toFixed(2))
                jQuery("#mostrar4").text('R$ ' + data[(opcaoValor - 1)].produto4.valor.toFixed(2))
                jQuery("#mostrar5").text('R$ ' + data[(opcaoValor - 1)].produto5.valor.toFixed(2))
            }

        }
    });

}