import { Marker, MarkerProps } from "react-map-gl";

export type VenueMarkerProps = Omit<MarkerProps, 'longitude' | 'latitude'> & {
    lat: number;
    lon: number;
    offerCount?: number;
    label?: string;
    simple?: boolean;
    size?: number;
};

export default function VenueMarker({
    lat,
    lon,
    onClick,
    offerCount = 0,
    label,
    simple,
    color,
    size = 40,
    ...rest
}: VenueMarkerProps) {

    return (
        <Marker
            longitude={lon}
            latitude={lat}
            onClick={onClick}
            {...rest}
        >
            <div style={{ textAlign: 'center' }}>
                <svg height={size} width={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={(size / 2) - 1}
                        stroke="white"
                        strokeWidth={2}
                        fill={color ?? "#b81200"}
                    />
                    {!simple && (<text
                        style={{ fill: 'white', font: 'bold 1.25em' }}
                        x={size / 2}
                        y={size / 2}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        {offerCount ?? 0}
                    </text>)}
                </svg>
                {(label && !simple) && <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>{label}</div>}
            </div>
        </Marker>
    )
}
