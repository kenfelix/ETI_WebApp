"use client"


import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion";
import { getProjectPhotos } from '@/utils/actions';
import { Photo } from '@/app/(home)/about-us/page';


interface CarouselProps {
  photos: Photo[]
}

const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
    };

const Carousel: FC<CarouselProps> =({photos}) =>  {
      
    const [[page, direction], setPage] = useState([0, 0]);
    const photoIndex = wrap(0, photos?.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };
    return (
        <div className='w-full h-[40vh] md:h-[100vh] flex relative justify-center items-center'>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                key={page}
                src={`http://localhost:8000/${photos[photoIndex]?.imageURL}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                    }
                }}
                className='absolute w-full h-full rounded-md'
                />
            </AnimatePresence>
            <div className="absolute transform translate-y-[-20px] flex
            bg-white rounded-[30px] w-[40px] h-[40px] justify-center items-center 
            cursor-pointer select-none font-bold text-[18px] z-50 right-[10px]" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="absolute transform translate-y-[-20px] flex
            bg-white rounded-[30px] w-[40px] h-[40px] justify-center items-center 
            cursor-pointer select-none font-bold text-[18px] z-50 left-[10px] scale-[-1]" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
    </div>
    );
};

export default Carousel;