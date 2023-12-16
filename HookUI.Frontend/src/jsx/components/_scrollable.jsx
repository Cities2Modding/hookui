import React from 'react'

const $Scrollable = ({ react, children }) => {
    const scrollRef = react.useRef(null);
    const contentRef = react.useRef(null);
    const [thumbHeight, setThumbHeight] = react.useState(0);
    const [thumbTop, setThumbTop] = react.useState(0);

    function getCurrentScrollPosition() {
        if (scrollRef.current) {
            return scrollRef.current.scrollTop;
        }
        return 0;
    }
    const calculateThumbSizeAndPosition = () => {
        if (scrollRef.current && contentRef.current) {
            const viewableHeight = scrollRef.current.clientHeight;
            const totalContentHeight = contentRef.current.scrollHeight;

            if (totalContentHeight > viewableHeight) {
                const newThumbHeight = Math.max((viewableHeight / totalContentHeight) * viewableHeight, 30);

                // Replace this with your method of getting the current scroll position
                const currentScrollPosition = getCurrentScrollPosition(); // Custom function

                const newThumbTop = (currentScrollPosition / totalContentHeight) * viewableHeight;

                setThumbHeight(newThumbHeight);
                setThumbTop(newThumbTop);
            }
        }
    };

    const thumbContent = thumbHeight > 0 ? <div className="track_e3O y_SMM">
        <div className="thumb_Cib y_SMM" style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}></div>
    </div> : <></>;

    react.useEffect(() => {
        calculateThumbSizeAndPosition();
    }, []);

    return <div className="scrollable_DXr y_SMM track-visible-y_RCA scrollable_jAA" onMouseOver={calculateThumbSizeAndPosition}>
        <div ref={scrollRef} onScroll={calculateThumbSizeAndPosition} className="content_gqa">
            <div ref={contentRef}>
                {children}
            </div>
            <div className="bottom-padding_JS3"></div>
        </div>
        {thumbContent}
    </div>
}

export default $Scrollable;