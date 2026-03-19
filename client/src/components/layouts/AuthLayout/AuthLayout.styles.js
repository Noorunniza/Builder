import styled from "styled-components"
import bg from "../../../assets/login-bg.jpg"

export const Container = styled.div`
display:flex;
height:100vh;
`

export const Left = styled.div`
flex:1;
display:flex;
justify-content:center;
align-items:center;
background:white;
`

export const Right = styled.div`
flex:1;
position:relative;
background:url(${bg}) center/cover no-repeat;

display:flex;
align-items:center;
justify-content:flex-start;

/* dark premium overlay */

&::before{
content:"";
position:absolute;
inset:0;

background:linear-gradient(
135deg,
rgba(0,0,0,0.65),
rgba(0,0,0,0.25)
);

}
`

export const OverlayCard = styled.div`
position:relative;
margin-left:60px;
background:rgba(255,255,255,0.15);
backdrop-filter:blur(18px);
padding:45px;
border-radius:22px;
color:white;
width:75%;
border:1px solid rgba(255,255,255,0.2);
box-shadow: 0 20px 50px rgba(0,0,0,0.3);
/* Move overlay card a bit to the top */
transform: translateY(-40px);
`

export const Quote = styled.h2`
font-size:26px;
line-height:1.4;
font-weight:600;
`

export const Stars = styled.div`
margin-top:20px;
color:gold;
letter-spacing:4px;
font-size:20px;
`

export const UserRow = styled.div`
display:flex;
align-items:center;
margin-top:30px;
`

export const Avatar = styled.img`
width:55px;
height:55px;
border-radius:50%;
margin-right:14px;
border:2px solid white;
`

export const UserInfo = styled.div`
font-size:14px;
span{
display:block;
opacity:0.8;
font-size:12px;
}
`

export const SubTitle = styled.p`
margin-top:20px;
`
