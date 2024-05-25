import "./loader.css";

export default function Loader() {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
            <div className="absolute top-1/2 left-1/2">
                <div className="loader">
                    <div className="orbe" style={{"--index": "0"}}></div>
                    <div className="orbe" style={{"--index": "1"}}></div>
                    <div className="orbe" style={{"--index": "2"}}></div>
                    <div className="orbe" style={{"--index": "3"}}></div>
                    <div className="orbe" style={{"--index": "4"}}></div>
                </div>
            </div>
        </div>
    )
}