import React from "react";
 import classNames from "classnames";
 import "components/DayListItem.scss";


export default function DayListItem(props) {
  const formatSpots= function(){
    const numOfSpots = props.spots;
    if(numOfSpots === 0) return "no spots remaining";
    else if(numOfSpots === 1) return "1 spot remaining";
    else{
      return `${numOfSpots} spots remaining`
    }
  }
  
const dayClass = classNames("day-list__item", {
  "day-list__item--selected": props.selected,
  "day-list__item--full": props.full
})
    return (
    <li 
    className={dayClass}
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}