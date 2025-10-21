import { useState, useRef, useEffect } from 'react';
import './HistogramSlider.css';

interface Bike {
    name: string;
    price: number;
}

interface HistogramSliderProps {
    bikes: Bike[];
    onChange?: (min: number, max: number) => void;
}

const HistogramSlider = ({ bikes, onChange }: HistogramSliderProps) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);

    const sliderRef = useRef<HTMLDivElement>(null);
    const dragging = useRef<'left' | 'right' | null>(null);
    const dragStartX = useRef(0);
    const dragStartMin = useRef(0);
    const dragStartMax = useRef(0);

    const prices = bikes.map(b => b.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const percentToPrice = (p: number) => Math.round(minPrice + (p / 100) * (maxPrice - minPrice));

    useEffect(() => {
        onChange?.(percentToPrice(min), percentToPrice(max));
    }, [min, max]);

    const onMouseDown = (e: React.MouseEvent, type: 'left' | 'right') => {
        dragging.current = type;
        dragStartX.current = e.clientX;
        dragStartMin.current = min;
        dragStartMax.current = max;
        e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!dragging.current || !sliderRef.current) return;

        const sliderWidth = sliderRef.current.offsetWidth;
        const deltaPercent = ((e.clientX - dragStartX.current) / sliderWidth) * 100;

        if (dragging.current === 'left') {
            let newMin = Math.min(dragStartMin.current + deltaPercent, max - 1);
            newMin = Math.max(newMin, 0);
            setMin(newMin);
        } else if (dragging.current === 'right') {
            let newMax = Math.max(dragStartMax.current + deltaPercent, min + 1);
            newMax = Math.min(newMax, 100);
            setMax(newMax);
        }
    };

    const onMouseUp = () => {
        dragging.current = null;
    };

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    return (
        <div className="histogram">
            <div className="bars">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="bar"
                        style={{
                            height: `${Math.random() * 60 + 10}px`,
                            backgroundColor: i >= min * 0.6 && i <= max * 0.6 ? '#555555' : '#d5d5d5',
                        }}
                    />
                ))}
            </div>


            <div className="slider" ref={sliderRef}>
                <div
                    className="slider-track"
                    style={{ left: `${min}%`, width: `${max - min}%` }}
                >
                    <div className="handle left" onMouseDown={(e) => onMouseDown(e, 'left')}></div>
                    <div className="handle right" onMouseDown={(e) => onMouseDown(e, 'right')}></div>
                </div>
            </div>
        </div>
    );
};

export default HistogramSlider;
