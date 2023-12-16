import React from 'react'

const $ToolTipContent = ({ title, description, align = "left" }) => {
    
    return <>
        <div className="title_lCJ" style={{ textAlign: align, color: 'var(--menuText1Normal)' }}>{title}</div>
        <div className="paragraphs_nbD description_dNa" style={{ textAlign: align, width:'100%', color: 'var(--menuText1Normal)' }}>
            <p cohinline="cohinline">{description}</p>
        </div>
    </>
}

export default $ToolTipContent;