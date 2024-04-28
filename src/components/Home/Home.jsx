import React, { useState,useEffect } from 'react';
import axios from "axios";
import "./Home.css";
import Slider from "react-slick";
import Laptop from "../../Images/Laptop Bug.png";
import { SliderProducts } from '../../data/SliderImagesData';
import { cateogrie } from '../../data/SliderImagesData';
import { MostBooked } from '../../data/SliderImagesData';
import Book1 from "../../Images/Book1.png";
import Book2 from "../../Images/Book2.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';// import sniper style
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const Home = () => {
  const [categories,setCategories] = useState(cateogrie)
  const [mostBooked,setMostBooked] = useState(MostBooked)
  useEffect(async() => {
    await axios.get(`https://staging.chikku4u.com/chikku/api/category/getAllCategories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

      await axios.get(`https://staging.chikku4u.com/chikku/api/service/getMostBookedServices`)
      .then(response => {
        setMostBooked(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);


  console.log(mostBooked)
  
  return (
    <div className="home Container">
        <div className='HomeContainer'>


          <div className='homeContainerLeftSide'>
             <h1 className='homeTitle'>Repair services
at your doorstep</h1>
               <div className='homeLeftsideTexCtn'>
                <img src={Laptop}/>
                  <p className='homeLeftsideText'>Chicoo is your one-stop destination for expert
repair services in Karnataka.</p>
               </div>
          </div>
          <div className='homeContainerRightSide s-container'>
          <Swiper
                modules={[Pagination, Navigation]}
                className='mySwiper'
                navigation={true}
                loopFillGroupWithBlank={true}
                slidesPerView={1}
                spaceBetween={40}
                slidesPerGroup={1}
                loop={true}
            >
                {SliderProducts.map((slide, i) => (
                    <SwiperSlide key={i}>

                      
                        <img src={slide.img} alt="product" className='img-p' />
                    </SwiperSlide>
                ))}
            </Swiper>
          </div>
          </div>
          <div className='HomeContainer'>
            <div className='categorieContainer'>
                <p className='categorieText'>Select a Category</p>
                <div className='categorieImageContainer'>
                  {categories.map((ele,i)=>{
                    return (
                      <div className='grid-containeritem'>
                        <div className='imgContainer'>

                        <img src={ele.imageUrl} className='catergorieImage'/>
                        </div>
                           <p className='categoryName'>{ele.categoryName}</p>
                        </div>
                    )
                  })

                  }
                </div>
                
            </div>
            </div>
            <div className='Container'>
              <h3 className='BookedText'>Most Booked Services</h3>
              <div className='mostBookedContainer'>
                   {mostBooked.map((ele,i)=>{
                     return(
                          <div className='singleBook'>
                            <img src={ele.imageUrl} className='bookImage' alt=''/>
                            <p className='servicesName'>{ele.serviceName}</p>
                            </div>
                     )
                   })

                   }
              </div>
            </div>
            <div className='Container bookNowContainer'>
              <div className='bookNow'>

              <img src={Book1} alt='book1' />
              </div>
              <div className='bookNow'>
              <img src={Book2}  alt='book1' />
                </div>
              </div>
    
        </div>
  )
}

export default Home