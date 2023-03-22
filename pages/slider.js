import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

import s1 from "../img/slider/slider_3.jpg";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function slider() {
  return (
    <div>
      {" "}
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="h-[40rem]  w-[50%]"
      >
        <SwiperSlide>
          {" "}
          <Image src={s1} height={650} width={500} alt="slider image" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image src={s1} height={650} width={500} alt="slider image" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image src={s1} height={650} width={500} alt="slider image" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image src={s1} height={650} width={500} alt="slider image" />
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
}

export default slider;
