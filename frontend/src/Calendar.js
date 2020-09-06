import React, {useState, useEffect, useMemo, useRef} from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import './calendar.scss';
import { get_month_esp_eng, get_esp_day }  from './translate_esp_eng'

const Calendar = (props)=>{
            const { visibleTimePicker, createAppointment, isDisabled, selectedDoctor, getDayClicked, handleTurnClick, doctorRef} = props;
            const yearsRange = useRef([]);
            const currentMonth = useRef('Ninguno');
            const disabledButton = useRef();
            const modalMonthRef = useRef(null);
            const modalYearRef = useRef(null);
            const range = yearsRange.current;
            const [appointmentsByDoctor, setAppointmentsByDoctor] = useState([]);

            useEffect(()=>{
                let query = 'http://localhost:666/medical-care-rioiv/appointments/'+selectedDoctor.id
                axios
                .get(query)
                .then(res=>{
                    setAppointmentsByDoctor(res.data);})
                },[visibleTimePicker,selectedDoctor])

            useMemo(()=>{
                var range = [];
                for (var i = 1980; i <= moment().format("YYYY"); i++) {
                    range.push(i);
                }
                yearsRange.current = range;
            },[])

            useMemo(()=>{
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
            const [selectedDay, setSelectedDay] = useState();
            
            const [daysInMonth,setDaysInMonth] = useState(()=>moment().daysInMonth());
            const [daysGrid,setDaysGrid] = useState([]);
            const [currentMonthNumber,setCurrentMonthNumber] = useState(()=>moment().format("MM"));
            const [currentYearNumber,setCurrentYearNumber] = useState(()=>moment().format("YYYY"));
    
    const searchDayStart = async ()=>{
         let myDate = `${currentYearNumber}-${currentMonthNumber}-01`;
         var daystart = moment(myDate).format("dddd");
         await setDayStart(daystart);
     }

     const process_days = async ()=>{

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
                 let count = 0;
                 if(appointmentsByDoctor){
                     let countAppo = 0
                    appointmentsByDoctor.map((appo)=>{
                        console.log("acom: "+appo.acomplishDate)
                        
                        let date1 = moment(appo.acomplishDate.slice(0,10)).format();
                        console.log("c-date1: "+date1);
                        let date2 = moment(currentYearNumber+"-"+currentMonthNumber+"-"+i).format();
                        console.log("c-date2: "+date2);
                        if(date1===date2){
                            countAppo=countAppo+1;
                        }
                        count=countAppo;
                    })
                 }
                let customClass = "gradient-background day";
                if(i===parseInt(currentDay) && parseInt(currentYearNumber)===parseInt(moment().format("YYYY"))
                && parseInt(currentMonthNumber)===parseInt(moment().format("MM"))){
                    customClass = customClass+" current-day"
                }
                if(i===parseInt(selectedDay)){
                    customClass = customClass+" selected-day"
                }
                if(count>0){
                    customClass = customClass+" isAppo"
                    days.push(<div className={ customClass } onClick={ ()=>handleDayClick({day: i, month: currentMonthNumber, year: currentYearNumber}) } key={i} value={i}>{i}<span className="count">{count}</span></div>);
                }
                else{
                    days.push(<div className={ customClass } onClick={ ()=>handleDayClick({day: i, month: currentMonthNumber, year: currentYearNumber}) } key={i} value={i}>{i}</div>);
                }
            }
            await setDaysGrid(days);
    }

  
        

    const toggleVisible = (modal)=>{
        if(modal==="months-modal"){
            setVisibleMonths(!visibleMonths);
        }
        if(modal==="years-modal"){
            setVisibleYears(!visibleYears);
        }
    }

    const  changeMonth =  (value)=>{
        alert("Atencion: Se reinicio primer dia del mes");
        let month_data = get_month_esp_eng(value);
        let date = `${currentYearNumber}-${month_data.mesNumero}-01`;
         setSelectedDay(1);
        const daysinmonth = moment(date).daysInMonth();
         setVisibleMonths(!visibleMonths);
         setDaysInMonth(daysinmonth);
        currentMonth.current = month_data.mes;
         setCurrentMonthNumber(month_data.mesNumero);
         getDayClicked({ day: 1, month: month_data.mesNumero, year: currentYearNumber});

    }


    const  changeYear = (value)=>{
        alert("Atencion: Se reinicio primer dia del mes");
        setSelectedDay(1);
        setCurrentYearNumber(value);
        setVisibleYears(!visibleYears);
        getDayClicked({ day: 1, month: currentMonthNumber, year: value});

    }


   
    const handleDayClick = (e)=>{
         setSelectedDay(e.day);
         getDayClicked({ day: e.day, month: currentMonthNumber, year: currentYearNumber});

    }


    useEffect(()=>{
        searchDayStart();//fix error cause function not wait longer for update the state
        process_days();
    },[visibleTimePicker,appointmentsByDoctor,selectedDoctor,selectedDay,startCol,dayStart,currentMonth,currentYearNumber,daysInMonth,currentMonthNumber]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (modalMonthRef.current && !modalMonthRef.current.contains(event.target)){
                    setVisibleMonths(false);
            }
            if (modalYearRef.current && !modalYearRef.current.contains(event.target)){
                setVisibleYears(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[modalYearRef,modalMonthRef]);


        return(
            <div className='calendar-container'>
                    <div className='top-bar'>
                        {/* <div className='month' onClick={ (e)=>this.changeMonth( this.state.currentMonth) } > */}
                        <div className='month gradient-background' onClick={ ()=>toggleVisible("months-modal") } >{currentMonth.current}</div>
                        <div ref={ modalMonthRef } className={ visibleMonths === true ? 'month-modal visible' : 'month-modal invisible'}>
                            
                                { monthNames.map((month)=>{
                                    return <div className="touch gradient-background" key={ month } onClick={()=>changeMonth(month)}>{ month }</div>
                                }) }
                            
                        </div>

                            <div ref={ doctorRef } className='selected-doctor'>{ selectedDoctor.text }</div>

                        <div className='year gradient-background' onClick={ ()=>toggleVisible("years-modal") }>{currentYearNumber}</div>
                        <div ref={ modalYearRef } className={ visibleYears === true ? 'year-modal visible' : 'year-modal invisible'}>
                           
                                { range.map((year)=>{
                                    return <div className="touch gradient-background" key={ year } onClick={ ()=>changeYear(year) }>{ year }</div>
                                }) }
                           
                        </div>
                    </div>
                    <div className='days-row'>
                        {dayNames.map(day =>{return <div key={day}>{get_esp_day(day)}</div>})}
                    </div>
                    <div className='days-grid'>
                            {daysGrid}
                    </div> 
                    <div style={{display:"flex"}}>
                    <button ref={ disabledButton } disabled={ isDisabled } id="createAppointment" className={isDisabled? "babbly-button disabled" : "bubbly-button"} onClick={ createAppointment }>Crear Turno</button>
                    <button className="bubbly-button" id="flipToList" onClick={ handleTurnClick }>Ver Todos Los Turnos</button>
                    </div>
            </div>
        );
}
export default Calendar