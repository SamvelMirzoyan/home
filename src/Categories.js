import { useState } from 'react'
import { categories } from './lists'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

export default function Categories() {
    const filtered = useSelector(state => state.filtered)
    const Dispatch = useDispatch()
    return (
        <div className='categories_container'>
            <Swiper slidesPerView={5} modules={Navigation} navigation loop='true' grabCursor='true'>
                {categories.map(category => {
                    return <SwiperSlide key={Math.random()}>
                        <div className='category_item' onClick={() => {
                            Dispatch({ type: 'FILTER', payload: category.category})
                        }}>
                            <div className='category_img' style={{ background: `url(${category.picture})no-repeat center center /cover` }} ></div>
                            <h2>{category.name}</h2>
                        </div>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>  
  )
}
