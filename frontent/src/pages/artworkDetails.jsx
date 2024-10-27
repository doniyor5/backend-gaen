import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'

import Strelka from "../assets/img/Arrow 1.png"

import { Link } from 'react-router-dom'
import MainPageImage2 from "../assets/img/Image1.png"
import MainPageImage3 from "../assets/img/Image2.png"
import IdCard from "../assets/img/Vector (3).png"
import Location from "../assets/img/Vector (4).png"
import MainPageImage1 from "../assets/img/mainPageImage.png"

export default function ArtworkDetails() {
    const [selectedImage, setSelectedImage] = useState(1);
    const totalImages = 3; // Total number of images you have

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedImage((prevImage) => (prevImage % totalImages) + 1); 
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return (
        <>
        <div className='pb-20'>
            <div className='main-container'>
                <Navbar />

                <div className='max-w-3xl mx-auto'>
                    <Link to={'/main'}>
                        <div data-aos="fade-down"  className='flex gap-3 items-center mt-16'>
                            <img src={Strelka} alt="" />
                            <h2 className='text-[#D9D9D9] text-2xl font-[600] underline'>
                                Back
                            </h2>
                        </div>
                    </Link>

                    <div data-aos="fade-up">
                        {selectedImage === 1 && <img className='w-full object-cover h-[380px] rounded-xl mt-5' src={MainPageImage1} alt="Main Image 1" />}
                        {selectedImage === 2 && <img className='w-full object-cover h-[380px] rounded-xl mt-5' src={MainPageImage2} alt="Main Image 2" />}
                        {selectedImage === 3 && <img className='w-full object-cover h-[380px] rounded-xl mt-5' src={MainPageImage3} alt="Main Image 3" />}
                    </div>

                    <div data-aos="fade-up" className='flex gap-2 mt-4 justify-center'>
                        <button
                            className={`h-[5px] w-[74px] rounded-md ${selectedImage === 1 ? 'bg-[#D9D9D9]' : 'bg-[#d9d9d95a]'}`}
                            onClick={() => setSelectedImage(1)}
                        ></button>
                        <button
                            className={`h-[5px] w-[74px] rounded-md ${selectedImage === 2 ? 'bg-[#D9D9D9]' : 'bg-[#d9d9d95a]'}`}
                            onClick={() => setSelectedImage(2)}
                            ></button>
                        <button
                            className={`h-[5px] w-[74px] rounded-md ${selectedImage === 3 ? 'bg-[#D9D9D9]' : 'bg-[#d9d9d95a]'}`}
                            onClick={() => setSelectedImage(3)}
                            ></button>
                    </div>

                    <div data-aos="fade-down" className='mt-10 md:mt-0'>
                        <h1 className='text-[30px] md:text-[42px] font-[600] text-white'>Amazing shows, events</h1>
                        <div className='flex gap-2 items-center text-[#E4E4E4] mt-5'>
                            <img src={IdCard} alt="" />
                            <p className='text-[12px] md:text-[16px]'>Soliyev Mironshoh</p>
                        </div>
                        <div className='flex gap-2 items-center text-[#E4E4E4] mb-3 mt-4'>
                            <img src={Location} alt="" />
                            <p className='text-[12px] md:text-[16px]'>Uzbekistan, Tashkent</p>
                        </div>

                        <div>
                            <p className='text-[18px] leading-normal md:text-3xl text-white font-[400] md:leading-[50px]'>
                                Lorem ipsum dolor sit amet consectetur. Tristique sit fusce vulputate id quisque volutpat. Et ante et elementum at lorem. Non ullamcorper sed lacinia quam tortor dignissim donec in. Adipiscing fringilla sed sed aenean sed non.
                            </p>

                            <div className='mt-7 md:mt-16'>
                                <input className='px-8 bg-transparent border-b w-full py-2 text-white outline-none' type="text" placeholder='Add a comment' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
            <Footer />
                            </>
    );
}
