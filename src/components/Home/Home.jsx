import React, { useState,useEffect } from 'react';
import axios from "axios";
import "./Home.css";
import Slider from "react-slick";
import Laptop from "../../Images/Laptop Bug.png";
import { SliderProducts } from '../../data/SliderImagesData';
import { subCateogrie } from '../../data/SliderImagesData';
import { cateogrie } from '../../data/SliderImagesData';
import { MostBooked } from '../../data/SliderImagesData';
import Book1 from "../../Images/Book1.png";
import Book2 from "../../Images/Book2.png";
import Box from '@mui/material/Box';
import { IoIosClose } from "react-icons/io";
import bannerImage from "../../Images/bannerImage.png";
import GooglePlay from "../../Images/GooglePlay.png";
import Modal from '@mui/material/Modal';
import { FaCheck } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { FiEye } from "react-icons/fi";
import { subCategorieServices } from '../../data/SliderImagesData';
import AppStore from "../../Images/App Store.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdChevronRight } from "react-icons/md";
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
 
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(2);
  const [categorieName ,setCategorieName] = useState('Laptop')
  const handleCategoryClick = (categoryId,catgorieName) => {
    setSelectedCategoryId(categoryId);
    setCategorieName(catgorieName)
    // You can perform any additional actions here, like fetching subcategories based on categoryId
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleViewServices = (data)=>{
    setOpen(true);
    console.log(data)

  }
  
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
                      <div className='grid-containeritem' onClick={() => handleCategoryClick(ele.categoryId,ele.categoryName)}>
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
            <div className='mainSubCategorie'>
            <h1 className='categorieName'>{categorieName} Services</h1>
            <div className="subCategorieContainer">
            
            
               
          {selectedCategoryId && subCateogrie
            .filter((subcategory) => subcategory.categoryId === selectedCategoryId)
            .map((subcategory) => (
              <div className='singleSubCategorieContainer'>

                
                <div className='singleSubCategorie'>
                  <div className='leftSideSingleSubCategorie'>

                  <h3 className='subCategoryName'>{subcategory.subCategoryName}</h3>
                  <p className='subcategoryDesciption'>{subcategory.description}</p>
                  <p className='viewServices' onClick={()=> {handleViewServices(subcategory.subCategoryId)}}>View Service <MdChevronRight fontSize={21}/></p>

                  </div>
                  <div className='rightSideSingleSubCategorie'>
                    <img className="subCategorieImage"src={subcategory.subCategoryImageUrl}/>
                    </div>
                  </div>

              </div>
            ))}
                 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 401, height:450, overflowY:'auto', borderRadius: 3 }}>
          <div >
          <div className='closeMdCtn'>
            <h1 className='modelDesktop'>Desktops - Software</h1>
            <IoIosClose fontSize={30} className="IosClose" />

            </div>
            <p className='selectService'>Select services you required</p>
            <div>
              {subCategorieServices.map((ele,index)=>{
                  return (
                    <>
                    <hr style={{ borderColor: "#1892F7",  }} />

                    <div key={index} className='singleSubCategorieServices'>
                      
                      <div className='leftSideSingleSubCategorieServices'>
                        <h1 className="subCategorieSeviceName">{ele.serviceName}</h1>
                        <p className="subCategorieDescription">{ele.description}</p>
                        <p className="subPrice">${ele.price}</p>
                        </div>
                        <div className='rightSideSingleSubCategorieServices'>
                          <img className="subCategoriesServicesImg"src={ele.imageUrl} />
                          <button className="Add">Add</button>
                          </div>
                      </div>
                      </>
                  )
              })

              }
            </div>
           

         </div>
         <div className="modal-footer">
         <Button variant="contained" className='viewCart' startIcon={<FiEye />}>
          View Cart
      </Button>
    </div>
        </Box>

      </Modal>
        
      
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
           {/* <svg width="119" height="35" viewBox="0 0 119 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="119" height="35" fill="url(#pattern0_1362_581)"/>
<defs>
<pattern id="pattern0_1362_581" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_1362_581" transform="matrix(0.00925926 0 0 0.0314815 0 -0.0037037)"/>
</pattern>
<image id="image0_1362_581" width="108" height="32" xlink:href="data:image/png;base64,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"/>
</defs>
</svg> */}
           <img src={AppStore}style={{height:"41px", width:"136px", objectFit:"cover"}} />
          </ul>
                
                </div>
              </div>
    
        </div>
  )
}

export default Home