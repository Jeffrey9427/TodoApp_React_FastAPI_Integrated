import { Link } from "react-router-dom";
import "../App.css";

export default function Landing() {
  return (
    <div className="bg-white px-12 py-6 rounded-lg shadow-xl mt-40">
      <div className="flex justify-center">
        <h1 className="text-black tracking-[.025em] text-black font-semibold mt-3 mb-8 text-3xl">Hey, welcome :D</h1>
      </div>
      

      <div className="flex justify-center mb-2">
        <Link to="/todo">
          <button className="btn w-60 shadow-lg">Go to Todo List</button>
        </Link>
      </div>
      
    </div>
  );
}