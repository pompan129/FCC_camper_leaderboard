/**
 * Created by fazbat on 3/13/2016.
 */
//import React, {Component} from "react";
//import ReactDom from "react-dom";

"use strict";



class App extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            campers: [],
            urls:{
                alltime: "http://fcctop100.herokuapp.com/api/fccusers/top/alltime",
                recent: "http://fcctop100.herokuapp.com/api/fccusers/top/recent"
            },
            timeFrame: ""
        };
        this.getCampers(this.state.urls.recent,"Last 30 Days");
    }

    render(){
        if(!this.state.campers[0]){return null}
        console.log(this.state.campers);
        return (
               <div >
                   <Header
                       urls={this.state.urls}
                       getCampers={(url,msg)=>{this.getCampers(url,msg)}}/>
                   <div className="container">
                       <CamperTable
                           campers={this.state.campers}
                           sortTable={(col)=>{this.sortTable(col)}}
                           timeframe={this.state.timeFrame}
                       />
                   </div>
               </div>
            );
    }
    sortTable(col) {
        let sortedCampers;
        if(isNaN(this.state.campers[0][col])){              //sort by word... ie name
            sortedCampers = this.state.campers.sort((a,b)=> {
                if(a.username>b.username){return 1;}
                if(b.username>a.username){return -1;}
                return 0;
            });
        }else{                                              //sort by number... ie all tim points
            sortedCampers = this.state.campers.sort((a,b)=> {
                return Number(b[col]) - Number(a[col]);
            });
        }
        this.setState({campers:sortedCampers});
    }

    getCampers(url,msg){
        $.getJSON(url,(data) => {

            this.setState({campers:data, timeFrame:msg})
        });
    }
}

const Header = (props) =>{

    return(
            <div className="container-fluid top-header">
                <div className="col-sm-8"><h1>freeCodeCamp: Camper Leaderboard</h1></div>
                <div className="col-sm-4 sort-buttons">
                    <div className="btn-group pull-right">
                        <button
                            type="button"
                            onClick={()=>{props.getCampers(props.urls.recent, "Last 30 Days")}}
                            className="btn btn-primary">
                            Last 30 Days</button>
                        <button
                            type="button"
                            onClick={()=>{props.getCampers(props.urls.alltime, "All time")}}
                            className="btn btn-primary">
                            All time</button>
                    </div>
                </div>
            </div>

    );
};

const CamperTable = (props)=>{
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-condensed">
                <caption><h1>Most Points: {props.timeframe}</h1></caption>
                <TableHeader sortTable={(col)=>{props.sortTable(col)}}/>
                <TableBody campers={props.campers}/>
            </table>
        </div>
    );

};

const TableHeader = (props)=>{
    "use strict";
    return (
        <thead className="header">
        <tr>
            <th className="row-rank" >
                No.
            </th>
            <th className="row-name sortable" onClick={()=>{props.sortTable("username")}} >
                Name<span className="caret"></span>
            </th>
            <th className="row-pts30 sortable"  onClick={()=>{props.sortTable("recent")}}>
                Points: Past 30 Days<span className="caret"></span>
            </th>
            <th className="row-pts-all sortable" onClick={()=>{props.sortTable("alltime")}}>
                Points: Total<span className="caret"></span>
            </th>
        </tr>
        </thead>
    );
};

const TableBody = (props)=>{
    "use strict";
    const tableRows = props.campers.map((camper,index)=>{
        return <TableRow rank={index}camper={camper}/>
    });
    return(
        <tbody>
            {tableRows}
            <TableFooter/>
        </tbody>
    );

};

const TableRow = ({camper,rank})=>{
    "use strict";

    return(
        <tr>
            <td>{rank + 1}</td>
            <td><img src={camper.img} alt=""/><span>{camper.username}</span></td>
            <td>{camper.recent}</td>
            <td>{camper.alltime}</td>
        </tr>
    );


};

const TableFooter = (props)=>{
    "use strict";
    return (
        <tr className="footer">
            <td colSpan="4">by KURT JOHNSON (pompan129)</td>
        </tr>
    );
};


ReactDOM.render(<App />, document.querySelector(".main"));