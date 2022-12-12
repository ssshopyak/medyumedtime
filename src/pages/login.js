import React,{useState} from "react";
import '../components/Login.css'
import '../components/Modal.css'
import AuthCode from 'react-auth-code-input';
import '../components/AuthCode.css'
import { useNavigate } from 'react-router-dom';


let PhoneCode = ''

function LoginForm (){
    return(
      <div id="loginform">
        <FormHeader title="MEDYUMED" />
        <Form/>
      </div>
    )
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Номер Телефона" placeholder="Введите номер телефона" type="text" />
   </div>
);

const Modal = ({ show, children, closeHandler }) => {
    return (
      <div
        className={`modal ${show ? "show" : "hide"}`}
        onClick={() => closeHandler(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={() => closeHandler(false)}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
  };

const FormInput = props => {
    const [phone,setPhone] = useState('+7')
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState();
    const navigate = useNavigate()
    const handleOnChange = (res) => {
      setResult(res);
      if(res === PhoneCode && res.length === 9) {
        
      }
    };

    const onAuth = () => {
      fetch('https://corsproxy.io/?' + encodeURIComponent('https://medymed.ru/1c/hs/appservice/AvtorizovatPolzovatelja'),{
        method:'post',
        headers:{
          'Authorization': 'Basic ' + btoa('api:api'),
          'apikey': 'dc417d9b-7574-4046-bb7b-240b45407331',
          'usertoken': '87DD135CCEDFAC4479C311D9563B01C4' 
        },
        body:JSON.stringify({
          "NomerTelefona":phone
        })
      })
      .then((res)=>{
          if(res.status === 200) {
            let data = res.json()
            data.then((res)=> { localStorage.setItem('isAuthorizated',JSON.stringify(true)) })
            window.location.reload(false);
          }
      })
  }

    return(
        <>
            <div className="row">
                <label>{props.description}</label>
                <input type={props.type} placeholder={props.placeholder} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div id="button" className="row">
                <button onClick={onAuth}>Войти</button>
            </div>
            <Modal show={showModal} closeHandler={setShowModal}>
                <AuthCode onChange={handleOnChange} length={9} containerClassName='container' inputClassName='input'/>
            </Modal>
        </>  
    )
};

export default LoginForm;
