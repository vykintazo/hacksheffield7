import {Marker} from "react-map-gl";

export default function VenueMarker({
                                        lat,
                                        lon,
                                        onClick,
                                        offerCount = 0,
                                        label,
                                        simple,
                                        size = 40,
                                        ...rest
                                    }) {

    return (
        <Marker
            longitude={lon}
            latitude={lat}
            onClick={onClick}
            {...rest}
        >
            <div style={{textAlign: 'center'}}>
                <svg height={size} width={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2}
                        stroke="white"
                        strokeWidth={2}
                        fill="#b81200"
                    />
                    {!simple && (<text
                        style={{fill: 'white', font: 'bold 1.25em'}}
                        x={size / 2}
                        y={size / 2}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        {offerCount ?? 0}
                    </text>)}
                </svg>
                {(label && !simple) && <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{label}</div>}
            </div>
        </Marker>
    )
}
