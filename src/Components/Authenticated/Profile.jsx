import { connect } from 'react-redux'
import { Button } from 'antd';
import AuthService from '../Services/login';
import { useNavigate,Navigate } from "react-router-dom";
import { error} from '../Utils/CommonFunctions'

function Profile(props) {

  const userProfile = props?.user?.profile;
  let navigate = useNavigate();

  function logOut(){
    AuthService.logout(props?.user?.profile?._id,props?.user?.profile?.token).then(res=> {
      navigate('/login');
    }).catch(err=>{
     error(err);
    })
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'30px',textAlign:'center'}}>
     {localStorage.getItem('token') !== null ?  <div><p>{userProfile?.firstName}</p>
      <p>{userProfile?.email}</p>
      <p>{userProfile?.phoneNumber}</p>
      <p>{userProfile?.expertise}</p>
      <Button onClick={logOut}>Logout</Button></div>: <Navigate to='/login'/>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.profile
  };
};

export default connect(
  mapStateToProps
)(Profile)