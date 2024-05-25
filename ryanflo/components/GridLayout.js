import { memo } from "react";

function GridLayout({ children, }) {
    return (
        <div id="root">
            <div className="gridIn">
                {children}
            </div>
        </div>
    )
}
export default memo(GridLayout)