import { Chart } from "react-google-charts";
const GraficosPie = (puntoVenta) => {

    var datosPuntoVentaGrafico = [];
    const options = {
        title: "Venta por zona",
        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    };
    datosPuntoVentaGrafico.push(["Task", "Hours per Day"]);
    for (let i = 0; i < puntoVenta.puntoVenta.length; i++) {
        datosPuntoVentaGrafico.push([puntoVenta.puntoVenta[i].zona, puntoVenta.puntoVenta[i].venta]);
    }
    return (
        <>
            <Chart
                chartType="PieChart"
                data={datosPuntoVentaGrafico}
                options={options}
                width={"100%"}
                height={"300px"}
            />
        </>
    )

}

export default GraficosPie