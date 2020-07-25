import React, {Component} from 'react';
import moment from 'moment';
import './calendar.css';
import { get_month_esp_eng, get_esp_day }  from './translate_esp_eng'

export default class Calendar extends Component{
    constructor(){
        super();
        var yearsRange = [];
        for (var i = 1980; i <= moment().format("YYYY"); i++) {
            yearsRange.push(i);
        }
        let result = get_month_esp_eng( moment().format("MMMM") );
        let currentMonth = result.mes;

        this.state = {
            visibleMonths: false,
            visibleYears: false,
            //aux states for calculate daysgrid
            dayStart: "none",
            startCol: undefined,
            dayNames: moment.weekdays(),
            monthNames: ['Enero',
            'Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' 
            ],
            years: yearsRange,

            //update anytime that changes dates
            currentDay: moment().format("D"),
            currentMonth: currentMonth,
            daysInMonth: moment().daysInMonth(),
            daysGrid: [],
            currentMonthNumber: moment().format("MM"),
            currentYearNumber: moment().format("YYYY")
        }
    }
    
    setDayStart(){
         let currentMonthNumber = this.state.currentMonthNumber;
         let currentYearNumber = this.state.currentYearNumber;
         let myDate = `${currentYearNumber}-${currentMonthNumber}-01`;
         var dayStart = moment(myDate).format("dddd");
         this.setState({
             dayStart: dayStart
         });
     }

     process_days(){
        let days = [];
        let start = undefined;
        let daystart = this.state.dayStart;
        this.state.dayNames.map((day)=>{ 
            if(day==daystart){
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
                this.setState({
                    startCol: start
            });
            }
            return null;
        });
            for(let i=1; i<=this.state.daysInMonth+1; i++){
                if (i<this.state.startCol+1){
                    days.push(<div className="blank" key={i+"blnk"}></div>);
                }
               
            }
            for(let i=1; i<=this.state.daysInMonth; i++){
                    if(i==this.state.currentDay && this.state.currentYearNumber==moment().format("YYYY")
                    && this.state.currentMonthNumber==moment().format("MM")
                    ){
                        days.push(<div className="current-day day" key={i}>{i}</div>);
                    }
                    else{
                        days.push(<div className="day" key={i}>{i}</div>);
                    }
            }
            this.setState({ daysGrid: days });            
    }

    async componentDidMount(){
        await this.setDayStart();//fix error cause function not wait longer for update the state
        await this.process_days();
    };

    toggleVisible(modal){
        console.log(modal);
        if(modal=="months-modal"){
            this.setState({ visibleMonths: !this.state.visibleMonths });
        }
        if(modal=="years-modal"){
            this.setState({ visibleYears: !this.state.visibleYears });
        }
    }

    async changeMonth(value){
        let month_data = get_month_esp_eng(value);
        let date = `${this.state.currentYearNumber}-${month_data.mesNumero}-01`;
        const daysinmonth = moment(date).daysInMonth();
        await this.setState({
            visibleMonths: !this.state.visibleMonths,
            daysInMonth: daysinmonth,
            currentMonth: month_data.mes,
            currentMonthNumber: month_data.mesNumero
        })
        await this.setDayStart();
        await this.process_days();
    }

    async changeYear(value){
        await this.setState({ currentYearNumber: value, visibleYears: !this.state.visibleYears })
        await this.setDayStart();
        await this.process_days();
    }

    render(){
        return(
            <div className='calendar-container'>
                    <div className='top-bar'>
                        {/* <div className='month' onClick={ (e)=>this.changeMonth( this.state.currentMonth) } > */}
                        <div className='month' onClick={ ()=>this.toggleVisible("months-modal") } >{this.state.currentMonth}</div>
                        <div className={ this.state.visibleMonths == true ? 'month-modal visible' : 'month-modal invisible'}>
                            <ul>
                                { this.state.monthNames.map((month)=>{
                                    return <li key={ month } onClick={()=>this.changeMonth(month)}>{ month }</li>
                                }) }
                            </ul>
                        </div>
                        <div className='year' onClick={ ()=>this.toggleVisible("years-modal") }>{this.state.currentYearNumber}</div>
                        <div className={ this.state.visibleYears == true ? 'year-modal visible' : 'year-modal invisible'}>
                            <ul>
                                { this.state.years.map((year)=>{
                                    return <li key={ year } onClick={ ()=>this.changeYear(year) }>{ year }</li>
                                }) }
                            </ul>
                        </div>
                    </div>
                    <div className='days-row'>
                        {this.state.dayNames.map(day =>{return <div key={day}>{get_esp_day(day)}</div>})}
                    </div>
                    <div className='days-grid'>
                            {this.state.daysGrid}
                    </div> 
            </div>
        );
    };
}