import React, {useState, useEffect, useMemo, useRef} from 'react';
import moment from 'moment';

import './calendar.scss';
import { get_month_esp_eng, get_esp_day }  from './translate_esp_eng'

const Calendar = (props)=>{

            const { description, getDayClicked, handleTurnClick, doctorRef} = props;

            const yearsRange = useRef([]);
            const currentMonth = useRef('Ninguno');


            const range = yearsRange.current;

            useMemo(()=>{
                console.log("render yearsrange");
                var range = [];
                for (var i = 1980; i <= moment().format("YYYY"); i++) {
                    range.push(i);
                }
                yearsRange.current = range;
                console.log("yearsRange: "+yearsRange.current)
            },[])

            useMemo(()=>{
                console.log("render translate months names");
                let result = get_month_esp_eng( moment().format("MMMM") );
                currentMonth.current = result.mes;
            },[]);


            //useref o usememo
            const [visibleMonths, setVisibleMonths] = useState(false);
            const [visibleYears, setVisibleYears] = useState(false);



            //aux states for calculate daysgrid
            const [dayStart, setDayStart] = useState("");
            const [startCol, setStarCol] = useState(0);
            const [dayNames, setDayNames] = useState(()=>moment.weekdays());
            const [monthNames, setMonthNames] = useState(['Enero',
            'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' 
            ]);
            
            //update anytime that changes dates
            const [currentDay,setCurrentDay] = useState(()=>moment().format("D"));
            const [selectedDay, setSelectedDay] = useState(null);
            
            const [daysInMonth,setDaysInMonth] = useState(()=>moment().daysInMonth());
            const [daysGrid,setDaysGrid] = useState([]);
            const [currentMonthNumber,setCurrentMonthNumber] = useState(()=>moment().format("MM"));
            const [currentYearNumber,setCurrentYearNumber] = useState(()=>moment().format("YYYY"));
    
               


    const searchDayStart = async ()=>{
        console.log("render searchdaystart");
         let myDate = `${currentYearNumber}-${currentMonthNumber}-01`;
         var daystart = moment(myDate).format("dddd");
        //  console.log("daystart var: "+daystart);
         await setDayStart(daystart);
        //  console.log("daystart: "+dayStart);
     }

     const process_days = async ()=>{
        console.log("render process days");
        let days = [];
        let start = undefined;
        let daystart = dayStart;
        dayNames.map(async (day)=>{ 
            if(day===daystart){
                switch(daystart){
                    case 'Monday': start = 1;break;
                    case 'Tuesday': start = 2;break;
                    case 'Wednesday': start = 3;break;
                    case 'Thursday': start = 4;;break;
                    case 'Friday': start = 5;break;
                    case 'Saturday': start = 6;break;
                    case 'Sunday': start = 0;break;
                    default: break;
                }
                await setStarCol(start);
                
            }
            return null;
        });
            for(let i=1; i<=daysInMonth+1; i++){
                if (i<startCol+1){
                    days.push(<div className="blank" key={i+"blnk"}></div>);
                }
               
            }
            for(let i=1; i<=daysInMonth; i++){
                    if(i===parseInt(currentDay) && parseInt(currentYearNumber)===parseInt(moment().format("YYYY"))
                    && parseInt(currentMonthNumber)===parseInt(moment().format("MM"))
                    ){
                        days.push(<div className="gradient-background current-day day" onClick={ ()=>handleDayClick({day: i, month: currentMonthNumber, year: currentYearNumber}) }key={i} value={i}>{i}</div>);
                    }
                    else{
                        if(i===parseInt(selectedDay)){
                            days.push(<div className="gradient-background selected-day day" onClick={ ()=>handleDayClick({day: i, month: currentMonthNumber, year: currentYearNumber}) } key={i} value={i}>{i}</div>);

                        }
                        else{
                            days.push(<div className="gradient-background day" onClick={ ()=>handleDayClick({day: i, month: currentMonthNumber, year: currentYearNumber}) } key={i} value={i}>{i}</div>);

                        }
                    }
            }
            await setDaysGrid(days);            
    }

  
        

    const toggleVisible = (modal)=>{
        console.log("render togglevisible");
        if(modal==="months-modal"){
            setVisibleMonths(!visibleMonths);
        }
        if(modal==="years-modal"){
            setVisibleYears(!visibleYears);
        }
    }

    const  changeMonth = async (value)=>{
        console.log("render changemonth");
        alert("Atencion: Se reinicio primer dia del mes");
        let month_data = get_month_esp_eng(value);
        let date = `${currentYearNumber}-${month_data.mesNumero}-01`;
        getDayClicked(`${1}-${month_data.mesNumero}-${currentYearNumber}`);
        setSelectedDay(1);
        const daysinmonth = moment(date).daysInMonth();
        await setVisibleMonths(!visibleMonths);
        await setDaysInMonth(daysinmonth);
        currentMonth.current = month_data.mes;
        await setCurrentMonthNumber(month_data.mesNumero);
        
    }

    const changeYear = async (value)=>{
        console.log("render change year");
        alert("Atencion: Se reinicio primer dia del mes");
        getDayClicked(`${1}-${currentMonthNumber}-${value}`);
        setSelectedDay(1);
        await setCurrentYearNumber(value);
        await setVisibleYears(!visibleYears);
        
    }

    const handleDayClick = async (e)=>{
        
        getDayClicked(`${e.day}-${currentMonthNumber}-${currentYearNumber}`);
        await setSelectedDay(e.day);
    }


    useEffect(()=>{
        console.log("render useffect in calendar depends currentday startcol daystart currentmonth currentyearnumber daysinmonth currentmonthnumber");
        searchDayStart();//fix error cause function not wait longer for update the state
        process_days();

    },[selectedDay,startCol,dayStart,currentMonth,currentYearNumber,daysInMonth,currentMonthNumber]);    
        return(
            <div className='calendar-container'>
                    <div className='top-bar'>
                        {/* <div className='month' onClick={ (e)=>this.changeMonth( this.state.currentMonth) } > */}
                        <div className='month gradient-background' onClick={ ()=>toggleVisible("months-modal") } >{currentMonth.current}</div>
                        <div className={ visibleMonths === true ? 'month-modal visible' : 'month-modal invisible'}>
                            <ul>
                                { monthNames.map((month)=>{
                                    return <li className="gradient-background" key={ month } onClick={()=>changeMonth(month)}>{ month }</li>
                                }) }
                            </ul>
                        </div>
                            <div ref={ doctorRef } className='description decoration-gold'>{ description }</div>
                        <div className='year gradient-background' onClick={ ()=>toggleVisible("years-modal") }>{currentYearNumber}</div>
                        <div className={ visibleYears === true ? 'year-modal visible' : 'year-modal invisible'}>
                            <ul>
                                { range.map((year)=>{
                                    return <li className="gradient-background" key={ year } onClick={ ()=>changeYear(year) }>{ year }</li>
                                }) }
                            </ul>
                        </div>
                    </div>
                    <div className='days-row'>
                        {dayNames.map(day =>{return <div key={day}>{get_esp_day(day)}</div>})}
                    </div>
                    <div className='days-grid'>
                            {daysGrid}
                    </div> 

                    <button onClick={ handleTurnClick }>Crear Turno</button>

            </div>
        );
}

export default Calendar