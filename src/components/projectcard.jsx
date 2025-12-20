
import bg1 from '../images/bg1.jpg';
export default function Card() {
    return (
        <div className="mt-[10px] max-w-200 mx-auto px-10 py-10 rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
                src={bg1}
            />
            <div className="p-5">
                <h3 className="text-lg font-semibold">Test Project</h3>
                <p className="text-black text-sm ">
                    <b>By Alice Smith</b>
                </p>
                <p className="text-gray-600 text-sm mt-4">
                    This is the project card which gives a vauge overview of the project
                    click below for more
                    information.
                </p>
            </div>
            <button onClick={() => window.location.href = '/project'}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition mt-4">
                More information
                
            </button>
        </div>
    );
}

