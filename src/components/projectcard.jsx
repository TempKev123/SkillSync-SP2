import { useState } from 'react';

export default function ProjectCard() {

return (
    <div
        style={{
            minHeight: '75vh',
            minWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f3f4f6'
        }}
    >
        <div
            style={{
                background: '#fff',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                padding: '2rem 3rem',
                minWidth: '900px',
                minHeight: '800px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <h1>This card will appear when someone looks at aproject</h1>
        </div>
    </div>
)}