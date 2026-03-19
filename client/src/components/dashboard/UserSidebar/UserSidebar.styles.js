import styled from "styled-components"


export const Container = styled.div`

width:250px;
flex-shrink:0;
height:100vh;

background:
linear-gradient(
180deg,
#020617,
#0f172a
);

color:white;

padding:30px 18px;

display:flex;
flex-direction:column;

border-right:
1px solid rgba(255,255,255,.06);

box-shadow:
10px 0px 30px rgba(0,0,0,.25);

`



export const Logo = styled.h2`

margin-bottom:50px;

font-weight:700;

letter-spacing:.5px;

color:white;

-webkit-background-clip:text;

// -webkit-text-fill-color:transparent;

`



export const Menu = styled.div`

display:flex;
flex-direction:column;
gap:8px;

`



export const MenuItem = styled.div`

display:flex;

align-items:center;

gap:12px;

padding:12px 14px;

border-radius:10px;

cursor:pointer;

transition:.25s ease;

font-size:15px;

opacity:.85;



&:hover{

opacity:1;

background:
hsla(0, 0%, 100%, 0.59);

transform:translateX(6px);

}



&.active{

opacity:1;

background:
linear-gradient(
90deg,
hsla(200, 10%, 71%, 0.53),
rgba(99,102,241,.2)
);

border-left:
3px solid rgba(245, 248, 249, 1);

}

`
