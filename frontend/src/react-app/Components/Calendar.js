import React, {Component} from 'react';
import moment from 'moment';
import './calendar.css';

export default class Calendar extends Component{
    constructor(){
        super();
        this.state = {
            //aux states for calculate daysgrid
            dayStart: "none",
            startCol: undefined,
            dayNames: moment.weekdays(),

            //update anytime that changes dates
            currentYear: moment().format("YYYY"),
            currentDay: moment().format("D"),
            currentMonth: moment().format("MMMM"),
            daysInMonth: moment().daysInMonth(),
            daysGrid: []
        }
    }
    
    setDayStart(){
         var currentMonthNumber = moment().format("MM");
         var currentYearNumber = moment().format("YYYY");
         var myDate = `${currentYearNumber}-${currentMonthNumber}-01`;
         var dayStart = moment(myDate).format("dddd");
         this.setState({
             dayStart: dayStart
         });
     }

     process_days(){
        let days = [];
        let start = undefined;
        let daystart = this.state.dayStart;
        console.log(daystart)
        this.state.dayNames.map((day)=>{ 
            if(day==daystart){
                switch(daystart){
                    case 'Monday': start = 1;console.log(start);break;
                    case 'Tuesday': start = 2;console.log(start);break;
                    case 'Wednesday': start = 3;console.log(start);break;
                    case 'Thursday': start = 4;console.log(start);break;
                    case 'Friday': start = 5;console.log(start);break;
                    case 'Saturday': start = 6;console.log(start);break;
                    case 'Sunday': start = 0;console.log(start);break;
                }
                this.setState({
                    startCol: start
            });
            }
        });
        console.log(this.state.startCol)

            for(let i=1; i<=this.state.daysInMonth+1; i++){
                if (i<this.state.startCol+1){
                    days.push(<div className="blank" key={i+"blnk"}></div>);
                }
               
            }
            for(let i=1; i<=this.state.daysInMonth; i++){
                    if(i==this.state.currentDay){
                        days.push(<div className="current-day day" key={i}>{i}</div>);
                    }
                    else{
                        days.push(<div className="day" key={i}>{i}</div>);
                    }
            }

            this.setState({
                daysGrid: days
            });            
    }

    async componentDidMount(){
        await this.setDayStart();//fix error cause function not wait longer for update the state
        await this.process_days();
    };

    render(){
        return(
            <div className='calendar-container'>
                    <div className='top-bar'>
                        <div className='month'>{this.state.currentMonth}</div>
                        <div className='year'>{this.state.currentYear}</div>
                    </div>
                    <div className='days-row'>
                        {this.state.dayNames.map(day =>{
                            return <div key={day}>{day}</div>
                            
                            })}
                    </div>
                    <div className='days-grid'>
                            {this.state.daysGrid}
                    </div> 
            </div>
        );
    };
}