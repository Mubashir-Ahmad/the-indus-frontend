import React ,{useEffect, useRef,useState}from 'react'
import'./login.css'
import {Link ,useNavigate ,redirect, useLocation} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import Profile from '../../image/Profile.png'
import {useSelector , useDispatch} from 'react-redux'
import { clearError ,login ,register} from '../../actions/UserAction'
import {useAlert} from 'react-alert'
function Login({location}) {
    const navigate=useNavigate();
    const alert = useAlert()
    const dispatch = useDispatch();
    const {isAuthenticated,error ,loading,user}=useSelector((state)=>state.user)
    console.log(useSelector((state)=>state.user))
    const loginTab= useRef(null);
    const registerTab = useRef(null);
    const switchTab =useRef(null);
    const id = useLocation()
    const[loginEmail,setloginemail]=useState("");
    const [loginPassword,setloginpassword]=useState("");
    const [users ,setuser] = useState({
        name:'',
        email:'',
        password:''
    })
    const {name ,email ,password} = users;
    const [avatar, setAvatar] = useState('');
    const[avatarPreview,setAvatarPreview]=useState(Profile)
    const redirect = id.state ? '/shipping':"/"
    useEffect(()=>{
        console.log(user)
        if(error){
            alert.error(error);
            dispatch(clearError());
                }
                if(isAuthenticated && user.user.role=='admin'){
                    console.log(user.user)
                    navigate('/')
                }
                if(isAuthenticated && user.user.role=='manger'){
                    console.log(user.user)
                    navigate('/mangerdashbord')
                }
    },[dispatch ,error,alert, isAuthenticated, navigate])
    const switchtab = (e, tab) => {
        if (tab === 'login') {
          switchTab.current.classList.add('shifttoNeutral');
          switchTab.current.classList.remove('shifttoRight');
      
          registerTab.current.classList.remove('shifttoNeutralForm');
          loginTab.current.classList.remove('shifttoLeft');
        }
        if (tab === 'register') {
          switchTab.current.classList.add('shifttoRight');
          switchTab.current.classList.remove('shifttoNeutral');
      
          registerTab.current.classList.add('shifttoNeutralForm');
          loginTab.current.classList.add('shifttoLeft');
        }
      };
    const loginsubmit =(e)=>{
       
        e.preventDefault();
        console.log("wertyuioiuytr")
        dispatch(login(loginEmail,loginPassword)) 
        // console.log('login',user.user.role)
        if(isAuthenticated)
        { 
                if(user.user.role=='admin'){
                    console.log(user.user)
                    navigate('/')
                }
               else if(user.user.role=='rider'){ 
                    navigate('/riderdash')
                }
                else if(user.user.role=='manger'){ 
                    navigate('/mangerdashbord')
                }
        }
        else{console.log(isAuthenticated)}
    }
    const registersubmit = (e)=>{
        e.preventDefault() 
        const myform = new FormData()
        myform.set('name',name);
        myform.set('email',email);
        myform.set('password',password);
        myform.set('avatar',avatar)
        dispatch(register(myform));
    }
    const registerdatechange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setuser({ ...users, [e.target.name]: e.target.value });
        }
      };
  return (
    <>
    <div className="Login-container">
        <div className="Login-box">
            <div>
                <div className="login-toggle">
                    <p onClick={(e)=>switchtab(e,'login')}>LOGIN</p>
                    <p onClick={(e)=>switchtab(e,'register')}>REGISTER</p>                    
                </div>
                <button ref={switchTab}></button>
            </div>
            <form className='loginform' ref={loginTab} onSubmit={loginsubmit}>
                <div className="loginEmail">
                    <MailOutlineIcon/>
                    <input type='email' placeholder='Email' required value={loginEmail} onChange={(e)=>setloginemail(e.target.value)} />
                </div>
                <div className="loginPassword">
                    <LockOpenIcon/>
                    <input type='password' placeholder='Password' required value={loginPassword} onChange={(e)=>setloginpassword(e.target.value)} />
                </div>
                <Link to='/password/forget'>Forget Password</Link>
                <input type='submit' value="Login" className='loginbtn'/>
            </form>
            <form className='signupform' ref={registerTab} encType='multipart/form-data' onSubmit={registersubmit}>
            {/* <form className='signupform' ref={registerTab} encType='mutipart/form-data' onSubmit={registersubmit}> */}
                <div className="signupname">
                    <FaceIcon />
                    <input type='text' name='name' value={name} placeholder='Name' required onChange={registerdatechange} />
                    {/* <input type='text' placeholder='Name' required onChange={registerdatechange} /> */}
                </div>
                <div className="signupemail">
                <MailOutlineIcon/>
                    <input type='email' placeholder='Email' required name='email' value={email} onChange={registerdatechange} />
                </div>
                <div className="signupassword">
                    <LockOpenIcon/>
                    <input type='password' name='password' value={password} placeholder='Password' required onChange={registerdatechange} />
                </div>
                <div id='registerimage'>
                    <img src={avatarPreview} alt='Avatar Preview' />
                    <input type='file' name='avatar' src={avatar} accept='image/*' onChange={registerdatechange} />
                </div>
                <input type='submit' value='register' className='siginbtn'/>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login
