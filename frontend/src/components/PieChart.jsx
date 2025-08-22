import { ResponsivePie } from '@nivo/pie';
import useResponsive from '@hooks/useResponsive';

const PieChartCustom = ({ eventos, fecha }) => {
    const familiasPorEvento = {};
    const {isSmallDevice} = useResponsive();
    eventos.forEach((evento) => {
        const familiasUnicas = new Set(
            evento.productos.map((producto) => producto.familiaProducto)
        );

        familiasUnicas.forEach((familia) => {
            familiasPorEvento[familia] = (familiasPorEvento[familia] || 0) + 1;
        });
    });

    const data = Object.entries(familiasPorEvento).map(([label, value]) => ({
        id: label,
        label,
        value
    }));

    return (
        <div style={{ height: 450, width: isSmallDevice ? '100%' : '70%', border: '1px solid gray', borderRadius: '8px', padding: '10px' }}>
            <h6><strong>Familias de productos </strong> ({fecha})</h6>
            {data.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: 100 }}>No hay familias asociadas a esa fecha</p>
            ) : (
                <ResponsivePie
                    data={data}
                    margin={{ top: 80, right: 80, bottom: 120, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.8}
                    cornerRadius={2}
                    arcLinkLabelsDiagonalLength={16}
                    arcLinkLabelsStraightLength={6}
                    activeOuterRadiusOffset={3}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                    // legends={[
                    //     {
                    //         anchor: 'bottom',
                    //         direction: 'row',
                    //         translateY: 56,
                    //         itemWidth: 100,
                    //         itemHeight: 18,
                    //         symbolShape: 'circle',
                    //     },
                    // ]}
                />
            )}
        </div>
    );
};

export default PieChartCustom;
