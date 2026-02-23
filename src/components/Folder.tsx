"use client";

import { useState } from 'react';
import './Folder.css';

const darkenColor = (hex: string, percent: number) => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
        color = color
            .split('')
            .map(c => c + c)
            .join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

interface FolderProps {
    color?: string;
    size?: number;
    items?: React.ReactNode[];
    className?: string;
    onOpenChange?: (open: boolean) => void;
    onCardClick?: (index: number) => void;
}

const Folder = ({ color = '#FF3366', size = 1, items = [], className = '', onOpenChange, onCardClick }: FolderProps) => {
    // Configured for 5 team members per the user's reference design.
    const maxItems = 5;
    const papers = items.slice(0, maxItems);
    while (papers.length < maxItems) {
        papers.push(<div key={Math.random()} />);
    }

    const [open, setOpen] = useState(false);
    const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

    const folderBackColor = darkenColor(color, 0.08);
    const paper1 = '#ffffff';
    const paper2 = darkenColor('#ffffff', 0.05);
    const paper3 = darkenColor('#ffffff', 0.10);
    const paper4 = darkenColor('#ffffff', 0.15);
    const paper5 = darkenColor('#ffffff', 0.20);

    const handleClick = () => {
        const nextOpen = !open;
        setOpen(nextOpen);
        onOpenChange?.(nextOpen);
        if (open) {
            setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
        }
    };

    const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (!open) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;

        setPaperOffsets(prev => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: offsetX, y: offsetY };
            return newOffsets;
        });
    };

    const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        setPaperOffsets(prev => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: 0, y: 0 };
            return newOffsets;
        });
    };

    const folderStyle = {
        '--folder-color': color,
        '--folder-back-color': folderBackColor,
        '--paper-1': paper1,
        '--paper-2': paper2,
        '--paper-3': paper3,
        '--paper-4': paper4,
        '--paper-5': paper5,
    } as React.CSSProperties;

    const folderClassName = `folder ${open ? 'open' : ''}`.trim();
    // Base folder back size: 140 × 100px. We scale it up and allocate
    // the correct bounding box so the fan stays visually centered.
    const baseW = 140;
    const baseH = 100;
    const scaledW = baseW * size;
    const scaledH = baseH * size;

    const scaleStyle: React.CSSProperties = {
        width: scaledW,
        height: scaledH,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const innerScaleStyle: React.CSSProperties = {
        transform: `scale(${size})`,
        transformOrigin: 'center center',
    };

    return (
        <div style={scaleStyle} className={className}>
            <div style={innerScaleStyle}>
                <div className={folderClassName} style={folderStyle} onClick={handleClick}>
                    <div className="folder__back">
                        {papers.map((item, i) => (
                            <div
                                key={i}
                                className={`paper paper-${i + 1} cursor-none group`}
                                onMouseMove={e => handlePaperMouseMove(e, i)}
                                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                                onClick={open ? (e) => { e.stopPropagation(); onCardClick?.(i); } : undefined}
                                style={
                                    open
                                        ? {
                                            '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
                                            '--magnet-y': `${paperOffsets[i]?.y || 0}px`,
                                        } as React.CSSProperties
                                        : { zIndex: 5 - i }
                                }
                            >
                                {item}
                            </div>
                        ))}
                        <div className="folder__front shadow-2xl flex flex-col items-center justify-center p-6">
                            <span className="text-white/40 font-serif font-black tracking-[0.2em] text-xl mb-4">TEAM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Folder;
