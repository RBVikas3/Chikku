import React, { useState,useEffect } from 'react';
import axios from "axios";
import "./Home.css";
import Slider from "react-slick";
import Laptop from "../../Images/Laptop Bug.png";
import { SliderProducts } from '../../data/SliderImagesData';
import { cateogrie } from '../../data/SliderImagesData';
import { MostBooked } from '../../data/SliderImagesData';
import Book1 from "../../Images/Book1.png";
import Book2 from "../../Images/Book2.png";
import bannerImage from "../../Images/bannerImage.png";
import GooglePlay from "../../Images/GooglePlay.png";
import AppStore from "../../Images/App Store.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';// import sniper style
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const Home = () => {
  const [categories,setCategories] = useState([])
  const [mostBooked,setMostBooked] = useState([])
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
                  {categories?.map((ele,i)=>{
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
              <h1 className='popularCategorie'>Popular Categories</h1>
              <div className='bookNow'>

              <img src={Book1} alt='book1' />
              <img src={Book2}  alt='book1' />
              </div>
              
              </div>
              <div className='Container BannerContainer'>
                <div className='bannerImageConatiner'>
                  <img src={bannerImage} alt='bannerImg'/>
                  

                  <p className='bannerText01'>Experience the APP!</p>
                  <p className='bannerText02'>One App For repair your Desktop, Laptop, Printer, Biometric & Network</p>
                  

                 <p className='bannerText03'>Download Our App From</p>
                 
                 <ul className="bannerGoogleImage">
           <img src={GooglePlay} style={{height:"41px", width:"136px", objectFit:"cover"}}/>
           <img src={AppStore}style={{height:"41px", width:"136px", objectFit:"cover"}} />
          </ul>
                
                </div>
              </div>
    
        </div>
  )
}

export default Home