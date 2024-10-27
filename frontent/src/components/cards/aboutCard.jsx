import React from 'react'
import Card1 from "../../assets/img/objectives_img-1.png"
import Card2 from "../../assets/img/objectives_img-2.png"
import Card3 from "../../assets/img/objectives_img-3.png"
import Card4 from "../../assets/img/objectives_img-4.png"
import Women from "../../assets/img/women.png"
import NavbarButton from "../../components/buttons/navbarButton"

import DataObjectImage1 from "../../assets/img/one_person.png"
import DataObjectImage2 from "../../assets/img/there_person.png"
import DataObjectImage3 from "../../assets/img/two_person.png"

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'


// import required modules

export default function AboutCard() {

	const data = [
		{
			id: 1,
			image: Women,
			name: 'Surname name',
			job: 'Job position'
		},
		{
						id: 2,
			image: Women,
			name: 'Surname name',
			job: 'Job position'
		},
		{
						id: 3,
			image: Women,
			name: 'Surname name',
			job: 'Job position'
		},
	]

	const dataObject = [
		{
			image: DataObjectImage1,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'First person',
			position: 'Position @ Company A'
		},
		{
			image: DataObjectImage3,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'Second person',
			position: 'Position @ Company B'
		},
		{
			image: DataObjectImage2,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'Third person',
			position: 'Position @ Company C'
		},
		{
			image: DataObjectImage1,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'Fourth person',
			position: 'Position @ Company D'
		},
		{
			image: DataObjectImage3,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'Fives person',
			position: 'Position @ Company E'
		},
		{
			image: DataObjectImage2,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'Six person',
			position: 'Position @ Company F'
		},
		{
			image: DataObjectImage1,
			content: '“This is a customer quote. The customer is going to share their opinion about our product or service, hopefully it’s going to be a positive one. ',
			name: 'Seven person',
			position: 'Position @ Company G'
		},
	]

	return (
		<>
		<div className='md:flex justify-between gap-28 items-center mb-24'>
			<div data-aos="fade-up" className='md:w-2/4 text-white'>
				<h1 className='mt-10 md:mt-0 text-4xl font-[600] leading-10'>
					Promote Cultural Exchange
				</h1>
				<p className='my-3 md:my-6  font-[500] text-[16px] leading-5'>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s</p>
					<div className='mb-5'>
				<NavbarButton buttonText={'Button text'} />
					</div>
			</div>
			<div data-aos="fade-up" className='md:w-2/4'>
				<img className='w-full' src={Card1} alt="" />
			</div>
		</div>
		<div className='flex flex-wrap-reverse md:flex-nowrap justify-between md:gap-28 items-center mb-24'>
			<div data-aos="fade-up" className='w-full md:w-2/4'>
				<img className='w-full' src={Card2} alt="" />
			</div>
			<div data-aos="fade-up" className='md:w-2/4 text-white'>
				<h1 className='mt-3 md:mt-0 text-4xl font-[600] leading-10'>
					Enhance Learning
				</h1>
				<p className='my-3 md:my-6  font-[500] text-[16px] leading-5'>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s</p>
					<div className='mb-5'>
				<NavbarButton buttonText={'Button text'} />
					</div>
			</div>
			
		</div>
		<div className='md:flex justify-between gap-28 items-center mb-24'>
			<div data-aos="fade-up" className='md:w-2/4 text-white'>
				<h1 className='mt-3 md:mt-0  text-4xl font-[600] leading-10'>
					Support Emerging Artists
				</h1>
				<p className='my-3 md:my-6  font-[500] text-[16px] leading-5'>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s</p>
					<div className='mb-5'>
				<NavbarButton buttonText={'Button text'} />
					</div>
			</div>
			<div data-aos="fade-up" className='md:w-2/4'>
				<img className='w-full' src={Card3} alt="" />
			</div>
		</div>
		<div className='flex flex-wrap-reverse md:flex-nowrap justify-between md:gap-28 items-center mb-24'>
			<div data-aos="fade-up" className='w-full md:w-2/4'>
				<img className='w-full' src={Card4} alt="" />
			</div>
			<div data-aos="fade-up" className='md:w-2/4 text-white'>
				<h1 className='mt-3 md:mt-0 text-4xl font-[600] leading-10'>
					Foster Collaboration
				</h1>
				<p className='my-3 md:my-6  font-[500] text-[16px] leading-5'>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s</p>
					<div className='mb-5'>
				<NavbarButton buttonText={'Button text'} />
					</div>
			</div>
			
		</div>

				<div>
			<h1 data-aos="fade-down" className='text-center text-4xl text-white mt-10 mb-4'>Team</h1>

				<div data-aos="fade-up" className='md:flex gap-6 justify-center'>
					{data.map(d => (
						<div className='w-full mb-20' key={d.id}>
							<img className='w-full' src={d.image} alt="" />
							<h3 className='text-lg font-[400] text-white text-center text-[28px] mt-8'>{d.name}</h3>
							<p className='text-sm font-[400] text-white text-center text-[22px] mt-2'>{d.job}</p>
						</div>
					))}
				</div>
					</div>


				



					<div>
						<h1 data-aos="fade-down" className='text-center text-4xl text-white mt-24 mb-4'>Hear from our customers</h1>
	<Swiper
					slidesPerView={4}
					spaceBetween={30}
					pagination={{
						clickable: true,
					}}
					 breakpoints={{
    200: {
      slidesPerView: 1,
      spaceBetween: 20,
		},
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
		},
    900: {
      slidesPerView: 3,
      spaceBetween: 20,
		},
    1100: {
      slidesPerView: 4,
      spaceBetween: 20,
		},
  }}
					className="mySwiper"
				>

						{dataObject.map(data => (
					<SwiperSlide key={data.name}>
										<div className='bg-white rounded-2xl flex flex-col justify-center p-5 '>
											<img className=' -translate-y-[90px]' src={data.image} alt="" />
											<div className='-mt-28 text-center'>
											<em className='font-[500] text-[16px] text-[#00000080]'>{data.content}</em>
											<h3 className='mt-4 mb-2 text-xl font-[600]'>{data.name}</h3>
											<h5>{data.position}</h5>
										</div>
											</div>
					</SwiperSlide>
									))}
				</Swiper>
					</div>



		</>
	)
}
