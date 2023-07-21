import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useGetSettingQuery} from '../services/notificationsApi' 

export const getTheme =()=>{

    const {data:sideBg} = useGetSettingQuery(COMPANY_THEME_SIDEBG)
    const {data:navBg} = useGetSettingQuery(COMPANY_THEME_NAVGB)
 
    const [nav,setNav]=useState("#1F2937");
    const [side,setSide] =useState("#1F2937")

 
    useEffect(() => {
     setSide(sideBg?.data.value);
     setNav(navBg?.data.value)

    }, [nav,side])
    
    
            
    return {sideBg:side,navBg:nav};
}