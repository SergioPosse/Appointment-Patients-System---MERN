export const get_month_esp_eng = (month)=>{
    let mes = "";
    let mesNumero="";
        if(month==='January'||month==='Enero'){mes="Enero";month="January";mesNumero="01";}
        if(month==='February'||month==='Febrero'){mes="Febrero";month="February";mesNumero="02";}
        if(month==='March'||month==='Marzo'){mes="Marzo";month="March";mesNumero="03";}
        if(month==='April'||month==='Abril'){mes="Abril";month="April";mesNumero="04";}
        if(month==='May'||month==='Mayo'){mes="Mayo";month="May";mesNumero="05";}
        if(month==='June'||month==='Junio'){mes="Junio";month="June";mesNumero="06";}
        if(month==='July'||month==='Julio'){mes="Julio";month="July";mesNumero="07";}
        if(month==='August'||month==='Agosto'){mes="Agosto";month="August";mesNumero="08";}
        if(month==='September'||month==='Septiembre'){mes="Septiembre";month="September";mesNumero="09";}
        if(month==='October'||month==='Octubre'){mes="Octubre";month="October";mesNumero="10";}
        if(month==='November'||month==='Noviembre'){mes="Noviembre";month="November";mesNumero="11";}
        if(month==='December'||month==='Diciembre'){mes="Diciembre";month="December";mesNumero="12";}
    return {"mes": mes, "mesNumero": mesNumero,"month": month};
}

export const get_esp_day = (day)=>{
    switch(day){
        case "Saturday": day="Sabado";break;
        case "Monday": day="Lunes";break;
        case "Tuesday": day="Martes";break;
        case "Wednesday": day="Miercoles";break;
        case "Thursday": day="Jueves";break;
        case "Friday": day="Viernes";break;
        case "Sunday": day="Domingo";break;
        default: break;
    }
    return day;
}