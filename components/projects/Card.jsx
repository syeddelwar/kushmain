import React from "react";
import bg from "../../img/Oji-String-Beans-Farm.jpg";
import { AiFillPlayCircle } from "react-icons/ai";
import Link from "next/link";

const Card = ({ id, country, name, image }) => {
  return (
    <div>
      <div className="projectCard group w-full h-[15rem] overflow-hidden relative border-1 border-red rounded-md">
        <div
          className="project-img w-full h-full transition-all bg-center bg-cover bg-no-repeat"
          style={{
            background: `url(${image})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
            objectFit: "cover",
          }}
        ></div>
        <div className="absolute w-full top-[5px]">
          <div className="grid grid-cols-1 p-3">
            <div className="flex justify-center items-center mt-[78px] w-full">
              <button>
                <AiFillPlayCircle
                  size={53}
                  onMouseOver={({ target }) => (target.style.color = "#cb9833")}
                  onMouseOut={({ target }) => (target.style.color = "black")}
                />
              </button>
            </div>
            <div className="flex flex-col justify-end">
              <h4 className="text-[1.55rem] font-bold text-[#fff]">{name}</h4>
              <div className="h-[1.8rem] transition-all overflow-hidden">
                <div className="hidden">
                  <span className="text-[#cb9833]">{country}</span>
                </div>
                <div>
                  <Link href={`/project/${id}`}>
                    <span className="text-[#cb9833] hover:underline">
                      Show Project
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;