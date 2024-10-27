import React from 'react'
import Navbar from "../components/navbar/navbar"

import Img1 from "../assets/img/img1.png"
import Img2 from "../assets/img/img2.png"
import Img3 from "../assets/img/img3.png"
import Img4 from "../assets/img/img4.png"
import Img5 from "../assets/img/img5.png"
import Img6 from "../assets/img/img6.png"
import Footer from "../components/footer/footer"



export default function AdditionalPages() {
	return (
		<>
		<div className='mb-9 md:mb-20'>
		<div className='main-container'>
			<Navbar />

			<div data-aos="fade-up" >
				<h1 className='font-[600] text-center text-4xl text-white mt-10 mb-4'>
					Upcoming Events
				</h1>
				<p className='text-end text-[16px] text-white cursor-pointer'>Show all</p>

							<div data-aos="fade-up"  className='additional_page_cards md:grid grid-cols-3 gap-6 mt-3'>
								<img className='w-full mb-8' src={Img1} alt="" />
								<img className='w-full mb-8' src={Img2} alt="" />
								<img className='w-full mb-8' src={Img3} alt="" />
							</div>

			</div>
			<div data-aos="fade-up" >
				<h1 className='font-[600] text-center text-4xl text-white mt-20 md:mt-10 mb-4'>
					Past Events
				</h1>
				<p className='text-end text-[16px] text-white cursor-pointer'>Show all</p>

							<div  className='additional_page_cards md:grid grid-cols-3 gap-6 mt-3'>
								<img className='w-full mb-8' src={Img4} alt="" />
								<img className='w-full mb-8' src={Img5} alt="" />
								<img className='w-full mb-8' src={Img6} alt="" />
							</div>

			</div>
		</div>
		</div>
			<Footer />
		</>
	)
}
