import React, { useState, useEffect } from 'react';
import Logo from "../../Images/Logo.png"
import { IoChevronDown } from "react-icons/io5";
import axios from 'axios';
import { IoLocationOutline } from "react-icons/io5";
import { MdHeight, MdSearch } from "react-icons/md";
import Box from '@mui/material/Box';
import { setData, setMobile, setToken } from '../../redux/slices/authSlice';
import Modal from '@mui/material/Modal';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { FaMobileAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import "./Navbar.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import { height } from '@mui/system';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [confirmedMobile, setConfirmedMobile] = useState(false)
  const [isOtp, setIsOtp] = useState(false)
  const [otp, setOtp] = useState('');
  const [isSignUp, setIsSignup] = useState(false)
  const [optIsNotValid,setOtpIsNotValid] = useState(false)
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmedClose = () => {
    setConfirmedMobile(false)
  }
  const navigate = useNavigate();
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
  const notify = () => toast('Here is your toast.');
  const InvaildOtp = () => toast('Invaild Otp')
  const { data } = useSelector(state => state.auth);
  console.log("data", data)
  // if(data.)
  const handleSubmit = async (e) => {
    if (!otp || otp.trim() === "") {
      notify()
      return; // Exit the function if OTP is empty
    }
    try {

      console.log(otp)
      console.log(mobileNumber)
      const response = await axios.get(
        `https://staging.chikku4u.com/chikku/authenticateUser?mobileNumber=${mobileNumber}&otp=${otp}`,
        {}
      );
      console.log("fghjkm,mjhgfdsnm",response)
      if(!response){
        setOtpIsNotValid(true)
      }
      if (response.data.message === "Invalid OTP") {
        console.log("bfjgvjfgkjfgj")
        toast.error("Invalid OTP")
        return; // Exit the function on invalid OTP
      }

      if (data.alreadyRegistered == false) {
        setIsSignup(true)
      } else if (data.alreadyRegistered == true) {
        navigate('/');
        setIsOtp(false)
      }
      dispatch(setToken(response.data.accessToken));
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      console.log('====================================');
      console.log("data.alreadyRegistered", data.alreadyRegistered);
      console.log('====================================');

      // setLoading(false);
    } catch (error) {
      // setOtp('');

      // console.error('Error while handling OTP:', error.message);
      // setLoading(false);
    }

  }

  const handleLogin = async () => {
    try {
      console.log(mobileNumber)
      if (mobileNumber.trim().length === 10 && /^\d+$/.test(mobileNumber)) {
        setLoading(true);


        setOpen(false);
        setConfirmedMobile(true);

        const response = await axios.get(
          `https://staging.chikku4u.com/chikku/login?mobileNumber=${mobileNumber}`,
          {},
        );
         localStorage.setItem('userData', JSON.stringify(response.data));
        dispatch(
          setData({
            alreadyRegistered: response.data.alreadyRegistered,
            emailId: response.data.emailId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            mobileNumber: response.data.mobileNumber,
            registrationType: response.data.registrationType,
            userId: response.data.userId,
          }),
        );
        console.log(response.data)

        dispatch(setMobile(response.data.mobileNumber));
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        // Toast.show({
        //   type: 'success',
        //   text1: 'OTP Sent',
        //   position: 'top',
        //   visibilityTime: 4000,
        //   autoHide: true,
        //   topOffset:70,
        //   text1Style: { fontSize: 18, color: colors.success, paddingLeft: '40%', },
        //   opacity: 0.9,
        // });
        // navigation.navigate(OTP);
        setLoading(false);
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Please enter a valid 10-digit mobile number.',
        //   position: 'top',
        //   visibilityTime: 2000,
        //   autoHide: true,
        //   topOffset:70,
        //   opacity: 0.9,
        //   text1Style: { fontSize: 13, color: colors.danger }
        // });

      }
    } catch (error) {
      console.error('Error while sending OTP:', error.message);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error occurred while sending OTP. Try Again!',
      //   visibilityTime: 4000,
      //   text1Style: { color: colors.danger },
      //   topOffset:70,
      // });
      setLoading(false);
    }
  };
  const handleConfirm = () => {
    setIsOtp(true)
    setConfirmedMobile(false)

  }
  const handleOtpModelClose = () => {
    setIsOtp(false)
  }
  const handleMobileClose = () => {
    setOpen(true)
    setConfirmedMobile(false)
  }
  const handleNumberChange = (event) => {
    if (event.target.value.length <= 10) {
      setMobileNumber(event.target.value);
    }
  }
  const [seconds, setSeconds] = useState(130); // 01:59 in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const handleResendOTP = async () => {
    try {
      const response = await axios.get(
        `https://staging.chikku4u.com/chikku/login?mobileNumber=${mobileNumber}`,
        {},
      );
      // Toast.show(
      //   {
      //     type: 'success',
      //     text1: "OTP Resent",
      //     text1Style: { fontSize: 15, color: colors.success },
      //     visibilityTime: 1500
      //   }
      // )
      setSeconds(130);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUpClose = () => {
    setIsSignup(false)
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [selectedRegistrationType, setSelectedRegistrationType] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [gstin, setGstin] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const { token } = useSelector(state => state.auth);
  console.log("token", token);
  const [submitted, setSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const isFormValid = () => {
    if (
      (selectedRegistrationType !== 1 &&
        (!businessName || !gstin || !isValidGSTIN(gstin))) ||
      (selectedRegistrationType === 2 &&
        (!businessName || !gstin || !isValidGSTIN(gstin))) ||
      (selectedRegistrationType === 3 && !organizationName) ||
      (selectedRegistrationType === 4 && !institutionName) ||
      !firstName ||
      !lastName ||
      !emailId ||
      !isValidEmail
    ) {
      return false;
    }
    return true;
  };
  const validateEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = e => {

    setIsValidEmail(validateEmail(e.target.value));
    setEmailId(e.target.value);

  };

  const handleFirstNameChange = e => {
    if (/^[a-zA-Z\s]*$/.test(e.target.value) || e.target.value === '') {
      setFirstName(e.target.value);
    } else {
      console.log('Numbers not allowed');
    }
  };

  const handleLastNameChange = e => {
    if (/^[a-zA-Z\s]*$/.test(e.target.value) || e.target.value === '') {
      setLastName(e.target.value);
    } else {
      console.log('Numbers not allowed');
    }
  };
  useEffect(() => {
    axios
      .get(
        'https://staging.chikku4u.com/chikku/api/registrationType/getAllRegistrationTypes',
      )
      .then(response => {
        setRegistrationTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching registration types:', error);
      });
  }, []);

  const handleRegistrationTypeChange = (e) => {
    setSelectedRegistrationType(e.target.value);
    console.log("value", e.target.value)
  };

  const handleRegistrationSubmit = async () => {

    const selectedType = registrationTypes.find(
      type => type.registrationTypeId === selectedRegistrationType,
    );
    const selectedTypeName = selectedType
      ? selectedType.registrationTypeName
      : null;
    console.log('selectedType', selectedType);
    console.log('selectedTypeName', selectedTypeName);

    setSubmitted(true);
    const requestData = {
      firstName,
      lastName,
      emailId,
      mobileNumber: data.mobileNumber,
      registrationType: selectedTypeName,
      businessName: selectedRegistrationType !== 1 ? businessName : null,
      gstin: selectedRegistrationType !== 1 ? gstin : null,
      organizationName:
        selectedRegistrationType !== 1 ? organizationName : null,
      institutionName: selectedRegistrationType !== 1 ? institutionName : null,
    };

    console.log('====================================');
    console.log(requestData);
    console.log('====================================');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("headers", headers);
    try {
      console.log("Inside try");
      const response = await axios.post(
        'https://staging.chikku4u.com/chikku/register',
        requestData,
        {Authorization: `Bearer ${token}` },
      );
      console.log("Not Inside try");
      console.log('Registration successful:', response.data);
      dispatch(
        setData({
          alreadyRegistered: true,
          emailId: response.data.emailId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          mobileNumber: data.mobileNumber,
          registrationType: selectedTypeName,
          userId: data.userId,
        }),
      );
      localStorage.setItem('userData', JSON.stringify(response.data));
      navigate("/");
      // Toast.show({
      //   type: 'success',
      //   text1: 'Registered Successfully',
      //   position: 'top',
      //   visibilityTime: 2000,
      //   topOffset: 70,
      //   autoHide: true,
      //   text1Style: {fontSize: 15, color: colors.black},
      // });

    } catch (error) {
      console.error('Error registering:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: 'Email Already Registered',
      //   position: 'top',
      //   visibilityTime: 2000,
      //   topOffset: 70,
      //   autoHide: true,
      //   text1Style: {fontSize: 15, color: colors.black},
      // });
    }
  };

  const isValidGSTIN = gstin => {
    const gstinRegex =
      /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9]{1})$/;
    return gstinRegex.test(gstin);
  };

  return (
    <div className='Container navbarConatiner'>

      <img src={Logo} className='' />
      <div className='inputContainers'>


        <div className='inputContainer'>
          <IoLocationOutline className='locationIcon' />
          <input type='text' className="inputBox" placeholder='Banglore' />
          <IoChevronDown className='arrowDown' disabled />

        </div>

        <div className='SearchContainer'>
          <MdSearch className='searchIcon' />
          <input type='text' placeholder='Search for repair service' className='searchInput' />

        </div>



      </div>
      <div className='signinContainer'>
        <button type='btn' className='loginBtn' onClick={() => handleOpen()}>Login</button>
        {/* <button type='btn' className='signinBtn' onClick={() => setIsSignup(true)}>Sign Up</button> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 401, borderRadius: 3 }}>
          <div className='closeMdCtn'>

            <h1 className='modelLoginText'>Login/Sign up</h1>
            <IoIosClose fontSize={30} className="IosClose" onClick={handleClose} />
          </div>
          <h3 className='modelLoginotp'>We will send you a OTP on this Mobile Number</h3>
          <div className='modelInputContainer'>
            <FaMobileAlt fontSize={21} color='blue' />
            <div className='inputDivider'></div>
            <input type="number" className='modelOtpBox' placeholder='Enter Mobile Number' maxLength={10} value={mobileNumber} onChange={handleNumberChange} />
          </div>
          <div className='loginTermContainer'>
            <input type="checkbox" className='inputCheckBox' value={isChecked}
              onChange={() => setIsChecked(!isChecked)} />
            <p className='agreementText'>I agree to accept the <span className='termAndCondition'>terms and Conditions</span></p>
          </div>
          <button style={{ background: isChecked ? "#0d6efd" : "grey" }} disabled={loading || !isChecked} className="GetVerificationCode" onClick={handleLogin}  >Get Verification Code </button>

          {/* <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>

      </Modal>
      <Modal
        open={confirmedMobile}
        onClose={handleConfirmedClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 401, borderRadius: 3 }}>
          <div className='mobileConfirmedCtn'>

            <RxQuestionMarkCircled fontSize={60} style={{ textAlign: "center" }} />
            <h1 className='modelLoginText'>Your Mobile Number is <span style={{ color: "blue" }}>+91 {mobileNumber}</span></h1>


            <p className='modelLoginotp'>Please confirm your mobile number, we will send a OTP to this mobile number.</p>
          </div>
          <div className='mobileModelContainer'>

            <button className="confirm" onClick={handleConfirm}><FaCheck fontSize={16} />Confirm </button>
            <button className='close' onClick={handleMobileClose}><RxCross2 fontSize={16} />Close</button>
          </div>


        </Box>

      </Modal>
      <Modal
        open={isOtp}
        onClose={handleOtpModelClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 401, borderRadius: 3, height: 300 }}>
          <div className='closeMdCtn'>

            <h1 className='modelLoginText'>Verify your OTP</h1>
            <IoIosClose fontSize={30} className="IosClose" onClick={handleOtpModelClose} />
          </div>
          <h1 className='modelLoginText'>We've sent you a 6 digit code on +91 6364211689</h1>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="separator">-</span>

            }
            inputStyle="otp-input"
            renderInput={(props) => <input {...props} />

            }
          />
          {optIsNotValid &&


          <p className='otpNotCorrect'>You Entered Incorrect OTP</p>
          }
          <p style={{ marginTop: "12px" }}><span className='timerForOtp'> Code expires in :</span> <span className='timer'>{formatTime(seconds)}</span></p>
          <p style={{ marginTop: "12px", marginBottom: "21px" }}><span className='receiveCode'>Didn't receive code?</span><span className='resendCode' onClick={handleResendOTP}>Resend Code</span></p>
          <Button variant="contained" className='resendButton' onClick={handleSubmit}>Submit</Button>



        </Box>

      </Modal>
      <Modal
        open={isSignUp}
        onClose={handleSignUpClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 401, borderRadius: 3, height: selectedRegistrationType === 2 ? 460 : selectedRegistrationType === 3 || 4 ? 400 : 350 }}>
          <div className='closeMdCtn'>

            <h1 className='modelLoginText'>Create an Account</h1>
            <IoIosClose fontSize={30} className="IosClose" />
          </div>
          <div className='inputContainers'>
            <input type='text' className='firstName' placeholder='First Name' value={firstName} onChange={handleFirstNameChange} />
            <input type="text" className="firstName" placeholder='Second Name' value={lastName} onChange={handleLastNameChange} />
          </div>
          <input type='text' className='secondName' placeholder='Email Id' value={emailId} onChange={handleEmailChange} />
          <input type='text' className='secondName' placeholder='Mobile Number' disabled value={data.mobileNumber} />
          <div className='' style={{ marginBottom: "21px" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRegistrationType}
              onChange={handleRegistrationTypeChange}
            >
              <MenuItem value="Select an Registration Type">Select an Registration Type</MenuItem >
              {registrationTypes.map((ele, index) => {
                return (
                  <MenuItem value={ele.registrationTypeId}>{ele.registrationTypeName}</MenuItem >
                )
              })

              }
            </Select>
          </div>

          {selectedRegistrationType && selectedRegistrationType !== 1 && (
            <>
              {selectedRegistrationType === 2 && (
                <div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                    maxLength={100}
                    className='secondName'
                  />
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="GSTIN"
                    maxLength={15}
                    className='secondName'
                  />
                </div>
              )}
            </>

          )}

          {selectedRegistrationType == 3 && (
            <>

              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Organization Name"
                maxLength={100}
                className='secondName'
              />
            </>
          )}
          {selectedRegistrationType == 4 && (
            <>

              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Institution Name"
                maxLength={100}
                className='secondName'
              />
            </>

          )}
          <Button disabled={!isFormValid()} onClick={handleRegistrationSubmit} style={{ background: isFormValid() ? 'blue' : 'gray' }} variant="contained" className='resendButton' >Register</Button>
          <Toaster />



        </Box>

      </Modal>
    </div>
  );
}

export default Navbar;
